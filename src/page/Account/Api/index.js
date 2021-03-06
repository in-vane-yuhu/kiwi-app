import React, { Component, Fragment } from 'react'
import { Icon } from '@ant-design/react-native'
import { SafeAreaView, Text, TouchableOpacity } from 'react-native'
import { FormattedMessage } from 'react-intl'
import styles from '../../../style'
import * as CONST from '../../../style/constant'

import Table from '../../../components/Table'
import KModal from '../../../components/Modal'

const data = [
  {
    time: '2020-02-16 17:24:09',
    key: 'f732f293-2ae5-11ea-bb2c-00163e080cb2',
    secret: 'f732f293-2ae5-11ea-bb2c-00163e080cb2',
  },
  {
    time: '2020-02-16 17:24:09',
    key: 'f732f293-2ae5-11ea-bb2c-00163e080cb2',
    secret: 'f732f293-2ae5-11ea-bb2c-00163e080cb2',
  },
  {
    time: '2020-02-16 17:24:09',
    key: 'f732f293-2ae5-11ea-bb2c-00163e080cb2',
    secret: 'f732f293-2ae5-11ea-bb2c-00163e080cb2',
  },
]

class Api extends Component {
  state = {
    visible: false,
    detail: '',
  }

  column = [
    {
      title: <FormattedMessage id='time' />,
      dataIndex: 'time',
      align: 'center',
      width: '40%',
    },
    { title: 'Key', dataIndex: 'key', align: 'center', width: '25%' },
    { title: 'Secret', dataIndex: 'secret', align: 'center', width: '25%' },
    {
      title: <FormattedMessage id='detail' />,
      align: 'center',
      width: '10%',
      render: item => (
        <TouchableOpacity>
          <Icon name='search' onPress={() => this.showModal(item)} />
        </TouchableOpacity>
      ),
    },
  ]

  showModal = item => {
    this.setState({ visible: true, detail: item })
  }

  hideModal = () => {
    this.setState({ visible: false })
  }

  renderModal = () => {
    const { visible, detail } = this.state
    return (
      <KModal
        title={<FormattedMessage id='apiDetail' />}
        visible={visible}
        onClose={this.hideModal}
        ctx={
          <Fragment>
            <Text style={{ marginBottom: 16 }}>
              <FormattedMessage id='time' />：{detail.time}
            </Text>
            <Text style={{ marginBottom: 16 }}>Key：{detail.key}</Text>
            <Text style={{ marginBottom: 16 }}>Secret：{detail.secret}</Text>
          </Fragment>
        }
      />
    )
  }

  render() {
    return (
      <SafeAreaView style={[styles.page_box]}>
        <TouchableOpacity
          style={{
            width: 100,
            height: 32,
            borderRadius: 4,
            backgroundColor: CONST.PRIMARY,
            alignSelf: 'flex-start',
            justifyContent: 'center',
            marginVertical: 16,
            marginHorizontal: 16,
          }}
          onPress={this.newApi}
        >
          <Text style={[styles.login_btn_text]}>
            <FormattedMessage id='newAPI' />
          </Text>
        </TouchableOpacity>
        <Table
          column={this.column}
          dataSource={data}
          style={{ borderTopWidth: 1, borderTopColor: '#c8c8c8' }}
        />
        {this.renderModal()}
      </SafeAreaView>
    )
  }
}

export default Api
