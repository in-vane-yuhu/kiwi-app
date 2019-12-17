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

import * as CONST from '../../style/constant'
import styles from '../../style'

import Avatar from '../../components/Avatar'

import avatar from '../../assets/image/ai.jpg'

const LinearGradientOptions = {
  colors: ['#252c44', '#465173', '#4a5478'],
  start: { x: 0.6, y: 0.9 },
  end: { x: 0.4, y: 0.1 },
  style: [styles.mine_linearGradient],
}
const list = [
  [
    { title: '订阅管理', icon: 'contacts', id: 'sub' },
    { title: '我的钱包', icon: 'wallet', id: 'wallet' },
    { title: '实盘接入', icon: 'bank', id: 'access' },
    { title: '实盘设置', icon: 'tool', id: 'firmSet' },
  ],
  [
    { title: '账户设置', icon: 'setting', id: 'account' },
    { title: 'VIP中心', icon: 'crown', id: 'vip' },
    { title: '邀请好友', icon: 'user-add', id: 'invite' },
    { title: '联系客服', icon: 'phone', id: 'service' },
  ],
]

@inject('UserStore', 'FirmStore')
@observer
export default class Mine extends Component {
  componentDidMount = async () => {
    const { getUserInfo, getCounts } = this.props.UserStore
    getUserInfo()
    getCounts()
  }

  navigate = id => {
    if (id === 'sub') {
      Actions.sub()
    }
    if (id === 'wallet') {
      Actions.wallet()
    }
    if (id === 'access') {
      Actions.access()
    }
    if (id === 'firmSet') {
      Actions.firmSet()
    }
    if (id === 'account') {
      Actions.account()
    }
    if (id === 'service') {
      Actions.service()
    }
    if (id === 'favor') {
      Actions.favor()
    }
    if (id === 'fans') {
      Actions.fans()
    }
    if (id === 'homepage') {
      const { getUser } = this.props.FirmStore
      const { userInfo } = this.props.UserStore
      getUser(userInfo.id)
      Actions.homepage()
    }
  }

  renderUserInfo = () => {
    const { userInfo } = this.props.UserStore
    return (
      <View style={[styles.mine_card_box]}>
        <Avatar id={userInfo.id} size={60} />
        <View style={[styles.mine_card_left]}>
          <Text
            style={[styles.mine_nickname]}
          >{`昵称：${userInfo.nickName}`}</Text>
          <TouchableOpacity
            style={[styles.mine_userinfo_btn]}
            onPress={() => this.navigate('homepage')}
          >
            <Text style={{ color: CONST.N0 }}>个人主页</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderBar = () => {
    const { counts } = this.props.UserStore
    return (
      <View style={[styles.mine_grid_box]}>
        {counts.map((item, index) => (
          <Fragment key={index}>
            <TouchableOpacity
              style={[styles.mine_bar]}
              onPress={() => this.navigate(item.id)}
            >
              <Text style={[styles.mine_bar_item]}>{item.count}</Text>
              <Text style={[styles.mine_grid_desc]}>{item.title}</Text>
            </TouchableOpacity>
            {index !== 2 && <View style={[styles.mine_grid_divider]} />}
          </Fragment>
        ))}
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={[styles.page_box]}>
        <LinearGradient {...LinearGradientOptions}>
          <SafeAreaView>
            {this.renderUserInfo()}
            {this.renderBar()}
          </SafeAreaView>
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
                    { borderBottomWidth: childrenIndex === 3 ? 0 : 1 },
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
