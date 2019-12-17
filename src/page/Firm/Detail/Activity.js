import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Avatar from '../../../components/Avatar'

import avatar from '../../../assets/image/ai.jpg'

@inject('UserStore', 'FirmStore')
@observer
export default class Activity extends Component {
  state = { like: false }

  navigateToComments = () => {
    Actions.firmCmts()
  }

  navigateToPublish = () => {
    Actions.newAct()
  }

  setLikeStatus = () => {
    this.setState({
      like: !this.state.like,
    })
  }

  render() {
    const data = [
      {
        comments: [
          { name: '89年的网民', content: '这人在说啥玩意儿呢？' },
          { name: '精神小伙', content: '别爱我，没结果，除非花手摇过我。' },
        ],
      },
    ]
    const { like } = this.state
    const { currentUser } = this.props.FirmStore
    const { userInfo } = this.props.UserStore
    return (
      <View style={[styles.page_box]}>
        <View style={[styles.border_bottom, styles.firm_detail_act_title]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>最新动态</Text>
          {currentUser.id === userInfo.id && (
            <TouchableOpacity onPress={this.navigateToPublish}>
              <Icon name='plus-circle' color={CONST.PRIMARY} />
            </TouchableOpacity>
          )}
        </View>
        {data.length === 0 && (
          <View style={[styles.border_bottom, styles.firm_detail_act_none]}>
            <Text style={{ color: CONST.N96 }}>
              点击右上角“+”发布你的第一条动态吧～
            </Text>
          </View>
        )}
        {data.map((item, index) => (
          <View
            key={index}
            style={[styles.border_bottom, styles.firm_detail_act_item]}
          >
            <Avatar id={currentUser.id} size={40} />
            <View style={{ marginLeft: 16, width: '80%' }}>
              <Text style={{ lineHeight: 20 }}>{currentUser.nickName}</Text>
              <Text style={{ color: CONST.N96, lineHeight: 20 }}>
                2019-12-01 12:00
              </Text>
              <Text style={{ marginTop: 4, lineHeight: 20 }}>
                这是一条动态。一开始他们叫我发动态，我是拒绝的，因为不能你叫我发，我就发。首先我要试一下，诶你看我发完动态是这样的，别人发完动态也是这样的。不然别人一看，诶你发的动态加了特技，duang～的一下就很酷炫。
              </Text>
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  padding: 8,
                  marginTop: 16,
                }}
              >
                {item.comments.map((item, index) => (
                  <View
                    key={index}
                    style={{ flexDirection: 'row', marginBottom: 4 }}
                  >
                    <Text style={{ lineHeight: 20 }}>
                      {`${item.name}：`}
                      <Text style={{ color: CONST.N96 }}>{item.content}</Text>
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ flexDirection: 'row', marginTop: 16 }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={this.navigateToComments}
                >
                  <Icon name='message' />
                  <Text style={{ marginLeft: 8 }}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    marginLeft: '60%',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={this.setLikeStatus}
                >
                  <Icon name='like' color={like ? CONST.PRIMARY : null} />
                  <Text style={{ marginLeft: 8 }}>5</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
