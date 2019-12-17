import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity } from 'react-native'
import { TextareaItem } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('FirmStore')
@observer
export default class NewActivity extends Component {
  state = {
    param_textarea: '',
  }

  onSubmit = () => {
    const { postNewActivity } = this.props.FirmStore
    const { param_textarea } = this.state
    postNewActivity(param_textarea)
  }

  onChange = value => {
    this.setState()
  }

  render() {
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View style={{ padding: 16, paddingLeft: 24, paddingRight: 24 }}>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>
            发布你的动态吧～
          </Text>
          <View style={{ position: 'relative' }}>
            <TextareaItem
              style={[styles.api_access_input]}
              placeholder='请输入'
              rows={5}
              last
              onChange={this.onChange}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nickname_sticky_btn]}
          onPress={this.onSubmit}
        >
          <Text
            style={{
              color: CONST.N0,
              textAlign: 'center',
              fontSize: 18,
            }}
          >
            确认发布
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
