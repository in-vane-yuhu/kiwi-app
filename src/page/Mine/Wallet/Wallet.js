import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import avatar from '../../../assets/image/wallet_bg.jpg'

export default class Wallet extends Component {
  navigateToRecharge = () => {
    Actions.recharge()
  }

  render() {
    return (
      <View style={[styles.page_box]}>
        <View style={{ padding: 24 }}>
          <ImageBackground
            source={avatar}
            style={{ borderRadius: 10 }}
            imageStyle={{ borderRadius: 10 }}
          >
            <View style={[styles.wallet_icon_box]}>
              <TouchableOpacity>
                <Icon name='qrcode' color={CONST.GOLD} />
              </TouchableOpacity>
              <View style={[styles.wallet_divider]} />
              <TouchableOpacity>
                <Icon name='question-circle' color={CONST.GOLD} />
              </TouchableOpacity>
            </View>
            <View style={[styles.wallet_amount]}>
              <Text style={[styles.wallet_amount]}>5000.5</Text>
              <Text style={[styles.wallet_unit]}>A币（个）</Text>
            </View>
            <View style={[styles.wallet_btn_box]}>
              <TouchableOpacity style={[styles.wallet_btn]}>
                <Text style={{ color: CONST.GOLD }}>转账</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.wallet_btn]}>
                <Text style={{ color: CONST.GOLD }}>提现</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.wallet_btn_GOLD]}
                onPress={this.navigateToRecharge}
              >
                <Text style={{ color: CONST.GOLD_DARK }}>充值</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    )
  }
}
