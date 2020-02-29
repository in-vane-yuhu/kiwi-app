import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { Toast } from '@ant-design/react-native'
import styles from '../../../style'
import { injectIntl } from 'react-intl'

import HudexGlobal from '../../../assets/image/HudexGlobal.png'

@inject('AccountStore')
@observer
@injectIntl
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
    const { formatMessage } = this.props.intl
    const { param_email } = this.state
    const regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    if (!param_email) {
      Toast.fail(formatMessage({ id: 'place_email' }), 1)
      return
    }
    if (!regEmail.test(param_email)) {
      Toast.fail(formatMessage({ id: 'reg_email' }), 1)
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
    const { formatMessage } = this.props.intl
    const regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    if (!param_email) {
      Toast.fail(formatMessage({ id: 'required_email' }), 1)
      return
    }
    if (!regEmail.test(param_email)) {
      Toast.fail(formatMessage({ id: 'reg_email' }), 1)
      return
    }
    if (!param_captcha) {
      Toast.fail(formatMessage({ id: 'required_captcha' }), 1)
      return
    }
    if (!param_pwd) {
      Toast.fail(formatMessage({ id: 'required_newpwd' }), 1)
      return
    }
    if (!param_cfm) {
      Toast.fail(formatMessage({ id: 'required_confirm' }), 1)
      return
    }
    if (param_pwd !== param_cfm) {
      Toast.fail(formatMessage({ id: 'reg_confirm' }), 1)
      return
    }
    resetPwdByToken(param_email, param_pwd, param_captcha)
  }

  render() {
    const { disabled, deadline } = this.state
    const { formatMessage } = this.props.intl
    return (
      <View style={[styles.page_box, { alignItems: 'center' }]}>
        <Image source={HudexGlobal} style={[styles.login_logo]} />

        <TextInput
          placeholder={formatMessage({ id: 'email' })}
          style={[styles.login_ipt]}
          onChangeText={this.setParamEmail}
        />
        <View style={[styles.login_captchaBox]}>
          <TextInput
            placeholder={formatMessage({ id: 'placeholder_captcha' })}
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
              {disabled ? `${deadline}s` : formatMessage({ id: 'send' })}
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder={formatMessage({ id: 'newPwd' })}
          style={[styles.login_ipt]}
          onChangeText={this.setParamPwd}
          secureTextEntry={true}
        />
        <TextInput
          placeholder={formatMessage({ id: 'confirm' })}
          style={[styles.login_ipt]}
          onChangeText={this.setParamCfm}
          secureTextEntry={true}
        />

        <TouchableOpacity style={[styles.login_btn]} onPress={this.checkForm}>
          <Text style={[styles.login_btn_text]}>
            {formatMessage({ id: 'submit' })}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Forgot
