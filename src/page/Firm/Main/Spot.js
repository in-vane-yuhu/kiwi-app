import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../../style/constant'
import styles, { screenHeight, screenWidth } from '../../../style'

import avatar from '../../../assets/image/ai.jpg'

const data = [
  {
    subscription: {
      subscribed: false,
      price: 0,
    },
    lever: {
      type: false,
      times: '2.1',
    },
  },
  {
    subscription: {
      subscribed: true,
      price: 0,
    },
    lever: {
      type: true,
      times: '2.1',
    },
  },
  {
    subscription: {
      subscribed: false,
      price: 49,
    },
    lever: {
      type: true,
      times: '2.1',
    },
  },
]
const statistic = [
  { title: '总资产', amount: '¥100000' },
  { title: '总收益率', amount: '+100.00%', sign: true },
  { title: '总收益额', amount: '+¥100000', sign: true },
]
const exchange = [
  { name: 'Huobi', logo: 'github' },
  { name: 'BIANCE', logo: 'codepen-circle' },
]

export default class Spot extends Component {
  navigateToFirmDetail = () => {
    console.log('navigateToFirmDetail')
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.firm_search_box]}>
          <View style={[styles.firm_search, { width: '75%' }]}>
            <Icon name='search' color={constant.primary_color} />
            <TextInput
              placeholder='搜索字段'
              style={{ marginLeft: 8, width: '100%' }}
            />
          </View>
          <TouchableOpacity style={[styles.firm_search]}>
            <Icon name='sort-ascending' color={constant.primary_color} />
            <Text>排序</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ backgroundColor: '#fff' }}
              onPress={this.navigateToFirmDetail}
            >
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
                <TouchableOpacity onPress={this.onSubscription}>
                  <Text
                    style={[
                      styles.firm_subscription,
                      item.subscription.subscribed
                        ? styles.firm_subscription_gray
                        : styles.firm_subscription_primary,
                    ]}
                  >
                    {this.enumSubscription(item.subscription)}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.firm_statistic]}>
                {statistic.map((item, index) => (
                  <View key={index} style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: constant.text_gray }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: 4,
                        color: item.sign
                          ? constant.text_green
                          : constant.red || constant.text_dark,
                      }}
                    >
                      {item.amount}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={[styles.firm_logos_box]}>
                {exchange.map((item, index) => (
                  <View key={index} style={[styles.firm_logos_item]}>
                    <Icon name={item.logo} size={12} />
                    <Text style={{ fontSize: 10 }}>{item.name}</Text>
                  </View>
                ))}
              </View>
              <View style={{ backgroundColor: '#f0f0f0', height: 8 }} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    )
  }
}
