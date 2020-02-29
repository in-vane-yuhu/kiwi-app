import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { Toast } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'
import { getData } from '../../../utils/AsyncStorage'
import { FormattedMessage, injectIntl } from 'react-intl'

import styles from '../../../style'

import HudexGlobal from '../../../assets/image/HudexGlobal.png'

@inject('AccountStore')
@observer
@injectIntl
class Login extends Component {
  state = {
    param_email: '',
    param_pwd: '',
  }

  setParamEmail = text => {
    this.setState({ param_email: text })
  }

  setParamPwd = text => {
    this.setState({ param_pwd: text })
  }

  checkForm = () => {
    const { param_email, param_pwd } = this.state
    const { login } = this.props.AccountStore
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
    if (!param_pwd) {
      Toast.fail(formatMessage({ id: 'required_password' }), 1)
      return
    }
    login(param_email, param_pwd)
  }

  doLogin = () => {
    const { login } = this.props.UserStore
    const { param_phone, param_code } = this.state

    login(param_phone, param_code)
  }

  navigateToRegister = () => {
    Actions.register()
  }

  navigateToForgot = () => {
    Actions.forgot()
  }

  render() {
    const { formatMessage } = this.props.intl
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.page_box, { alignItems: 'center' }]}>
          <Image source={HudexGlobal} style={[styles.login_logo]} />

          <TextInput
            placeholder={formatMessage({ id: 'email' })}
            style={[styles.login_ipt]}
            onChangeText={this.setParamEmail}
            defaultValue={getData('email')}
          />
          <TextInput
            placeholder={formatMessage({ id: 'password' })}
            style={[styles.login_ipt]}
            onChangeText={this.setParamPwd}
            secureTextEntry={true}
          />

          <TouchableOpacity style={[styles.login_btn]} onPress={this.checkForm}>
            <Text style={[styles.login_btn_text]}>
              <FormattedMessage id='login' />
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '60%',
            }}
          >
            <TouchableOpacity
              style={{ marginTop: 24 }}
              onPress={this.navigateToRegister}
            >
              <Text style={{ color: '#f8b500' }}>
                <FormattedMessage id='noID' />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 24 }}
              onPress={this.navigateToForgot}
            >
              <Text style={{ color: '#f8b500' }}>
                <FormattedMessage id='forgot' />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Login
