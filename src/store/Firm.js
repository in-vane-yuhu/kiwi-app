import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { query, mutation } from '../utils/apollo'
import { setData } from '../utils/AsyncStorage'
import { Toast } from '@ant-design/react-native'

class FirmStore {
  /**
   * observable
   */
  @observable currentTabIndex = 0
  @observable spotList = []
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
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    this.spotList = Array.isArray(res.getUsers.users) ? res.getUsers.users : []
    this.loading = false
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
    if (res.changeSetting.isSuccess) {
      Actions.pop()
    }
  }
}

const firmStore = new FirmStore()

export default firmStore
