import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const data_longshort = [
  { name: '全网走势', left: '55.16%', right: '44.84%' },
  { name: 'BTC', left: '52.44%', right: '47.56%' },
  { name: 'ETH', left: '57.62%', right: '42.38%' },
]

export default class LongShort extends Component {
  render() {
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>全网多空走势</Text>
        </View>
        {data_longshort.map((item, index) => (
          <View key={index} style={{ paddingTop: 16 }}>
            <Text style={[styles.data_bar_title]}>{item.name}</Text>
            <View style={{ flexDirection: 'row', paddingTop: 4 }}>
              <View style={[styles.data_bar_green, { width: item.left }]}>
                <Text style={{ color: CONST.N0 }}>{`多：${item.left}`}</Text>
              </View>
              <View style={[styles.data_bar_red, { width: item.right }]}>
                <Text style={{ color: CONST.N0 }}>{`空：${item.right}`}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
