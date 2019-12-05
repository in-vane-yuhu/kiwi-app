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
  @observable userInfo = {}

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
}

const userStore = new UserStore()

export default userStore
