import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const data = [
  {
    date: '11月11日',
    time: '12:00:00',
    type: '买入',
    name: 'in_vane',
    place: 'Binance',
    token: 'EOS/USDT',
    price: '7.07',
    amount: '1000',
  },
  {
    date: '11月11日',
    time: '12:00:00',
    type: '卖出',
    name: 'in_vane',
    place: 'Binance',
    token: 'EOS/USDT',
    price: '7.07',
    amount: '1000',
  },
]

export default class Operation extends Component {
  setColor = item => (item.type === '买入' ? CONST.GREEN : CONST.RED)

  render() {
    return (
      <View style={[styles.page_box]}>
        <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>最新操作</Text>
        </View>

        <View style={{ padding: 24 }}>
          {data.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', paddingBottom: 24 }}
            >
              <View style={{ width: '20%' }}>
                <Text style={[styles.firm_detail_ops_tl_left]}>
                  {item.date}
                </Text>
                <Text style={[styles.firm_detail_ops_tl_left]}>
                  {item.time}
                </Text>
              </View>
              <View style={{ position: 'relative', marginHorizontal: 12 }}>
                <View style={[styles.firm_detail_ops_tl_head]}>
                  <Icon name='check-circle' color={CONST.PRIMARY} />
                </View>
                <View style={[styles.firm_detail_ops_tl_tail]} />
              </View>
              <View>
                <View
                  style={[
                    styles.firm_detail_ops_tl_right,
                    { backgroundColor: this.setColor(item) },
                  ]}
                >
                  <Text style={{ color: CONST.N0, textAlign: 'center' }}>
                    {item.type}
                  </Text>
                </View>
                <View style={{ marginTop: 6, marginLeft: 4 }}>
                  <Text style={{ color: CONST.N96 }}>
                    {`${item.name} 在【${item.place} ${item.token}】以`}
                  </Text>
                  <Text style={{ marginTop: 4, color: CONST.N96 }}>
                    均价
                    <Text
                      style={{ color: this.setColor(item) }}
                    >{`【${item.price}】`}</Text>
                    {item.type}
                    <Text
                      style={{ color: this.setColor(item) }}
                    >{`【${item.amount}】`}</Text>
                    个
                  </Text>
                </View>
              </View>
            </View>
          ))}
          <View
            style={[
              styles.firm_detail_ops_tl_head,
              { marginLeft: '20%', paddingLeft: 12 },
            ]}
          >
            <Icon name='environment' color={CONST.PRIMARY} />
          </View>
        </View>
      </View>
    )
  }
}
