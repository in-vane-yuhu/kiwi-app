import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../../style/constant'
import styles, { screenHeight, screenWidth } from '../../../style'

import avatar from '../../../assets/image/ai.jpg'

export default class Activity extends Component {
  state = { like: false }

  navigateToComments = () => {
    Actions.firmComments()
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
          {
            name: '89年的网民',
            content: '这人在说啥玩意儿呢？onedayday的duangduangduang',
          },
          { name: '精神小伙', content: '别爱我，没结果，除非花手摇过我。' },
        ],
      },
    ]
    const { like } = this.state
    return (
      <View style={[styles.page_box]}>
        <View style={[styles.border_bottom, styles.firm_detail_activity_title]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>最新操作</Text>
          <TouchableOpacity>
            <Icon name='plus-circle' color={constant.primary_color} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          {data.length === 0 && (
            <View
              style={[styles.border_bottom, styles.firm_detail_activity_none]}
            >
              <Text style={{ color: constant.text_gray }}>
                点击右上角“+”发布你的第一条动态吧～
              </Text>
            </View>
          )}
          {data.map((item, index) => (
            <View
              key={index}
              style={[styles.border_bottom, styles.firm_detail_activity_item]}
            >
              <Image
                source={avatar}
                style={{ height: 40, width: 40, borderRadius: 20 }}
              />
              <View style={{ marginLeft: 16, width: '80%' }}>
                <Text style={{ lineHeight: 20 }}>in_vane</Text>
                <Text style={{ color: constant.text_gray, lineHeight: 20 }}>
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
                        <Text style={{ color: constant.text_gray }}>
                          {item.content}
                        </Text>
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
                    <Icon
                      name='like'
                      color={like ? constant.primary_color : null}
                    />
                    <Text style={{ marginLeft: 8 }}>5</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }
}
