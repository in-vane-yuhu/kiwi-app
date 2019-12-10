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
import avatar2 from '../../../assets/image/ai2.jpg'
import avatar3 from '../../../assets/image/ai3.jpg'
import binance from '../../../assets/image/binance.png'
import bitmex from '../../../assets/image/bitmex.png'
import huobi from '../../../assets/image/huobi.png'
import okex from '../../../assets/image/okex.png'

const data = [
  {
    avatar: avatar,
    name: 'in_vane',
    intro: '我就看着你们抄底嘻嘻嘻',
    subscription: { subscribed: false, price: 0 },
    lever: { type: false, times: '2.1' },
    platform: [
      { name: 'BitMEX', logo: bitmex },
      { name: 'Huobi', logo: huobi },
      { name: 'OKEx', logo: okex },
    ],
  },
  {
    avatar: avatar2,
    name: 'luuuyn',
    intro: '楼上咋这样呢',
    subscription: { subscribed: true, price: 0 },
    lever: { type: true, times: '2.1' },
    platform: [
      { name: 'Binance', logo: binance },
      { name: 'OKEx', logo: okex },
    ],
  },
  {
    avatar: avatar3,
    name: 'Murin',
    intro: '别跟我说什么爆仓平仓，老夫就是一把梭！',
    subscription: { subscribed: false, price: 49 },
    lever: { type: true, times: '2.1' },
    platform: [
      { name: 'Binance', logo: binance },
      { name: 'BitMEX', logo: bitmex },
    ],
  },
]
const statistic = [
  { title: '总资产', amount: '¥100000' },
  { title: '总收益率', amount: '+100.00%', sign: true },
  { title: '总收益额', amount: '+¥100000', sign: true },
]

@inject('FirmStore')
@observer
export default class Contract extends Component {
  navigateToContractDetail = () => {
    Actions.firmDetail()
  }

  onSubscription = () => {
    console.log('onSubscription')
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

  renderLabel = item => (
    <View
      style={[
        styles.firm_contract_list_label_box,
        { backgroundColor: item.lever.type ? CONST.GREEN : CONST.RED },
      ]}
    >
      <Text style={[styles.firm_contract_list_label]}>{`${
        item.lever.type ? '空' : '多'
      }${item.lever.times}倍`}</Text>
    </View>
  )

  renderItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={{ backgroundColor: CONST.N0 }}
      onPress={this.navigateToContractDetail}
    >
      {this.renderLabel(item)}
      <View style={[styles.border_bottom, styles.firm_avatar_bar]}>
        <View style={{ flexDirection: 'row', width: '75%' }}>
          <Avatar source={item.avatar} size={50} />
          <View style={{ marginLeft: 16, width: '80%' }}>
            <Text>{item.name}</Text>
            <Text style={{ marginTop: 8, color: CONST.N96 }}>{item.intro}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={this.onSubscription}
          style={[
            styles.firm_subscription,
            { borderColor: this.setColor(item) },
          ]}
        >
          <Text style={{ color: this.setColor(item) }}>
            {this.enumSubscription(item.subscription)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.firm_statistic]}>
        {statistic.map((item, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: CONST.N96 }}>{item.title}</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginTop: 4,
                color: item.sign ? CONST.GREEN : CONST.red || CONST.N32,
              }}
            >
              {item.amount}
            </Text>
          </View>
        ))}
      </View>
      <View style={[styles.firm_logos_box]}>
        {item.platform.map((platform, index) => (
          <View key={index} style={[styles.firm_logos_item]}>
            <Avatar source={platform.logo} size={16} />
            <Text style={{ fontSize: 10 }}>{platform.name}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  )

  onRefresh = () => {
    console.log('getSpotList')
  }

  onEndReached = () => {
    console.log('onEndReached')
  }

  render() {
    const { loading } = this.props.FirmStore
    return (
      <View style={[styles.page_box]}>
        <FlatList
          data={data}
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
