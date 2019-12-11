import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { Tabs, Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Assets from '../../Firm/Detail/Assets'
import Position from '../../Firm/Detail/Position'
import Operation from '../../Firm/Detail/Operation'
import Activity from '../../Firm/Detail/Activity'
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

const tabs = [
  { title: '资产' },
  { title: '持仓' },
  { title: '操作' },
  { title: '动态' },
]
const firm_tab = [{ title: '现货' }, { title: '合约' }]

export default class Homepage extends Component {
  state = {
    favorite: false,
    logos: [
      { name: 'Binance', selected: true, logo: binance, logo_n: binance_n },
      { name: 'Huobi', selected: false, logo: huobi, logo_n: huobi_n },
      { name: 'BitMEX', selected: false, logo: bitmex, logo_n: bitmex_n },
      { name: 'OKEx', selected: false, logo: okex, logo_n: okex_n },
    ],
  }

  onClickFavorite = () => {
    this.setState({ favorite: !this.state.favorite })
  }

  onSelectPlatform = idx => {
    let temp = this.state.logos
    temp.map((item, index) => (item.selected = index === idx ? true : false))
    this.setState({ logos: temp })
  }

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

  render() {
    const { logos } = this.state
    return (
      <View style={[styles.page_box]}>
        <ScrollView>
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
                  {logos.map((platform, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{ alignItems: 'center' }}
                      onPress={() => this.onSelectPlatform(idx)}
                    >
                      <Avatar
                        source={
                          platform.selected ? platform.logo : platform.logo_n
                        }
                        size={50}
                      />
                      <Text style={{ marginTop: 8 }}>{platform.name}</Text>
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
        </ScrollView>
      </View>
    )
  }
}
