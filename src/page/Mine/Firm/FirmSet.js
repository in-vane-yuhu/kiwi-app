import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Icon } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

@inject('FirmStore')
@observer
export default class ApiAccess extends Component {
  onChange = (index, childIndex) => {
    const { updateFirmSetting } = this.props.FirmStore
    updateFirmSetting(index, childIndex)
  }

  render() {
    const { firm_set } = this.props.FirmStore
    return (
      <View
        style={[styles.page_box, { paddingHorizontal: 16, paddingTop: 24 }]}
      >
        {firm_set.map((item, index) => (
          <View key={index} style={[styles.firm_set_item_box]}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <View style={[styles.firm_set_radio_box]}>
              {item.children.map((child, childIndex) => (
                <TouchableOpacity
                  key={childIndex}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => this.onChange(index, childIndex)}
                >
                  <Icon
                    name={child.checked ? 'check-circle' : 'border'}
                    color={child.checked ? CONST.PRIMARY : ''}
                  />
                  <Text style={{ marginLeft: 5, color: CONST.N96 }}>
                    {child.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    )
  }
}
