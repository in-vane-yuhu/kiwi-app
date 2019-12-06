import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

export default class Statistic extends Component {
  static propTypes = {
    source: PropTypes.any,
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 50,
  }

  render() {
    const { source, size } = this.props
    return (
      <Image
        source={source}
        style={{ height: size, width: size, borderRadius: size / 2 }}
      />
    )
  }
}
