import React, { Component, Fragment } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import Echarts from 'native-echarts'
import { observer, inject } from 'mobx-react'
import styles from '../../../../style'

@inject('TradeStore')
@observer
class Chart extends Component {
  state = {
    range: 3600,
    rangeList: [
      { title: '1m', value: 60 },
      { title: '5m', value: 60 * 5 },
      { title: '15m', value: 60 * 15 },
      { title: '30m', value: 60 * 30 },
      { title: '1h', value: 3600 },
      { title: '8h', value: 3600 * 8 },
      { title: '1D', value: 86400 },
      { title: '1W', value: 86400 * 7 },
      { title: '1M', value: 86400 * 30 },
    ],
  }

  onSelectRange = value => {
    const { rangeKLine } = this.props.TradeStore
    const { ws } = this.props
    this.setState({ range: value })
    rangeKLine(ws, value)
  }

  renderRangeItem = (title, value, index) => {
    const { range } = this.state
    return (
      <TouchableOpacity
        key={index}
        style={{
          backgroundColor: range === value ? '#f8b500' : '#fff',
          width: '10%',
          borderWidth: 1,
          borderColor: range === value ? '#f8b500' : '#eee',
          alignItems: 'center',
          borderRadius: 2,
        }}
        onPress={() => this.onSelectRange(value)}
      >
        <Text style={{ color: range === value ? '#fff' : '#c8c8c8' }}>
          {title}
        </Text>
      </TouchableOpacity>
    )
  }

  renderRangeSelect = () => {
    const { rangeList } = this.state
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}
      >
        {rangeList.map((item, index) =>
          this.renderRangeItem(item.title, item.value, index)
        )}
      </View>
    )
  }

  render() {
    const { kline, klineT } = this.props.TradeStore
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
          type: 'cross',
          lineStyle: { color: '#376df4', width: 2, opacity: 1 },
        },
      },
      xAxis: {
        type: 'category',
        data: klineT,
        axisLine: { lineStyle: { color: '#8392A5' } },
      },
      yAxis: {
        scale: true,
        axisLine: { lineStyle: { color: '#8392A5' } },
        splitLine: { show: false },
      },
      grid: { bottom: 30, right: 8, top: 32, left: 48 },
      dataZoom: [{ type: 'inside' }],
      animation: false,
      series: [
        {
          type: 'candlestick',
          name: 'BTC/BCH',
          data: kline,
          itemStyle: {
            color: '#FD1050',
            color0: '#0CF49B',
            borderColor: '#FD1050',
            borderColor0: '#0CF49B',
          },
        },
      ],
    }
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View style={{ borderWidth: 1, borderColor: '#eee' }}>
          {this.renderRangeSelect()}
          <Echarts option={option} height={300} ref='chart' />
        </View>
      </SafeAreaView>
    )
  }
}

export default Chart
