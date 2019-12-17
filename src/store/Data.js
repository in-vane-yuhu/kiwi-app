import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { query, mutation } from '../utils/apollo'
import { setData } from '../utils/AsyncStorage'
import { Toast } from '@ant-design/react-native'

class DataStore {
  /**
   * observable
   */
  @observable data_attention = []
  @observable longshort = {
    longOKexRate: 50,
    shortOKexRate: 50,
    longHuobiRate: 50,
    shortHuobiRate: 50,
    longBitMexRate: 50,
    shortBitMexRate: 50,
  }
  @observable chain24 = {}
  @observable USDTInfo = {}
  @observable bigOrder = {
    long: 0,
    longDeal: 0,
    longDealAmount: 0,
    short: 0,
    shortDeal: 0,
    shortDealAmount: 0,
  }
  @observable upAndDowns = {}
  @observable closeOutOrder = []
  /* loading */
  @observable loading = false

  /**
   * action
   */
  @action getMycoin = async () => {
    const variables = {}
    const body = `
      query getMycoin{
        getMycoin
        {
          coin_name
          coin_price
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getMycoin) {
      this.data_attention = res.getMycoin
    }
  }

  @action getBattle = async () => {
    const variables = {}
    const body = `
      query getBattle{
        getBattle
        {
          longOKex
          shortOKex
          longHuobi
          shortHuobi
          longBitMex
          shortBitMex
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    const battle = res.getBattle
    if (res.getBattle) {
      const totalOKEx = battle.longOKex + battle.shortOKex
      const totalHuobi = battle.longHuobi + battle.shortHuobi
      const totalBitMex = battle.longBitMex + battle.shortBitMex
      const fix = value => (value * 100).toFixed(2)
      battle.longOKexRate = fix(battle.longOKex / totalOKEx)
      battle.shortOKexRate = fix(battle.shortOKex / totalOKEx)
      battle.longHuobiRate = fix(battle.longHuobi / totalHuobi)
      battle.shortHuobiRate = fix(battle.shortHuobi / totalHuobi)
      battle.longBitMexRate = fix(battle.longBitMex / totalBitMex)
      battle.shortBitMexRate = fix(battle.shortBitMex / totalBitMex)
      this.longshort = battle
      console.log({ battle })
    }
  }

  @action getOnchainexchange = async () => {
    const variables = {}
    const body = `
      query getOnchainexchange{
        getOnchainexchange{
          btc
          eth
          usdt
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getOnchainexchange) {
      this.chain24 = res.getOnchainexchange
    }
  }

  @action getUSDTInfo = async () => {
    const variables = {}
    const body = `
      query getUSDTInfo{
        getUsdtMessage{
          price
          exchangeRate
          premium
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getUsdtMessage) {
      this.USDTInfo = res.getUsdtMessage
    }
  }

  @action getBtcplaceorder = async () => {
    const variables = {}
    const body = `
      query getBtcplaceorder{
        getBtcplaceorder{
          long
          longDeal
          longDealAmount
          short
          shortDeal
          shortDealAmount
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getBtcplaceorder) {
      this.bigOrder = res.getBtcplaceorder
    }
  }

  @action getUpAndDown = async () => {
    const variables = {}
    const body = `
      query getUpAndDown{
        getDistribution{
          ups
          downs
          arrangeData{
            arrange
            count
          }
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    if (res.getDistribution) {
      this.upAndDowns = res.getDistribution
      let chartData = this.upAndDowns.arrangeData.map(item => {
        return { x: item.arrange, y: item.count }
      })
      chartData.splice(5, 0, 0)
      return chartData
    }
  }

  @action getCloseoutSummary = async () => {
    /* const variables = {}
    const body = `
      query{
        getCloseoutSummary
        {
          coin
          loss
          percentage
        }
      }
    `
    let res = await query(body, variables)
    console.log(res)
    this.closeOutOrder = res.getCloseoutSummary */
  }

  @action getData = async param => {
    const variables = {
      param,
    }
    const body = `
      mutation accessApi(
        $param: String!
      ){
        changeOKEXInfo(
          param:$param
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
}

const dataStore = new DataStore()

export default dataStore
