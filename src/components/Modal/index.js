import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Text, View } from 'react-native'
import { Icon } from '@ant-design/react-native'

export default class KModal extends Component {
  static propTypes = {
    title: PropTypes.any,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    ctx: PropTypes.any,
  }

  static defaultProps = {
    title: '',
    visible: false,
    ctx: () => null,
  }

  render() {
    const { title, visible, onClose, ctx } = this.props
    return (
      <Modal
        animationType='fade'
        transparent
        visible={visible}
        onRequestClose={this.hideModal}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}
        >
          <View
            style={{
              height: '80%',
              width: '80%',
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#c8c8c8',
              borderRadius: 8,
            }}
          >
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: '#c8c8c8',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingVertical: 16,
                paddingHorizontal: 24,
              }}
            >
              <Text style={{ fontWeight: 'bold' }}>{title}</Text>
              <Icon name='close' onPress={onClose} />
            </View>
            <View style={{ padding: 24 }}>{ctx}</View>
          </View>
        </View>
      </Modal>
    )
  }
}
