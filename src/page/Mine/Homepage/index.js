import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Tabs, Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Assets from '../../Firm/Detail/Assets'
import Position from '../../Firm/Detail/Position'
import Operation from '../../Firm/Detail/Operation'
import Activity from '../../Firm/Detail/Activity'
import Avatar from '../../../components/Avatar'

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
  state = { favorite: false }

  onClickFavorite = () => {
    this.setState({ favorite: !this.state.favorite })
  }

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
            borderColor: CONST.PRIMARY,
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
              color: tabProps.activeTab === i ? CONST.PRIMARY : CONST.N96,
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
            <Avatar source={avatar} size={50} />
            <View style={{ marginLeft: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>in_vane</Text>
                <TouchableOpacity onPress={this.onClickFavorite}>
                  <Icon
                    name='star'
                    style={{ marginLeft: 16 }}
                    color={this.state.favorite ? CONST.PRIMARY : null}
                  />
                </TouchableOpacity>
              </View>
              <Text style={{ marginTop: 8, color: CONST.N96 }}>
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
              <View style={[styles.border_bottom, styles.firm_detail_exs]}>
                {logos.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{ alignItems: 'center' }}
                  >
                    <Avatar source={item.logo} size={50} />
                    <Text style={{ marginTop: 8 }}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Tabs
                tabs={tabs}
                initialPage={2}
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
