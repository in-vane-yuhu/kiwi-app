import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import styles from '../../../style'

import Avatar from '../../../components/Avatar'
import Empty from '../../../components/Empty'

import avatar from '../../../assets/image/ai.jpg'

@inject('UserStore')
@observer
export default class Subscription extends Component {
  navigateToUserInfo = () => {
    Actions.homepage()
  }

  renderItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={[styles.sub_list_box]}
      onPress={this.navigateToUserInfo}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Avatar source={avatar} size={40} />
        <Text style={{ marginLeft: 16 }}>一个用户</Text>
      </View>
      <Icon name='right' />
    </TouchableOpacity>
  )

  onRefresh = () => {
    console.log('getSpotList')
  }

  onEndReached = () => {
    console.log('onEndReached')
  }

  render() {
    const { loading } = this.props.UserStore
    const sub_list = [1, 1, 1, 1, 1]
    return (
      <View style={[styles.page_box]}>
        <FlatList
          data={sub_list}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={[styles.border_bottom]} />}
          onEndReachedThreshold={0}
          ListEmptyComponent={<Empty />}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          refreshing={loading}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
        />
      </View>
    )
  }
}
