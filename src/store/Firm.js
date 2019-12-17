import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { query, mutation } from '../utils/apollo'
import { setData } from '../utils/AsyncStorage'
import { Toast } from '@ant-design/react-native'
import moment from 'moment'

class FirmStore {
  /**
   * observable
   */
  @observable currentTabIndex = 0
  @observable spotList = []
  @observable currentUser = {}
  @observable currentSpotUserAssets = {}
  @observable currentSpotUserPosition = []
  @observable currentSpotUserContract = []
  @observable currentSpotUserOps = []
  /* loading */
  @observable loading = false

  /**
   * action
   */
  @action setCurrentTab = async index => {
    this.currentTabIndex = index
  }

  @action accessApi = async (apiKey, apiSecret, passPhrase) => {
    const variables = {
      apiKey,
      apiSecret,
      passPhrase,
    }
    const body = `
      mutation accessApi(
        $apiKey: String!
        $apiSecret: String!
        $passPhrase: String!
      ){
        changeOKEXInfo(
          apiKey:$apiKey
          apiSecret:$apiSecret
          passPhrase:$passPhrase
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    console.log(res)
    if (res.changeOKEXInfo.isSuccess) {
      Actions.pop()
    }
  }

  @action getSpotList = async (first, skip) => {
    this.loading = true
    const variables = {
      first,
      skip,
    }
    const body = `
      query getSpotList(
        $first: Int
        $skip: Int
      ){
        getUsers(
          first:$first
          skip:$skip
        ){
          isSuccess
          errMessage
          users{
            id
            nickName
            introduction
            totalProperty
            totalEarnRate
            totalEarnValue
            subscribeCost
            subscribed
            type
            leverage
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getUsers.isSuccess) {
      this.spotList = Array.isArray(res.getUsers.users)
        ? res.getUsers.users
        : []
    }
    this.loading = false
  }

  @action getUser = async UID => {
    const variables = {
      UID,
    }
    const body = `
      query getUser(
        $UID: String!
      ){
        getUser(
          UID:$UID
        ){
          isSuccess
          errMessage
          user{
            id
            nickName
            introduction
            subscribeCost
            subscribed
            followed
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getUser.isSuccess) {
      this.currentUser = res.getUser.user
      this.getAssets(UID)
      this.getPositions(UID)
      this.getContracts(UID)
      this.getOperations(UID)
      this.getActivities(10, 0, UID)
    }
  }

  @action getAssets = async UID => {
    const variables = { UID }
    const body = `
      query getAssets(
        $UID: String!
      ){
        getProperty(
          UID:$UID
        ){
          isSuccess
          errMessage
          totalProperty
          earnRate
          totalEarning
          winRate
          duration
          weeklyEarning
          weeklyWinRate
          frequency
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getProperty.isSuccess) {
      this.currentSpotUserAssets = res.getProperty
    }
  }

  @action getPositions = async UID => {
    const variables = { UID }
    const body = `
      query getPositions(
        $UID: String!
      ){
        getPositionInfo(
          UID:$UID
        ){
          isSuccess
          errMessage
          assetses{
            currency
            balance
            totalprice
            cost
            price
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getPositionInfo.isSuccess) {
      this.currentSpotUserPosition = res.getPositionInfo.assetses
    }
  }

  @action getContracts = async UID => {
    const variables = { UID }
    const body = `
      query getContracts(
        $UID: String!
      ){
        getContractInfo(
          UID:$UID
        ){
          isSuccess
          errMessage
          contractInfo{
            instrument_id
            side
            leverage
            realized_pnl
            unrealized_pnl
            position
            margin
            maint_margin_ratio
          }
        }
      }
    `
    let res = await query(body, variables)
    const contractInfo = res.getContractInfo.contractInfo
    console.log(res)
    if (res.getContractInfo.isSuccess) {
      this.currentSpotUserContract = contractInfo
      this.currentSpotUserContract.total_pnl =
        Number(contractInfo.realized_pnl) + Number(contractInfo.unrealized_pnl)
      this.currentSpotUserContract.totalRate =
        this.currentSpotUserContract.total_pnl / contractInfo.position
    }
  }

  @action getOperations = async UID => {
    const variables = { UID }
    const body = `
      query getOperations(
        $UID: String!
      ){
        getLedger(
          UID:$UID
        ){
          isSuccess
          errMessage
          ledgers{
            timestamp
            side
            instrument_id
            price_avg
            filled_size
          }
        }
      }
    `
    let res = await query(body, variables)
    const ledgers = res.getLedger.ledgers
    console.log(res)
    if (res.getLedger.isSuccess) {
      this.currentSpotUserOps = ledgers
      this.date = moment(ledgers.timestamp).format('MM-DD')
      this.time = moment(ledgers.timestamp).format('HH:mm:ss')
    }
  }

  @action getActivities = async (first, skip) => {
    const variables = {
      first,
      skip,
      UID: this.currentUser.id,
    }
    const body = `
      query getActivities(
        $first: Int
        $skip: Int
        $UID: String!
      ){
        getMoments(
          first:$first
          skip:$skip
          UID:$UID
        ){
          isSuccess
          errMessage
          moments{
            user{
              nickName
            }
            createdAt
            content
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
  }

  @action getFirmSetting = async () => {
    const variables = {}
    const body = `
      query getFirmSetting{
        getSetting{
          isSuccess
          errMessage
          assetsSetting,
          positionSetting,
          actionSetting,
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    const response = res.getSetting
    if (response.isSuccess) {
      return {
        param_assets: response.assetsSetting,
        param_position: response.positionSetting,
        param_operation: response.actionSetting,
      }
    }
  }

  @action setFirmSetting = async (
    assetsSetting,
    positionSetting,
    actionSetting
  ) => {
    const variables = {
      assetsSetting,
      positionSetting,
      actionSetting,
    }
    const body = `
      mutation setFirmSetting(
        $assetsSetting: Int
        $positionSetting: Int
        $actionSetting: Int
      ){
        changeSetting(
          assetsSetting:$assetsSetting
          positionSetting:$positionSetting
          actionSetting:$actionSetting
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    console.log(res)
    if (res.changeSetting.isSuccess) {
      Actions.pop()
    }
  }

  @action postNewActivity = async content => {
    const variables = { content }
    const body = `
      mutation postNewActivity(
        $content: String
      ){
        createMoment(
          content:$content
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    console.log(res)
    if (res.createMoment.isSuccess) {
      Actions.pop()
    }
  }

  @action doSubscribe = async UID => {
    const variables = { UID }
    const body = `
      mutation doSubscribe(
        $UID: String!
      ){
        subscribe(
          UID:$UID
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    console.log(res)
    if (res.subscribe.isSuccess) {
      Toast.success('订阅成功', 1)
    } else {
      Toast.fail('订阅失败', 1)
    }
    this.getSpotList(10, 0)
    this.getUser(this.currentUser.id)
  }

  @action doUnsubscribe = async UID => {
    const variables = { UID }
    const body = `
      mutation doUnsubscribe(
        $UID: String!
      ){
        cancelsubscribe(
          UID:$UID
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    console.log(res)
    if (res.cancelsubscribe.isSuccess) {
      Toast.success('退订成功', 1)
    } else {
      Toast.fail('退订失败', 1)
    }
    this.getSpotList(10, 0)
    this.getUser(this.currentUser.id)
  }

  @action doFavorite = async () => {
    const variables = { UID: this.currentUser.id }
    const body = `
      mutation doFavorite(
        $UID: String!
      ){
        attentionTo(
          UID:$UID
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    console.log(res)
    if (res.attentionTo.isSuccess) {
      Toast.success('已关注', 1)
    } else {
      Toast.fail('关注失败', 1)
    }
    this.getUser(this.currentUser.id)
  }

  @action doUnfavorite = async () => {
    const variables = { UID: this.currentUser.id }
    const body = `
      mutation doUnfavorite(
        $UID: String!
      ){
        cancelAttention(
          UID:$UID
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    console.log(res)
    if (res.cancelAttention.isSuccess) {
      Toast.success('已取关', 1)
    } else {
      Toast.fail('取关失败', 1)
    }
    this.getUser(this.currentUser.id)
  }
}

const firmStore = new FirmStore()

export default firmStore
