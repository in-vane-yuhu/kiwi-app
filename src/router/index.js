/**
 * Created by guoshuyu on 2017/11/7.
 */
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { IntlProvider } from 'react-intl'
import Route from './route'

@inject('AccountStore')
@observer
class RouteWrapper extends Component {
  componentDidMount = () => {
    const { initLanguage } = this.props.AccountStore
    initLanguage()
  }

  render() {
    const { locale, messages } = this.props.AccountStore
    return (
      <IntlProvider locale={locale} messages={messages}>
        <Route />
      </IntlProvider>
    )
  }
}

export default RouteWrapper
