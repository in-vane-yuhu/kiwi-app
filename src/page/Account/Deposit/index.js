import React, { Component, Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import QRCode from 'react-native-qrcode-svg'

import styles from '../../../style'

class Deposit extends Component {
  state = {
    addr_btc: '1P8TbFfvxv5KWeMJ8GNnjJ5W73XCWEocfC',
    addr_erc: 'uv8909vs90sd90vs90vs09v09v90dav90a',
    addr_trc: 'TWMEF7ufpSB4j44QFoK3SETzAwiepK4QeV',
  }

  renderCard = (title, addr) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: '#c8c8c8',
          padding: 16,
          width: '90%',
          marginBottom: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold', marginBottom: 16, fontSize: 24 }}>
          {title}
        </Text>
        <QRCode value={addr} size={200} />
        <Text ellipsizeMode='tail' style={{ marginTop: 16 }}>
          {addr}
        </Text>
      </View>
    )
  }

  renderAddress = () => {
    const { symbol } = this.props
    console.log(symbol)
    const { addr_btc, addr_erc, addr_trc } = this.state

    switch (symbol) {
      case 'BTC':
        return this.renderCard(<FormattedMessage id='btcAddress' />, addr_btc)
      case 'ETH':
        return this.renderCard(<FormattedMessage id='ethAddress' />, addr_erc)
      case 'BCH':
        return (
          <Fragment>
            {this.renderCard(<FormattedMessage id='btcAddress' />, addr_btc)}
            {this.renderCard(<FormattedMessage id='ethAddress' />, addr_erc)}
            {this.renderCard(<FormattedMessage id='bchAddress' />, addr_trc)}
          </Fragment>
        )
      default:
        break
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.page_box]}>
        <ScrollView>
          <View
            style={{
              padding: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {this.renderAddress()}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default Deposit
