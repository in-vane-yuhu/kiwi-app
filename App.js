/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import getRouter from './src/router'
import { Provider } from 'mobx-react'
import * as stores from './src/store/index'
import { Provider as AntProvider } from '@ant-design/react-native'

console.disableYellowBox = true

class App extends Component {
  render() {
    return (
      <AntProvider>
        <Provider {...stores}>{getRouter()}</Provider>
      </AntProvider>
    )
  }
}

export default App
