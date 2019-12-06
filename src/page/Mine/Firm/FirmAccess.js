import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon, Modal } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

export default class FirmAccess extends Component {
  navigateToApiAccess = () => {
    Actions.api()
  }

  showConfirm = () => {
    Modal.alert('提示', '您确定要解除绑定吗？', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => console.log('ok') },
    ])
  }

  setColor = item => (item.accessed ? CONST.N255 : CONST.N96)

  render() {
    const sub_list = [
      { token: 'OKEx', accessed: false },
      { token: 'Bitmex', accessed: false },
      { token: 'Binance', accessed: true },
      { token: 'Huobi', accessed: false },
    ]
    return (
      <View style={[styles.page_box, { paddingTop: 16 }]}>
        {sub_list.map((item, index) => (
          <TouchableOpacity
            style={[styles.sub_list_box]}
            key={index}
            onPress={
              item.accessed ? this.showConfirm : this.navigateToApiAccess
            }
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>{item.token}</Text>
              {item.accessed && (
                <View style={[styles.firm_access_tag_box]}>
                  <Text style={[styles.firm_access_tag_text]}>已接入</Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginRight: 8, color: this.setColor(item) }}>
                {item.accessed ? '解除绑定' : '未接入'}
              </Text>
              <Icon name='right' />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}
