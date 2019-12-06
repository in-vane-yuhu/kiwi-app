import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../style/constant'
import styles from '../../style'

export default class Markets extends Component {
  render() {
    return (
      <View
        style={[
          styles.page_box,
          { justifyContent: 'space-evenly', alignItems: 'center' },
        ]}
      >
        <Icon name='smile' size={160} />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: CONST.N96,
          }}
        >
          敬请期待
        </Text>
      </View>
    )
  }
}
