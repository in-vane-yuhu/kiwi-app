import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

const flat = ['资产设置', '持仓设置', '操作设置']
const sets = ['公开', '订阅者可见', '仅自己可见']

@inject('FirmStore')
@observer
export default class ApiAccess extends Component {
  state = {
    param_assets: 1,
    param_position: 1,
    param_operation: 1,
  }

  componentDidMount = async () => {
    const { getFirmSetting } = this.props.FirmStore
    const res = await getFirmSetting()
    this.setState({
      param_assets: res.param_assets,
      param_position: res.param_position,
      param_operation: res.param_operation,
    })
  }

  onChange = (index, childIndex) => {
    switch (index) {
      case 0:
        this.setState({ param_assets: childIndex + 1 })
        break
      case 1:
        this.setState({ param_position: childIndex + 1 })
        break
      case 2:
        this.setState({ param_operation: childIndex + 1 })
        break

      default:
        break
    }
  }

  setIcon = (index, childIndex) => {
    const { param_assets, param_position, param_operation } = this.state
    switch (index) {
      case 0:
        return childIndex + 1 === param_assets ? 'check-circle' : 'border'
      case 1:
        return childIndex + 1 === param_position ? 'check-circle' : 'border'
      case 2:
        return childIndex + 1 === param_operation ? 'check-circle' : 'border'

      default:
        return 'border'
    }
  }

  setColor = (index, childIndex) => {
    const { param_assets, param_position, param_operation } = this.state
    switch (index) {
      case 0:
        return childIndex + 1 === param_assets ? CONST.PRIMARY : ''
      case 1:
        return childIndex + 1 === param_position ? CONST.PRIMARY : ''
      case 2:
        return childIndex + 1 === param_operation ? CONST.PRIMARY : ''

      default:
        return ''
    }
  }

  onSubmit = () => {
    const { param_assets, param_position, param_operation } = this.state
    const { setFirmSetting } = this.props.FirmStore
    setFirmSetting(param_assets, param_position, param_operation)
  }

  render() {
    return (
      <View
        style={[
          styles.page_box,
          {
            paddingHorizontal: 16,
            paddingTop: 24,
            justifyContent: 'space-between',
          },
        ]}
      >
        <View>
          {flat.map((item, index) => (
            <View key={index} style={[styles.firm_set_item_box]}>
              <Text style={{ fontSize: 16 }}>{item}</Text>
              <View style={[styles.firm_set_radio_box]}>
                {sets.map((child, childIndex) => (
                  <TouchableOpacity
                    key={childIndex}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => this.onChange(index, childIndex)}
                  >
                    <Icon
                      name={this.setIcon(index, childIndex)}
                      color={this.setColor(index, childIndex)}
                    />
                    <Text style={{ marginLeft: 5, color: CONST.N96 }}>
                      {child}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.api_access_sticky_btn]}
          onPress={this.onSubmit}
        >
          <Text style={{ color: CONST.N0 }}>保存修改</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
