import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const chain24 = [
  { name: 'BTC', type: true, count: '1605' },
  { name: 'ETH', type: false, count: '1543' },
  { name: 'USDT', type: false, count: '1.8亿' },
]
@inject('DataStore')
@observer
export default class Chain24H extends Component {
  componentDidMount = () => {
    const { getOnchainexchange } = this.props.DataStore
    getOnchainexchange()
  }

  render() {
    const { chain24 } = this.props.DataStore
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>链上数据24小时统计</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 16 }}>
          <Text style={{ color: CONST.N96, width: '30%' }}>合约</Text>
          <Text style={{ color: CONST.N96 }}>净流入交易所</Text>
        </View>
        <View key={0} style={{ flexDirection: 'row', paddingTop: 16 }}>
          <Text style={{ color: CONST.N32, width: '30%' }}>BTC</Text>
          <Text style={{ color: chain24.btc > 0 ? CONST.GREEN : CONST.RED }}>
            {`${chain24.btc || 0}个 BTC`}
          </Text>
        </View>
        <View key={1} style={{ flexDirection: 'row', paddingTop: 16 }}>
          <Text style={{ color: CONST.N32, width: '30%' }}>ETH</Text>
          <Text style={{ color: chain24.eth > 0 ? CONST.GREEN : CONST.RED }}>
            {`${chain24.eth || 0}个 ETH`}
          </Text>
        </View>
        <View key={2} style={{ flexDirection: 'row', paddingTop: 16 }}>
          <Text style={{ color: CONST.N32, width: '30%' }}>USDT</Text>
          <Text style={{ color: chain24.usdt > 0 ? CONST.GREEN : CONST.RED }}>
            {`${chain24.usdt || 0}个 USDT`}
          </Text>
        </View>
      </View>
    )
  }
}
