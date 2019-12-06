import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { Tabs } from '@ant-design/react-native'

import * as CONST from '../../../style/constant'
import styles from '../../../style'

import Spot from './Spot'
import Contract from './Contract'
import Subscription from '../../Mine/Subscription'

@inject('FirmStore')
@observer
export default class FirmMain extends Component {
  onChangeTab = (tab, index) => {
    const { setCurrentTab } = this.props.FirmStore
    setCurrentTab(index)
  }

  renderTabBar = tabProps => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {tabProps.tabs.map((tab, i) => (
        // change the style to fit your needs
        <TouchableOpacity
          activeOpacity={0.9}
          key={tab.key || i}
          style={{
            marginHorizontal: 16,
            paddingVertical: 8,
            borderColor: CONST.PRIMARY,
            borderStyle: 'solid',
            borderBottomWidth: tabProps.activeTab === i ? 1 : 0,
          }}
          onPress={() => {
            const { goToTab, onTabClick } = tabProps
            onTabClick && onTabClick(tabs[i], i)
            goToTab && goToTab(i)
          }}
        >
          <Text
            style={{
              color:
                tabProps.activeTab === i
                  ? CONST.PRIMARY
                  : CONST.N96,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )

  render() {
    const tabs = [{ title: '现货' }, { title: '合约' }, { title: '订阅' }]
    return (
      <View style={[styles.page_box, { backgroundColor: '#fafafa' }]}>
        <StatusBar barStyle='dark-content' />
        <SafeAreaView style={{ flex: 1 }}>
          <Tabs
            tabs={tabs}
            initialPage={0}
            styles={{
              topTabBarSplitLine: {
                borderBottomWidth: 0,
              },
            }}
            onChange={this.onChangeTab}
            renderTabBar={tabProps => this.renderTabBar(tabProps)}
          >
            <Spot />
            <Contract />
            <Subscription />
          </Tabs>
        </SafeAreaView>
      </View>
    )
  }
}
