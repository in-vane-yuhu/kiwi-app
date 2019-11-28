import React, {Component, Fragment} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
export default class Subscription extends Component {
  render() {
    const sub_list = [1, 1, 1, 1, 1];
    return (
      <View style={[styles.page_box, {paddingTop: 16}]}>
        {sub_list.map(item => (
          <View style={[styles.sub_list_box]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/image/ai.jpg')}
                style={[styles.sub_list_avatar]}
              />
              <Text style={{marginLeft: 16, fontSize: 18}}>一个用户</Text>
            </View>
            <View>
              <Icon name="right" />
            </View>
          </View>
        ))}
      </View>
    );
  }
}
