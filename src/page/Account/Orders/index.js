import React, { Component, Fragment } from 'react'
import { Icon, Picker } from '@ant-design/react-native'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import styles from '../../../style'

import Table from '../../../components/Table'
import KModal from '../../../components/Modal'

const selectStatus = [
  { label: <FormattedMessage id='pending' />, value: 'pending' },
  { label: <FormattedMessage id='finished' />, value: 'finished' },
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
    {
      title: <FormattedMessage id='time' />,
      dataIndex: 'time',
      align: 'center',
      width: '40%',
    },
    {
      title: <FormattedMessage id='pair' />,
      dataIndex: 'market',
      align: 'center',
      width: '20%',
    },
    {
      title: <FormattedMessage id='type' />,
      dataIndex: 'type',
      align: 'center',
      width: '15%',
      render: text => (
        <Text>
          {text === 1 ? (
            <FormattedMessage id='limit' />
          ) : (
            <FormattedMessage id='market' />
          )}
        </Text>
      ),
    },
    {
      title: <FormattedMessage id='side' />,
      dataIndex: 'side',
      align: 'center',
      width: '15%',
      render: text => (
        <Text style={{ color: text === 1 ? '#e9686d' : '#66c322' }}>
          {text === 1 ? (
            <FormattedMessage id='sell' />
          ) : (
            <FormattedMessage id='buy' />
          )}
        </Text>
      ),
    },
    {
      title: <FormattedMessage id='detail' />,
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
        title={<FormattedMessage id='txDetail' />}
        visible={visible}
        onClose={this.hideModal}
        ctx={
          <Fragment>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='time' />：{detail.time}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='pair' />：{detail.market}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='type' />：
              {detail.type === 1 ? (
                <FormattedMessage id='limit' />
              ) : (
                <FormattedMessage id='market' />
              )}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='side' />：
              <Text
                style={{ color: detail.side === 1 ? '#e9686d' : '#66c322' }}
              >
                {detail.side === 1 ? (
                  <FormattedMessage id='sell' />
                ) : (
                  <FormattedMessage id='buy' />
                )}
              </Text>
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='price' />：{detail.price}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='amount' />：{detail.amount}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='deal' />：{detail.deal_stock}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='undeal' />：{detail.undeal_stock}
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
        title={<FormattedMessage id='orderStatus' />}
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
            <FormattedMessage id='orderStatus' />：
            {status[0] === 'pending' ? (
              <FormattedMessage id='pending' />
            ) : (
              <FormattedMessage id='finished' />
            )}
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
        title={<FormattedMessage id='pair' />}
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
          <Text style={{ color: '#969696' }}>
            <FormattedMessage id='pair' />： {pair[0]}
          </Text>
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
