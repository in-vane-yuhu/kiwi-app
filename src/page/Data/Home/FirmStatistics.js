import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const users = [
  { name: '89年的网民', long: '多0.00倍', short: '空3.29倍' },
  { name: 'in_vane', long: '多0.00倍', short: '空0.49倍' },
  { name: 'A路人', long: '多1.24倍', short: '空0.26倍' },
  { name: '詹姆斯', long: '多11.17倍', short: '空0.00倍' },
  { name: '神崎艾莎', long: '多2.68倍', short: '空0.00倍' },
]
@inject('DataStore')
@observer
export default class FirmStatistics extends Component {
  render() {
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>实盘统计</Text>
        </View>
        <Text style={{ fontSize: 12, paddingVertical: 16 }}>期货仓位</Text>
        <View style={[styles.data_firmStat_box]}>
          <View style={[styles.data_firmStat_green]}>
            <Text style={{ color: CONST.N0, paddingLeft: 16 }}>多1.15倍</Text>
          </View>
          <View style={[styles.data_firmStat_gray]} />
          <View style={[styles.data_firmStat_red]}>
            <Text style={{ color: CONST.N0, paddingRight: 16 }}>空1.15倍</Text>
          </View>
        </View>
        {users.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
            }}
          >
            <Text>{item.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: CONST.GREEN }}>{item.long}</Text>
              <Text style={{ color: CONST.RED, marginLeft: 16 }}>
                {item.short}
              </Text>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
