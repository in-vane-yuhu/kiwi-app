import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Nomore from '../../../components/Nomore'
import Avatar from '../../../components/Avatar'

const comments = [
  {
    name: '89年的网民',
    date: '2019-12-01 12:00',
    content: '这人在说啥玩意儿呢？onedayday的duangduangduang',
    id: 'd6fe8c82fb0abac17a702fd2a94eff37',
  },
  {
    name: '精神小伙',
    date: '2019-12-01 12:00',
    content: '别爱我，没结果，除非花手摇过我。',
    id: 'ck3pssbf7001f0751mu64wssv',
  },
]

@inject('FirmStore')
@observer
export default class Comments extends Component {
  state = { like: false }

  setLikeStatus = () => {
    this.setState({
      like: !this.state.like,
    })
  }

  render() {
    const { like } = this.state
    const { currentUser } = this.props.FirmStore
    console.log(currentUser.id)
    return (
      <KeyboardAvoidingView style={[styles.page_box]} behavior='padding'>
        <SafeAreaView style={[styles.page_box]}>
          <ScrollView>
            <View style={[styles.border_bottom, styles.firm_detail_act_item]}>
              <Avatar id={currentUser.id} size={50} />
              <View style={{ marginLeft: 16, width: '80%' }}>
                <Text style={{ lineHeight: 20 }}>in_vane</Text>
                <Text style={{ color: CONST.N96, lineHeight: 20 }}>
                  2019-12-01 12:00
                </Text>
                <Text style={{ marginTop: 4, lineHeight: 20 }}>
                  这是一条动态。一开始他们叫我发动态，我是拒绝的，因为不能你叫我发，我就发。首先我要试一下，诶你看我发完动态是这样的，别人发完动态也是这样的。不然别人一看，诶你发的动态加了特技，duang～的一下就很酷炫。
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 8,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Icon name='message' />
                <Text style={{ marginLeft: 8 }}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={this.setLikeStatus}
              >
                <Icon name='like' color={like ? CONST.PRIMARY : null} />
                <Text style={{ marginLeft: 8 }}>5</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 8, backgroundColor: '#f0f0f0' }} />
            <View
              style={[styles.border_bottom, styles.firm_detail_assets_title]}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {`评论：（${comments.length}条）`}
              </Text>
            </View>
            {comments.map((item, index) => (
              <View
                key={index}
                style={[styles.border_bottom, styles.firm_detail_act_item]}
              >
                <Avatar id={item.id} size={40} />
                <View style={{ marginLeft: 16, width: '80%' }}>
                  <Text style={{ lineHeight: 20 }}>{item.name}</Text>
                  <Text style={{ color: CONST.N96, lineHeight: 20 }}>
                    {item.date}
                  </Text>
                  <Text style={{ marginTop: 4, lineHeight: 20 }}>
                    {item.content}
                  </Text>
                </View>
              </View>
            ))}
            <Nomore />
          </ScrollView>
          <View style={[styles.firm_detail_act_ipt_box]}>
            <TextInput
              style={[styles.firm_detail_act_ipt]}
              placeholder='发表评论'
            />
            <TouchableOpacity style={[styles.firm_detail_act_btn]}>
              <Text style={{ color: CONST.N0 }}>发送</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }
}
