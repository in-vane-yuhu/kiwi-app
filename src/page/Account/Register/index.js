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
import { Toast, Checkbox } from '@ant-design/react-native'
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
    param_cfm: '',
    isChecked: false,
  }

  setParamEmail = text => {
    this.setState({ param_email: text })
  }

  setParamPwd = text => {
    this.setState({ param_pwd: text })
  }

  setParamCfm = text => {
    this.setState({ param_cfm: text })
  }

  setChecked = ({ target: { checked } }) => {
    this.setState({ isChecked: checked })
  }

  checkForm = () => {
    const { formatMessage } = this.props.intl
    const { param_email, param_pwd, param_cfm } = this.state
    const regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    if (!param_email) {
      Toast.fail(formatMessage({ id: 'place_email' }), 1)
      return
    }
    if (!regEmail.test(param_email)) {
      Toast.fail(formatMessage({ id: 'reg_email' }), 1)
      return
    }
    if (!param_pwd) {
      Toast.fail(formatMessage({ id: 'place_pwd' }), 1)
      return
    }
    if (param_pwd.length < 8 || param_pwd.length > 20) {
      Toast.fail(formatMessage({ id: 'reg_pwd' }), 1)
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
    this.doRegister()
  }

  doRegister = () => {
    const { register } = this.props.AccountStore
    const { param_email, param_pwd } = this.state

    register(param_email, param_pwd)
  }

  render() {
    const { isChecked } = this.state
    const { formatMessage } = this.props.intl
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={[styles.page_box, { alignItems: 'center' }]}>
          <Image source={HudexGlobal} style={[styles.login_logo]} />

          <TextInput
            placeholder={formatMessage({ id: 'email' })}
            style={[styles.login_ipt]}
            onChangeText={this.setParamEmail}
          />
          <TextInput
            placeholder={formatMessage({ id: 'password' })}
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
          <View style={{ marginTop: 24 }}>
            <Checkbox
              checked={isChecked}
              onChange={this.setChecked}
              style={{ color: '#f8b500' }}
            >
              <Text>
                <FormattedMessage id='agree' />
              </Text>
            </Checkbox>
          </View>

          <TouchableOpacity
            style={{
              width: '70%',
              height: 40,
              borderRadius: 20,
              marginTop: 64,
              backgroundColor: isChecked ? '#f8b500' : '#c8c8c8',
              justifyContent: 'center',
            }}
            onPress={this.checkForm}
            disabled={!isChecked}
          >
            <Text style={[styles.login_btn_text]}>
              <FormattedMessage id='next' />
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Login
