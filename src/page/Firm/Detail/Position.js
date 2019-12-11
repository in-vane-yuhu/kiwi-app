import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, SafeAreaView } from 'react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Statistic from '../../../components/Statistic'
import Nomore from '../../../components/Nomore'

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
    color: CONST.PRIMARY,
    value: '¥210000',
    amount: 31,
    cost: '¥6.00',
    current: '¥21.00',
  },
  {
    name: 'EOS',
    percent: '14%',
    color: CONST.N96,
    value: '¥210000',
    amount: 31,
    cost: '¥6.00',
    current: '¥21.00',
  },
  {
    name: '其他',
    percent: '10%',
    color: CONST.N200,
    value: '¥210000',
    amount: 31,
    cost: '¥6.00',
    current: '¥21.00',
  },
]

const data_contract = [
  {
    type: true,
    times: 10,
    incomeAmount: '0.21000',
    incomeToken: 'BTC',
    percent: '11.42%',
    maxPosition: '99',
    maxMargin: '3.25BTC',
    percentMargin: '100%',
  },
  {
    type: false,
    times: 5,
    incomeAmount: '0.21000',
    incomeToken: 'BTC',
    percent: '11.42%',
    maxPosition: '99',
    maxMargin: '3.25BTC',
    percentMargin: '100%',
  },
]

@inject('FirmStore')
@observer
export default class Position extends Component {
  renderSpotPosition = () => {
    const title = ['名称/价值', '数量', '成本/现价']
    return (
      <Fragment>
        <View
          style={[
            styles.border_bottom,
            styles.firm_detail_position_tabel_title_box,
          ]}
        >
          {title.map((item, index) => (
            <View key={index} style={{ width: '30%' }}>
              <Text style={[styles.firm_detail_position_tabel_title_text]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.border_bottom,
              styles.firm_detail_position_tabel_title_box,
            ]}
          >
            <View style={{ alignItems: 'center', width: '30%' }}>
              <Text style={{ color: CONST.N96 }}>{item.name}</Text>
              <Text>{item.value}</Text>
            </View>
            <View style={{ width: '30%' }}>
              <Text style={[styles.firm_detail_position_tabel_col_center]}>
                {item.amount}
              </Text>
            </View>
            <View style={{ alignItems: 'center', width: '30%' }}>
              <Text style={{ color: CONST.N96 }}>{item.cost}</Text>
              <Text style={[styles.firm_detail_position_tabel_col_end]}>
                {item.current}
              </Text>
            </View>
          </View>
        ))}
        <Nomore />
      </Fragment>
    )
  }

  renderContractPosition = () => {
    return (
      <Fragment>
        <View style={{ height: 8, backgroundColor: '#f0f0f0' }} />
        {data_contract.map((item, index) => (
          <View key={index}>
            <View
              style={[
                styles.border_bottom,
                styles.firm_contract_detail_list_title,
              ]}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: item.type ? CONST.GREEN : CONST.RED,
                }}
              >{`Huobi BTC季度${item.type ? '多' : '空'} ${
                item.times
              }倍`}</Text>
              <Text style={[styles.firm_contract_detail_list_label]}>持仓</Text>
            </View>
            <View
              style={[
                styles.border_bottom,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingVertical: 16,
                },
              ]}
            >
              <Statistic
                title='总收益'
                value={`${item.incomeAmount} ${item.incomeToken}`}
                sign={item.type ? 'plus' : 'minus'}
                width='30%'
              />
              <Statistic
                title='收益率'
                value={item.percent}
                sign={item.type ? 'plus' : 'minus'}
                width='30%'
              />
            </View>
            <View style={{ paddingTop: 16 }}>
              <View style={[styles.firm_contract_detail_list_line]}>
                <Text style={{ color: CONST.N96 }}>最大持仓量</Text>
                <Text style={{ color: CONST.N32 }}>{item.maxPosition}</Text>
              </View>
              <View style={[styles.firm_contract_detail_list_line]}>
                <Text style={{ color: CONST.N96 }}>最大保证金</Text>
                <Text style={{ color: CONST.N32 }}>{item.maxMargin}</Text>
              </View>
              <View style={[styles.firm_contract_detail_list_line]}>
                <Text style={{ color: CONST.N96 }}>保证金率</Text>
                <Text style={{ color: CONST.N32 }}>{item.percentMargin}</Text>
              </View>
            </View>

            <View style={{ height: 8, backgroundColor: '#f0f0f0' }} />
          </View>
        ))}
      </Fragment>
    )
  }

  render() {
    const { currentTabIndex } = this.props.FirmStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>仓位一览</Text>
        </View>
        <View
          style={[
            styles.firm_detail_position_percent,
            currentTabIndex === 0 && styles.border_bottom,
          ]}
        >
          <View style={{ flexDirection: 'row', height: 20 }}>
            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  width: item.percent,
                  backgroundColor: item.color,
                  justifyContent: 'center',
                  borderTopLeftRadius: index === 0 ? 10 : 0,
                  borderBottomLeftRadius: index === 0 ? 10 : 0,
                  borderTopRightRadius: index === data.length - 1 ? 10 : 0,
                  borderBottomRightRadius: index === data.length - 1 ? 10 : 0,
                }}
              >
                <Text style={[styles.firm_detail_position_percent_text]}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>
          <View style={[styles.firm_detail_position_percent_label]}>
            {data.map((item, index) => (
              <View key={index} style={[styles.firm_detail_position_label_box]}>
                <Text style={{ color: item.color, fontWeight: 'bold' }}>
                  {item.name}
                </Text>
                <Text style={{ color: CONST.N96, marginLeft: 8 }}>
                  {item.percent}
                </Text>
              </View>
            ))}
          </View>
        </View>
        {currentTabIndex === 0 && this.renderSpotPosition()}
        {currentTabIndex === 1 && this.renderContractPosition()}
      </SafeAreaView>
    )
  }
}
