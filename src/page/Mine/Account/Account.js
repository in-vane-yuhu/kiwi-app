import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Avatar from '../../../components/Avatar'

import avatar from '../../../assets/image/ai.jpg'

@inject('UserStore')
@observer
export default class Markets extends Component {
  componentDidMount = async () => {
    const { getUserInfo } = this.props.UserStore
    /* getUserInfo() */
  }

  navigateToNickname = () => {
    Actions.nickname()
  }

  navigateToIntro = () => {
    Actions.intro()
  }

  render() {
    const { userInfo } = this.props.UserStore
    return (
      <View style={[styles.page_box]}>
        <View style={{ padding: 16 }}>
          <View
            style={[
              styles.border_bottom,
              styles.account_avatar_box,
              { paddingTop: 8 },
            ]}
          >
            <Text style={{ fontSize: 16 }}>头像</Text>
            <Avatar source={avatar} size={50} />
          </View>

          <TouchableOpacity
            style={[styles.account_item_box]}
            onPress={this.navigateToNickname}
          >
            <View>
              <Text
                style={{ fontSize: 16 }}
              >{`昵称：${userInfo.nickName}`}</Text>
            </View>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>修改</Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.account_item_box]}
            onPress={this.navigateToIntro}
          >
            <View>
              <Text style={{ fontSize: 16 }}>
                个人介绍：
                <Text style={{ color: CONST.N96 }}>
                  {userInfo.introduction}
                </Text>
              </Text>
            </View>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>修改</Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>

          <View style={[styles.account_item_box]}>
            <View style={[styles.flex_row_center]}>
              <Text style={{ fontSize: 16 }}>绑定手机</Text>
              <View style={[styles.firm_access_tag_box]}>
                <Text style={[styles.firm_access_tag_text]}>已绑定</Text>
              </View>
            </View>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>
                159****3976
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.account_item_box,
              { borderBottomWidth: 0, paddingBottom: 8 },
            ]}
          >
            <View style={[styles.flex_row_center]}>
              <Text style={{ fontSize: 16 }}>KYC认证</Text>
              <View style={[styles.firm_access_tag_box]}>
                <Text style={[styles.firm_access_tag_text]}>已实名</Text>
              </View>
            </View>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>鱼**</Text>
            </View>
          </View>
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
              <Text style={{ color: CONST.N96, fontSize: 16 }}>
                简体中文
              </Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.account_item_box,
              { borderBottomWidth: 0, paddingBottom: 8 },
            ]}
          >
            <View>
              <Text style={{ fontSize: 16 }}>清理缓存</Text>
            </View>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>2.1M</Text>
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
              <Text style={{ fontSize: 16 }}>关于我们</Text>
            </View>
            <View style={[styles.flex_row_center]}>
              <Icon name='right' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.account_item_box]}>
            <View>
              <Text style={{ fontSize: 16 }}>当前版本：{`1.0.2`}</Text>
            </View>
            <View style={[styles.flex_row_center]}>
              <Text style={{ color: CONST.N96, fontSize: 16 }}>
                检查更新
              </Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
