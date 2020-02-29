import React, { Component } from 'react'
import Route from './src/router'
import { Provider } from 'mobx-react'
import * as stores from './src/store/index'
import { Provider as AntProvider } from '@ant-design/react-native'

console.disableYellowBox = true

class App extends Component {
  render() {
    return (
      <AntProvider>
        <Provider {...stores}>
          <Route />
        </Provider>
      </AntProvider>
    )
  }
}

export default App
