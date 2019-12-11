import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Echarts, echarts } from 'react-native-secharts'

import * as CONST from '../../../style/constant'
import styles, { EchartsHeight } from '../../../style'

const chain24 = [
  { name: 'BTC', type: true, count: '1605' },
  { name: 'ETH', type: false, count: '1543' },
  { name: 'USDT', type: false, count: '1.8亿' },
]

export default class UpAndDown extends Component {
  state = {
    option: {
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
        },
      ],

      xAxis: {
        type: 'category',
        data: [
          '10%',
          '8%',
          '6%',
          '4%',
          '2%',
          '0%',
          '-2%',
          '-4%',
          '-6%',
          '-8%',
          '-10%',
        ],
        axisLine: { show: false, lineStyle: { color: CONST.N96 } },
        axisTick: { show: false },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false, lineStyle: { color: CONST.N96 } },
        axisTick: { show: false },
      },
      series: [
        {
          data: [9, 5, 7, 11, 26, 44, 118, 73, 43, 22, 16],
          type: 'bar',
          itemStyle: {
            normal: {
              color: function(item) {
                if (item.dataIndex === 5) {
                  return '#eeeeee'
                }
                return item.dataIndex < 6 ? '#66c322' : '#e9686d'
              },
            },
          },
        },
      ],
      tooltip: { trigger: 'axis', position: pt => [pt[0], '10%'] },
      grid: { x2: 10, y: 10, y2: 20 },
    },
  }

  barChart = React.createRef()

  render() {
    const { option } = this.state
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>涨跌分布</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 8,
            paddingVertical: 16,
          }}
        >
          <Text>
            上涨：<Text style={{ color: CONST.GREEN }}>102</Text>
          </Text>
          <Text style={{ marginLeft: 32 }}>
            下跌：<Text style={{ color: CONST.RED }}>297</Text>
          </Text>
        </View>
        <View style={{}}>
          <Echarts
            ref={this.barChart}
            option={option}
            height={200}
            width={EchartsHeight}
          />
        </View>
      </View>
    )
  }
}
