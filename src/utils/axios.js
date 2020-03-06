import Axios from 'axios'
import { Actions } from 'react-native-router-flux'
import { Toast } from '@ant-design/react-native'
import { getData, clear } from './AsyncStorage'
import { codeMsg, errMsg, resMsg } from './message'

const api = {
  /* account */
  register: 'auth/email/register',
  login: 'auth/email/login',
  resendCaptcha: 'auth/email/resend-verification',
  verifyCaptcha: 'auth/email/verify',
  forgotPwd: 'auth/email/forgot-password',
  resetPwd: 'auth/email/reset-password',
  user: 'users/user',
  updateNickname: 'users/profile/update',
  /* trade */
  assets: 'spots/asset/list',
  funds: 'spots/balance/query',
  balanceHistory: 'spots/balance/history',
  getPendingOrders: 'spots/order/pending',
  getFinishedOrders: 'spots/order/finished',
  getPendingDetail: 'spots/order/pending_detail',
  getFinishedDetail: 'spots/order/finished_detail',
  putLimitOrder: 'spots/order/put_limit',
  putMarketOrder: 'spots/order/put_market',
  cancelOrder: 'spots/order/cancel',
  getMarketList: 'spots/market/list',
  getStatus: 'spots/market/status',
  getKLine: 'spots/market/kline',
  getBook: 'spots/order/book',
  getDeals: 'spots/order/deals',
}

/* 创建 axios 实例 */
let apiService = Axios.create({
  baseURL: 'http://47.56.22.214:3000',
  timeout: 30000,
})

/* 请求拦截器 */
apiService.interceptors.request.use(
  async config => {
    const token = await getData('access_token')
    return {
      ...config,
      headers: { authorization: `Bearer ${token}` },
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/* 响应拦截器 */
apiService.interceptors.response.use(
  response => {
    const res = response.data
    if (res.message) {
      if (res.success) {
        Toast.success(resMsg(res.message), 1)
      } else {
        Toast.fail(errMsg(res.data.message), 1)
      }
    }
    return res
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Toast.fail(codeMsg(401), 1)
          clear()
          Actions.reset('login')
          break
        case 403:
          Toast.fail(codeMsg(403), 1)
          clear()
          Actions.reset('login')
          break
        default:
          break
      }
    }
    if (error.message.includes('timeout')) {
      Toast.fail('REQUEST_TIMEOUT')
    }
    if (!error.response) {
      Toast.fail('DISCONNECTED')
    }
    return Promise.reject(error)
  }
)

export { apiService as axios, api }
