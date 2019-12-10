import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { Toast } from '@ant-design/react-native'

import styles from '../../style'

import avatar from '../../assets/image/ai.jpg'

@inject('UserStore')
@observer
export default class Login extends Component {
  state = {
    param_phone: '',
    param_code: '',
    count: 60,
    disabled: false,
  }

  setParamPhone = text => {
    this.setState({ param_phone: text })
  }

  setParamCode = text => {
    this.setState({ param_code: text })
  }

  checkNull = value => {
    if (
      !value ||
      value === 'undefine' ||
      value === undefined ||
      value === null
    ) {
      return true
    }
    return false
  }

  checkPhoneNumberIsNull = () => {
    const { param_phone } = this.state
    if (this.checkNull(param_phone)) {
      Toast.fail('请输入手机号以获取验证码', 1)
    } else {
      this.getVerificationCode()
    }
  }

  getVerificationCode = () => {
    const { getSMS } = this.props.UserStore
    const { param_phone } = this.state
    getSMS(param_phone)
    this.setState({ disabled: true, count: 60 })
    this.startCount()
  }

  checkLoginParamIsNull = () => {
    const { param_phone, param_code } = this.state
    if (this.checkNull(param_phone)) {
      Toast.fail('请输入手机号', 1)
      return
    }
    if (this.checkNull(param_code)) {
      Toast.fail('请输入验证码', 1)
      return
    }
    this.doLogin()
  }

  doLogin = () => {
    const { login } = this.props.UserStore
    const { param_phone, param_code } = this.state

    login(param_phone, param_code)
  }

  startCount = () => {
    let counter = setInterval(() => {
      if (this.state.count === 0) {
        clearInterval(counter)
        this.setState({
          disabled: false,
        })
        return
      }
      this.setState({
        count: this.state.count - 1,
      })
    }, 1000)
  }

  render() {
    const { isSMSVerified } = this.props.UserStore
    const { count, disabled } = this.state
    return (
      <View style={[styles.page_box, { alignItems: 'center' }]}>
        <Image source={avatar} style={[styles.login_logo]} />

        <Text style={[styles.login_title]}>AI-Trade</Text>

        <TextInput
          placeholder='请输入您的手机号'
          style={[styles.login_ipt_phone]}
          onChangeText={this.setParamPhone}
        />

        <View style={[styles.login_ipt_code_box]}>
          <TextInput
            placeholder='请输入6位验证码'
            style={[styles.login_ipt_code]}
            onChangeText={this.setParamCode}
          />
          <TouchableOpacity
            style={[styles.login_ipt_code_btn]}
            onPress={this.checkPhoneNumberIsNull}
            disabled={disabled}
          >
            {!disabled && (
              <Text style={[styles.login_ipt_code_btn_text]}>获取验证码</Text>
            )}
            {disabled && (
              <Text style={[styles.login_ipt_code_btn_count]}>{count}</Text>
            )}
          </TouchableOpacity>
          {isSMSVerified && (
            <Text style={[styles.login_tip]}>验证码输入错误</Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.login_btn]}
          onPress={this.checkLoginParamIsNull}
        >
          <Text style={[styles.login_btn_text]}>登录/注册</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
