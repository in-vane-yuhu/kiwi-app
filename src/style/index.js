import React, {StyleSheet, Dimensions, Platform, StatusBar} from 'react-native';
import * as constant from './constant';
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
  ...style_mine,
  ...style_firm,
  tabbar: {
    borderTopWidth: 0,
    shadowColor: constant.primary_color,
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  page_box: {
    backgroundColor: '#fff',
    flex: 1,
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
  tab_home_left_image: {
    height: 32,
    width: 32,
    borderRadius: 4,
    marginLeft: 8,
  },
  tab_home_right_image: {
    height: 32,
    width: 32,
    borderRadius: 4,
    marginRight: 8,
  },
});

export default styles;
