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

export default class USDTIndex extends Component {
  render() {
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>USDT指标</Text>
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={{ color: CONST.N96, paddingBottom: 6 }}>
            USDT场外价格
          </Text>
          <Text style={{ color: CONST.N32, fontSize: 24, fontWeight: 'bold' }}>
            7.01
          </Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 16 }}>
          <View style={{ width: '30%' }}>
            <Text style={{ color: CONST.N96, paddingBottom: 6 }}>美元汇率</Text>
            <Text style={{ color: CONST.N32, fontWeight: 'bold' }}>7.0381</Text>
          </View>
          <View style={{ width: '30%' }}>
            <Text style={{ color: CONST.N96, paddingBottom: 6 }}>溢价率</Text>
            <Text style={{ color: CONST.N32, fontWeight: 'bold' }}>-0.39%</Text>
          </View>
        </View>
      </View>
    )
  }
}
