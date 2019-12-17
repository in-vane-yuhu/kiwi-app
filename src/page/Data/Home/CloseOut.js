import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Empty from '../../../components/Empty'

const orders = [
  { name: 'BTC', count: 3216, percent: '1.15%' },
  { name: 'EOS', count: 949, percent: '3.20%' },
  { name: 'LTC', count: 50, percent: '0.29%' },
  { name: 'ETH', count: 264, percent: '0.45%' },
  { name: 'XRP', count: 5, percent: '0.05%' },
  { name: 'ETC', count: 1, percent: '0.01%' },
  { name: 'BCH', count: 108, percent: '0.70%' },
]
@inject('DataStore')
@observer
export default class CloseOut extends Component {
  componentDidMount = () => {
    const { getCloseoutSummary } = this.props.DataStore
    getCloseoutSummary()
  }

  render() {
    const { closeOutOrder } = this.props.DataStore
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>24h爆仓统计</Text>
        </View>
        <View
          style={[
            styles.border_bottom,
            { flexDirection: 'row', padding: 8, alignItems: 'baseline' },
          ]}
        >
          <Text style={{ color: CONST.N96 }}>累计爆仓</Text>
          <Text style={{ color: CONST.RED, fontSize: 18, marginLeft: 24 }}>
            $2743万
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
          }}
        >
          <Text style={{ color: CONST.PRIMARY, flexGrow: 1 }}>合约</Text>
          <Text
            style={{ color: CONST.PRIMARY, flexGrow: 1, textAlign: 'center' }}
          >
            爆仓金额
          </Text>
          <Text
            style={{ color: CONST.PRIMARY, flexGrow: 1, textAlign: 'right' }}
          >
            占比
          </Text>
        </View>
        <Text style={{ color: CONST.N96, padding: 8 }}>OKEx爆仓单</Text>
        {closeOutOrder.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                index % 2 === 0 ? 'rgba(255,94,0,0.1)' : CONST.N0,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 8,
            }}
          >
            <Text style={{ flexGrow: 1 }}>{item.coin}</Text>
            <Text
              style={{
                color: item.count > 500 ? CONST.RED : CONST.N32,
                fontWeight: 'bold',
                flexGrow: 1,
                textAlign: 'center',
              }}
            >{`¥${item.loss}万`}</Text>
            <Text
              style={{ fontWeight: 'bold', flexGrow: 1, textAlign: 'right' }}
            >
              {item.percentage}
            </Text>
          </View>
        ))}
        {closeOutOrder.length === 0 && <Empty />}
      </View>
    )
  }
}
