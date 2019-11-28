import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {Actions} from 'react-native-router-flux';

@connect(
  state => ({state}),
  dispatch => ({}),
)
export default class Home extends Component {
  render() {
    return (
      <View>
        <Text>here is home</Text>
      </View>
    );
  }
}
