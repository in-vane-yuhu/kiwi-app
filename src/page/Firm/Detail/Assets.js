import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {Tabs} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../../store/actions/user';

import * as constant from '../../../style/constant';
import styles, {screenHeight, screenWidth} from '../../../style';

import Statistic from '../../../components/Statistic';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class Assets extends Component {
  renderTabBar = tabProps => (
    <View style={[styles.border_bottom, styles.firm_detail_assets_tabs]}>
      <Text style={[styles.firm_detail_assets_tabs_title]}>收益走势</Text>
      {tabProps.tabs.map((tab, i) => (
        // change the style to fit your needs
        <TouchableOpacity
          activeOpacity={0.9}
          key={tab.key || i}
          style={{marginHorizontal: 16}}
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
    const tabs = [{title: '总收益'}, {title: '收益率'}];
    return (
      <View style={[styles.page_box]}>
        <View>
          <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>账户资产</Text>
          </View>
          <View
            style={[styles.border_bottom, styles.firm_detail_assets_total_bar]}>
            <Statistic title="总资产" value="¥10000" />
            <Statistic title="总收益率" value="+95.00%" sign="plus" />
          </View>
          <View style={[styles.firm_detail_assets_bar]}>
            <Statistic title="总收益" value="-¥1000" sign="minus" width="30%" />
            <Statistic title="交易胜率" value="3.00%" sign="plus" width="30%" />
            <Statistic title="交易时常" value="22天" width="30%" />
          </View>
          <View style={[styles.firm_detail_assets_bar]}>
            <Statistic title="周收益" value="+¥10000" sign="plus" width="30%" />
            <Statistic title="周收益率" value="3.00%" sign="plus" width="30%" />
            <Statistic title="交易频次" value="8次/周" width="30%" />
          </View>
          <View
            style={{height: 8, backgroundColor: '#f0f0f0', marginTop: 24}}
          />
        </View>

        <View style={{flex: 1}}>
          <Tabs
            tabs={tabs}
            styles={{
              topTabBarSplitLine: {borderBottomWidth: 0},
            }}
            renderTabBar={tabProps => this.renderTabBar(tabProps)}>
            <View>
              <Text>1</Text>
            </View>
            <View>
              <Text>2</Text>
            </View>
          </Tabs>
        </View>
      </View>
    );
  }
}
