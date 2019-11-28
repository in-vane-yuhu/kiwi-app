import React, {Component, Fragment} from 'react';
import {Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import {Icon} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions} from 'react-native-router-flux';

import UserAction from '../../../store/actions/user';

import * as constant from '../../../style/constant';
import styles, {screenHeight, screenWidth} from '../../../style';

@connect(
  state => ({state}),
  dispatch => ({
    userAction: bindActionCreators(UserAction, dispatch),
  }),
)
export default class Wallet extends Component {
  navigateToRecharge = () => {
    Actions.recharge();
  };

  render() {
    return (
      <View style={[styles.page_box]}>
        <View style={{padding: 24}}>
          <ImageBackground
            source={require('../../../assets/image/wallet_bg.jpg')}
            style={{width: '100%', borderRadius: 10}}
            imageStyle={{borderRadius: 10}}>
            <View style={{padding: 8}}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity>
                  <Icon name="qrcode" color={constant.gold} />
                </TouchableOpacity>
                <View style={[styles.wallet_divider]} />
                <TouchableOpacity>
                  <Icon name="question-circle" color={constant.gold} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.wallet_amount]}>
              <Text style={{color: constant.gold, fontSize: 28}}>5000.5</Text>
              <Text style={{color: constant.gold, fontSize: 16, marginLeft: 8}}>
                A币（个）
              </Text>
            </View>
            <View style={[styles.wallet_btn_box]}>
              <TouchableOpacity style={[styles.wallet_btn]}>
                <Text style={{color: constant.gold}}>转账</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.wallet_btn]}>
                <Text style={{color: constant.gold}}>提现</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.wallet_btn_gold]}
                onPress={this.navigateToRecharge}>
                <Text style={{color: constant.gold_dark}}>充值</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
