import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const order = [
  { name: 'BTC-1227', type: false, value: '$7300.00', count: '11.2万张' },
  { name: 'BTC-1227', type: false, value: '$7300.00', count: '11.2万张' },
  { name: 'BTC-1227', type: true, value: '$7300.00', count: '11.2万张' },
  { name: 'BTC-1227', type: false, value: '$7300.00', count: '11.2万张' },
]
@inject('DataStore')
@observer
export default class BigOrder extends Component {
  componentDidMount = () => {
    const { getBtcplaceorder } = this.props.DataStore
    getBtcplaceorder()
  }

  render() {
    const { bigOrder } = this.props.DataStore
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>BTC合约大挂单(>1万)</Text>
        </View>
        <View
          style={[
            styles.border_bottom,
            { paddingHorizontal: 4, paddingVertical: 16 },
          ]}
        >
          <Text style={{ color: CONST.GREEN, fontWeight: 'bold' }}>多单</Text>
          <View style={{ flexDirection: 'row', paddingTop: 8 }}>
            <Text style={{ color: CONST.N32, width: '50%' }}>
              挂单
              <Text style={{ color: CONST.GREEN }}>{bigOrder.long}</Text>
              /成交
            </Text>
            <Text style={{ color: CONST.GREEN, width: '50%' }}>
              {bigOrder.longDeal}
              <Text style={{ color: CONST.N32 }}>/成交</Text>
              {bigOrder.longDealAmount}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.border_bottom,
            { paddingHorizontal: 4, paddingVertical: 16 },
          ]}
        >
          <Text style={{ color: CONST.RED, fontWeight: 'bold' }}>空单</Text>
          <View style={{ flexDirection: 'row', paddingTop: 8 }}>
            <Text style={{ color: CONST.N32, width: '50%' }}>
              挂单<Text style={{ color: CONST.RED }}>{bigOrder.short}</Text>
              /成交
            </Text>
            <Text style={{ color: CONST.RED, width: '50%' }}>
              {bigOrder.shortDeal}
              <Text style={{ color: CONST.N32 }}>/成交</Text>
              {bigOrder.shortDealAmount}
            </Text>
          </View>
        </View>
        {/* <View style={{ paddingHorizontal: 4 }}>
          <Text
            style={{ paddingTop: 16, paddingBottom: 8, fontWeight: 'bold' }}
          >
            挂单中
          </Text>
          {order.map((item, index) => (
            <View key={index} style={{ paddingVertical: 8 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ color: CONST.N96 }}>{item.name}</Text>
                <Text style={{ color: item.type ? CONST.GREEN : CONST.RED }}>
                  {item.type ? '多单' : '空单'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 4,
                }}
              >
                <Text>{item.value}</Text>
                <Text>{item.count}</Text>
              </View>
            </View>
          ))}
        </View> */}
      </View>
    )
  }
}
