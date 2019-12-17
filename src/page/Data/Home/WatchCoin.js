import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Empty from '../../../components/Empty'

@inject('DataStore')
@observer
export default class WatchCoin extends Component {
  componentDidMount = () => {
    const { getMycoin } = this.props.DataStore
    getMycoin()
  }

  render() {
    const { data_attention } = this.props.DataStore
    return (
      <View style={[styles.data_box]}>
        <View style={[styles.data_title_box]}>
          <Text style={[styles.data_title_text]}>关注币种</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {data_attention.map((item, index) => (
            <View key={index} style={{ paddingTop: 16, width: '45%' }}>
              <Text style={{ color: CONST.N96 }}>{item.coin_name}</Text>
              <Text style={{ color: CONST.GREEN, fontSize: 16 }}>
                {`¥${item.coin_price}`}
              </Text>
            </View>
          ))}
        </View>
        {data_attention.length === 0 && <Empty />}
      </View>
    )
  }
}
