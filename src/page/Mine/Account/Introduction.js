import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { TextareaItem } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('UserStore')
@observer
export default class Introduction extends Component {
  state = {
    param_textarea: '',
    param_length: 0,
  }

  componentDidMount = () => {
    const { userInfo } = this.props.UserStore
    this.setState({ param_textarea: userInfo.introduction })
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

  onPress = () => {
    const { modifyIntroduction } = this.props.UserStore
    const { param_textarea } = this.state
    modifyIntroduction(param_textarea)
  }

  render() {
    const { param_textarea, param_length } = this.state
    const { userInfo } = this.props.UserStore
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View style={{ padding: 16, paddingLeft: 24, paddingRight: 24 }}>
          <Text style={{ fontSize: 16, marginBottom: 16 }}>
            用一句话来介绍自己吧！
          </Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[styles.api_access_input]}
              placeholder='请输入'
              multiline={true}
              onChangeText={this.onChange}
              value={param_textarea}
              returnKeyType='done'
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={true}
            />
            <Text style={[styles.intro_length]}>{`${param_length ||
              userInfo.introduction.length}/30`}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.nickname_sticky_btn]}
          onPress={this.onPress}
        >
          <Text
            style={{
              color: CONST.N0,
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
