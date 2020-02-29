/**
 * Created by guoshuyu on 2017/11/7.
 */
import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Icon } from '@ant-design/react-native'
import { inject, observer } from 'mobx-react'
import * as CONST from '../style/constant'
import styles from '../style'

import * as Home from '../page/Home'
import * as Account from '../page/Account'
import * as Trade from '../page/Trade'

@inject('AccountStore')
@observer
@injectIntl
class Route extends Component {
  componentDidMount = () => {
    const { initLanguage } = this.props.AccountStore
    initLanguage()
  }

  isActive = focused => (focused ? CONST.PRIMARY : CONST.N96)

  renderTabIcon = (name, focused) => (
    <Icon name={name} color={this.isActive(focused)} />
  )

  renderSwitch = () => {
    const { formatMessage } = this.props.intl
    return (
      <Scene
        key='switchTab'
        lazy
        tabs
        hideNavBar
        tabBarPosition='bottom'
        activeTintColor={CONST.PRIMARY}
        inactiveTintColor={CONST.N96}
        tabBarStyle={[styles.tabbar]}
      >
        <Scene
          key='home'
          title={formatMessage({ id: 'home' })}
          icon={({ focused }) => this.renderTabIcon('global', focused)}
          component={Home.HomePage}
          hideNavBar
        />
        <Scene
          key='trade'
          title={formatMessage({ id: 'board' })}
          icon={({ focused }) => this.renderTabIcon('bank', focused)}
          component={Trade.MainBoard}
          hideNavBar
        />
        <Scene
          key='account'
          title={formatMessage({ id: 'mine' })}
          icon={({ focused }) => this.renderTabIcon('user', focused)}
          component={Account.Mine}
          hideNavBar
        />
      </Scene>
    )
  }

  render() {
    const { formatMessage } = this.props.intl
    return (
      <Router>
        <Scene key='root'>
          {this.renderSwitch()}
          <Scene key='login' hideNavBar component={Account.Login} />
          <Scene
            key='profile'
            title={formatMessage({ id: 'userinfo' })}
            component={Account.Profile}
          />
          <Scene
            key='nickname'
            title={formatMessage({ id: 'nickname' })}
            component={Account.Nickname}
          />
          <Scene
            key='security'
            title={formatMessage({ id: 'security' })}
            component={Account.Security}
          />
          <Scene
            key='api'
            title={formatMessage({ id: 'APISet' })}
            component={Account.Api}
          />
          <Scene
            key='orders'
            title={formatMessage({ id: 'myOrders' })}
            component={Account.Orders}
          />
          <Scene
            key='funds'
            title={formatMessage({ id: 'myFunds' })}
            component={Account.Funds}
          />
          <Scene
            key='deposit'
            title={formatMessage({ id: 'deposit' })}
            component={Account.Deposit}
          />
          <Scene
            key='withdraw'
            title={formatMessage({ id: 'withdraw' })}
            component={Account.Withdraw}
          />
          <Scene
            key='forgot'
            title={formatMessage({ id: 'forgot' })}
            component={Account.Forgot}
          />
          <Scene
            key='verify'
            title={formatMessage({ id: 'verify' })}
            component={Account.Verify}
          />
          <Scene
            key='register'
            title={formatMessage({ id: 'register' })}
            component={Account.Register}
          />
          <Scene
            key='language'
            title={formatMessage({ id: 'language' })}
            component={Account.Language}
          />
        </Scene>
      </Router>
    )
  }
}

export default Route
