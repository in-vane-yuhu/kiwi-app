import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Toast } from '@ant-design/react-native'
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('AccountStore')
@observer
class Nickname extends Component {
  state = { param_nickName: '' }

  setParamNickName = text => {
    this.setState({ param_nickName: text })
  }

  onPress = () => {
    const { param_nickName } = this.state
    const reg = /^.{1,18}$/
    if (!param_nickName) {
      Toast.fail('昵称不能为空', 1)
      return
    }
    if (!reg.test(param_nickName)) {
      Toast.fail('昵称长度小于18位', 1)
      return
    }

    this.doModifyNickname()
  }

  doModifyNickname = () => {
    const { updateNickname } = this.props.AccountStore
    const { param_nickName } = this.state
    updateNickname(param_nickName)
  }

  render() {
    const { user } = this.props.AccountStore
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView
          style={[styles.page_box, { justifyContent: 'space-between' }]}
        >
          <View style={{ padding: 16, paddingLeft: 24, paddingRight: 24 }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: CONST.N238,
                height: 40,
                borderRadius: 8,
                paddingHorizontal: 8,
                marginTop: 40,
              }}
              placeholder={user.nickname}
              onChangeText={this.setParamNickName}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: CONST.PRIMARY,
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
              height: 40,
              borderRadius: 25,
              marginBottom: 40,
            }}
            onPress={this.onPress}
          >
            <Text
              style={{ color: CONST.N0, alignSelf: 'center', fontSize: 18 }}
            >
              保存
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    )
  }
}

export default Nickname
