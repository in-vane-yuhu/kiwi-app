import React, { Component, Fragment } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import styles from '../../../style'

import Table from '../../../components/Table'
import KModal from '../../../components/Modal'

const data = [
  { symbol: 'BTC', available: '10000', freeze: '0' },
  { symbol: 'ETH', available: '10000', freeze: '0' },
  { symbol: 'BCH', available: '10000', freeze: '0' },
]

@inject('TradeStore')
@observer
class Orders extends Component {
  state = {
    visible: false,
    detail: '',
  }

  componentDidMount = () => {
    const { getFunds } = this.props.TradeStore
    getFunds()
  }

  column = [
    { title: '币种', dataIndex: 'name', align: 'center', width: '20%' },
    { title: '可用', dataIndex: 'available', align: 'center', width: '20%' },
    { title: '冻结', dataIndex: 'freeze', align: 'center', width: '20%' },
    {
      title: '操作',
      align: 'center',
      width: '40%',
      render: item => (
        <Fragment>
          <TouchableOpacity
            style={[styles.funds_colBtn, { marginBottom: 0 }]}
            onPress={() => this.navigateToDeposit(item.symbol)}
          >
            <Text style={[styles.login_btn_text]}>充值</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.funds_colBtn, { marginBottom: 0, marginLeft: 8 }]}
            onPress={() => this.navigateToWithdraw(item.symbol)}
          >
            <Text style={[styles.login_btn_text]}>提现</Text>
          </TouchableOpacity>
        </Fragment>
      ),
    },
  ]

  navigateToDeposit = symbol => {
    Actions.deposit({ symbol })
  }

  navigateToWithdraw = symbol => {
    Actions.withdraw({ symbol })
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
            <Text style={{ marginBottom: 16 }}>交易对：{detail.pair}</Text>
            <Text style={{ marginBottom: 16 }}>类型：{detail.type}</Text>
            <Text style={{ marginBottom: 16 }}>方向：{detail.side}</Text>
            <Text style={{ marginBottom: 16 }}>价格：{detail.price}</Text>
            <Text style={{ marginBottom: 16 }}>数量：{detail.amount}</Text>
            <Text style={{ marginBottom: 16 }}>已成交：{detail.deal}</Text>
            <Text style={{ marginBottom: 16 }}>未成交：{detail.undeal}</Text>
          </Fragment>
        }
      />
    )
  }

  render() {
    const { funds, loading_funds } = this.props.TradeStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <Table column={this.column} dataSource={funds} />
        {this.renderModal()}
      </SafeAreaView>
    )
  }
}

export default Orders
