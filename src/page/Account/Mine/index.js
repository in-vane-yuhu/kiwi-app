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
import { FormattedMessage } from 'react-intl'
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
    {
      title: <FormattedMessage id='userinfo' />,
      icon: 'contacts',
      id: 'profile',
    },
    {
      title: <FormattedMessage id='security' />,
      icon: 'safety',
      id: 'security',
    },
    { title: <FormattedMessage id='APISet' />, icon: 'api', id: 'api' },
  ],
  [
    {
      title: <FormattedMessage id='myFunds' />,
      icon: 'account-book',
      id: 'funds',
    },
    { title: <FormattedMessage id='myOrders' />, icon: 'book', id: 'orders' },
  ],
  [
    {
      title: <FormattedMessage id='language' />,
      icon: 'setting',
      id: 'language',
    },
    { title: <FormattedMessage id='logout' />, icon: 'logout', id: 'logout' },
  ],
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
      case 'language':
        Actions.language()
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
          <Text style={[styles.mine_nickname]}>
            <FormattedMessage id='nickname' />：{user.nickname}
          </Text>
        </View>
      </View>
    )
  }

  onSelectLanguage = value => {
    this.setState({ locale: value })
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
