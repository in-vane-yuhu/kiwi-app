import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../style/constant'

export default class Empty extends Component {
  render() {
    return (
      <View style={[styles.firm_empty_box]}>
        <Icon name='inbox' size={40} />
        <Text style={{ color: CONST.N200, marginTop: 8 }}>暂无数据</Text>
      </View>
    )
  }
}
