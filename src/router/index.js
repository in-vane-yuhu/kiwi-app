/**
 * Created by guoshuyu on 2017/11/7.
 */
import React from 'react'
import { Scene, Router } from 'react-native-router-flux'
import { Icon } from '@ant-design/react-native'
import * as CONST from '../style/constant'
import styles from '../style'

import Login from '../page/Login/Login'
import Home from '../page/Home/Home'
import * as Mine from '../page/Mine'
import Markets from '../page/Markets/Markets'
import * as Data from '../page/Data'
import * as Firm from '../page/Firm'
import Community from '../page/Community/Community'

const isActive = focused => {
  return focused ? CONST.PRIMARY : CONST.N96
}

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
      key='data'
      title='大数据'
      icon={({ focused }) => (
        <Icon name='pie-chart' color={isActive(focused)} />
      )}
      component={Data.Home}
      hideNavBar
    />
    <Scene
      key='firm'
      title='实盘'
      icon={({ focused }) => (
        <Icon name='radar-chart' color={isActive(focused)} />
      )}
      component={Firm.Home}
      hideNavBar
    />
    <Scene
      key='home'
      title='首页'
      icon={({ focused }) => <Icon name='global' color={isActive(focused)} />}
      component={Home}
      hideNavBar
    />
    <Scene
      key='markets'
      title='行情'
      icon={({ focused }) => (
        <Icon name='area-chart' color={isActive(focused)} />
      )}
      component={Markets}
    />
    <Scene
      key='community'
      title='社区'
      icon={({ focused }) => <Icon name='home' color={isActive(focused)} />}
      component={Community}
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
        {renderSwitch()}
        <Scene key='mine' hideNavBar title='我的' component={Mine.Home} />
        <Scene key='login' hideNavBar component={Login} />
        {/* mine */}
        <Scene key='nickname' title='设置昵称' component={Mine.Nickname} />
        <Scene key='sub' title='我的订阅' component={Mine.Subscription} />
        <Scene key='favor' title='我的收藏' component={Mine.Favorite} />
        <Scene key='fans' title='我的粉丝' component={Mine.Fans} />
        <Scene key='wallet' title='我的钱包' component={Mine.Wallet} />
        <Scene key='recharge' title='充值' component={Mine.Recharge} />
        <Scene key='access' title='实盘接入' component={Mine.FirmAccess} />
        <Scene key='api' title='API接入' component={Mine.ApiAccess} />
        <Scene key='firmSet' title='实盘设置' component={Mine.FirmSet} />
        <Scene key='account' title='账户设置' component={Mine.Account} />
        <Scene key='intro' title='个人简介' component={Mine.Introduction} />
        <Scene key='service' title='联系客服' component={Mine.Service} />
        {/* firm */}
        <Scene key='firmDetail' title='详情' component={Firm.Detail} />
        <Scene key='firmCmts' title='动态详情' component={Firm.Comments} />
        <Scene key='newAct' title='发布动态' component={Firm.NewActivity} />
        <Scene key='homepage' title='个人主页' component={Mine.Homepage} />
      </Scene>
    </Router>
  )
}

export default getRouter
