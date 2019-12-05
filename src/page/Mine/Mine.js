import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'
import LinearGradient from 'react-native-linear-gradient'

import * as constant from '../../style/constant'
import styles from '../../style'

import avatar from '../../assets/image/ai.jpg'

@inject('UserStore')
@observer
export default class Mine extends Component {
  componentDidMount = async () => {
    const { getUserInfo } = this.props.UserStore
    getUserInfo()
  }

  navigateToSubscription = () => {
    Actions.sub()
  }

  navigateToFavorite = () => {
    Actions.favor()
  }

  navigateToFans = () => {
    Actions.fans()
  }

  navigateToWallet = () => {
    Actions.wallet()
  }

  navigateToFirmAccess = () => {
    Actions.firmAccess()
  }

  navigateToFirmSet = () => {
    Actions.firmSet()
  }

  navigateToAccount = () => {
    Actions.account()
  }

  navigateToService = () => {
    Actions.service()
  }

  navigateToHomepage = () => {
    Actions.homepage()
  }

  render() {
    const { userInfo } = this.props.UserStore
    return (
      <View style={[styles.page_box]}>
        <LinearGradient
          colors={['#252c44', '#465173', '#4a5478']}
          start={{ x: 0.6, y: 0.9 }}
          end={{ x: 0.4, y: 0.1 }}
          style={[styles.mine_linearGradient]}
        >
          <SafeAreaView>
            <View style={{ padding: 24, flexDirection: 'row' }}>
              <Image source={avatar} style={[styles.mine_avatar]} />
              <View style={{ marginLeft: 16, paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ color: constant.text_white, fontSize: 20 }}>
                  {`昵称：${userInfo.nickName}`}
                </Text>
                <TouchableOpacity
                  style={[styles.mine_userinfo_btn]}
                  onPress={this.navigateToHomepage}
                >
                  <Text
                    style={{ color: constant.text_white }}
                  >{`个人主页 >`}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.mine_grid_box]}>
              <TouchableOpacity
                style={{ flexGrow: 1, alignItems: 'center' }}
                onPress={this.navigateToSubscription}
              >
                <Text style={{ color: constant.text_white, fontSize: 20 }}>
                  1
                </Text>
                <Text style={[styles.mine_grid_desc]}>订阅</Text>
              </TouchableOpacity>
              <View style={[styles.mine_grid_divider]} />
              <TouchableOpacity
                style={{ flexGrow: 1, alignItems: 'center' }}
                onPress={this.navigateToFavorite}
              >
                <Text style={{ color: constant.text_white, fontSize: 20 }}>
                  14
                </Text>
                <Text style={[styles.mine_grid_desc]}>收藏</Text>
              </TouchableOpacity>
              <View style={[styles.mine_grid_divider]} />
              <TouchableOpacity
                style={{ flexGrow: 1, alignItems: 'center' }}
                onPress={this.navigateToFans}
              >
                <Text style={{ color: constant.text_white, fontSize: 20 }}>
                  4
                </Text>
                <Text style={[styles.mine_grid_desc]}>粉丝</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </LinearGradient>
        <View>
          <View style={{ padding: 16, paddingBottom: 8 }}>
            <TouchableOpacity
              style={[styles.mine_list_line]}
              onPress={this.navigateToSubscription}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='contacts' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>订阅管理</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mine_list_line]}
              onPress={this.navigateToWallet}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='wallet' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>我的钱包</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mine_list_line]}
              onPress={this.navigateToFirmAccess}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='bank' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>实盘接入</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mine_list_line, { borderBottomWidth: 0 }]}
              onPress={this.navigateToFirmSet}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='tool' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>实盘设置</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 10, backgroundColor: '#eee' }} />
        <View>
          <View style={{ padding: 16, paddingTop: 8, paddingBottom: 8 }}>
            <TouchableOpacity
              style={[styles.mine_list_line]}
              onPress={this.navigateToAccount}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='setting' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>账户设置</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mine_list_line]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='crown' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>VIP中心</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mine_list_line]}
              onPress={this.test}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='user-add' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>邀请好友</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.mine_list_line, { borderBottomWidth: 0 }]}
              onPress={this.navigateToService}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='phone' color={constant.icon_black} />
                <Text style={{ fontSize: 16, marginLeft: 16 }}>联系客服</Text>
              </View>
              <View>
                <Icon name='right' />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ height: 10, backgroundColor: '#eee' }} />
        </View>
      </View>
    )
  }
}
