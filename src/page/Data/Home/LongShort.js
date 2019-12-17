import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('DataStore')
@observer
export default class LongShort extends Component {
  componentDidMount = () => {
    const { getBattle } = this.props.DataStore
    getBattle()
  }

  render() {
    const { longshort } = this.props.DataStore
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>全网多空走势</Text>
        </View>
        <View key={0} style={{ paddingTop: 16 }}>
          <Text style={[styles.data_bar_title]}>OKEX</Text>
          <View style={{ flexDirection: 'row', paddingTop: 4 }}>
            <View
              style={[
                styles.data_bar_green,
                { width: `${longshort.longOKexRate}%` },
              ]}
            >
              <Text
                style={{ color: CONST.N0 }}
              >{`多：${longshort.longOKexRate}%`}</Text>
            </View>
            <View
              style={[
                styles.data_bar_red,
                { width: `${longshort.shortOKexRate}%` },
              ]}
            >
              <Text
                style={{ color: CONST.N0 }}
              >{`空：${longshort.shortOKexRate}%`}</Text>
            </View>
          </View>
        </View>
        <View key={1} style={{ paddingTop: 16 }}>
          <Text style={[styles.data_bar_title]}>Huobi</Text>
          <View style={{ flexDirection: 'row', paddingTop: 4 }}>
            <View
              style={[
                styles.data_bar_green,
                { width: `${longshort.longHuobiRate}%` },
              ]}
            >
              <Text
                style={{ color: CONST.N0 }}
              >{`多：${longshort.longHuobiRate}%`}</Text>
            </View>
            <View
              style={[
                styles.data_bar_red,
                { width: `${longshort.shortHuobiRate}%` },
              ]}
            >
              <Text
                style={{ color: CONST.N0 }}
              >{`空：${longshort.shortHuobiRate}%`}</Text>
            </View>
          </View>
        </View>
        <View key={2} style={{ paddingTop: 16 }}>
          <Text style={[styles.data_bar_title]}>BitMex</Text>
          <View style={{ flexDirection: 'row', paddingTop: 4 }}>
            <View
              style={[
                styles.data_bar_green,
                { width: `${longshort.longBitMexRate}%` },
              ]}
            >
              <Text
                style={{ color: CONST.N0 }}
              >{`多：${longshort.longBitMexRate}%`}</Text>
            </View>
            <View
              style={[
                styles.data_bar_red,
                { width: `${longshort.shortBitMexRate}%` },
              ]}
            >
              <Text
                style={{ color: CONST.N0 }}
              >{`空：${longshort.shortBitMexRate}%`}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
