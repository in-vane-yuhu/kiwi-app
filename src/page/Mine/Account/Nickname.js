import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('UserStore')
@observer
export default class Nickname extends Component {
  navigateBack = () => {
    Actions.pop()
  }

  render() {
    const { userInfo } = this.props.UserStore
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View style={{ padding: 16, paddingLeft: 24, paddingRight: 24 }}>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>
            设置一个让人印象深刻的昵称吧
          </Text>
          <TextInput
            style={[styles.api_access_input]}
            placeholder='请输入您的昵称'
            defaultValue={userInfo.nickName}
          />
        </View>

        <TouchableOpacity
          style={[styles.nickname_sticky_btn]}
          onPress={this.navigateBack}
        >
          <Text
            style={{
              color: CONST.N0,
              alignSelf: 'center',
              fontSize: 18,
            }}
          >
            确认保存
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
