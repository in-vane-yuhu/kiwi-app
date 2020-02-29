import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'
import { FormattedMessage } from 'react-intl'

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
          <Text style={{ fontSize: 16 }}>
            <FormattedMessage id='avatar' />
          </Text>
          <Avatar id={user.email} size={50} />
        </View>

        <View style={{ height: 10, backgroundColor: CONST.N238 }} />

        <View style={{ padding: 16 }}>
          <View style={[styles.account_item_box]}>
            <Text style={{ fontSize: 16 }}>
              <FormattedMessage id='email' />：
              <Text style={{ color: CONST.N96 }}>{user.email}</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.account_item_box, { borderBottomWidth: 0 }]}
            onPress={this.navigateToNickname}
          >
            <Text style={{ fontSize: 16 }}>
              <FormattedMessage id='nickname' />：
              <Text style={{ color: CONST.N96 }}>{user.nickname}</Text>
            </Text>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>
                <FormattedMessage id='modify' />
              </Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 10, backgroundColor: CONST.N238 }} />
      </SafeAreaView>
    )
  }
}

export default Profile
