import React, {
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native'
import * as CONST from './constant'
import { style_login } from './login'
import { style_mine } from './mine'
import { style_firm } from './firm'
import { style_data } from './data'

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height
export const navBarHeight =
  Platform.OS === 'ios' ? CONST.iosnavHeaderHeight : CONST.andrnavHeaderHeight
export const statusHeight =
  Platform.OS === 'android' ? StatusBar.currentHeight : 25
export const EchartsHeight = screenWidth - 32

export const shadowRadius = Platform.OS === 'android' ? 5 : 2
export const elevation = Platform.OS === 'android' ? 2 : 1

const styles = StyleSheet.create({
  ...style_login,
  ...style_mine,
  ...style_firm,
  ...style_data,
  page_box: {
    backgroundColor: CONST.N0,
    flex: 1,
    position: 'relative',
  },
  tabbar: {
    borderTopWidth: 0,
    shadowColor: CONST.PRIMARY,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  border: {
    borderStyle: 'solid',
    borderColor: CONST.N238,
    borderWidth: 1,
  },
  border_bottom: {
    borderStyle: 'solid',
    borderColor: CONST.N238,
    borderBottomWidth: 1,
  },
  flex_row_center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statistic: {
    fontSize: 18,
    marginTop: 4,
    fontWeight: 'bold',
  },
  divider: {
    height: 8,
    backgroundColor: CONST.N238,
  },
})

export default styles
