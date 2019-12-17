import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, SafeAreaView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Echarts, echarts } from 'react-native-secharts'
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryScatter,
  VictoryCursorContainer,
} from 'victory-native'
import moment from 'moment'

import * as CONST from '../../../style/constant'
import styles, { EchartsHeight } from '../../../style'

import Statistic from '../../../components/Statistic'

const axis_x = [...Array(7).keys()].map(days =>
  moment(new Date(Date.now() - 86400000 * days)).format('MM-DD')
)
const data = axis_x.map(item => {
  return {
    x: item,
    y: Math.random() * (900 - 200) + 200,
  }
})

@inject('FirmStore')
@observer
export default class Assets extends Component {
  state = {}

  renderChart = () => (
    <VictoryChart
      padding={{ top: 10, right: 40, bottom: 32, left: 40 }}
      minDomain={{ y: 0 }}
      maxDomain={{ y: 1000 }}
      height={200}
    >
      <VictoryLine
        style={{
          data: { stroke: CONST.PRIMARY },
        }}
        data={data}
        interpolation='monotoneX'
      />
      <VictoryAxis
        tickValues={axis_x}
        style={{
          axis: { stroke: CONST.N200 },
          tickLabels: { fill: CONST.N200 },
        }}
      />
      <VictoryAxis
        dependentAxis
        style={{
          grid: { stroke: CONST.N200, strokeDasharray: '5 5' },
          axis: { stroke: null },
          tickLabels: { fill: CONST.N200 },
        }}
      />
      <VictoryScatter
        data={data}
        style={{ data: { fill: CONST.PRIMARY } }}
        containerComponent={
          <VictoryCursorContainer
            cursorLabel={({ datum }) =>
              `${round(datum.x, 2)}, ${round(datum.y, 2)}`
            }
          />
        }
      />
    </VictoryChart>
  )

  render() {
    const { currentSpotUserAssets } = this.props.FirmStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View>
          <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>账户资产</Text>
          </View>
          <View
            style={[styles.border_bottom, styles.firm_detail_assets_total_bar]}
          >
            <Statistic
              title='总资产'
              value={currentSpotUserAssets.totalProperty || 0}
            />
            <Statistic
              title='总收益率'
              value={`${currentSpotUserAssets.earnRate || 0}%`}
              sign='plus'
            />
          </View>
          <View style={[styles.firm_detail_assets_bar]}>
            <Statistic
              title='总收益'
              value={`¥${currentSpotUserAssets.earnRate || 0}`}
              sign='minus'
              width='30%'
            />
            <Statistic
              title='交易胜率'
              value={`${currentSpotUserAssets.winRate || 0}%`}
              sign='plus'
              width='30%'
            />
            <Statistic
              title='交易时常'
              value={`${currentSpotUserAssets.duration || 0}天`}
              width='30%'
            />
          </View>
          <View style={[styles.firm_detail_assets_bar]}>
            <Statistic
              title='周收益'
              value={`¥${currentSpotUserAssets.weeklyEarning || 0}`}
              sign='plus'
              width='30%'
            />
            <Statistic
              title='周收益率'
              value={`${currentSpotUserAssets.weeklyWinRate || 0}%`}
              sign='plus'
              width='30%'
            />
            <Statistic
              title='交易频次'
              value={`${currentSpotUserAssets.frequency || 0}次/周`}
              width='30%'
            />
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
            <Text style={{ color: CONST.N96, marginRight: 16 }}>总收益</Text>
            <View style={{ flexDirection: 'row', marginRight: 24 }}>
              <Text style={{ color: CONST.N96 }}>最高：</Text>
              <Text style={{ color: CONST.N32 }}>¥8564.40</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: CONST.N96 }}>最低：</Text>
              <Text style={{ color: CONST.N32 }}>-¥8564.40</Text>
            </View>
          </View>
          {this.renderChart()}
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <View style={{ flexDirection: 'row', paddingVertical: 16 }}>
            <Text style={{ color: CONST.N96, marginRight: 16 }}>收益率</Text>
            <View style={{ flexDirection: 'row', marginRight: 24 }}>
              <Text style={{ color: CONST.N96 }}>最高：</Text>
              <Text style={{ color: CONST.N32 }}>¥8564.40</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: CONST.N96 }}>最低：</Text>
              <Text style={{ color: CONST.N32 }}>-¥8564.40</Text>
            </View>
          </View>
          {this.renderChart()}
        </View>
      </SafeAreaView>
    )
  }
}
