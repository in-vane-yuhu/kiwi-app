import React, { Component, Fragment } from 'react'
import { Icon } from '@ant-design/react-native'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import { observer, inject } from 'mobx-react'
import styles from '../../../../style'

import Table from '../../../../components/Table'
import KModal from '../../../../components/Modal'

@inject('TradeStore')
@observer
class Pending extends Component {
  state = {
    visible: false,
    detail: '',
    tabIndex: 0,
    tabRoute: [
      { key: 'all', title: '全站成交' },
      { key: 'mine', title: '我的成交' },
    ],
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
            <Text style={{ marginBottom: 16 }}>
              成交均价：{detail.avgPrice}
            </Text>
            <Text style={{ marginBottom: 16 }}>数量：{detail.amount}</Text>
            <Text style={{ marginBottom: 16 }}>
              费率：{`${detail.deal_fee}%`}
            </Text>
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

  renderScene = ({ route }) => {
    const { deals, currentFinished } = this.props.TradeStore
    switch (route.key) {
      case 'all':
        return (
          <View style={{ maxHeight: 400 }}>
            <Table column={this.column} dataSource={deals} />
          </View>
        )
      case 'mine':
        return <Table column={this.columnMine} dataSource={currentFinished} />
      default:
        return null
    }
  }

  renderTabbar = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ color: '#c8c8c8' }}
      indicatorStyle={{ backgroundColor: '#f8b500' }}
    />
  )

  setIndex = index => {
    this.setState({ tabIndex: index })
  }

  render() {
    const { tabIndex, tabRoute } = this.state
    return (
      <SafeAreaView style={[styles.page_box]}>
        <TabView
          navigationState={{ index: tabIndex, routes: tabRoute }}
          renderScene={this.renderScene}
          onIndexChange={this.setIndex}
          renderTabBar={this.renderTabbar}
        />
        {this.renderModal()}
      </SafeAreaView>
    )
  }
}

export default Pending
