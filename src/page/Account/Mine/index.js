import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'
import { clear } from '../../../utils/AsyncStorage'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Avatar from '../../../components/Avatar'

const LinearGradientOptions = {
  colors: ['#F8B500', '#FDD45A', '#F9D973'],
  start: { x: 0.6, y: 0.9 },
  end: { x: 0.4, y: 0.1 },
  style: [styles.mine_linearGradient],
}
const list = [
  [
    { title: '用户信息', icon: 'contacts', id: 'profile' },
    { title: '安全设置', icon: 'safety', id: 'security' },
    { title: 'API设置', icon: 'api', id: 'api' },
  ],
  [
    { title: '我的财务', icon: 'account-book', id: 'funds' },
    { title: '我的委托', icon: 'book', id: 'orders' },
  ],
  [{ title: '退出登录', icon: 'logout', id: 'logout' }],
]

@inject('AccountStore')
@observer
class Mine extends Component {
  componentDidMount = () => {
    const { getUser } = this.props.AccountStore
    getUser()
  }

  navigate = id => {
    switch (id) {
      case 'profile':
        Actions.profile()
        break
      case 'security':
        Actions.security()
        break
      case 'api':
        Actions.api()
        break
      case 'funds':
        Actions.funds()
        break
      case 'orders':
        Actions.orders()
        break
      case 'logout':
        clear()
        Actions.reset('login')
        break

      default:
        break
    }
  }

  renderUserInfo = () => {
    const { user } = this.props.AccountStore
    return (
      <View style={[styles.mine_card_box]}>
        <Avatar id={user.email} size={60} />
        <View style={[styles.mine_card_left]}>
          <Text style={[styles.mine_nickname]}>昵称：{user.nickname}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={[styles.page_box]}>
        <LinearGradient {...LinearGradientOptions}>
          <SafeAreaView>{this.renderUserInfo()}</SafeAreaView>
        </LinearGradient>
        {list.map((item, index) => (
          <Fragment key={index}>
            <View style={[styles.mine_list_box]}>
              {item.map((children, childrenIndex) => (
                <TouchableOpacity
                  key={childrenIndex}
                  onPress={() => this.navigate(children.id)}
                  style={[
                    styles.mine_list_line,
                    {
                      borderBottomWidth:
                        childrenIndex === item.length - 1 ? 0 : 1,
                    },
                  ]}
                >
                  <View style={[styles.mine_list_lin_box]}>
                    <Icon name={children.icon} color={CONST.N255} />
                    <Text style={[styles.mine_list_line_text]}>
                      {children.title}
                    </Text>
                  </View>
                  <Icon name='right' />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.divider} />
          </Fragment>
        ))}
      </ScrollView>
    )
  }
}

export default Mine
