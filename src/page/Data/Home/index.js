import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const data_attention = [
  { name: 'BTC', value: '52504.25' },
  { name: 'ETH', value: '1052.16' },
  { name: 'EOS', value: '19.43' },
  { name: 'USDT', value: '7.11' },
]
const data_bar = [
  { name: '全网走势', left: '55.16%', right: '44.84%' },
  { name: 'BTC', left: '52.44%', right: '47.56%' },
  { name: 'ETH', left: '57.62%', right: '42.38%' },
]

export default class Data extends Component {
  render() {
    return (
      <SafeAreaView style={[styles.page_box]}>
        <ScrollView>
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

          <View style={[styles.data_box]}>
            <View style={[styles.data_title_box]}>
              <Text style={[styles.data_title_text]}>全网多空走势</Text>
            </View>
            {data_bar.map((item, index) => (
              <View key={index} style={{ paddingTop: 16 }}>
                <Text style={[styles.data_bar_title]}>{item.name}</Text>
                <View style={{ flexDirection: 'row', paddingTop: 4 }}>
                  <View style={[styles.data_bar_green, { width: item.left }]}>
                    <Text
                      style={{ color: CONST.N0 }}
                    >{`多：${item.left}`}</Text>
                  </View>
                  <View style={[styles.data_bar_red, { width: item.right }]}>
                    <Text
                      style={{ color: CONST.N0 }}
                    >{`空：${item.right}`}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.data_box]}>
            <View style={[styles.data_title_box]}>
              <Text style={[styles.data_title_text]}>链上数据24小时统计</Text>
            </View>
            <View style={{}}></View>
          </View>

          <View style={[styles.data_box]}>
            <View style={[styles.data_title_box]}>
              <Text style={[styles.data_title_text]}>USDT指标</Text>
            </View>
            <View style={{}}></View>
          </View>

          <View style={[styles.data_box]}>
            <View style={[styles.data_title_box]}>
              <Text style={[styles.data_title_text]}>BTC合约大挂单(>1万)</Text>
            </View>
            <View style={{}}></View>
          </View>

          <View style={[styles.data_box]}>
            <View style={[styles.data_title_box]}>
              <Text style={[styles.data_title_text]}>实盘统计</Text>
            </View>
            <View style={{}}></View>
          </View>

          <View style={[styles.data_box]}>
            <View style={[styles.data_title_box]}>
              <Text style={[styles.data_title_text]}>涨跌分布</Text>
            </View>
            <View style={{}}></View>
          </View>

          <View style={[styles.data_box]}>
            <View style={[styles.data_title_box]}>
              <Text style={[styles.data_title_text]}>24h爆仓统计</Text>
            </View>
            <View style={{}}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
