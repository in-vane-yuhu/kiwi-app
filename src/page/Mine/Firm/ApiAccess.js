import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../../style/constant'
import styles, { screenHeight, screenWidth } from '../../../style'

export default class ApiAccess extends Component {
  render() {
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View style={{ padding: 24 }}>
          <TextInput
            style={[styles.api_access_input]}
            placeholder='请输入您的Access Key'
          />
          <TextInput
            style={[styles.api_access_input]}
            placeholder='请输入您的Secret Key'
          />
          <TextInput
            style={[styles.api_access_input]}
            placeholder='请输入Passphrase'
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ marginBottom: 8, color: constant.text_gray }}>
            1.实盘的API只需只读权限
          </Text>
          <Text style={{ marginBottom: 24, color: constant.text_gray }}>
            2.请妥善保存好API密钥等信息，不要向任何人透露该信息
          </Text>
          <TouchableOpacity style={{ marginBottom: 24 }}>
            <Text style={{ color: constant.primary_color }}>查看教程</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.api_access_sticky_btn]}>
            <Text style={{ textAlign: 'center', color: constant.text_white }}>
              授权接入
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
