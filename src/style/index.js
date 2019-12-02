import React, {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';
import * as constant from './constant';
import {style_login} from './login';
import {style_mine} from './mine';
import {style_firm} from './firm';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const navBarHeight =
  Platform.OS === 'ios'
    ? constant.iosnavHeaderHeight
    : constant.andrnavHeaderHeight;
export const statusHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight : 25;
export const drawerWidth = (screenWidth / 3) * 2;

export const shadowRadius = Platform.OS === 'android' ? 5 : 2;
export const elevation = Platform.OS === 'android' ? 2 : 1;

const styles = StyleSheet.create({
  ...style_login,
  ...style_mine,
  ...style_firm,
  page_box: {
    backgroundColor: '#fff',
    flex: 1,
    position: 'relative',
  },
  tabbar: {
    borderTopWidth: 0,
    shadowColor: constant.primary_color,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  border: {
    borderStyle: 'solid',
    borderColor: constant.border_gray,
    borderWidth: 1,
  },
  border_bottom: {
    borderStyle: 'solid',
    borderColor: constant.border_gray,
    borderBottomWidth: 1,
  },
  flex_row_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
