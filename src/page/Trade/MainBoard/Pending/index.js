import React, { Component, Fragment } from 'react'
import { Icon } from '@ant-design/react-native'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import styles from '../../../../style'

import Table from '../../../../components/Table'
import KModal from '../../../../components/Modal'

@inject('TradeStore')
@observer
class Pending extends Component {
  state = {
    visible: false,
    visiable_confirm: false,
    currentID: '',
    detail: '',
  }

  column = [
    { title: '时间', dataIndex: 'time', align: 'center', width: '36%' },
    { title: '交易对', dataIndex: 'market', align: 'center', width: '20%' },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
      width: '12%',
      render: text => <Text>{text === 1 ? '限价' : '市价'}</Text>,
    },
    {
      title: '方向',
      dataIndex: 'side',
      align: 'center',
      width: '12%',
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
    {
      title: '',
      align: 'center',
      width: '10%',
      render: item => (
        <TouchableOpacity>
          <Icon name='delete' onPress={() => this.showConfirm(item.id)} />
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

  onCancel = () => {
    const { cancelOrder } = this.props.TradeStore
    const { id } = this.state
    cancelOrder(id)
    this.hideConfirm()
  }

  showConfirm = id => {
    this.setState({ visiable_confirm: true, currentID: id })
  }

  hideConfirm = () => {
    this.setState({ visiable_confirm: false })
  }

  renderConfirm = () => {
    const { visiable_confirm } = this.state
    return (
      <KModal
        title='操作'
        visible={visiable_confirm}
        onClose={this.hideConfirm}
        ctx={
          <Fragment>
            <Text>您确认要取消该订单吗？</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 24,
              }}
            >
              <TouchableOpacity onPress={this.hideConfirm}>
                <Text style={{ color: '#969696' }}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onCancel}
                style={{ marginLeft: 24 }}
              >
                <Text style={{ color: '#f8b500' }}>确认</Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        }
      />
    )
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

  render() {
    const { currentPending } = this.props.TradeStore
    return (
      <SafeAreaView style={[styles.page_box]}>
        <Table column={this.column} dataSource={currentPending} />
        {this.renderModal()}
        {this.renderConfirm()}
      </SafeAreaView>
    )
  }
}

export default Pending
