import React, { Component, Fragment } from 'react'
import { View, SafeAreaView, Text, Image } from 'react-native'
import { Carousel } from '@ant-design/react-native'
import Table from '../../../components/Table'
import { FormattedMessage } from 'react-intl'
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
      title: <FormattedMessage id='pair' />,
      align: 'center',
      width: '25%',
      render: item => (
        <Fragment>
          <Image source={item.logo} style={{ height: 16, width: 16 }} />
          <Text style={{ marginLeft: 4 }}>{item.pair}</Text>
        </Fragment>
      ),
    },
    {
      title: <FormattedMessage id='price' />,
      dataIndex: 'price',
      align: 'center',
      width: '25%',
    },
    {
      title: <FormattedMessage id='wave' />,
      dataIndex: 'wave',
      align: 'center',
      width: '25%',
    },
    {
      title: <FormattedMessage id='volumn' />,
      dataIndex: 'volumn',
      align: 'center',
      width: '25%',
    },
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
