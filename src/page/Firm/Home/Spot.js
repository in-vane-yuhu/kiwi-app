import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Avatar from '../../../components/Avatar'
import Empty from '../../../components/Empty'

import avatar from '../../../assets/image/ai.jpg'
import okex from '../../../assets/image/okex.png'

const statistic = ['总资产', '总收益率', '总收益额']

@inject('FirmStore')
@observer
export default class Spot extends Component {
  componentDidMount = () => {
    this.onRefresh()
  }

  navigateToFirmDetail = item => {
    const { getUser } = this.props.FirmStore
    getUser(item.id)
    Actions.firmDetail()
  }

  onSubscription = item => {
    const { doSubscribe, doUnsubscribe } = this.props.FirmStore
    if (item.subscribed) {
      doUnsubscribe(item.id)
    } else {
      doSubscribe(item.id)
    }
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

  enumStatistic = (item, index) => {
    switch (index) {
      case 0:
        return `¥${item.totalProperty || 0}`
      case 1:
        return `${item.totalEarnRate || 0}%`
      case 2:
        return `¥${item.totalEarnValue || 0}`

      default:
        return 0
    }
  }

  setColor = subscribed => (subscribed ? CONST.N200 : CONST.PRIMARY)

  renderSearch = () => (
    <View style={[styles.firm_search_box]}>
      <View style={[styles.firm_search, { width: '75%' }]}>
        <Icon name='search' color={CONST.PRIMARY} />
        <TextInput placeholder='搜索字段' style={[styles.firm_search_ipt]} />
      </View>
      <TouchableOpacity style={[styles.firm_search]}>
        <Icon name='sort-ascending' color={CONST.PRIMARY} />
        <Text>排序</Text>
      </TouchableOpacity>
    </View>
  )

  renderItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={{ backgroundColor: CONST.N0 }}
      onPress={() => this.navigateToFirmDetail(item)}
    >
      <View style={[styles.border_bottom, styles.firm_avatar_bar]}>
        <View style={{ flexDirection: 'row', width: '75%' }}>
          <Avatar id={item.id} size={50} />
          <View style={{ marginLeft: 16, width: '80%' }}>
            <Text>{item.nickName}</Text>
            <Text style={{ marginTop: 8, color: CONST.N96 }}>
              {item.introduction}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onSubscription(item)}
          style={[
            styles.firm_subscription,
            { borderColor: this.setColor(item.subscribed) },
          ]}
        >
          <Text style={{ color: this.setColor(item.subscribed) }}>
            {this.enumSubscription(item)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.firm_statistic]}>
        {statistic.map((child, idx) => (
          <View key={idx} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: CONST.N96 }}>{child}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 4,
                color: item.sign ? CONST.GREEN : CONST.RED || CONST.N32,
              }}
            >
              {this.enumStatistic(item, idx)}
            </Text>
          </View>
        ))}
      </View>
      <View style={[styles.firm_logos_box]}>
        <View key={index} style={[styles.firm_logos_item]}>
          <Avatar source={okex} size={16} />
          <Text style={{ fontSize: 10 }}>OKEx</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  onRefresh = () => {
    const { getSpotList } = this.props.FirmStore
    getSpotList(10, 0)
  }

  onEndReached = () => {
    console.log('onEndReached')
  }

  render() {
    const { loading, spotList } = this.props.FirmStore
    return (
      <View style={[styles.page_box]}>
        <FlatList
          data={spotList}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={[styles.divider]} />}
          onEndReachedThreshold={0}
          ListEmptyComponent={<Empty />}
          ListHeaderComponent={this.renderSearch()}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          refreshing={loading}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
        />
      </View>
    )
  }
}
