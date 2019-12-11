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
  componentDidMount = () => {
    this.onRefresh()
  }

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
        <Text style={{ marginLeft: 16 }}>{item.nickName}</Text>
      </View>
      <Icon name='right' />
    </TouchableOpacity>
  )

  onRefresh = () => {
    const { getSubscriptions } = this.props.UserStore
    getSubscriptions(10, 0)
  }

  onEndReached = () => {
    console.log('onEndReached')
  }

  render() {
    const { loading, subscriptions } = this.props.UserStore
    return (
      <View style={[styles.page_box]}>
        <FlatList
          data={subscriptions}
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
