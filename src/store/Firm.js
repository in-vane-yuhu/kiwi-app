import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { query, mutation } from '../utils/apollo'
import { setData } from '../utils/AsyncStorage'
import { Toast } from '@ant-design/react-native'

class FirmStore {
  /**
   * observable
   */
  @observable firm_set = [
    {
      title: '资产设置',
      children: [
        { checked: true, title: '公开' },
        { checked: false, title: '订阅者可见' },
        { checked: false, title: '仅自己可见' },
      ],
    },
    {
      title: '持仓设置',
      children: [
        { checked: true, title: '公开' },
        { checked: false, title: '订阅者可见' },
        { checked: false, title: '仅自己可见' },
      ],
    },
    {
      title: '操作设置',
      children: [
        { checked: true, title: '公开' },
        { checked: false, title: '订阅者可见' },
        { checked: false, title: '仅自己可见' },
      ],
    },
  ]
  @observable currentTabIndex = 0
  @observable spotList = []
  /* loading */
  @observable loading = false

  /**
   * action
   */
  @action updateFirmSetting = async (index, childIndex) => {
    this.firm_set[index].children.map(item => (item.checked = false))
    this.firm_set[index].children[childIndex].checked = true
  }

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
}

const firmStore = new FirmStore()

export default firmStore
