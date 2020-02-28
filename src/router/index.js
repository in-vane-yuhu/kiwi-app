/**
 * Created by guoshuyu on 2017/11/7.
 */
import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { Icon } from '@ant-design/react-native'
import * as CONST from '../style/constant'
import styles from '../style'

import * as Home from '../page/Home'
import * as Account from '../page/Account'
import * as Trade from '../page/Trade'

const isActive = focused => (focused ? CONST.PRIMARY : CONST.N96)

const renderTabIcon = (name, focused) => (
  <Icon name={name} color={isActive(focused)} />
)

const renderSwitch = () => (
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
      title='首页'
      icon={({ focused }) => renderTabIcon('global', focused)}
      component={Home.HomePage}
      hideNavBar
    />
    <Scene
      key='trade'
      title='主板'
      icon={({ focused }) => renderTabIcon('bank', focused)}
      component={Trade.MainBoard}
      hideNavBar
    />
    <Scene
      key='account'
      title='我的'
      icon={({ focused }) => renderTabIcon('user', focused)}
      component={Account.Mine}
      hideNavBar
    />
  </Scene>
)

/**
 * 全局路由
 */
const getRouter = () => {
  return (
    <Router>
      <Scene key='root'>
        <Scene key='login' hideNavBar component={Account.Login} />
        {renderSwitch()}
        <Scene key='profile' title='用户信息' component={Account.Profile} />
        <Scene key='nickname' title='修改昵称' component={Account.Nickname} />
        <Scene key='security' title='安全设置' component={Account.Security} />
        <Scene key='api' title='API设置' component={Account.Api} />
        <Scene key='orders' title='我的委托' component={Account.Orders} />
        <Scene key='funds' title='我的财务' component={Account.Funds} />
        <Scene key='deposit' title='充值' component={Account.Deposit} />
        <Scene key='withdraw' title='提现' component={Account.Withdraw} />
        <Scene key='forgot' title='忘记密码' component={Account.Forgot} />
        <Scene key='verify' title='邮箱验证' component={Account.Verify} />
        <Scene key='register' title='注册' component={Account.Register} />
      </Scene>
    </Router>
  )
}

export default getRouter
