import React, { Component } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { Icon, Checkbox } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import styles from '../../../style'
import * as CONST from '../../../style/constant'

class Security extends Component {
  state = {
    checked: 'email',
  }

  onCheckEmail = ({ target: { checked } }) => {
    this.setState({ checked: 'email' })
  }

  onCheckGoogle = ({ target: { checked } }) => {
    this.setState({ checked: 'google' })
  }

  onPress = () => {
    Actions.pop()
  }

  render() {
    const { checked } = this.state
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View style={[styles.safe_box]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='mail' size={26} />
            <Text style={{ marginLeft: 16 }}>验证码将发送到您的邮箱</Text>
          </View>
          <Checkbox
            style={{ color: CONST.PRIMARY }}
            checked={checked === 'email'}
            onChange={this.onCheckEmail}
          />
        </View>
        <View style={[styles.safe_box]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name='google' size={26} />
            <Text style={{ marginLeft: 16 }}>使用谷歌验证器</Text>
          </View>
          <Checkbox
            style={{ color: CONST.PRIMARY }}
            checked={checked === 'google'}
            onChange={this.onCheckGoogle}
          />
        </View>
        <TouchableOpacity
          style={[styles.nickname_sticky_btn, { marginTop: 40 }]}
          onPress={this.onPress}
        >
          <Text style={{ color: CONST.N0, alignSelf: 'center', fontSize: 18 }}>
            保存
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

export default Security
