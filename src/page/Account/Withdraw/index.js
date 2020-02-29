import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Icon } from '@ant-design/react-native'
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { FormattedMessage, injectIntl } from 'react-intl'

import styles from '../../../style'

@inject('TradeStore')
@observer
@injectIntl
class Withdraw extends Component {
  renderFunds = () => (
    <View
      style={{
        margin: 24,
        marginBottom: 0,
        padding: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#c8c8c8',
      }}
    >
      <Text style={{ marginBottom: 8 }}>
        <FormattedMessage id='with_total' />：
        <Text style={{ color: '#c8c8c8' }}>0.000000</Text>
      </Text>
      <Text style={{ marginBottom: 8 }}>
        <FormattedMessage id='available' />：
        <Text style={{ color: '#c8c8c8' }}>0.000000</Text>
      </Text>
      <Text>
        <FormattedMessage id='freeze' />：
        <Text style={{ color: '#c8c8c8' }}>0.000000</Text>
      </Text>
    </View>
  )

  renderForm = () => {
    const { formatMessage } = this.props.intl
    return (
      <View
        style={{
          margin: 24,
          marginBottom: 0,
          padding: 16,
          borderRadius: 4,
          borderWidth: 1,
          borderColor: '#c8c8c8',
        }}
      >
        <TextInput
          placeholder={formatMessage({ id: 'address' })}
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            height: 40,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: 16,
          }}
          onChangeText={this.setParamAddr}
        />
        <TextInput
          placeholder={formatMessage({ id: 'amount' })}
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            height: 40,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: 16,
          }}
          keyboardType='number-pad'
          onChangeText={this.setParamAddr}
        />
        <TextInput
          placeholder={formatMessage({ id: 'fundsPwd' })}
          style={{
            borderWidth: 1,
            borderColor: '#eee',
            height: 40,
            borderRadius: 8,
            paddingHorizontal: 8,
            marginBottom: 16,
          }}
          onChangeText={this.setParamAddr}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            placeholder={formatMessage({ id: 'placeholder_captcha' })}
            style={{
              borderWidth: 1,
              borderColor: '#eee',
              height: 40,
              borderRadius: 8,
              paddingHorizontal: 8,
              width: '70%',
            }}
            onChangeText={this.setParamCaptcha}
            keyboardType='number-pad'
          />
          <TouchableOpacity
            style={{
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: '#eee',
              width: '25%',
              height: 40,
              borderRadius: 8,
              paddingHorizontal: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={this.getCaptcha}
          >
            <Text style={{ color: '#f8b500' }}>
              <FormattedMessage id='send' />
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text>
            <FormattedMessage id='fee' />：
            <Text style={{ color: '#c8c8c8' }}>0.0000</Text>
          </Text>
          <Text>
            <FormattedMessage id='arrive' />：
            <Text style={{ color: '#c8c8c8' }}>0.0000</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: '70%',
            height: 40,
            borderRadius: 20,
            backgroundColor: '#f8b500',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 24,
          }}
          onPress={this.checkForm}
        >
          <Text style={[styles.login_btn_text]}>
            <FormattedMessage id='submit' />
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderTipCard = () => (
    <View
      style={{
        margin: 24,
        padding: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#c8c8c8',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Icon name='info-circle' style={{ color: '#f8b500' }} />
        <Text style={{ marginLeft: 8 }}>
          <FormattedMessage id='tip_min' />
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: 16,
        }}
      >
        <Icon name='info-circle' style={{ color: '#f8b500' }} />
        <Text style={{ marginLeft: 8 }}>
          <FormattedMessage id='tip_security' />
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginTop: 16,
        }}
      >
        <Icon name='info-circle' style={{ color: '#f8b500' }} />
        <Text style={{ marginLeft: 8 }}>
          <FormattedMessage id='tip_wait' />
        </Text>
      </View>
    </View>
  )

  render() {
    return (
      <SafeAreaView style={[styles.page_box]}>
        <ScrollView>
          {this.renderFunds()}
          {this.renderForm()}
          {this.renderTipCard()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default Withdraw
