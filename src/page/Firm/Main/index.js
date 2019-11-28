import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {Tabs, Icon} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../../store/actions/user';

import * as constant from '../../../style/constant';
import styles, {screenHeight, screenWidth} from '../../../style';

import Spot from './Spot';
import Contract from './Contract';
import Subscription from './Subscription';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class FirmMain extends Component {
  renderTabBar = tabProps => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {tabProps.tabs.map((tab, i) => (
        // change the style to fit your needs
        <TouchableOpacity
          activeOpacity={0.9}
          key={tab.key || i}
          style={{
            marginHorizontal: 16,
            paddingVertical: 8,
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
    const tabs = [{title: '现货'}, {title: '合约'}, {title: '订阅'}];
    return (
      <View style={[styles.page_box, {backgroundColor: '#fafafa'}]}>
        <SafeAreaView style={{flex: 1}}>
          <Tabs
            tabs={tabs}
            styles={{
              topTabBarSplitLine: {
                borderBottomWidth: 0,
              },
            }}
            renderTabBar={tabProps => this.renderTabBar(tabProps)}>
            <Spot />
            <Contract />
            <Subscription />
          </Tabs>
        </SafeAreaView>
      </View>
    );
  }
}
