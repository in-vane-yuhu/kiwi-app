import { observable, action } from 'mobx'
import { axios, api } from '../utils/axios'
import moment from 'moment'
import { concat } from 'lodash'
import { Toast } from '@ant-design/react-native'

import { sub, div, fmtHomeList } from '../utils/utils'

import PicBTC from '../assets/image/BTC.png'
import PicETH from '../assets/image/ETH.png'

class TradeStore {
  /**
   * observable
   */
  @observable assets = []
  @observable funds = []
  @observable currentFinished = []
  @observable totalFinished = 0
  @observable currentPending = []
  @observable totalPending = 0
  @observable marketList = []
  @observable pendingDetail = ''
  @observable loading_funds = false
  @observable loading_pending = false
  @observable loading_finished = false
  @observable loading_limit_buy = false
  @observable loading_limit_sell = false
  @observable loading_market_buy = false
  @observable loading_market_sell = false
  @observable loading_market_buy = false
  @observable loading_market_sell = false
  @observable loading_market_list = false
  @observable status = { high: 0, open: 0, low: 0, close: 0, last: 0 }
  @observable homeList = []
  @observable kline = []
  @observable klineT = []
  @observable klineV = []
  @observable loading_kline = false
  @observable bookBids = []
  @observable loading_bookBids = false
  @observable bookAsks = []
  @observable loading_bookAsks = false
  @observable bookStauts = ''
  @observable deals = []
  @observable loading_deals = false

  @observable balance_BCH = 0
  @observable balance_BTC = 0

  @observable request_id = 1000000000
  @observable startTime = 1581267115 /* 2020-02-10 00:51:55 */
  @observable klineUpdateCount = 0
  @observable klineRange = 3600
  @observable finished_stime = 0

  /**
   * action
   */
  @action getAssets = () => {
    axios.post(api.assets, { id: this.request_id }).then(res => {
      this.assets = res.result
    })
    this.request_id++
  }

  @action getFunds = () => {
    this.loading_funds = true
    axios
      .post(api.funds, { id: this.request_id, params: ['ETH', 'BTC', 'BCH'] })
      .then(res => {
        let temp = []
        temp.push({
          name: 'BTC',
          available: res.result.BTC.available,
          freeze: res.result.BTC.freeze,
        })
        temp.push({
          name: 'ETH',
          available: res.result.ETH.available,
          freeze: res.result.ETH.freeze,
        })
        temp.push({
          name: 'BCH',
          available: res.result.BCH.available,
          freeze: res.result.BCH.freeze,
        })
        this.funds = temp
        this.loading_funds = false
      })
    this.request_id++
  }

  @action getBalanceHistory = (startTime, offset, limit) => {
    axios
      .post(api.balanceHistory, {
        id: this.request_id,
        asset: 'BTC',
        startTime,
        endTime: Date.parse(new Date()) / 1000,
        offset: 0,
        limit: 20,
      })
      .then(res => {
        console.log(res)
      })
    this.request_id++
  }

  @action getPendingOrders = (market, offset, limit) => {
    this.loading_pending = true
    axios
      .post(api.getPendingOrders, {
        id: this.request_id,
        market,
        offset,
        limit,
      })
      .then(res => {
        let records = res.result ? res.result.records : []
        for (let item of records) {
          item.time = moment(item.ctime * 1000).format('YYYY-MM-DD HH:mm:ss')
          item.undeal_stock = sub(item.amount, item.deal_stock)
          item.avgPrice = div(item.deal_money, item.deal_stock)
        }
        this.currentPending = records
        this.loading_pending = false
      })
    this.request_id++
  }

  @action getFinishedOrders = (market, startTime, endTime, offset, limit) => {
    this.loading_finished = true
    this.finished_stime = startTime
    axios
      .post(api.getFinishedOrders, {
        id: this.request_id,
        market,
        startTime,
        endTime,
        offset,
        limit,
        side: 0 /* 0 不限制; 1 sell; 2 buy */,
      })
      .then(res => {
        let records = res.result ? res.result.records : []
        for (let item of records) {
          item.time = moment(item.ftime * 1000).format('YYYY-MM-DD HH:mm:ss')
          item.undeal_stock = sub(item.amount, item.deal_stock)
          item.avgPrice = div(item.deal_money, item.deal_stock)
        }
        this.currentFinished = records
        this.loading_finished = false
      })
    this.request_id++
  }

  @action getPendingDetail = id => {
    axios
      .post(api.getPendingDetail, {
        id: this.request_id,
        market: 'BTCBCH',
        order: id,
      })
      .then(res => {
        this.pendingDetail = res.result
      })
    this.request_id++
  }

  @action getFinishedDetail = id => {
    axios
      .post(api.getFinishedDetail, {
        id: this.request_id,
        order: id,
      })
      .then(res => {
        console.log(res)
      })
    this.request_id++
  }

  @action putLimitOrder = (market, side, price, amount) => {
    side === 1
      ? (this.loading_limit_sell = true)
      : (this.loading_limit_buy = true)

    axios
      .post(api.putLimitOrder, {
        id: this.request_id,
        market,
        side,
        price,
        amount,
      })
      .then(res => {
        side === 1
          ? (this.loading_limit_sell = false)
          : (this.loading_limit_buy = false)
        this.getPendingOrders('BTCBCH', 0, 20)
        this.getBalanceBCH()
        this.getBalanceBTC()
        if (Number(res.result.deal_stock) !== 0) {
          setTimeout(() => {
            this.getFinishedOrders(
              'BTCBCH',
              this.finished_stime,
              Date.parse(new Date()) / 1000,
              0,
              100
            )
          }, 2000)
        }
      })
    this.request_id++
  }

  @action putMarketOrder = (market, side, amount) => {
    side === 1
      ? (this.loading_market_sell = true)
      : (this.loading_market_buy = true)

    axios
      .post(api.putMarketOrder, {
        id: this.request_id,
        market,
        side,
        amount,
      })
      .then(res => {
        side === 1
          ? (this.loading_market_sell = false)
          : (this.loading_market_buy = false)
        this.getPendingOrders('BTCBCH', 0, 20)
      })
    this.request_id++
  }

  @action cancelOrder = id => {
    axios
      .post(api.cancelOrder, {
        id: this.request_id,
        market: 'BTCBCH',
        order: id,
      })
      .then(res => {
        Toast.success('已撤单', 1)
        this.getPendingOrders('BTCBCH', 0, 20)
      })
    this.request_id++
  }

  @action getMarketList = () => {
    this.loading_market_list = true
    axios
      .post(api.getMarketList, {
        id: this.request_id,
      })
      .then(res => {
        let temp = concat([], res.result)
        temp.map(item => {
          item.label = item.name
          item.value = item.name
        })
        this.marketList = temp
        this.loading_market_list = false
      })
    this.request_id++
  }

  @action getStatus = market => {
    axios
      .post(api.getStatus, {
        id: this.request_id,
        market,
        period: 86400,
      })
      .then(res => {
        this.status = res.result
      })
    this.request_id++
  }

  @action getHomeStatus = market => {
    axios
      .post(api.getStatus, {
        id: this.request_id,
        market,
        period: 86400,
      })
      .then(res => {
        this.homeList = concat(this.homeList, {
          ...res.result,
          logo: market === 'BTCBCH' ? PicBTC : PicETH,
          symbol: market === 'BTCBCH' ? 'BTC' : 'ETH',
          change: fmtHomeList(res.result.open, res.result.close),
        })
      })
    this.request_id++
  }

  @observable resetHomeList = () => {
    this.homeList = []
  }

  @action onOpen = ws => {
    ws.onopen = () => {
      /* ping */
      let ping = setInterval(() => {
        ws.send(`{
          "method": "server.ping",
          "id": 1000000001,
          "params": []
        }`)
      }, 30000)

      ws.onclose = () => {
        clearInterval(ping)
      }

      /* 实时交易 */
      ws.send(`{
        "method": "deals.subscribe",
        "id": 1000000002,
        "params": [
          "BTCBCH"
        ]
      }`)
      /* 盘口 */
      ws.send(`{
        "method": "depth.subscribe",
        "id": 1000000003,
        "params": [
          "BTCBCH",
          20,
          "0"
        ]
      }`)
      /* kline的历史数据 */
      ws.send(`{
        "method": "kline.query",
        "id": 1999999999,
        "params": [
          "BTCBCH",
          ${Date.parse(new Date()) / 1000 - 3600 * 100},
          ${Date.parse(new Date()) / 1000},
          3600
        ]
      }`)
      /* kline的推送数据 */
      ws.send(`{
        "method": "kline.subscribe",
        "id": 1000000005,
        "params": [
          "BTCBCH",
          60
        ]
      }`)
    }
    ws.onmessage = ({ data }) => {
      let res = JSON.parse(data)
      switch (res.method) {
        case 'deals.update':
          res.params[1].map(
            item =>
              (item.time = moment(item.time * 1000).format(
                'YYYY-MM-DD HH:mm:ss'
              ))
          )
          this.deals = concat(res.params[1], this.deals).sort(
            (a, b) => a[2] - b[2]
          )
          break
        case 'depth.update':
          if (res.params[0]) {
            // true, replace
            this.bookAsks = res.params[1].asks.sort((a, b) => b[0] - a[0])
            this.bookBids = res.params[1].bids.sort((a, b) => b[0] - a[0])
          }
          if (!res.params[0]) {
            // false, push
            if (res.params[1].asks) {
              let temp = []
              let tempOld = concat([], this.bookAsks)
              res.params[1].asks.map(item => {
                if (item[1] !== '0') {
                  let flag = false
                  for (let [index, record] of tempOld.entries()) {
                    if (item[0] === record[0]) {
                      tempOld[index] = item
                      flag = true
                      break
                    }
                  }
                  if (!flag) {
                    temp.push(item)
                  }
                }
              })
              this.bookAsks = concat(tempOld, temp).sort((a, b) => b[0] - a[0])
            }
            if (res.params[1].bids) {
              let temp = []
              let tempOld = concat([], this.bookBids)
              res.params[1].bids.map(item => {
                if (item[1] !== '0') {
                  let flag = false
                  for (let [index, record] of tempOld.entries()) {
                    if (item[0] === record[0]) {
                      tempOld[index] = item
                      flag = true
                      break
                    }
                  }
                  if (!flag) {
                    temp.push(item)
                  }
                }
              })
              this.bookBids = concat(tempOld, temp).sort((a, b) => b[0] - a[0])
            }
          }
          break
        case 'kline.update':
          let temp = concat([], res.params)
          let tempK = []
          let tempT = ''
          let item = temp[temp.length - 1]
          /* if call getFinished */
          if (this.currentPending.length !== 0) {
            for (let item of this.currentPending) {
              if (
                (item.side === 1 && Number(item[2]) <= Number(item.price)) ||
                (item.side === 2 && Number(item[2]) >= Number(item.price))
              ) {
                this.getFinishedOrders(
                  'BTCBCH',
                  this.finished_stime,
                  Date.parse(new Date()) / 1000,
                  0,
                  100
                )
              }
            }
          }
          tempK.push([
            Number(item[1]),
            Number(item[2]),
            Number(item[4]),
            Number(item[3]),
          ])
          tempT = moment(
            item[0] * 1000 - new Date().getTimezoneOffset() * 60000
          ).format('MM-DD HH:mm:ss')
          this.kline = concat(this.kline, tempK)
          this.klineT = concat(this.klineT, tempT)
          this.klineUpdateCount++
          break

        default:
          break
      }
      if (res.id === 1999999999) {
        let temp = concat([], res.result)
        let tempK = []
        let tempT = []
        for (let item of temp) {
          tempT.push(
            moment(
              item[0] * 1000 - new Date().getTimezoneOffset() * 60000
            ).format('MM-DD HH:mm:ss')
          )
          tempK.push([
            Number(item[1]), // open
            Number(item[2]), // close
            Number(item[4]), // low
            Number(item[3]), // high
          ])
        }
        this.kline = concat(tempK, this.kline)
        this.klineT = concat(tempT, this.klineT)
      }
    }
  }

  @action rangeKLine = (ws, interval) => {
    /* unsubscribe kline */
    ws.send(`{
      "method": "kline.unsubscribe",
      "id": ${this.request_id},
      "params": [
        "BTCBCH"
      ]
    }`)
    this.kline = []
    this.klineV = []
    this.request_id++
    /* reset klineCount */
    this.klineUpdateCount = 0
    /* subscribe */
    ws.send(`{
      "method": "kline.query",
      "id": 1999999999,
      "params": [
        "BTCBCH",
        ${Date.parse(new Date()) / 1000 - interval * 100},
        ${Date.parse(new Date()) / 1000},
        ${interval}
      ]
    }`)
    ws.send(`{
      "method": "kline.subscribe",
      "id": ${this.request_id},
      "params": [
        "BTCBCH",
        ${interval}
      ]
    }`)
    this.klineRange = interval
    this.request_id++
  }

  @action getBalanceBCH = () => {
    axios
      .post(api.funds, { id: this.request_id, params: ['BCH'] })
      .then(res => {
        this.balance_BCH = res.result.BCH.available
      })
    this.request_id++
  }

  @action getBalanceBTC = () => {
    axios
      .post(api.funds, { id: this.request_id, params: ['BTC'] })
      .then(res => {
        this.balance_BTC = res.result.BTC.available
      })
    this.request_id++
  }
}

const tradeStore = new TradeStore()

export default tradeStore
