import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../../store/actions/user';

import * as constant from '../../../style/constant';
import styles, {screenHeight, screenWidth} from '../../../style';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class Nickname extends Component {
  render() {
    return (
      <View style={[styles.page_box, {justifyContent: 'space-between'}]}>
        <View style={{padding: 16, paddingLeft: 24, paddingRight: 24}}>
          <Text style={{fontSize: 16, marginBottom: 16}}>
            设置一个让人印象深刻的昵称吧
          </Text>
          <TextInput
            style={[styles.api_access_input]}
            placeholder="请输入您的昵称"
          />
        </View>

        <TouchableOpacity style={[styles.nickname_sticky_btn]}>
          <Text style={{textAlign: 'center', color: constant.text_white}}>
            确认保存
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
