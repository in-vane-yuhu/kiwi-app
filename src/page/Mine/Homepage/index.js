import React, { Component, Fragment } from 'react'
import { Text, View, TouchableOpacity, Image, StatusBar } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../../style/constant'
import styles, { screenHeight, screenWidth } from '../../../style'

import Assets from '../../Firm/Detail/Assets'
import Position from '../../Firm/Detail/Position'
import Operation from '../../Firm/Detail/Operation'
import Activity from '../../Firm/Detail/Activity'

import avatar from '../../../assets/image/ai.jpg'
import avatar2 from '../../../assets/image/ai2.jpg'
import avatar3 from '../../../assets/image/ai3.jpg'

const logos = [
  { name: 'BINANCE', logo: avatar },
  { name: 'Huobi', logo: avatar2 },
  { name: 'BitMex', logo: avatar3 },
]
const tabs = [
  { title: '资产' },
  { title: '持仓' },
  { title: '操作' },
  { title: '动态' },
]
const firm_tab = [{ title: '现货' }, { title: '合约' }]

export default class Homepage extends Component {
  renderTabBar = tabProps => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            const { goToTab, onTabClick } = tabProps
            onTabClick && onTabClick(tabs[i], i)
            goToTab && goToTab(i)
          }}
        >
          <Text
            style={{
              color:
                tabProps.activeTab === i
                  ? constant.primary_color
                  : constant.text_gray,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  render() {
    return (
      <View style={[styles.page_box]}>
        <View style={[styles.border_bottom, styles.firm_avatar_bar]}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={avatar}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <View style={{ marginLeft: 16 }}>
              <Text>in_vane</Text>
              <Text style={{ marginTop: 8, color: constant.text_gray }}>
                我就看着你们抄底嘻嘻嘻~
              </Text>
            </View>
          </View>
          <View />
        </View>

        <Tabs
          tabs={firm_tab}
          initialPage={0}
          styles={{
            topTabBarSplitLine: {
              borderBottomWidth: 8,
              borderBottomColor: '#f0f0f0',
            },
          }}
          renderTabBar={tabProps => this.renderTabBar(tabProps)}
        >
          {firm_tab.map((item, index) => (
            <View key={index} style={{ flex: 1 }}>
              <View
                style={[styles.border_bottom, styles.firm_detail_exchanges]}
              >
                {logos.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ alignItems: 'center' }}
                  >
                    <Image
                      source={item.logo}
                      style={{ height: 50, width: 50, borderRadius: 25 }}
                    />
                    <Text style={{ marginTop: 8 }}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Tabs
                tabs={tabs}
                initialPage={0}
                styles={{
                  topTabBarSplitLine: {
                    borderBottomWidth: 8,
                    borderBottomColor: '#f0f0f0',
                  },
                }}
                renderTabBar={tabProps => this.renderTabBar(tabProps)}
              >
                <Assets />
                <Position />
                <Operation />
                <Activity />
              </Tabs>
            </View>
          ))}
        </Tabs>
      </View>
    )
  }
}
