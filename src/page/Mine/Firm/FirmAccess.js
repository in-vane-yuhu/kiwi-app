import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity} from 'react-native';
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
export default class FirmAccess extends Component {
  navigateToApiAccess = () => {
    Actions.apiAccess();
  };

  render() {
    const sub_list = [
      {token: 'OKEx', accessed: false},
      {token: 'Bitmex', accessed: false},
      {token: 'Binance', accessed: true},
      {token: 'Huobi', accessed: false},
    ];
    return (
      <View style={[styles.page_box, {paddingTop: 16}]}>
        {sub_list.map((item, index) => (
          <TouchableOpacity
            style={[styles.sub_list_box]}
            key={index}
            onPress={this.navigateToApiAccess}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>一个用户</Text>
              {item.accessed && (
                <View style={[styles.firm_access_tag_box]}>
                  <Text style={[styles.firm_access_tag_text]}>已接入</Text>
                </View>
              )}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  marginRight: 8,
                  color: item.accessed ? '#000' : constant.text_gray,
                }}>
                {item.accessed ? '解除绑定' : '未接入'}
              </Text>
              <Icon name="right" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
