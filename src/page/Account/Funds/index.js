import React, { Component, Fragment } from 'react'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import styles from '../../../style'

import Table from '../../../components/Table'

@inject('TradeStore')
@observer
class Orders extends Component {
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
            onPress={() => this.navigateToDeposit(item.name)}
          >
            <Text style={[styles.login_btn_text]}>充值</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.funds_colBtn, { marginBottom: 0, marginLeft: 8 }]}
            onPress={() => this.navigateToWithdraw(item.name)}
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

  render() {
    const { funds } = this.props.TradeStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <Table column={this.column} dataSource={funds} />
      </SafeAreaView>
    )
  }
}

export default Orders
