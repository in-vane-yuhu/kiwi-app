import React, { Component, Fragment } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../../style/constant'
import styles, { screenHeight, screenWidth } from '../../../style'

export default class Recharge extends Component {
  state = {
    param_amount: '',
  }

  onSelectPrice = index => {
    const { onSelectRechargePrice } = this.props.userAction
    const { recharge_price } = this.props.state.user

    onSelectRechargePrice(recharge_price, index)
    this.setState({
      param_amount: recharge_price[index].amount,
    })
  }

  onChangeAmount = text => {
    const { resetSelectRecharge } = this.props.userAction
    const { recharge_price } = this.props.state.user
    this.setState({
      param_amount: text,
    })
    resetSelectRecharge(recharge_price)
  }

  render() {
    const { recharge_price } = this.props.state.user
    const { param_amount } = this.state
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View>
          <View style={{ padding: 16, paddingTop: 0 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
              }}
            >
              {recharge_price.map((item, index) => (
                <TouchableOpacity
                  style={[
                    styles.recharge_item_box,
                    {
                      borderColor: item.selected
                        ? constant.primary_color
                        : constant.border_gray_dark,
                      marginTop: 16,
                    },
                  ]}
                  key={index}
                  onPress={() => this.onSelectPrice(index)}
                >
                  <Text>{item.amount}个A币</Text>
                  <Text>售价：¥{item.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={[styles.recharge_divider]} />
          <View style={{ padding: 24 }}>
            <Text>自定义金额</Text>
            <TextInput
              style={[styles.recharge_amount_input]}
              placeholder='请输入充值金额 1～100000 AAA'
              value={param_amount}
              onChangeText={this.onChangeAmount}
            />
            <Text style={[styles.recharge_amount_tip]}>
              售价：¥{param_amount || 0}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.recharge_sticky_btn]}>
          <Text style={{ textAlign: 'center', color: constant.text_white }}>
            微信支付
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
