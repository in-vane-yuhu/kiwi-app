/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import getRouter from './src/router';
import {Provider} from 'react-redux';
import store from './src/store';
import {Provider as AntProvider} from '@ant-design/react-native';

console.disableYellowBox = true;

class App extends Component {
  render() {
    return (
      <AntProvider>
        <Provider store={store}>{getRouter()}</Provider>
      </AntProvider>
    );
  }
}

export default App;
