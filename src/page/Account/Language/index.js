import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import { Checkbox } from '@ant-design/react-native'
import { FormattedMessage } from 'react-intl'
import * as CONST from '../../../style/constant'

const languageList = [
  { label: '简体中文', key: 'zh' },
  { label: 'English', key: 'en' },
  { label: '한국어', key: 'ko' },
]

@inject('AccountStore')
@observer
class Language extends Component {
  state = {
    checked: 'zh',
  }

  componentDidMount = async () => {
    const { locale } = this.props.AccountStore
    this.setState({ checked: locale })
  }

  onCheck = key => {
    const { setLanguage } = this.props.AccountStore
    switch (key) {
      case 'zh':
        this.setState({ checked: 'zh' })
        setLanguage('zh')
        break
      case 'en':
        this.setState({ checked: 'en' })
        setLanguage('en')
        break
      case 'ko':
        this.setState({ checked: 'ko' })
        setLanguage('ko')
        break

      default:
        break
    }
  }

  render() {
    const { checked } = this.state
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: CONST.N0,
          justifyContent: 'space-between',
        }}
      >
        <View style={{ marginTop: 40 }}>
          {languageList.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                width: '80%',
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: CONST.N200,
                borderRadius: 4,
                justifyContent: 'space-between',
                alignSelf: 'center',
                height: 80,
                padding: 16,
                marginBottom: 32,
              }}
              onPress={() => this.onCheck(item.key)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 16 }}>{item.label}</Text>
              </View>
              <Checkbox
                style={{ color: CONST.PRIMARY }}
                checked={checked === item.key}
              />
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    )
  }
}

export default Language
