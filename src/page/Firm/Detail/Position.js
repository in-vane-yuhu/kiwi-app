import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Tabs} from '@ant-design/react-native';
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
export default class Position extends Component {
  render() {
    const data = [
      {
        name: 'BTC',
        percent: '50%',
        color: '#ffd9c3',
        value: '¥210000',
        amount: 31,
        cost: '¥6.00',
        current: '¥21.00',
      },
      {
        name: 'ETH',
        percent: '26%',
        color: '#ff5e00',
        value: '¥210000',
        amount: 31,
        cost: '¥6.00',
        current: '¥21.00',
      },
      {
        name: 'EOS',
        percent: '14%',
        color: '#969696',
        value: '¥210000',
        amount: 31,
        cost: '¥6.00',
        current: '¥21.00',
      },
      {
        name: '其他',
        percent: '10%',
        color: '#c8c8c8',
        value: '¥210000',
        amount: 31,
        cost: '¥6.00',
        current: '¥21.00',
      },
    ];
    return (
      <View style={[styles.page_box]}>
        <ScrollView>
          <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>仓位一览</Text>
          </View>
          <View
            style={[styles.border_bottom, styles.firm_detail_position_percent]}>
            <View style={{flexDirection: 'row', height: 20}}>
              {data.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: item.percent,
                    backgroundColor: item.color,
                    justifyContent: 'center',
                    borderTopLeftRadius: index === 0 ? 10 : 0,
                    borderBottomLeftRadius: index === 0 ? 10 : 0,
                    borderTopRightRadius: index === 3 ? 10 : 0,
                    borderBottomRightRadius: index === 3 ? 10 : 0,
                  }}>
                  <Text style={[styles.firm_detail_position_percent_text]}>
                    {item.name}
                  </Text>
                </View>
              ))}
            </View>
            <View style={[styles.firm_detail_position_percent_label]}>
              {data.map((item, index) => (
                <View
                  key={index}
                  style={[styles.firm_detail_position_label_box]}>
                  <Text style={{color: item.color, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                  <Text style={{color: constant.text_gray, marginLeft: 8}}>
                    {item.percent}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={[
              styles.border_bottom,
              styles.firm_detail_position_tabel_title_box,
            ]}>
            <View style={{width: '30%'}}>
              <Text style={[styles.firm_detail_position_tabel_title_text]}>
                名称/价值
              </Text>
            </View>
            <View style={{width: '30%'}}>
              <Text style={[styles.firm_detail_position_tabel_title_text]}>
                数量
              </Text>
            </View>
            <View style={{width: '30%'}}>
              <Text style={[styles.firm_detail_position_tabel_title_text]}>
                成本/现价
              </Text>
            </View>
          </View>
          {data.map((item, index) => (
            <View
              key={index}
              style={[
                styles.border_bottom,
                styles.firm_detail_position_tabel_title_box,
              ]}>
              <View style={{alignItems: 'center', width: '30%'}}>
                <Text style={{color: constant.text_gray}}>{item.name}</Text>
                <Text style={{fontSize: 18, marginTop: 4}}>{item.value}</Text>
              </View>
              <View style={{width: '30%'}}>
                <Text style={[styles.firm_detail_position_tabel_column_center]}>
                  {item.amount}
                </Text>
              </View>
              <View style={{alignItems: 'center', width: '30%'}}>
                <Text style={{color: constant.text_gray}}>{item.cost}</Text>
                <Text style={[styles.firm_detail_position_tabel_column_end]}>
                  {item.current}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
