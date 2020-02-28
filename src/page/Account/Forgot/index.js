import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { Toast } from '@ant-design/react-native'
import styles from '../../../style'

import HudexGlobal from '../../../assets/image/HudexGlobal.png'

@inject('AccountStore')
@observer
class Forgot extends Component {
  state = {
    param_email: '',
    param_captcha: '',
    param_pwd: '',
    param_cfm: '',
    disabled: false,
    deadline: 0,
  }

  setParamEmail = text => {
    this.setState({ param_email: text })
  }

  setParamCaptcha = text => {
    this.setState({ param_captcha: text })
  }

  setParamPwd = text => {
    this.setState({ param_pwd: text })
  }

  setParamCfm = text => {
    this.setState({ param_cfm: text })
  }

  getCaptcha = () => {
    const { forgotPassword } = this.props.AccountStore
    const { param_email } = this.state
    const regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    if (!param_email) {
      Toast.fail('请输入邮箱', 1)
      return
    }
    if (!regEmail.test(param_email)) {
      Toast.fail('邮箱格式不正确', 1)
      return
    }
    this.setState({ disabled: true, deadline: 59 })
    this.countdown()
    forgotPassword(param_email)
  }

  startCount = () => {
    this.setState({ disabled: true, deadline: 59 })
    this.countdown()
  }

  countdown = () => {
    let counter = setInterval(() => {
      if (this.state.deadline > 0) {
        this.setState({ deadline: this.state.deadline - 1 })
      } else {
        clearInterval(counter)
        this.setState({ disabled: false })
      }
    }, 1000)
  }

  checkForm = () => {
    const { param_email, param_captcha, param_pwd, param_cfm } = this.state
    const { resetPwdByToken } = this.props.AccountStore
    const regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    if (!param_email) {
      Toast.fail('请输入邮箱', 1)
      return
    }
    if (!regEmail.test(param_email)) {
      Toast.fail('邮箱格式不正确', 1)
      return
    }
    if (!param_captcha) {
      Toast.fail('请输入验证码', 1)
      return
    }
    if (!param_pwd) {
      Toast.fail('请输入新密码', 1)
      return
    }
    if (!param_cfm) {
      Toast.fail('请再次输入密码', 1)
      return
    }
    if (param_pwd !== param_cfm) {
      Toast.fail('两次密码不一致', 1)
      return
    }
    resetPwdByToken(param_email, param_pwd, param_captcha)
  }

  render() {
    const { disabled, deadline } = this.state
    return (
      <View style={[styles.page_box, { alignItems: 'center' }]}>
        <Image source={HudexGlobal} style={[styles.login_logo]} />

        <TextInput
          placeholder='邮箱'
          style={[styles.login_ipt]}
          onChangeText={this.setParamEmail}
        />
        <View style={[styles.login_captchaBox]}>
          <TextInput
            placeholder='邮箱验证码'
            style={[styles.login_ipt]}
            onChangeText={this.setParamCaptcha}
            keyboardType='number-pad'
          />
          <TouchableOpacity
            style={[styles.login_captcha]}
            onPress={this.getCaptcha}
            disabled={disabled}
          >
            <Text style={{ color: disabled ? '#c8c8c8' : '#f8b500' }}>
              {disabled ? `${deadline}s` : '发送'}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder='密码'
          style={[styles.login_ipt]}
          onChangeText={this.setParamPwd}
          secureTextEntry={true}
        />
        <TextInput
          placeholder='确认密码'
          style={[styles.login_ipt]}
          onChangeText={this.setParamCfm}
          secureTextEntry={true}
        />

        <TouchableOpacity style={[styles.login_btn]} onPress={this.checkForm}>
          <Text style={[styles.login_btn_text]}>提交</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Forgot
