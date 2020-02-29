import React, { Component, Fragment } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import styles from '../../../style'
import { FormattedMessage } from 'react-intl'

import Table from '../../../components/Table'
import KModal from '../../../components/Modal'

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
    {
      title: <FormattedMessage id='symbol' />,
      dataIndex: 'name',
      align: 'center',
      width: '20%',
    },
    {
      title: <FormattedMessage id='available' />,
      dataIndex: 'available',
      align: 'center',
      width: '20%',
    },
    {
      title: <FormattedMessage id='freeze' />,
      dataIndex: 'freeze',
      align: 'center',
      width: '20%',
    },
    {
      title: <FormattedMessage id='operation' />,
      align: 'center',
      width: '40%',
      render: item => (
        <Fragment>
          <TouchableOpacity
            style={[styles.funds_colBtn, { marginBottom: 0 }]}
            onPress={() => this.navigateToDeposit(item.name)}
          >
            <Text style={[styles.login_btn_text]}>
              <FormattedMessage id='deposit' />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.funds_colBtn, { marginBottom: 0, marginLeft: 8 }]}
            onPress={() => this.navigateToWithdraw(item.name)}
          >
            <Text style={[styles.login_btn_text]}>
              <FormattedMessage id='withdraw' />
            </Text>
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
        title={<FormattedMessage id='txDetail' />}
        visible={visible}
        onClose={this.hideModal}
        ctx={
          <Fragment>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='time' />：{detail.time}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='pair' />：{detail.pair}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='type' />：{detail.type}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='side' />：{detail.side}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='price' />：{detail.price}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='amount' />：{detail.amount}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='deal' />：{detail.deal}
            </Text>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='undeal' />：{detail.undeal}
            </Text>
          </Fragment>
        }
      />
    )
  }

  render() {
    const { funds } = this.props.TradeStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <Table column={this.column} dataSource={funds} />
        {this.renderModal()}
      </SafeAreaView>
    )
  }
}

export default Orders
