import React, { Component } from 'react'
import { Text, View, ScrollView, SafeAreaView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Echarts, echarts } from 'react-native-secharts'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Statistic from '../../../components/Statistic'

const lineColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: CONST.PRIMARY },
  { offset: 1, color: CONST.N0 },
])

export default class Assets extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: '',
      option: {
        tooltip: { trigger: 'axis', position: pt => [pt[0], '10%'] },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: { show: false, lineStyle: { color: CONST.N96 } },
          axisTick: { show: false },
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false, lineStyle: { color: CONST.N96 } },
          axisTick: { show: false },
        },
        color: lineColor,
        series: [
          { data: [830, 932, 901, 934, 1290, 1330, 1320], type: 'line' },
        ],
        grid: { x2: 10, y: 10 },
      },
      flag: false,
    }
    this.echart = React.createRef()
  }

  onPress = e => {
    console.log(e)
  }

  render() {
    const { option } = this.state
    return (
      <SafeAreaView style={[styles.page_box]}>
        <ScrollView>
          <View>
            <View
              style={[styles.border_bottom, styles.firm_detail_assets_title]}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>账户资产</Text>
            </View>
            <View
              style={[
                styles.border_bottom,
                styles.firm_detail_assets_total_bar,
              ]}
            >
              <Statistic title='总资产' value='¥10000' />
              <Statistic title='总收益率' value='+95.00%' sign='plus' />
            </View>
            <View style={[styles.firm_detail_assets_bar]}>
              <Statistic
                title='总收益'
                value='-¥1000'
                sign='minus'
                width='30%'
              />
              <Statistic
                title='交易胜率'
                value='3.00%'
                sign='plus'
                width='30%'
              />
              <Statistic title='交易时常' value='22天' width='30%' />
            </View>
            <View style={[styles.firm_detail_assets_bar]}>
              <Statistic
                title='周收益'
                value='+¥10000'
                sign='plus'
                width='30%'
              />
              <Statistic
                title='周收益率'
                value='3.00%'
                sign='plus'
                width='30%'
              />
              <Statistic title='交易频次' value='8次/周' width='30%' />
            </View>
            <View
              style={{ height: 8, backgroundColor: '#f0f0f0', marginTop: 24 }}
            />
          </View>
          <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>收益走势</Text>
          </View>
          <View style={{ paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
              <Text style={{ color: CONST.N96 }}>总收益</Text>
              <View style={{ flexDirection: 'row', marginRight: 24 }}>
                <Text style={{ color: CONST.N96 }}>最高：</Text>
                <Text style={{ color: CONST.N32 }}>¥8564.40</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: CONST.N96 }}>最低：</Text>
                <Text style={{ color: CONST.N32 }}>-¥8564.40</Text>
              </View>
            </View>
            <Echarts
              ref={this.echart}
              option={option}
              height={200}
              width='100%'
              onPress={this.onPress}
            />
          </View>
          <View style={{ marginHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
              <Text style={{ color: CONST.N96 }}>收益率</Text>
              <View style={{ flexDirection: 'row', marginRight: 24 }}>
                <Text style={{ color: CONST.N96 }}>最高：</Text>
                <Text style={{ color: CONST.N32 }}>¥8564.40</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: CONST.N96 }}>最低：</Text>
                <Text style={{ color: CONST.N32 }}>-¥8564.40</Text>
              </View>
            </View>
            <Echarts
              ref={this.echart}
              option={option}
              height={200}
              width='100%'
              onPress={this.onPress}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
