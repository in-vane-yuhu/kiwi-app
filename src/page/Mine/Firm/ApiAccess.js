import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Toast } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('FirmStore')
@observer
export default class ApiAccess extends Component {
  state = {
    param_key: '',
    param_secret: '',
    param_passphrase: '',
  }

  setAccessKey = param_key => {
    this.setState({ param_key })
  }

  setSecretKey = param_secret => {
    this.setState({ param_secret })
  }

  setPassphrase = param_passphrase => {
    this.setState({ param_passphrase })
  }

  checkNull = () => {
    const { param_key, param_secret, param_passphrase } = this.state
    if (!param_key) {
      Toast.info('请填写Access Key')
      return
    }
    if (!param_secret) {
      Toast.info('请填写Secret Key')
      return
    }
    if (!param_passphrase) {
      Toast.info('请填写Passphrase')
      return
    }
    this.onSubmit()
  }

  onSubmit = () => {
    const { param_key, param_secret, param_passphrase } = this.state
    const { accessApi } = this.props.FirmStore
    accessApi(param_key, param_secret, param_passphrase)
  }

  render() {
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View style={{ padding: 24 }}>
          <TextInput
            style={[styles.api_access_input]}
            placeholder='请输入您的Access Key'
            onChangeText={this.setAccessKey}
          />
          <TextInput
            style={[styles.api_access_input]}
            placeholder='请输入您的Secret Key'
            onChangeText={this.setSecretKey}
          />
          <TextInput
            style={[styles.api_access_input]}
            placeholder='请输入Passphrase'
            onChangeText={this.setPassphrase}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginBottom: 8, color: CONST.N96 }}>
            1.实盘的API只需只读权限
          </Text>
          <Text style={{ marginBottom: 24, color: CONST.N96 }}>
            2.请妥善保存好API密钥等信息，不要向任何人透露该信息
          </Text>
          <TouchableOpacity style={{ marginBottom: 24 }}>
            <Text style={{ color: CONST.PRIMARY }}>查看教程</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.api_access_sticky_btn]}
            onPress={this.checkNull}
          >
            <Text style={{ color: CONST.N0 }}>授权接入</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
