import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
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
import okex_n from '../../../assets/image/okex_n.png'
import okex from '../../../assets/image/okex.png'

const tabs = [
  { title: '资产' },
  { title: '持仓' },
  { title: '操作' },
  { title: '动态' },
]

@inject('FirmStore')
@observer
export default class FirmDetail extends Component {
  state = {
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

  renderUserInfo = () => {
    const { currentUser } = this.props.FirmStore
    return (
      <View style={[styles.border_bottom, styles.firm_avatar_bar]}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar id={currentUser.id} size={50} />
          <View style={{ marginLeft: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 16 }}>{currentUser.nickName}</Text>
              <TouchableOpacity onPress={this.onClickFavorite}>
                <Icon
                  name='star'
                  color={currentUser.followed && CONST.PRIMARY}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 8, color: CONST.N96 }}>
              {currentUser.introduction}
            </Text>
          </View>
        </View>
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
      </View>
    )
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
