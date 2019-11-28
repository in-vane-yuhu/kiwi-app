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
export default class ApiAccess extends Component {
  onChange = (type, index) => {
    const {change_firm_set} = this.props.userAction;
    const {
      firm_set_assets,
      firm_set_position,
      firm_set_operation,
    } = this.props.state.user;
    let data = '';
    switch (type) {
      case 'firm_set_assets':
        data = firm_set_assets;
        break;
      case 'firm_set_position':
        data = firm_set_position;
        break;
      case 'firm_set_operation':
        data = firm_set_operation;
        break;
      default:
        break;
    }

    change_firm_set(type, data, index);
  };

  render() {
    const {
      firm_set_assets,
      firm_set_position,
      firm_set_operation,
    } = this.props.state.user;
    return (
      <View
        style={[
          styles.page_box,
          {paddingLeft: 16, paddingRight: 16, paddingTop: 24},
        ]}>
        <View style={[styles.firm_set_item_box, {marginBottom: 24}]}>
          <Text style={{fontSize: 16}}>资产设置</Text>
          <View style={[styles.firm_set_radio_box]}>
            {firm_set_assets.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.onChange('firm_set_assets', index)}>
                <Icon
                  name={item.checked ? 'check-circle' : 'border'}
                  color={item.checked ? constant.primary_color : ''}
                />
                <Text style={{marginLeft: 5, color: constant.text_gray}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.firm_set_item_box, {marginBottom: 24}]}>
          <Text style={{fontSize: 16}}>持仓设置</Text>
          <View style={[styles.firm_set_radio_box]}>
            {firm_set_position.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.onChange('firm_set_position', index)}>
                <Icon
                  name={item.checked ? 'check-circle' : 'border'}
                  color={item.checked ? constant.primary_color : ''}
                />
                <Text style={{marginLeft: 5, color: constant.text_gray}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={[styles.firm_set_item_box, {marginBottom: 24}]}>
          <Text style={{fontSize: 16}}>操作设置</Text>
          <View style={[styles.firm_set_radio_box]}>
            {firm_set_operation.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => this.onChange('firm_set_operation', index)}>
                <Icon
                  name={item.checked ? 'check-circle' : 'border'}
                  color={item.checked ? constant.primary_color : ''}
                />
                <Text style={{marginLeft: 5, color: constant.text_gray}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }
}
