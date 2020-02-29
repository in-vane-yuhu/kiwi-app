import React, { Component, Fragment } from 'react'
import { Icon, Tabs } from '@ant-design/react-native'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
import styles from '../../../../style'

import Table from '../../../../components/Table'
import KModal from '../../../../components/Modal'

const tabs = [
  {
    title: (
      <Text>
        <FormattedMessage id='allDeal' />
      </Text>
    ),
  },
  {
    title: (
      <Text>
        <FormattedMessage id='myDeal' />
      </Text>
    ),
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
    {
      title: <FormattedMessage id='time' />,
      dataIndex: 'time',
      align: 'center',
      width: '40%',
    },
    {
      title: <FormattedMessage id='price' />,
      dataIndex: 'price',
      align: 'center',
      width: '30%',
      render: text => <Text style={{ color: '#66c322' }}>{text}</Text>,
    },
    {
      title: <FormattedMessage id='vol' />,
      dataIndex: 'amount',
      align: 'center',
      width: '30%',
    },
  ]
  columnMine = [
    {
      title: <FormattedMessage id='time' />,
      dataIndex: 'time',
      align: 'center',
      width: '37%',
    },
    {
      title: <FormattedMessage id='pair' />,
      dataIndex: 'pair',
      align: 'center',
      width: '20%',
    },
    {
      title: <FormattedMessage id='type' />,
      dataIndex: 'type',
      align: 'center',
      width: '15%',
    },
    {
      title: <FormattedMessage id='side' />,
      dataIndex: 'side',
      align: 'center',
      width: '15%',
      render: text => (
        <Text
          style={{
            color:
              text === <FormattedMessage id='buy' /> ? '#66c322' : '#e9686d',
          }}
        >
          {text}
        </Text>
      ),
    },
    {
      title: <FormattedMessage id='detail' />,
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
                  <FormattedMessage id='sell' />
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
