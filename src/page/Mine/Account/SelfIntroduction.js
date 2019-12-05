import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity } from 'react-native'
import { TextareaItem } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../../style/constant'
import styles from '../../../style'

@inject('UserStore')
@observer
export default class Nickname extends Component {
  state = {
    param_textarea: '',
    param_length: 0,
  }

  navigateBack = () => {
    Actions.pop()
  }

  onChange = value => {
    if (value.length > 30) {
      return
    }
    this.setState({
      param_textarea: value,
      param_length: value.length,
    })
  }

  render() {
    const { param_length } = this.state
    const { userInfo } = this.props.UserStore
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View style={{ padding: 16, paddingLeft: 24, paddingRight: 24 }}>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>
            用一句话来介绍自己吧！
          </Text>
          <View style={{ position: 'relative' }}>
            <TextareaItem
              style={[styles.api_access_input]}
              placeholder='请输入'
              rows={5}
              last
              defaultValue={userInfo.introduction}
              onChange={this.onChange}
            />
            <Text style={[styles.intro_length]}>{`${param_length}/30`}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nickname_sticky_btn]}
          onPress={this.navigateBack}
        >
          <Text
            style={{
              color: constant.text_white,
              textAlign: 'center',
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
