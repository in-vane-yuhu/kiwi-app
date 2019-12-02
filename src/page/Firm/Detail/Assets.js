import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Tabs} from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';
import {Echarts, echarts} from 'react-native-secharts';

import UserAction from '../../../store/actions/user';

import * as constant from '../../../style/constant';
import styles, {screenHeight, screenWidth} from '../../../style';

import Statistic from '../../../components/Statistic';

const lineColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  {offset: 0, color: constant.primary_color},
  {offset: 1, color: '#fff'},
]);

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class Assets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      option: {
        tooltip: {
          trigger: 'axis',
          position: function(pt) {
            return [pt[0], '10%'];
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            show: false,
            lineStyle: {
              color: '#969696',
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: {
              color: '#969696',
            },
          },
          axisTick: {
            show: false,
          },
        },
        color: lineColor,
        series: [
          {
            data: [830, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {},
          },
        ],
        grid: {x2: 20, y: 10},
      },
      flag: false,
    };
    this.echart = React.createRef();
  }

  onPress = e => {
    console.log(e);
  };

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
    const {option} = this.state;
    const tabs = [{title: '总收益'}, {title: '收益率'}];
    return (
      <View style={[styles.page_box]}>
        <ScrollView>
          <View>
            <View
              style={[styles.border_bottom, styles.firm_detail_assets_title]}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>账户资产</Text>
            </View>
            <View
              style={[
                styles.border_bottom,
                styles.firm_detail_assets_total_bar,
              ]}>
              <Statistic title="总资产" value="¥10000" />
              <Statistic title="总收益率" value="+95.00%" sign="plus" />
            </View>
            <View style={[styles.firm_detail_assets_bar]}>
              <Statistic
                title="总收益"
                value="-¥1000"
                sign="minus"
                width="30%"
              />
              <Statistic
                title="交易胜率"
                value="3.00%"
                sign="plus"
                width="30%"
              />
              <Statistic title="交易时常" value="22天" width="30%" />
            </View>
            <View style={[styles.firm_detail_assets_bar]}>
              <Statistic
                title="周收益"
                value="+¥10000"
                sign="plus"
                width="30%"
              />
              <Statistic
                title="周收益率"
                value="3.00%"
                sign="plus"
                width="30%"
              />
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
              <View style={{marginHorizontal: 16}}>
                <View style={{flexDirection: 'row', paddingVertical: 16}}>
                  <View style={{flexDirection: 'row', marginRight: 24}}>
                    <Text style={{color: constant.text_gray}}>最高：</Text>
                    <Text style={{color: constant.text_dark}}>¥8564.40</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: constant.text_gray}}>最低：</Text>
                    <Text style={{color: constant.text_dark}}>-¥8564.40</Text>
                  </View>
                </View>
                <Echarts
                  ref={this.echart}
                  option={option}
                  height={200}
                  onPress={this.onPress}
                />
              </View>
              <View style={{marginHorizontal: 16}}>
                <View style={{flexDirection: 'row', paddingVertical: 16}}>
                  <View style={{flexDirection: 'row', marginRight: 24}}>
                    <Text style={{color: constant.text_gray}}>最高：</Text>
                    <Text style={{color: constant.text_dark}}>¥8564.40</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: constant.text_gray}}>最低：</Text>
                    <Text style={{color: constant.text_dark}}>-¥8564.40</Text>
                  </View>
                </View>
                <Echarts
                  ref={this.echart}
                  option={option}
                  height={200}
                  onPress={this.onPress}
                />
              </View>
            </Tabs>
          </View>
        </ScrollView>
      </View>
    );
  }
}
