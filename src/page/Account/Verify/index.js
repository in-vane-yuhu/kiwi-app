import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { Toast } from '@ant-design/react-native'

import styles from '../../../style'

import HudexGlobal from '../../../assets/image/HudexGlobal.png'

@inject('AccountStore')
@observer
class Verify extends Component {
  state = {
    param_captcha: '',
    disabled: false,
    deadline: 0,
  }

  componentDidMount = () => {
    this.startCount()
  }

  setParamCaptcha = text => {
    this.setState({ param_captcha: text })
  }

  checkForm = () => {
    const { param_captcha } = this.state
    const { verifyCaptcha } = this.props.AccountStore
    if (!param_captcha) {
      Toast.fail('请输入验证码', 1)
      return
    }
    verifyCaptcha(param_captcha)
  }

  getCode = () => {
    const { resendCaptcha } = this.props.AccountStore

    this.startCount()
    resendCaptcha()
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

  render() {
    const { disabled, deadline } = this.state
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.page_box, { alignItems: 'center' }]}>
          <Image source={HudexGlobal} style={[styles.login_logo]} />

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

          <TouchableOpacity style={[styles.login_btn]} onPress={this.checkForm}>
            <Text style={[styles.login_btn_text]}>注册</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Verify
