import React, { Component, Fragment } from 'react'
import { Icon } from '@ant-design/react-native'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import styles from '../../../../style'

import Table from '../../../../components/Table'
import KModal from '../../../../components/Modal'

@inject('TradeStore')
@observer
class Pending extends Component {
  state = {
    visible: false,
    detail: '',
  }

  column = [
    {
      title: <FormattedMessage id='time' />,
      dataIndex: 'time',
      align: 'center',
      width: '36%',
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
      width: '12%',
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
      width: '12%',
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
    {
      title: '',
      align: 'center',
      width: '10%',
      render: item => (
        <TouchableOpacity>
          <Icon name='delete' onPress={() => this.onCancel(item.id)} />
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

  onCancel = id => {
    const { cancelOrder } = this.props.TradeStore
    cancelOrder(id)
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

  render() {
    const { currentPending } = this.props.TradeStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <Table column={this.column} dataSource={currentPending} />
        {this.renderModal()}
      </SafeAreaView>
    )
  }
}

export default Pending
