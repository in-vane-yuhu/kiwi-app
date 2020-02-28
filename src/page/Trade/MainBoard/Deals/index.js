import React, { Component, Fragment } from 'react'
import { Icon, Tabs } from '@ant-design/react-native'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { observer, inject } from 'mobx-react'
import styles from '../../../../style'

import Table from '../../../../components/Table'
import KModal from '../../../../components/Modal'

const tabs = [{ title: '全站成交' }, { title: '我的成交' }]
const data = [
  {
    time: '2020-02-16 17:24:09',
    pair: 'BTCBCH',
    type: '限价',
    side: '卖出',
    price: '14000',
    amount: '1',
    deal: '1',
    undeal: '0',
  },
  {
    time: '2020-02-16 17:24:09',
    pair: 'BTCBCH',
    type: '限价',
    side: '卖出',
    price: '14000',
    amount: '1',
    deal: '1',
    undeal: '0',
  },
  {
    time: '2020-02-16 17:24:09',
    pair: 'BTCBCH',
    type: '限价',
    side: '买入',
    price: '14000',
    amount: '1',
    deal: '1',
    undeal: '0',
  },
]

@inject('TradeStore')
@observer
class Pending extends Component {
  state = {
    visible: false,
    detail: '',
  }

  column = [
    { title: '时间', dataIndex: 'time', align: 'center', width: '40%' },
    {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
      width: '30%',
      render: text => <Text style={{ color: '#66c322' }}>{text}</Text>,
    },
    { title: '交易量', dataIndex: 'amount', align: 'center', width: '30%' },
  ]
  columnMine = [
    { title: '时间', dataIndex: 'time', align: 'center', width: '37%' },
    { title: '交易对', dataIndex: 'pair', align: 'center', width: '20%' },
    { title: '类型', dataIndex: 'type', align: 'center', width: '15%' },
    {
      title: '方向',
      dataIndex: 'side',
      align: 'center',
      width: '15%',
      render: text => (
        <Text style={{ color: text === '买入' ? 'green' : 'red' }}>{text}</Text>
      ),
    },
    {
      title: '详情',
      align: 'center',
      width: '13%',
      render: item => (
        <TouchableOpacity>
          <Icon name='search' onPress={() => this.showModal(item)} />
        </TouchableOpacity>
      ),
    },
  ]

  componentDidMount = () => {
    const { getFinishedOrders } = this.props.TradeStore
    const startTime = Date.parse(new Date()) / 1000
    getFinishedOrders('BTCBCH', startTime - 86400 * 7, startTime, 0, 20)
  }

  showModal = item => {
    this.setState({ visible: true, detail: item })
  }

  hideModal = () => {
    this.setState({ visible: false })
  }

  renderModal = () => {
    const { visible, detail } = this.state
    return (
      <KModal
        title='交易详情'
        visible={visible}
        onClose={this.hideModal}
        ctx={
          <Fragment>
            <Text style={{ marginBottom: 16 }}>时间：{detail.time}</Text>
            <Text style={{ marginBottom: 16 }}>交易对：{detail.market}</Text>
            <Text style={{ marginBottom: 16 }}>
              类型：{detail.type === 1 ? '限价' : '市价'}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              方向：
              <Text
                style={{ color: detail.side === 1 ? '#e9686d' : '#66c322' }}
              >
                {detail.side === 1 ? '卖出' : '买入'}
              </Text>
            </Text>
            <Text style={{ marginBottom: 16 }}>价格：{detail.price}</Text>
            <Text style={{ marginBottom: 16 }}>数量：{detail.amount}</Text>
            <Text style={{ marginBottom: 16 }}>
              已成交：{detail.deal_stock}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              未成交：{detail.undeal_stock}
            </Text>
          </Fragment>
        }
      />
    )
  }

  render() {
    const { deals, currentFinished } = this.props.TradeStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <Tabs
          tabs={tabs}
          tabBarUnderlineStyle={{ backgroundColor: '#f8b500' }}
          tabBarActiveTextColor='#f8b500'
          tabBarInactiveTextColor='#c8c8c8'
        >
          <View style={{ maxHeight: 400 }}>
            <Table column={this.column} dataSource={deals} />
          </View>
          <Table column={this.columnMine} dataSource={currentFinished} />
        </Tabs>
        {this.renderModal()}
      </SafeAreaView>
    )
  }
}

export default Pending
