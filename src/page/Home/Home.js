import React, { Component } from 'react'
import {
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native'
import { Icon, Carousel } from '@ant-design/react-native'
import { Actions } from 'react-native-router-flux'

import * as constant from '../../style/constant'
import styles, { screenHeight, screenWidth } from '../../style'

import avatar from '../../assets/image/ai.jpg'

export default class Home extends Component {
  navigateToMine = () => {
    Actions.mine()
  }

  render() {
    const data = [{}, {}, {}]
    return (
      <SafeAreaView style={[styles.page_box]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={avatar} style={{ height: 20, width: 20 }} />
            <Text>{`<-it's logo`}</Text>
          </View>
          <TouchableOpacity onPress={this.navigateToMine}>
            <Icon name='user' />
          </TouchableOpacity>
        </View>
        <View style={[styles.firm_search_box]}>
          <View style={[styles.firm_search, { width: '75%' }]}>
            <Icon name='search' color={constant.primary_color} />
            <TextInput
              placeholder='搜索字段'
              style={{ marginLeft: 8, width: '100%' }}
            />
          </View>
          <TouchableOpacity style={[styles.firm_search]}>
            <Icon name='filter' color={constant.primary_color} />
            <Text>筛选</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Carousel>
            {data.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: constant.primary_color,
                  marginHorizontal: 24,
                  height: 100,
                  borderRadius: 10,
                }}
              />
            ))}
          </Carousel>
        </View>
      </SafeAreaView>
    )
  }
}
