import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl,
} from 'react-native'
import { Picker, Icon } from '@ant-design/react-native'
import { TabView, TabBar } from 'react-native-tab-view'
import Table from '../../../components/Table'

import Pending from './Pending'
import Deals from './Deals'
import Chart from './Chart'

import styles from '../../../style'
import { Actions } from 'react-native-router-flux'

@inject('TradeStore')
@observer
class MainBoard extends Component {
  state = {
    ws: new WebSocket('ws://47.56.8.19:19090'),
    pair: ['BTCBCH'],
    type: 'limit',
    side: 'buy',
    param_price: '',
    param_amount: '',
    tabOrderIndex: 0,
    tabOrderRoute: [
      { key: 'limit', title: '限价' },
      { key: 'market', title: '市价' },
    ],
    tabBtmIndex: 0,
    tabBtmRoute: [
      { key: 'pending', title: '当前委托' },
      { key: 'deals', title: '最新成交' },
      { key: 'chart', title: '图表' },
    ],
    isRefreshing: false,
  }
  columnBuy = [
    {
      title: '方向',
      align: 'flex-end',
      width: '16%',
      render: item => <Text style={{ color: '#66c322' }}>买</Text>,
    },
    {
      title: '价格',
      align: 'center',
      width: '42%',
      render: item => <Text style={{ color: '#66c322' }}>{item[0]}</Text>,
    },
    {
      title: '数量',
      align: 'center',
      width: '42%',
      render: item => <Text style={{ color: '#323232' }}>{item[1]}</Text>,
    },
  ]
  columnSell = [
    {
      title: '方向',
      align: 'flex-end',
      width: '16%',
      render: item => <Text style={{ color: '#e9686d' }}>卖</Text>,
    },
    {
      title: '价格',
      align: 'center',
      width: '42%',
      render: item => <Text style={{ color: '#e9686d' }}>{item[0]}</Text>,
    },
    {
      title: '数量',
      align: 'center',
      width: '42%',
      render: item => <Text style={{ color: '#323232' }}>{item[1]}</Text>,
    },
  ]

  componentDidMount = () => {
    const {
      onOpen,
      getMarketList,
      getBalanceBCH,
      getBalanceBTC,
    } = this.props.TradeStore
    const { ws } = this.state
    onOpen(ws)
    getMarketList()
    getBalanceBCH()
    getBalanceBTC()
  }

  componentWillUnmount = () => {
    const { ws } = this.state
    ws.close()
  }

  onSelectPair = value => {
    this.setState({ pair: value })
  }

  onSelectSide = value => {
    this.setState({ side: value })
  }

  onTabChange = tab => {
    this.setState({ type: tab.key })
  }

  setParamPrice = text => {
    this.setState({ param_price: text })
  }

  setParamAmount = text => {
    this.setState({ param_amount: text })
  }

  renderPairPicker = () => {
    const { marketList } = this.props.TradeStore
    const { pair } = this.state
    return (
      <Picker
        title='交易对'
        onChange={this.onSelectPair}
        value={pair}
        data={marketList}
        cols={1}
      >
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
            padding: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>{pair[0]}</Text>
          <Icon name='caret-down' />
        </TouchableOpacity>
      </Picker>
    )
  }

  renderSelectType = () => {
    const { side } = this.state
    return (
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <TouchableOpacity
          style={{
            width: '50%',
            paddingVertical: 8,
            paddingHorizontal: 16,
            alignItems: 'center',
            backgroundColor: side === 'buy' ? '#66c322' : '#fff',
            borderWidth: side === 'buy' ? 0 : 1,
            borderColor: side === 'buy' ? '#fff' : '#c8c8c8',
          }}
          onPress={() => this.onSelectSide('buy')}
        >
          <Text style={{ color: side === 'buy' ? '#fff' : '#c8c8c8' }}>
            买入
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            paddingVertical: 8,
            paddingHorizontal: 16,
            alignItems: 'center',
            backgroundColor: side === 'sell' ? '#e9686d' : '#fff',
            borderWidth: side === 'sell' ? 0 : 1,
            borderColor: side === 'sell' ? '#fff' : '#c8c8c8',
          }}
          onPress={() => this.onSelectSide('sell')}
        >
          <Text style={{ color: side === 'sell' ? '#fff' : '#c8c8c8' }}>
            卖出
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderIptPrice = () => {
    const { param_price } = this.state
    return (
      <TextInput
        placeholder='委托价格'
        keyboardType='number-pad'
        style={{
          borderWidth: 1,
          borderColor: '#eee',
          height: 40,
          borderRadius: 8,
          paddingHorizontal: 8,
          marginTop: 24,
        }}
        value={param_price}
        onChangeText={this.setParamPrice}
      />
    )
  }

  renderIptAmount = () => {
    const { param_amount } = this.state
    return (
      <TextInput
        placeholder='委托数量'
        keyboardType='number-pad'
        style={{
          borderWidth: 1,
          borderColor: '#eee',
          height: 40,
          borderRadius: 8,
          paddingHorizontal: 8,
          marginTop: 24,
        }}
        value={param_amount}
        onChangeText={this.setParamAmount}
      />
    )
  }

  renderBalanceBTC = () => {
    const { balance_BTC } = this.props.TradeStore
    return <Text style={{ color: '#969696' }}>{`BTC：${balance_BTC}`}</Text>
  }

  renderBalanceBCH = () => {
    const { balance_BCH } = this.props.TradeStore
    return <Text style={{ color: '#969696' }}>{`BCH：${balance_BCH}`}</Text>
  }

  renderOrderBtn = () => {
    const { type, side } = this.state
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          paddingVertical: 8,
          paddingHorizontal: 16,
          alignItems: 'center',
          backgroundColor: side === 'buy' ? '#66c322' : '#e9686d',
          marginTop: 40,
        }}
        onPress={type === 'limit' ? this.onSubmitLimit : this.onSubmitMarket}
      >
        <Text style={{ color: '#fff' }}>
          {side === 'buy' ? '买入（BCH→BTC）' : '卖出（BTC→BCH）'}
        </Text>
      </TouchableOpacity>
    )
  }

  onSubmitLimit = () => {
    const { putLimitOrder } = this.props.TradeStore
    const { side, param_price, param_amount } = this.state
    /* side:  1 sell  2 buy */
    putLimitOrder('BTCBCH', side === 'sell' ? 1 : 2, param_price, param_amount)
    this.setState({ param_price: '', param_amount: '' })
  }

  onSubmitMarket = () => {
    const { putMarketOrder } = this.props.TradeStore
    const { side, param_amount } = this.state
    /* side:  1 sell  2 buy */
    putMarketOrder('BTCBCH', side === 'sell' ? 1 : 2, param_amount)
    this.setState({ param_price: '', param_amount: '' })
  }

  renderLimit = () => {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        {this.renderSelectType()}
        {this.renderIptPrice()}
        {this.renderIptAmount()}
        <Text style={{ color: '#969696', marginTop: 24 }}>
          可用{this.renderBalanceBCH()}
        </Text>
        <Text style={{ color: '#969696', marginTop: 8 }}>
          已有{this.renderBalanceBTC()}
        </Text>
        {this.renderOrderBtn()}
      </View>
    )
  }

  renderMarket = () => {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        {this.renderSelectType()}
        <TextInput
          placeholder='最优价格'
          editable={false}
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            height: 40,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginTop: 24,
          }}
        />
        {this.renderIptAmount()}
        <Text style={{ color: '#969696', marginTop: 24 }}>
          可用{this.renderBalanceBTC()}
        </Text>
        <Text style={{ color: '#969696', marginTop: 8 }}>
          已有{this.renderBalanceBCH()}
        </Text>
        {this.renderOrderBtn()}
      </View>
    )
  }

  renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        height: 24,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
    >
      <Text style={{ width: '16%' }} />
      <Text
        style={{
          width: '42%',
          color: '#c8c8c8',
          textAlign: 'center',
        }}
      >
        价格
      </Text>
      <Text
        style={{
          width: '42%',
          color: '#c8c8c8',
          textAlign: 'center',
        }}
      >
        数量
      </Text>
    </View>
  )

  renderStatus = () => {
    const { status } = this.props.TradeStore
    const close = Number(status.close)
    const last = Number(status.last)
    const decimal = (close - last) / last
    const percent = decimal ? (((close - last) / last) * 100).toFixed(2) : 0
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 30,
          borderWidth: 1,
          borderColor: '#eee',
          borderLeftWidth: 0,
          borderRightWidth: 0,
          paddingHorizontal: 8,
        }}
      >
        <Text
          style={{
            color:
              Number(status.close) - Number(status.last) < 0
                ? '#d45858'
                : '#25796a',
            fontSize: 18,
          }}
        >
          {status.close}
        </Text>
        <Text
          style={{
            color:
              Number(status.close) - Number(status.last) < 0
                ? '#d45858'
                : '#25796a',
          }}
        >{`${percent}%`}</Text>
      </View>
    )
  }

  setParamForm = item => {
    this.setState({ param_price: item[0], param_amount: item[1] })
  }

  renderBook = () => {
    const { bookAsks, bookBids } = this.props.TradeStore
    return (
      <Fragment>
        {this.renderHeader()}
        <View style={{ height: 200, justifyContent: 'flex-end' }}>
          <Table
            column={this.columnSell}
            dataSource={bookAsks}
            headerStyle={{ paddingVertical: 8 }}
            headerTextStyle={{ color: '#c8c8c8' }}
            rowStyle={{ paddingVertical: 2, borderBottomWidth: 0 }}
            showHeader={false}
            onPressRow={this.setParamForm}
          />
        </View>
        {this.renderStatus()}
        <View style={{ height: 200, justifyContent: 'flex-start' }}>
          <Table
            isScrollToEnd={true}
            column={this.columnBuy}
            dataSource={bookBids}
            headerStyle={{ paddingVertical: 8 }}
            headerTextStyle={{ color: '#c8c8c8' }}
            rowStyle={{ paddingVertical: 2, borderBottomWidth: 0 }}
            showHeader={false}
            onPressRow={this.setParamForm}
          />
        </View>
      </Fragment>
    )
  }

  renderOrderScene = ({ route }) => {
    switch (route.key) {
      case 'limit':
        return this.renderLimit()
      case 'market':
        return this.renderMarket()
      default:
        return null
    }
  }

  renderBtmScene = ({ route }) => {
    const { ws } = this.state
    switch (route.key) {
      case 'pending':
        return <Pending />
      case 'deals':
        return <Deals />
      case 'chart':
        return <Chart ws={ws} />
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

  setOrderIndex = index => {
    this.setState({ tabOrderIndex: index })
  }

  setBtmIndex = index => {
    this.setState({ tabBtmIndex: index })
  }

  onRefresh = () => {
    Actions.refresh()
  }

  render() {
    const {
      tabOrderIndex,
      tabOrderRoute,
      tabBtmIndex,
      tabBtmRoute,
      isRefreshing,
    } = this.state
    return (
      <SafeAreaView style={[styles.page_box]}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.renderPairPicker()}
          <View
            style={{
              flexDirection: 'row',
              height: 466,
              borderBottomWidth: 10,
              borderBottomColor: '#eee',
            }}
          >
            <View style={{ width: '50%' }}>
              <TabView
                navigationState={{
                  index: tabOrderIndex,
                  routes: tabOrderRoute,
                }}
                renderScene={this.renderOrderScene}
                onIndexChange={this.setOrderIndex}
                renderTabBar={this.renderTabbar}
              />
            </View>
            <View
              style={{
                width: '50%',
                borderLeftWidth: 1,
                borderLeftColor: '#eee',
              }}
            >
              {this.renderBook()}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <TabView
              navigationState={{ index: tabBtmIndex, routes: tabBtmRoute }}
              renderScene={this.renderBtmScene}
              onIndexChange={this.setBtmIndex}
              renderTabBar={this.renderTabbar}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default MainBoard
