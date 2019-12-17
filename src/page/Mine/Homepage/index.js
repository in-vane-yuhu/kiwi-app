import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
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
import okex_n from '../../../assets/image/okex_n.png'
import okex from '../../../assets/image/okex.png'

const tabs = [
  { title: '资产' },
  { title: '持仓' },
  { title: '操作' },
  { title: '动态' },
]
const firm_tab = [{ title: '现货' }, { title: '合约' }]

@inject('UserStore', 'FirmStore')
@observer
export default class Homepage extends Component {
  state = {
    favorite: false,
    logos: [{ name: 'OKEx', selected: true, logo: okex, logo_n: okex_n }],
  }

  enumSubscription = item => {
    if (item.subscribed) {
      return '已订阅'
    }
    if (!item.subscribeCost) {
      return '免费订阅'
    }
    return `${item.subscribeCost}A币/月`
  }

  setColor = subscribed => (subscribed ? CONST.N200 : CONST.PRIMARY)

  onClickFavorite = () => {
    const { currentUser, doFavorite, doUnfavorite } = this.props.FirmStore
    currentUser.followed ? doUnfavorite() : doFavorite()
  }

  onSubscription = () => {
    const { doSubscribe, doUnsubscribe, currentUser } = this.props.FirmStore
    if (currentUser.subscribed) {
      doUnsubscribe(currentUser.id)
    } else {
      doSubscribe(currentUser.id)
    }
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
    const { userInfo } = this.props.UserStore
    const { currentUser } = this.props.FirmStore
    return (
      <View style={[styles.page_box]}>
        <ScrollView>
          <View style={[styles.border_bottom, styles.firm_avatar_bar]}>
            <View style={{ flexDirection: 'row' }}>
              <Avatar id={currentUser.id} size={50} />
              <View style={{ marginLeft: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>{currentUser.nickName}</Text>
                  {currentUser.id !== userInfo.id && (
                    <TouchableOpacity onPress={this.onClickFavorite}>
                      <Icon
                        name='star'
                        style={{ marginLeft: 16 }}
                        color={currentUser.followed && CONST.PRIMARY}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <Text style={{ marginTop: 8, color: CONST.N96 }}>
                  {currentUser.introduction}
                </Text>
              </View>
            </View>
            {currentUser.id !== userInfo.id && (
              <TouchableOpacity
                onPress={this.onSubscription}
                style={[
                  styles.firm_subscription,
                  { borderColor: this.setColor(currentUser.subscribed) },
                ]}
              >
                <Text style={{ color: this.setColor(currentUser.subscribed) }}>
                  {this.enumSubscription(currentUser)}
                </Text>
              </TouchableOpacity>
            )}
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
