import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, FlatList, SafeAreaView } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Empty from '../../../components/Empty'
import WatchCoin from './WatchCoin'
import LongShort from './LongShort'
import Chain24H from './Chain24H'
import USDTIndex from './USDTIndex'
import BigOrder from './BigOrder'
import FirmStatistics from './FirmStatistics'
import UpAndDown from './UpAndDown'
import CloseOut from './CloseOut'

const list = [
  <WatchCoin />,
  <LongShort />,
  <Chain24H />,
  <USDTIndex />,
  <BigOrder />,
  <FirmStatistics />,
  <UpAndDown />,
  <CloseOut />,
]

@inject('DataStore')
@observer
export default class Data extends Component {
  onRefresh = () => {
    const { getUpAndDown } = this.props.DataStore
    getUpAndDown()
  }

  onEndReached = () => {
    console.log('onEndReached')
    /* loadmore */
  }

  render() {
    const { loading } = this.props.DataStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <FlatList
          data={list}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={[styles.divider]} />}
          onEndReachedThreshold={0}
          ListEmptyComponent={<Empty />}
          renderItem={({ item }) => item}
          refreshing={loading}
          onEndReached={this.onEndReached}
          onRefresh={this.onRefresh}
        />
      </SafeAreaView>
    )
  }
}
