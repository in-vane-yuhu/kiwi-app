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
