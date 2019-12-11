import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const data_attention = [
  { name: 'BTC', value: '52504.25' },
  { name: 'ETH', value: '1052.16' },
  { name: 'EOS', value: '19.43' },
  { name: 'USDT', value: '7.11' },
]
export default class WatchCoin extends Component {
  render() {
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>关注币种</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {data_attention.map((item, index) => (
            <View key={index} style={{ paddingTop: 16, width: '45%' }}>
              <Text style={{ color: CONST.N96 }}>{item.name}</Text>
              <Text style={{ color: CONST.GREEN, fontSize: 16 }}>
                {`¥${item.value}`}
              </Text>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
