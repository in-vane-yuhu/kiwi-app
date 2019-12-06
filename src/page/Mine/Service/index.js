import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Clipboard } from 'react-native'
import { Toast } from '@ant-design/react-native'

import styles from '../../../style'

export default class Markets extends Component {
  onCopyWechatID = id => {
    Clipboard.setString(id)
    Toast.success('已复制', 0.5)
  }

  render() {
    return (
      <View style={[styles.page_box, { alignItems: 'center' }]}>
        <View
          style={[styles.service_card, { paddingLeft: 24, paddingRight: 24 }]}
        >
          <View
            style={[
              styles.border_bottom,
              { alignItems: 'center', height: '75%', justifyContent: 'center' },
            ]}
          >
            <Text style={[styles.service_text]}>亲爱的用户</Text>
            <Text style={[styles.service_text]}>
              如果您有任何问题请添加客服微信
            </Text>
            <Text style={[styles.service_text]}>我们会尽快给您回复</Text>
          </View>
          <View style={[styles.service_wechat_box]}>
            <Text style={{ fontSize: 16 }}>微信号：in_vane</Text>
            <TouchableOpacity
              style={[styles.service_wechat_btn]}
              onPress={() => this.onCopyWechatID('wechat_id')}
            >
              <Text style={[styles.service_wechat_btn_text]}>复制微信号</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
