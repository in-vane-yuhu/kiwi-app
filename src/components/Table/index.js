import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FlatList, Text, View, TouchableOpacity } from 'react-native'
import { toJS } from 'mobx'

import Empty from '../Empty'

export default class Table extends Component {
  static propTypes = {
    column: PropTypes.array,
    dataSource: PropTypes.array,
    headerStyle: PropTypes.any,
    headerTextStyle: PropTypes.any,
    rowStyle: PropTypes.any,
    rowTextStyle: PropTypes.any,
    showHeader: PropTypes.bool,
    onPressRow: PropTypes.any,
  }

  static defaultProps = {
    column: [],
    dataSource: [],
    headerStyle: {},
    headerTextStyle: {},
    rowStyle: {},
    rowTextStyle: {},
    showHeader: true,
    onPressRow: () => {},
  }

  renderHeaderItem = (item, index) => {
    const { headerStyle, headerTextStyle } = this.props
    return (
      <View
        key={index.toString()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: item.align,
          width: item.width,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          ...headerStyle,
        }}
      >
        <Text
          ellipsizeMode='clip'
          style={{ fontWeight: 'bold', ...headerTextStyle }}
        >
          {item.title}
        </Text>
      </View>
    )
  }

  renderHeader = () => {
    const { column, showHeader } = this.props
    return showHeader ? (
      <View style={{ flexDirection: 'row' }}>
        {column.map((item, index) => this.renderHeaderItem(item, index))}
      </View>
    ) : null
  }

  renderRow = record => {
    const { column, rowStyle, rowTextStyle, onPressRow } = this.props
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => onPressRow(record)}
      >
        {column.map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: item.align,
                width: item.width,
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                ...rowStyle,
              }}
            >
              {item.dataIndex ? (
                <Text
                  ellipsizeMode='tail'
                  numberOfLines={1}
                  style={{ ...rowTextStyle }}
                >
                  {item.render
                    ? item.render(record[item.dataIndex])
                    : record[item.dataIndex]}
                </Text>
              ) : (
                item.render(record)
              )}
            </View>
          )
        })}
      </TouchableOpacity>
    )
  }
  render() {
    const { dataSource, ...props } = this.props
    const data = toJS(dataSource)
    return (
      <FlatList
        data={data}
        ListHeaderComponent={this.renderHeader()}
        renderItem={({ item }) => this.renderRow(item)}
        ListFooterComponent={data.length === 0 ? <Empty /> : null}
        {...props}
      />
    )
  }
}
