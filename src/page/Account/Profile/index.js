import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Avatar from '../../../components/Avatar'

@inject('AccountStore')
@observer
class Profile extends Component {
  componentDidMount = () => {
    const { getUser } = this.props.AccountStore
    getUser()
  }

  navigateToNickname = () => {
    Actions.nickname()
  }

  navigateToIntro = () => {
    Actions.intro()
  }

  render() {
    const { user } = this.props.AccountStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View
          style={[
            styles.border_bottom,
            styles.account_avatar_box,
            { padding: 32 },
          ]}
        >
          <Text style={{ fontSize: 16 }}>头像</Text>
          <Avatar id={user.email} size={50} />
        </View>

        <View style={{ height: 10, backgroundColor: CONST.N238 }} />

        <View style={{ padding: 16 }}>
          <View style={[styles.account_item_box]}>
            <Text style={{ fontSize: 16 }}>
              邮箱：
              <Text style={{ color: CONST.N96 }}>{user.email}</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.account_item_box, { borderBottomWidth: 0 }]}
            onPress={this.navigateToNickname}
          >
            <Text style={{ fontSize: 16 }}>
              昵称：<Text style={{ color: CONST.N96 }}>{user.nickname}</Text>
            </Text>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>修改</Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 10, backgroundColor: CONST.N238 }} />

        <View style={{ padding: 16 }}>
          <TouchableOpacity
            style={[styles.account_item_box, { paddingTop: 8 }]}
          >
            <View>
              <Text style={{ fontSize: 16 }}>语言</Text>
            </View>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>简体中文</Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default Profile
