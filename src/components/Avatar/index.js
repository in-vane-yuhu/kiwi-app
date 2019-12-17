import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import Identicon from 'identicon.js'
import md5 from 'blueimp-md5'

export default class Statistic extends Component {
  static propTypes = {
    source: PropTypes.any,
    size: PropTypes.any,
    id: PropTypes.any,
  }

  static defaultProps = {
    size: 50,
  }

  render() {
    const { source, size, id } = this.props
    const uri = id
      ? {
          uri: `data:image/svg+xml;base64,${new Identicon(
            md5(id || 0),
            420
          ).toString()}`,
        }
      : source
    return (
      <Image
        source={uri}
        style={{ height: size, width: size, borderRadius: size / 2 }}
      />
    )
  }
}
