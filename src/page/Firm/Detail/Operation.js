import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../../style/constant'
import styles, { screenHeight, screenWidth } from '../../../style'

export default class Operation extends Component {
  render() {
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
    return (
      <View style={[styles.page_box]}>
        <ScrollView>
          <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>最新操作</Text>
          </View>

          <View style={{ padding: 24 }}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{ flexDirection: 'row', paddingBottom: 24 }}
              >
                <View>
                  <Text style={[styles.firm_detail_ops_timeline_left]}>
                    {item.date}
                  </Text>
                  <Text style={[styles.firm_detail_ops_timeline_left]}>
                    {item.time}
                  </Text>
                </View>
                <View style={{ position: 'relative', marginHorizontal: 12 }}>
                  <View style={[styles.firm_detail_ops_timeline_head]}>
                    <Icon name='check-circle' color={constant.primary_color} />
                  </View>
                  <View style={[styles.firm_detail_ops_timeline_tail]} />
                </View>
                <View>
                  <View
                    style={[
                      styles.firm_detail_ops_timeline_right,
                      {
                        backgroundColor:
                          item.type === '买入'
                            ? constant.text_green
                            : constant.text_red,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        color: constant.text_white,
                        textAlign: 'center',
                      }}
                    >
                      {item.type}
                    </Text>
                  </View>
                  <View style={{ marginTop: 6, marginLeft: 4 }}>
                    <Text style={{ color: constant.text_gray }}>
                      {`${item.name} 在【${item.place} ${item.token}】以`}
                    </Text>
                    <Text style={{ marginTop: 4, color: constant.text_gray }}>
                      均价
                      <Text
                        style={{
                          color:
                            item.type === '买入'
                              ? constant.text_green
                              : constant.text_red,
                        }}
                      >{`【${item.price}】`}</Text>
                      {item.type}
                      <Text
                        style={{
                          color:
                            item.type === '买入'
                              ? constant.text_green
                              : constant.text_red,
                        }}
                      >{`【${item.amount}】`}</Text>
                      个
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    )
  }
}
