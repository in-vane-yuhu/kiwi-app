import React, { Component, Fragment } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Picker, Icon, Tabs } from '@ant-design/react-native'
import Table from '../../../components/Table'

import Pending from './Pending'
import Deals from './Deals'
import Chart from './Chart'

import styles from '../../../style'

const tabs = [
  {
    title: (
      <Text>
        <FormattedMessage id='limit' />
      </Text>
    ),
    key: 'limit',
  },
  {
    title: (
      <Text>
        <FormattedMessage id='market' />
      </Text>
    ),
    key: 'market',
  },
]
const tabsBtm = [
  {
    title: (
      <Text>
        <FormattedMessage id='pendingOrder' />
      </Text>
    ),
  },
  {
    title: (
      <Text>
        <FormattedMessage id='newDeal' />
      </Text>
    ),
  },
  {
    title: (
      <Text>
        <FormattedMessage id='chart' />
      </Text>
    ),
  },
]

@inject('TradeStore')
@observer
@injectIntl
class MainBoard extends Component {
  state = {
    ws: new WebSocket('ws://47.56.8.19:19090'),
    pair: ['BTCBCH'],
    type: 'limit',
    side: 'buy',
    param_price: '',
    param_amount: '',
  }
  columnBuy = [
    {
      title: <FormattedMessage id='side' />,
      align: 'flex-end',
      width: '16%',
      render: item => (
        <Text style={{ color: '#66c322' }}>
          <FormattedMessage id='buy' />
        </Text>
      ),
    },
    {
      title: <FormattedMessage id='price' />,
      align: 'center',
      width: '42%',
      render: item => <Text style={{ color: '#66c322' }}>{item[0]}</Text>,
    },
    {
      title: <FormattedMessage id='amount' />,
      align: 'center',
      width: '42%',
      render: item => <Text style={{ color: '#323232' }}>{item[1]}</Text>,
    },
  ]
  columnSell = [
    {
      title: <FormattedMessage id='side' />,
      align: 'flex-end',
      width: '16%',
      render: item => (
        <Text style={{ color: '#e9686d' }}>
          <FormattedMessage id='sell' />
        </Text>
      ),
    },
    {
      title: <FormattedMessage id='price' />,
      align: 'center',
      width: '42%',
      render: item => <Text style={{ color: '#e9686d' }}>{item[0]}</Text>,
    },
    {
      title: <FormattedMessage id='amount' />,
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
        title={<FormattedMessage id='pair' />}
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
            <FormattedMessage id='buy' />
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
            <FormattedMessage id='sell' />
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderIptPrice = () => {
    const { param_price } = this.state
    const { formatMessage } = this.props.intl
    return (
      <TextInput
        placeholder={formatMessage({ id: 'orderPrice' })}
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
    const { formatMessage } = this.props.intl
    return (
      <TextInput
        placeholder={formatMessage({ id: 'orderAmount' })}
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
          {side === 'buy' ? (
            <FormattedMessage id='btnBuy' />
          ) : (
            <FormattedMessage id='btnSell' />
          )}
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
      <Fragment>
        {this.renderSelectType()}
        {this.renderIptPrice()}
        {this.renderIptAmount()}
        <Text style={{ color: '#969696', marginTop: 24 }}>
          <FormattedMessage id='available' />
          {this.renderBalanceBCH()}
        </Text>
        <Text style={{ color: '#969696', marginTop: 8 }}>
          <FormattedMessage id='own' />
          {this.renderBalanceBTC()}
        </Text>
        {this.renderOrderBtn()}
      </Fragment>
    )
  }

  renderMarket = () => {
    const { formatMessage } = this.props.intl
    return (
      <Fragment>
        {this.renderSelectType()}
        <TextInput
          placeholder={formatMessage({ id: 'best' })}
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
          <FormattedMessage id='available' />
          {this.renderBalanceBTC()}
        </Text>
        <Text style={{ color: '#969696', marginTop: 8 }}>
          <FormattedMessage id='own' />
          {this.renderBalanceBCH()}
        </Text>
        {this.renderOrderBtn()}
      </Fragment>
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
        <FormattedMessage id='price' />
      </Text>
      <Text
        style={{
          width: '42%',
          color: '#c8c8c8',
          textAlign: 'center',
        }}
      >
        <FormattedMessage id='amount' />
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

  render() {
    const { ws } = this.state
    return (
      <SafeAreaView style={[styles.page_box]}>
        <ScrollView>
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
              <Tabs
                tabs={tabs}
                tabBarUnderlineStyle={{ backgroundColor: '#f8b500' }}
                tabBarActiveTextColor='#f8b500'
                tabBarInactiveTextColor='#c8c8c8'
                onChange={this.onTabChange}
              >
                <View key='limit' style={{ padding: 16 }}>
                  {this.renderLimit()}
                </View>
                <View key='market' style={{ padding: 16 }}>
                  {this.renderMarket()}
                </View>
              </Tabs>
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
            <Tabs
              tabs={tabsBtm}
              tabBarUnderlineStyle={{ backgroundColor: '#f8b500' }}
              tabBarActiveTextColor='#f8b500'
              tabBarInactiveTextColor='#c8c8c8'
            >
              <View key='pending'>
                <Pending />
              </View>
              <View key='deal'>
                <Deals />
              </View>
              <View key='chart'>
                <Chart ws={ws} />
              </View>
            </Tabs>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default MainBoard
