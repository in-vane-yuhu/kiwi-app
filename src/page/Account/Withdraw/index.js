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

import styles from '../../../style'

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
        总额：<Text style={{ color: '#c8c8c8' }}>0.000000</Text>
      </Text>
      <Text style={{ marginBottom: 8 }}>
        可用：<Text style={{ color: '#c8c8c8' }}>0.000000</Text>
      </Text>
      <Text>
        冻结：<Text style={{ color: '#c8c8c8' }}>0.000000</Text>
      </Text>
    </View>
  )

  renderForm = () => {
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
          placeholder='地址'
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
          placeholder='数量'
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
          placeholder='资金密码'
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
            placeholder='邮箱验证码'
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
            <Text style={{ color: '#f8b500' }}>发送</Text>
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
            手续费：<Text style={{ color: '#c8c8c8' }}>0.0000</Text>
          </Text>
          <Text>
            到账：<Text style={{ color: '#c8c8c8' }}>0.0000</Text>
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
          <Text style={[styles.login_btn_text]}>提交</Text>
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
        <Text style={{ marginLeft: 8 }}>最小提现金额5BCH。</Text>
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
          请务必确认手机及周边安全，防止信息被篡改或泄露。
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
          为保障资金安全，当您账户安全策略变更、密码修改、我们会对提币进行人工审核，请耐心等待工作人员电话或邮件联系。
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
