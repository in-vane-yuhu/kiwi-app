import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Icon } from '@ant-design/react-native'

import styles from '../../../style'

import Avatar from '../../../components/Avatar'

import avatar from '../../../assets/image/ai.jpg'

export default class Subscription extends Component {
  render() {
    const sub_list = [1, 1, 1, 1, 1]
    return (
      <View style={[styles.page_box]}>
        {sub_list.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.sub_list_box]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar source={avatar} size={20} />
              <Text style={{ marginLeft: 16 }}>一个用户</Text>
            </View>
            <Icon name='right' />
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}
