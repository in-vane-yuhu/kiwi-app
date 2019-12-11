import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { query, mutation } from '../utils/apollo'
import { setData } from '../utils/AsyncStorage'
import { Toast } from '@ant-design/react-native'

class UserStore {
  /**
   * observable
   */
  @observable SMSCode = ''
  @observable isSMSVerified = false
  @observable userInfo = {
    nickName: '',
    introduction: '',
  }
  @observable recharge_price = [
    { amount: '1', price: '1', selected: false },
    { amount: '10', price: '10', selected: false },
    { amount: '20', price: '20', selected: false },
    { amount: '30', price: '30', selected: false },
    { amount: '50', price: '50', selected: false },
    { amount: '100', price: '100', selected: false },
  ]
  @observable fans = []
  @observable favorites = []
  @observable subscriptions = []
  @observable counts = [
    { title: '订阅', id: 'sub', count: 0 },
    { title: '收藏', id: 'favor', count: 0 },
    { title: '粉丝', id: 'fans', count: 0 },
  ]

  /* loading */
  @observable loading = false

  /**
   * action
   */
  @action getSMS = async phoneNumber => {
    this.SMSCode = '123456'
    Toast.show('验证码已发送', 1)
  }

  @action login = async (phoneNumber, sms) => {
    if (sms !== this.SMSCode) {
      Toast.show('验证码错误', 1)
      return
    }
    const variables = { phoneNumber, sms }
    const body = `
      mutation login(
        $phoneNumber: String!
        $sms: String!
      ){
        login(
          phoneNumber:$phoneNumber
          sms:$sms
        ){
          isSuccess
          errMessage
          token
        }
      }
    `
    let res = await mutation(body, variables)
    if (res.login.isSuccess) {
      setData('token', res.login.token)
    }
    Actions.reset('switchTab')
  }

  @action getUserInfo = async () => {
    const variables = {}
    const body = `
      query getUserInfo{
        me{
          isSuccess
          errMessage
          user{
            id
            phoneNumber
            nickName
            address
            introduction
          }
        }
      }
    `
    let res = await query(body, variables)
    this.userInfo = res.me.user
  }

  @action modifyNickName = async nickName => {
    const variables = { nickName }
    const body = `
      mutation modifyNickName(
        $nickName: String
      ){
        changenickName(
          nickName:$nickName
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    if (res.changenickName.isSuccess) {
      Actions.pop()
      this.getUserInfo()
    }
  }

  @action modifyIntroduction = async introduction => {
    const variables = { introduction }
    const body = `
      mutation modifyIntroduction(
        $introduction: String
      ){
        changeIntroduction(
          introduction:$introduction
        ){
          isSuccess
          errMessage
        }
      }
    `
    let res = await mutation(body, variables)
    if (res.changeIntroduction.isSuccess) {
      Actions.pop()
      this.getUserInfo()
    }
  }

  @action getFans = async (first, skip) => {
    this.loading = true
    const variables = {
      first,
      skip,
    }
    const body = `
      query getFans(
        $first: Int
        $skip: Int
      ){
        getFollowers(
          first:$first
          skip:$skip
        ){
          isSuccess
          errMessage
          users{
            id
            nickName
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    this.fans = Array.isArray(res.getFollowers.users)
      ? res.getFollowers.users
      : []
    this.loading = false
  }

  @action getFavorites = async (first, skip) => {
    this.loading = true
    const variables = {
      first,
      skip,
    }
    const body = `
      query getFavorites(
        $first: Int
        $skip: Int
      ){
        getAttentions(
          first:$first
          skip:$skip
        ){
          isSuccess
          errMessage
          users{
            id
            nickName
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    this.favorites = Array.isArray(res.getAttentions.users)
      ? res.getAttentions.users
      : []
    this.loading = false
  }

  @action getSubscriptions = async (first, skip) => {
    this.loading = true
    const variables = {
      first,
      skip,
    }
    const body = `
      query getSubscriptions(
        $first: Int
        $skip: Int
      ){
        getSubscribes(
          first:$first
          skip:$skip
        ){
          isSuccess
          errMessage
          users{
            id
            nickName
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    this.subscriptions = Array.isArray(res.getSubscribes.users)
      ? res.getSubscribes.users
      : []
    this.loading = false
  }

  @action getCounts = async () => {
    this.loading = true
    const variables = {}
    const body = `
      query getCounts{
        getCount{
          isSuccess
          errMessage
          subscribeCount
          followerCount
          attentionCount
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getCount.isSuccess) {
      this.counts[0].count = res.getCount.subscribeCount
      this.counts[1].count = res.getCount.attentionCount
      this.counts[2].count = res.getCount.followerCount
    }
    this.loading = false
  }

  /**
   * func
   */
  @action setRechargePrice = index => {
    this.recharge_price.map(item => (item.selected = false))
    this.recharge_price[index].selected = true
  }
}

const userStore = new UserStore()

export default userStore
