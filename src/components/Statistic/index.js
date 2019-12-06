import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'

import * as CONST from '../../style/constant'
import styles from '../../style'

export default class Statistic extends Component {
  static propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    sign: PropTypes.oneOf(['plus', 'minus', 'none']),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    sign: 'none',
  }

  renderColor = sign => {
    switch (sign) {
      case 'plus':
        return CONST.GREEN
      case 'minus':
        return CONST.RED
      case 'none':
        return CONST.N32

      default:
        return CONST.N32
    }
  }

  render() {
    const { title, value, sign, width } = this.props
    return (
      <View style={{ alignItems: 'center', width: width }}>
        <Text style={{ fontSize: 12, color: CONST.N96 }}>{title}</Text>
        <Text style={[styles.statistic, { color: this.renderColor(sign) }]}>
          {value}
        </Text>
      </View>
    )
  }
}
