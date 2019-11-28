import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Icon, TextareaItem} from '@ant-design/react-native';
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
  state = {
    param_textarea: '',
    param_length: 0,
  };

  onChange = value => {
    if (value.length > 30) {
      return;
    }
    this.setState({
      param_textarea: value,
      param_length: value.length,
    });
  };

  render() {
    const {param_textarea, param_length} = this.state;

    return (
      <View style={[styles.page_box, {justifyContent: 'space-between'}]}>
        <View style={{padding: 16, paddingLeft: 24, paddingRight: 24}}>
          <Text style={{fontSize: 16, marginBottom: 16}}>
            用一句话来介绍自己吧！
          </Text>
          <View style={{position: 'relative'}}>
            <TextareaItem
              style={[styles.api_access_input]}
              placeholder="请输入"
              rows={5}
              last
              value={param_textarea}
              onChange={this.onChange}
            />
            <Text style={[styles.intro_length]}>{`${param_length}/30`}</Text>
          </View>
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
