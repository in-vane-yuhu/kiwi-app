/**
 * Created by guoshuyu on 2017/11/7.
 */
import React from 'react';
import {Scene, Router, Tabs, Drawer, Actions} from 'react-native-router-flux';
import {Icon} from '@ant-design/react-native';
import {Text, Image, TouchableOpacity} from 'react-native';
import styles from '../style';

import Login from '../page/Login/Login';
import Home from '../page/Home/Home';
import * as Mine from '../page/Mine';
import Markets from '../page/Markets/Markets';
import Data from '../page/Data/Data';
import * as Firm from '../page/Firm';
import Community from '../page/Community/Community';

import avatar from '../assets/image/ai.jpg';

const renderHeaderLeft_Home = () => {
  return <Image source={avatar} style={[styles.tab_home_left_image]} />;
};

const renderHeaderRight_Home = () => {
  return (
    <TouchableOpacity onPress={() => Actions.mine()}>
      <Image source={avatar} style={[styles.tab_home_right_image]} />
    </TouchableOpacity>
  );
};

const isActive = focused => {
  return focused ? '#ff5e00' : '#969696';
};

/**
 * 全局路由
 */
const getRouter = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="login" component={Login} />
        <Scene
          key="switchTab"
          lazy
          tabs
          hideNavBar
          tabBarPosition="bottom"
          activeTintColor="#ff5e00"
          inactiveTintColor="#969696"
          tabBarStyle={[styles.tabbar]}>
          <Scene
            key="firm"
            title="实盘"
            icon={({focused}) => (
              <Icon name="radar-chart" color={isActive(focused)} />
            )}
            component={Firm.Main}
            hideNavBar
          />
          <Scene
            key="home"
            title="首页"
            icon={({focused}) => (
              <Icon name="global" color={isActive(focused)} />
            )}
            component={Home}
            renderLeftButton={() => renderHeaderLeft_Home()}
            renderRightButton={() => renderHeaderRight_Home()}
          />
          <Scene
            key="markets"
            title="行情"
            icon={({focused}) => (
              <Icon name="area-chart" color={isActive(focused)} />
            )}
            component={Markets}
          />
          <Scene
            key="data"
            title="大数据"
            icon={({focused}) => (
              <Icon name="pie-chart" color={isActive(focused)} />
            )}
            component={Data}
          />
          <Scene
            key="community"
            title="社区"
            icon={({focused}) => <Icon name="home" color={isActive(focused)} />}
            component={Community}
          />
        </Scene>
        <Scene key="mine" component={Mine.Mine} />
        <Scene key="sub" title="我的订阅" component={Mine.Subscription} />
        <Scene key="favor" title="我的收藏" component={Mine.Favorite} />
        <Scene key="fans" title="我的粉丝" component={Mine.Fans} />
        <Scene key="wallet" title="我的钱包" component={Mine.Wallet} />
        <Scene key="recharge" title="充值" component={Mine.Recharge} />
        <Scene key="firmAccess" title="实盘接入" component={Mine.FirmAccess} />
        <Scene key="apiAccess" title="API接入" component={Mine.ApiAccess} />
        <Scene key="firmSet" title="实盘设置" component={Mine.FirmSet} />
        <Scene key="account" title="账户设置" component={Mine.Account} />
        <Scene key="nickname" title="设置昵称" component={Mine.Nickname} />
        <Scene key="intro" title="个人简介" component={Mine.SelfIntroduction} />
        <Scene key="service" title="联系客服" component={Mine.Service} />
        <Scene key="firmDetail" title="我的粉丝" component={Firm.Detail} />
      </Scene>
    </Router>
  );
};

export default getRouter;
