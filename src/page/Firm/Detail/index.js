import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Tabs, Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Assets from './Assets'
import Position from './Position'
import Operation from './Operation'
import Activity from './Activity'
import Avatar from '../../../components/Avatar'

import avatar from '../../../assets/image/ai.jpg'
import binance_n from '../../../assets/image/binance_n.png'
import binance from '../../../assets/image/binance.png'
import bitmex_n from '../../../assets/image/bitmex_n.png'
import bitmex from '../../../assets/image/bitmex.png'
import huobi_n from '../../../assets/image/huobi_n.png'
import huobi from '../../../assets/image/huobi.png'
import okex_n from '../../../assets/image/okex_n.png'
import okex from '../../../assets/image/okex.png'

const info = {
  subscription: {
    subscribed: false,
    price: 0,
  },
  lever: {
    type: false,
    times: '空2.1倍',
  },
}
const tabs = [
  { title: '资产' },
  { title: '持仓' },
  { title: '操作' },
  { title: '动态' },
]

export default class FirmDetail extends Component {
  state = {
    favorite: false,
    logos: [
      { name: 'Binance', selected: true, logo: binance, logo_n: binance_n },
      { name: 'Huobi', selected: false, logo: huobi, logo_n: huobi_n },
      { name: 'BitMEX', selected: false, logo: bitmex, logo_n: bitmex_n },
      { name: 'OKEx', selected: false, logo: okex, logo_n: okex_n },
    ],
  }

  enumSubscription = subscription => {
    let content = ''
    if (subscription.subscribed) {
      content = '已订阅'
    } else {
      content =
        subscription.price === 0 ? '免费订阅' : `${subscription.price}A币/月`
    }
    return content
  }

  setColor = item => (item.subscription.subscribed ? CONST.N200 : CONST.PRIMARY)

  renderTabBar = tabProps => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {tabProps.tabs.map((tab, i) => (
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

  renderUserInfo = () => (
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
      <TouchableOpacity
        onPress={this.onSubscription}
        style={[styles.firm_subscription, { borderColor: this.setColor(info) }]}
      >
        <Text style={{ color: this.setColor(info) }}>
          {this.enumSubscription(info.subscription)}
        </Text>
      </TouchableOpacity>
    </View>
  )

  onClickFavorite = () => {
    this.setState({ favorite: !this.state.favorite })
  }

  onSelectPlatform = idx => {
    let temp = this.state.logos
    temp.map((item, index) => (item.selected = index === idx ? true : false))
    this.setState({ logos: temp })
  }

  render() {
    const { logos } = this.state
    return (
      <View style={[styles.page_box]}>
        <ScrollView>
          {this.renderUserInfo()}
          <View style={[styles.border_bottom, styles.firm_detail_exs]}>
            {logos.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ alignItems: 'center' }}
                onPress={() => this.onSelectPlatform(index)}
              >
                <Avatar
                  source={item.selected ? item.logo : item.logo_n}
                  size={50}
                />
                <Text style={{ marginTop: 8 }}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <Tabs
              tabs={tabs}
              initialPage={0}
              style={{ flex: 1 }}
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
        </ScrollView>
      </View>
    )
  }
}
