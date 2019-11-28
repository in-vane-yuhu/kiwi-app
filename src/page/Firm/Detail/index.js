import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Tabs} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../../store/actions/user';

import * as constant from '../../../style/constant';
import styles, {screenHeight, screenWidth} from '../../../style';

import Assets from './Assets';
import Position from './Position';
import Operation from './Operation';
import Activity from './Activity';

import avatar from '../../../assets/image/ai.jpg';
import avatar2 from '../../../assets/image/ai2.jpg';
import avatar3 from '../../../assets/image/ai3.jpg';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class FirmDetail extends Component {
  renderTabBar = tabProps => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {tabProps.tabs.map((tab, i) => (
        // change the style to fit your needs
        <TouchableOpacity
          activeOpacity={0.9}
          key={tab.key || i}
          style={{
            marginHorizontal: 16,
            paddingVertical: 10,
            borderColor: constant.primary_color,
            borderStyle: 'solid',
            borderBottomWidth: tabProps.activeTab === i ? 1 : 0,
          }}
          onPress={() => {
            const {goToTab, onTabClick} = tabProps;
            onTabClick && onTabClick(tabs[i], i);
            goToTab && goToTab(i);
          }}>
          <Text
            style={{
              color:
                tabProps.activeTab === i
                  ? constant.primary_color
                  : constant.text_gray,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  render() {
    const logos = [
      {name: 'BINANCE', logo: avatar},
      {name: 'Huobi', logo: avatar2},
      {name: 'BitMex', logo: avatar3},
    ];
    const tabs = [
      {title: '资产'},
      {title: '持仓'},
      {title: '操作'},
      {title: '动态'},
    ];
    return (
      <View style={[styles.page_box]}>
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

        <View style={[styles.border_bottom, styles.firm_detail_exchanges]}>
          {logos.map((item, index) => (
            <TouchableOpacity key={index} style={{alignItems: 'center'}}>
              <Image
                source={item.logo}
                style={{height: 50, width: 50, borderRadius: 25}}
              />
              <Text style={{marginTop: 8}}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Tabs
          tabs={tabs}
          styles={{
            topTabBarSplitLine: {
              borderBottomWidth: 8,
              borderBottomColor: '#f0f0f0',
            },
          }}
          renderTabBar={tabProps => this.renderTabBar(tabProps)}>
          <Assets />
          <Position />
          <Operation />
          <Activity />
        </Tabs>
      </View>
    );
  }
}
