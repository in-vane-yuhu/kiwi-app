import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Empty from '../../../components/Empty'

@inject('FirmStore')
@observer
export default class Operation extends Component {
  setColor = item => (item.side === 'buy' ? CONST.GREEN : CONST.RED)

  render() {
    const { currentSpotUserOps, currentUser } = this.props.FirmStore
    return (
      <View style={[styles.page_box]}>
        <View style={[styles.border_bottom, styles.firm_detail_assets_title]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>最新操作</Text>
        </View>

        <View style={{ padding: 24 }}>
          {currentSpotUserOps.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row', paddingBottom: 24 }}
            >
              <View style={{ width: '20%' }}>
                <Text style={[styles.firm_detail_ops_tl_left]}>
                  {item.date}
                </Text>
                <Text style={[styles.firm_detail_ops_tl_left]}>
                  {item.time}
                </Text>
              </View>
              <View style={{ position: 'relative', marginHorizontal: 12 }}>
                <View style={[styles.firm_detail_ops_tl_head]}>
                  <Icon name='check-circle' color={CONST.PRIMARY} />
                </View>
                <View style={[styles.firm_detail_ops_tl_tail]} />
              </View>
              <View>
                <View
                  style={[
                    styles.firm_detail_ops_tl_right,
                    { backgroundColor: this.setColor(item.side) },
                  ]}
                >
                  <Text style={{ color: CONST.N0, textAlign: 'center' }}>
                    {item.side === 'buy' ? '买入' : '卖出'}
                  </Text>
                </View>
                <View style={{ marginTop: 6, marginLeft: 4 }}>
                  <Text style={{ color: CONST.N96 }}>
                    {`${currentUser.nickName} 在【${'OKEx'} ${
                      item.instrument_id
                    }】以`}
                  </Text>
                  <Text style={{ marginTop: 4, color: CONST.N96 }}>
                    均价
                    <Text
                      style={{ color: this.setColor(item.side) }}
                    >{`【${item.price_avg}】`}</Text>
                    {item.side === 'buy' ? '买入' : '卖出'}
                    <Text
                      style={{ color: this.setColor(item.side) }}
                    >{`【${item.filled_size}】`}</Text>
                    个
                  </Text>
                </View>
              </View>
            </View>
          ))}
          {currentSpotUserOps.length !== 0 && (
            <View
              style={[
                styles.firm_detail_ops_tl_head,
                { marginLeft: '20%', paddingLeft: 12 },
              ]}
            >
              <Icon name='environment' color={CONST.PRIMARY} />
            </View>
          )}
          {currentSpotUserOps.length === 0 && <Empty />}
        </View>
      </View>
    )
  }
}
