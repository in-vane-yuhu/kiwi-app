import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, Clipboard} from 'react-native';
import {Toast} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../store/actions/user';

import * as constant from '../../style/constant';
import styles, {screenHeight, screenWidth} from '../../style';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class Markets extends Component {
  onCopyWechatID = () => {
    Clipboard.setString('in_vane');
    Toast.success('已复制');
  };

  render() {
    return (
      <View style={[styles.page_box, {alignItems: 'center'}]}>
        <View
          style={[styles.service_card, {paddingLeft: 24, paddingRight: 24}]}>
          <View
            style={[
              styles.border_bottom,
              {alignItems: 'center', height: '75%', justifyContent: 'center'},
            ]}>
            <Text style={[styles.service_text]}>亲爱的用户</Text>
            <Text style={[styles.service_text]}>
              如果您有任何问题请添加客服微信
            </Text>
            <Text style={[styles.service_text]}>我们会尽快给您回复</Text>
          </View>
          <View style={[styles.service_wechat_box]}>
            <Text style={{fontSize: 16}}>微信号：in_vane</Text>
            <TouchableOpacity
              style={[styles.service_wechat_btn]}
              onPress={this.onCopyWechatID}>
              <Text style={[styles.service_wechat_btn_text]}>复制微信号</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
