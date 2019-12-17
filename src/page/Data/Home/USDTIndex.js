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
export default class USDTIndex extends Component {
  componentDidMount = () => {
    const { getUSDTInfo } = this.props.DataStore
    getUSDTInfo()
  }

  render() {
    const { USDTInfo } = this.props.DataStore
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
            {USDTInfo.price}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 16 }}>
          <View style={{ width: '30%' }}>
            <Text style={{ color: CONST.N96, paddingBottom: 6 }}>美元汇率</Text>
            <Text style={{ color: CONST.N32, fontWeight: 'bold' }}>
              {USDTInfo.exchangeRate}
            </Text>
          </View>
          <View style={{ width: '30%' }}>
            <Text style={{ color: CONST.N96, paddingBottom: 6 }}>溢价率</Text>
            <Text style={{ color: CONST.N32, fontWeight: 'bold' }}>
              {`${(100-USDTInfo.premium).toFixed(2)}%`}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}
