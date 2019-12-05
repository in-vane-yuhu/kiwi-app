import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../style/constant'
import styles, { screenHeight, screenWidth } from '../../style'

export default class Markets extends Component {
  render() {
    return (
      <View style={[styles.page_box]}>
        <Text>Markets</Text>
      </View>
    )
  }
}
