import React, { Component, Fragment } from 'react'
import { View, SafeAreaView, Text, Image } from 'react-native'
import { Icon, Carousel } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'
import Table from '../../../components/Table'
import * as CONST from '../../../style/constant'
import styles from '../../../style'

import BTC from '../../../assets/image/BTC.png'
import ETH from '../../../assets/image/ETH.png'

const data = [
  { logo: BTC, pair: 'BTC', price: '10000', wave: '2.15%', volumn: '142185' },
  { logo: ETH, pair: 'ETH', price: '247', wave: '0.45%', volumn: '8731' },
]

class HomePage extends Component {
  column = [
    {
      title: '交易对',
      align: 'center',
      width: '25%',
      render: item => (
        <Fragment>
          <Image source={item.logo} style={{ height: 16, width: 16 }} />
          <Text style={{ marginLeft: 4 }}>{item.pair}</Text>
        </Fragment>
      ),
    },
    { title: '价格', dataIndex: 'price', align: 'center', width: '25%' },
    { title: '24h涨幅', dataIndex: 'wave', align: 'center', width: '25%' },
    { title: '24h交易量', dataIndex: 'volumn', align: 'center', width: '25%' },
  ]

  render() {
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View style={{ padding: 24 }}>
          <Carousel style={{}}>
            <Image
              source={{
                uri: 'https://gateimg.opencoding.com/bnrs/3bei_cn.jpg',
              }}
              style={{ height: 160, width: '100%' }}
            />
            <Image
              source={{ uri: 'https://gateimg.opencoding.com/bnrs/hns_cn.jpg' }}
              style={{ height: 160, width: '100%' }}
            />
            <Image
              source={{ uri: 'https://gateimg.opencoding.com/bnrs/okb_cn.jpg' }}
              style={{ height: 160, width: '100%' }}
            />
          </Carousel>
        </View>
        <Table column={this.column} dataSource={data} />
      </SafeAreaView>
    )
  }
}

export default HomePage
