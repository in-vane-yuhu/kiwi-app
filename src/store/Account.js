import { observable, action } from 'mobx'
import { axios, api } from '../utils/axios'
import { Actions } from 'react-native-router-flux'
import { setData, getData, clear } from '../utils/AsyncStorage'
import { Portal, Toast } from '@ant-design/react-native'

class AccountStore {
  /**
   * observable
   */
  @observable twoFA = 'Email'
  @observable user = ''
  @observable addr_erc = ''

  /**
   * action
   */
  @action register = async (email, password) => {
    const loading = Toast.loading('加载中', 0)
    await setData('email', email)
    axios
      .post(api.register, { email, password })
      .then(res => {
        Portal.remove(loading)
        if (res.success) {
          Actions.verify()
        }
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action verifyCaptcha = async captcha => {
    const loading = Toast.loading('加载中', 0)
    axios
      .get(`${api.verifyCaptcha}/${captcha}`)
      .then(res => {
        Portal.remove(loading)
        if (res.success) {
          Actions.reset('login')
        }
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action login = async (email, password) => {
    const loading = Toast.loading('加载中', 0)
    await setData('email', email)
    axios
      .post(api.login, { email, password })
      .then(async res => {
        Portal.remove(loading)
        if (res.success) {
          await setData('access_token', res.data.token.access_token)
          await setData('expires_in', res.data.token.expires_in.toString())
          this.user = res.data.user
          this.addr_erc = res.data.user.wallet.eth
          Actions.reset('switchTab')
        } else {
          switch (res.data.message) {
            case 'LOGIN.EMAIL_NOT_VERIFIED':
              Actions.replace('verify')
              break
            case 'LOGIN.PASSWORD_NOT_VALID':
              break
            default:
              break
          }
        }
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action resendCaptcha = async () => {
    const loading = Toast.loading('加载中', 0)
    const email = await getData('email')
    axios
      .get(`${api.resendCaptcha}/${email}`)
      .then(res => {
        Portal.remove(loading)
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action getUser = async () => {
    const loading = Toast.loading('加载中', 0)
    const email = await getData('email')
    axios
      .get(`${api.user}/${email}`)
      .then(res => {
        Portal.remove(loading)
        this.user = res.data
        this.addr_erc = res.data.wallet.eth
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action signOut = async () => {
    this.user = ''
    await clear()
    Actions.replace('login')
  }

  @action updateNickname = async nickname => {
    const loading = Toast.loading('加载中', 0)
    const email = await getData('email')
    axios
      .patch(api.updateNickname, { email, nickname })
      .then(res => {
        Portal.remove(loading)
        setTimeout(() => {
          this.getUser()
          Actions.pop()
        }, 1000)
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action forgotPassword = email => {
    const loading = Toast.loading('加载中', 0)
    axios
      .get(`${api.forgotPwd}/${email}`)
      .then(res => {
        Portal.remove(loading)
        console.log(res)
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action resetPwdByToken = (email, newPassword, newPasswordToken) => {
    const loading = Toast.loading('加载中', 0)
    axios
      .post(`${api.resetPwd}`, { email, newPassword, newPasswordToken })
      .then(res => {
        Portal.remove(loading)
        if (res.success) {
          Actions.replace('login')
        }
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action resetPwdByCurrentPwd = (email, currentPassword, newPassword) => {
    const loading = Toast.loading('加载中', 0)
    axios
      .post(`${api.resetPwd}`, { email, currentPassword, newPassword })
      .then(res => {
        Portal.remove(loading)
        console.log(res)
      })
      .catch(err => {
        Portal.remove(loading)
      })
  }

  @action set2FA = type => {
    this.twoFA = type
  }
}

const accountStore = new AccountStore()

export default accountStore
