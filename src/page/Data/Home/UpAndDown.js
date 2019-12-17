import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const x = [
  -11,
  -10,
  -9,
  -8,
  -7,
  -6,
  -5,
  -4,
  -3,
  -2,
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
]
@inject('DataStore')
@observer
export default class UpAndDown extends Component {
  state = {
    data: [],
  }

  componentDidMount = async () => {
    this.refreshChart()
  }

  refreshChart = async () => {
    const { getUpAndDown } = this.props.DataStore
    const chartData = await getUpAndDown()
    this.setState({
      data: chartData,
    })
  }

  render() {
    const { option, data } = this.state
    const { upAndDowns } = this.props.DataStore
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
            上涨：<Text style={{ color: CONST.GREEN }}>{upAndDowns.ups}</Text>
          </Text>
          <Text style={{ marginLeft: 32 }}>
            下跌：<Text style={{ color: CONST.RED }}>{upAndDowns.downs}</Text>
          </Text>
        </View>
        <View>
          <VictoryChart padding={{ top: 40, right: 40, bottom: 32, left: 16 }}>
            <VictoryBar
              style={{
                data: {
                  fill: ({ datum }) => (datum.x > 0 ? CONST.GREEN : CONST.RED),
                },
                labels: {
                  fill: ({ datum }) => (datum.x > 0 ? CONST.GREEN : CONST.RED),
                },
              }}
              data={data}
              alignment='middle'
              categories={{ x: x }}
              labels={({ datum }) => datum.y}
            />
            <VictoryAxis
              style={{ axis: { stroke: null } }}
              tickValues={x.map(item => (item % 2 === 0 ? item : null))}
            />
          </VictoryChart>
        </View>
      </View>
    )
  }
}
