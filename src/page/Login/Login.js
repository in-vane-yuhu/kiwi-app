import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import {Toast} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../store/actions/user';

import * as Constant from '../../style/constant';
import styles, {screenWidth} from '../../style';

import avatar from '../../assets/image/ai.jpg';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class Login extends Component {
  state = {
    param_phone: '',
    param_code: '',
    isCodeValidated: false,
  };

  setParamName = text => {
    this.setState({
      param_phone: text,
    });
  };

  setParamCode = text => {
    this.setState({
      param_code: text,
    });
  };

  checkPhoneNumberIsNull = () => {
    const {param_phone} = this.state;
    if (
      !param_phone ||
      param_phone === 'undefine' ||
      param_phone === undefined ||
      param_phone === null
    ) {
      Toast.fail('请输入手机号以获取验证码');
    } else {
      this.getVerificationCode();
    }
  };

  getVerificationCode = () => {
    const {getCode} = this.props.userAction;
    const {param_phone} = this.state;

    getCode(param_phone);
  };

  checkLoginParamIsNull = () => {
    const {param_phone, param_code} = this.state;

    if (
      !param_phone ||
      param_phone === 'undefine' ||
      param_phone === undefined ||
      param_phone === null
    ) {
      Toast.fail('请输入手机号');
      return;
    }
    if (
      !param_code ||
      param_code === 'undefine' ||
      param_code === undefined ||
      param_code === null
    ) {
      Toast.fail('请输入验证码');
      return;
    }
    this.onLogin();
  };

  onLogin = () => {
    const {doLogin} = this.props.userAction;
    const {param_phone, param_code} = this.state;

    doLogin(param_phone, param_code);
    Actions.reset('switchTab');
  };

  render() {
    const {userInfo} = this.props.state.user;
    const {isCodeValidated} = this.state;
    return (
      <View style={[styles.page_box, {alignItems: 'center'}]}>
        <View style={{marginTop: 180}}>
          <Image source={avatar} style={[styles.login_logo]} />
        </View>
        <View>
          <Text style={[styles.login_title]}>AI-Trade</Text>
        </View>
        <View style={{width: '70%', marginTop: 40}}>
          <TextInput
            style={[styles.login_input_phone]}
            placeholder="请输入您的手机号"
            onChangeText={this.setParamName}
          />
        </View>
        <View style={{marginTop: 24, width: '70%'}}>
          <View style={[styles.login_input_code_box]}>
            <TextInput
              style={[styles.login_input_code_input]}
              placeholder="请输入6位验证码"
              onChangeText={this.setParamCode}
            />
            <TouchableOpacity
              style={{width: '30%'}}
              onPress={this.checkPhoneNumberIsNull}>
              <Text style={{textAlign: 'center', color: '#ff5e00'}}>
                获取验证码
              </Text>
            </TouchableOpacity>
          </View>
          {isCodeValidated && (
            <Text style={[styles.fe0000]}>验证码输入错误</Text>
          )}
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            style={{marginTop: 40, alignItems: 'center'}}
            onPress={this.checkLoginParamIsNull}>
            <View style={[styles.login_btn]}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                登录/注册
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
