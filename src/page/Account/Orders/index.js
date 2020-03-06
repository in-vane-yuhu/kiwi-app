import React, { Component, Fragment } from 'react'
import { Icon, Picker } from '@ant-design/react-native'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import styles from '../../../style'

import Table from '../../../components/Table'
import KModal from '../../../components/Modal'

const selectStatus = [
  { label: '进行中', value: 'pending' },
  { label: '已完成', value: 'finished' },
]
const selectPair = [
  { label: 'BTCBCH', value: 'BTCBCH' },
  { label: 'ETHBCH', value: 'ETHBCH' },
]

@inject('TradeStore')
@observer
class Orders extends Component {
  state = {
    visible: false,
    detail: '',
    status: ['pending'],
    pair: ['BTCBCH'],
  }

  column = [
    { title: '时间', dataIndex: 'time', align: 'center', width: '40%' },
    { title: '交易对', dataIndex: 'market', align: 'center', width: '20%' },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      width: '15%',
      render: text => <Text>{text === 1 ? '限价' : '市价'}</Text>,
    },
    {
      title: '方向',
      dataIndex: 'side',
      align: 'center',
      width: '15%',
      render: text => (
        <Text style={{ color: text === 1 ? '#e9686d' : '#66c322' }}>
          {text === 1 ? '卖出' : '买入'}
        </Text>
      ),
    },
    {
      title: '详情',
      align: 'center',
      width: '10%',
      render: item => (
        <TouchableOpacity>
          <Icon name='search' onPress={() => this.showModal(item)} />
        </TouchableOpacity>
      ),
    },
  ]

  componentDidMount = () => {
    const { getPendingOrders } = this.props.TradeStore
    getPendingOrders('BTCBCH', 0, 20)
  }

  showModal = item => {
    this.setState({ visible: true, detail: item })
  }

  hideModal = () => {
    this.setState({ visible: false })
  }

  onSelectStatus = value => {
    const { getPendingOrders, getFinishedOrders } = this.props.TradeStore
    const { pair } = this.state
    this.setState({ status: value })
    if (value[0] === 'pending') {
      getPendingOrders(pair[0], 0, 20)
    } else {
      getFinishedOrders(pair[0], 0, 0, 0, 100)
    }
  }

  onSelectPair = value => {
    const { getPendingOrders, getFinishedOrders } = this.props.TradeStore
    const { status } = this.state
    this.setState({ pair: value })
    if (status[0] === 'pending') {
      getPendingOrders(value[0], 0, 20)
    } else {
      getFinishedOrders(value[0], 0, 0, 0, 100)
    }
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
            <Text style={{ marginBottom: 16 }}>
              成交均价：{detail.avgPrice}
            </Text>
            <Text style={{ marginBottom: 16 }}>数量：{detail.amount}</Text>
            <Text style={{ marginBottom: 16 }}>手续费：{detail.deal_fee}</Text>
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

  renderPickerStatus = () => {
    const { status } = this.state
    return (
      <Picker
        title='委托状态'
        onChange={this.onSelectStatus}
        value={status}
        data={selectStatus}
        cols={1}
      >
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: '#f8b500',
            borderRadius: 4,
            padding: 8,
            flexDirection: 'row',
          }}
        >
          <Text style={{ color: '#969696' }}>
            委托状态：
            {status[0] === 'pending' ? '进行中' : '已完成'}
          </Text>
          <Icon name='down' size={16} color='#969696' />
        </TouchableOpacity>
      </Picker>
    )
  }

  renderPickerPair = () => {
    const { pair } = this.state
    return (
      <Picker
        title='交易对'
        onChange={this.onSelectPair}
        value={pair}
        data={selectPair}
        cols={1}
      >
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: '#f8b500',
            borderRadius: 4,
            padding: 8,
            flexDirection: 'row',
          }}
        >
          <Text style={{ color: '#969696' }}>交易对： {pair[0]}</Text>
          <Icon name='down' size={16} color='#969696' />
        </TouchableOpacity>
      </Picker>
    )
  }

  render() {
    const { currentPending, currentFinished } = this.props.TradeStore
    const { status } = this.state
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {this.renderPickerStatus()}
          {this.renderPickerPair()}
        </View>
        <Table
          column={this.column}
          dataSource={
            status[0] === 'pending' ? currentPending : currentFinished
          }
          style={{ borderTopWidth: 8, borderTopColor: '#eee' }}
        />
        {this.renderModal()}
      </SafeAreaView>
    )
  }
}

export default Orders
