import React, { Component } from 'react'
import { Text, View } from 'react-native'

import * as CONST from '../../style/constant'

export default class Nomore extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 16 }}>
        <Text style={{ color: CONST.N96 }}>没有更多了</Text>
      </View>
    )
  }
}
