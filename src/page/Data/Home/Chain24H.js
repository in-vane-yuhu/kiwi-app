import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const chain24 = [
  { name: 'BTC', type: true, count: '1605' },
  { name: 'ETH', type: false, count: '1543' },
  { name: 'USDT', type: false, count: '1.8亿' },
]

export default class Chain24H extends Component {
  render() {
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>链上数据24小时统计</Text>
        </View>
        <View style={{}}>
          <View style={{ flexDirection: 'row', paddingTop: 16 }}>
            <Text style={{ color: CONST.N96, width: '30%' }}>合约</Text>
            <Text style={{ color: CONST.N96 }}>净流入交易所</Text>
          </View>
          {chain24.map((item, index) => (
            <View key={index} style={{ flexDirection: 'row', paddingTop: 16 }}>
              <Text style={{ color: CONST.N32, width: '30%' }}>
                {item.name}
              </Text>
              <Text style={{ color: item.type ? CONST.GREEN : CONST.RED }}>
                {`${item.type ? '+' : '-'}${item.count}个 ${item.name}`}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
