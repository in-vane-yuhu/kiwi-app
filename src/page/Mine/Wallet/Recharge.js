import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('UserStore')
@observer
export default class Recharge extends Component {
  state = {
    param_amount: '',
  }

  onSelectPrice = index => {
    const { recharge_price, setRechargePrice } = this.props.UserStore
    setRechargePrice(index)
    this.setState({ param_amount: recharge_price[index].price })
  }

  setColor = item => (item.selected ? CONST.PRIMARY : CONST.N200)

  render() {
    const { recharge_price } = this.props.UserStore
    const { param_amount } = this.state
    return (
      <View style={[styles.page_box, { justifyContent: 'space-between' }]}>
        <View>
          <View style={[styles.recharge_box]}>
            {recharge_price.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => this.onSelectPrice(index)}
                style={[
                  styles.recharge_item_box,
                  { borderColor: this.setColor(item) },
                ]}
              >
                <Text>{item.amount}个A币</Text>
                <Text>售价：¥{item.price}</Text>
              </TouchableOpacity>
            ))}
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
          <Text style={{ textAlign: 'center', color: CONST.N0 }}>
            微信支付
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
