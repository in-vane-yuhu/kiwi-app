import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../../store/actions/user';

import * as constant from '../../../style/constant';
import styles, {screenHeight, screenWidth} from '../../../style';

import avatar from '../../../assets/image/ai.jpg';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class Contract extends Component {
  navigateToContractDetailÏ = () => {
    console.log('navigateToContractDetail');
    Actions.firmDetail();
  };

  onSubscription = () => {
    console.log('onSubscription');
  };

  render() {
    const data = [{}, {}, {}, {}];
    const statistic = [
      {title: '总资产', amount: '¥100000'},
      {title: '总收益率', amount: '+100.00%', sign: true},
      {title: '总收益额', amount: '+¥100000', sign: true},
    ];
    const exchange = [
      {name: 'Huobi', logo: 'github'},
      {name: 'BIANCE', logo: 'codepen-circle'},
    ];
    return (
      <View style={{flex: 1}}>
        <View style={[styles.firm_search_box]}>
          <View style={[styles.firm_search, {width: '75%'}]}>
            <Icon name="search" color={constant.primary_color} />
            <TextInput
              placeholder="搜索字段"
              style={{marginLeft: 8, width: '100%'}}
            />
          </View>
          <TouchableOpacity style={[styles.firm_search]}>
            <Icon name="sort-ascending" color={constant.primary_color} />
            <Text>排序</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{flex: 1}}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{backgroundColor: '#fff'}}
              onPress={this.navigateToContractDetailÏ}>
              <View style={[styles.border_bottom, styles.firm_avatar_bar]}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={avatar}
                    style={{height: 50, width: 50, borderRadius: 25}}
                  />
                  <View style={{marginLeft: 16}}>
                    <Text>in_vane</Text>
                    <Text style={{marginTop: 8, color: constant.text_gray}}>
                      我就看着你们抄底嘻嘻嘻~
                    </Text>
                  </View>
                </View>
                <TouchableOpacity onPress={this.onSubscription}>
                  <Text style={[styles.firm_subscription]}>免费订阅</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.firm_statistic]}>
                {statistic.map((item, index) => (
                  <View key={index} style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 12, color: constant.text_gray}}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 4,
                        color: item.sign
                          ? constant.text_green
                          : constant.red || constant.text_dark,
                      }}>
                      {item.amount}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={[styles.firm_logos_box]}>
                {exchange.map((item, index) => (
                  <View key={index} style={[styles.firm_logos_item]}>
                    <Icon name={item.logo} size={12} />
                    <Text style={{fontSize: 10}}>{item.name}</Text>
                  </View>
                ))}
              </View>
              <View style={{backgroundColor: '#f0f0f0', height: 8}} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
