import * as CONST from './constant'

export const style_mine = {
  mine_linearGradient: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  mine_card_box: {
    padding: 24,
    flexDirection: 'row',
  },
  mine_card_left: {
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  mine_userinfo_btn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 80,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mine_grid_box: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
  },
  mine_grid_divider: {
    height: '90%',
    borderStyle: 'solid',
    borderColor: CONST.N238,
    borderLeftWidth: 1,
  },
  mine_grid_desc: {
    color: CONST.N0,
    fontSize: 16,
    marginTop: 10,
  },
  mine_list_box: {
    padding: 16,
    paddingBottom: 8,
  },
  mine_list_lin_box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mine_list_line: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderStyle: 'solid',
    borderColor: CONST.N238,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mine_list_line_text: {
    fontSize: 16,
    marginLeft: 16,
  },
  mine_nickname: {
    color: CONST.N0,
    fontSize: 18,
  },
  mine_bar: {
    flexGrow: 1,
    alignItems: 'center',
  },
  mine_bar_item: {
    color: CONST.N0,
    fontSize: 20,
  },
  account_avatar_box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  account_item_box: {
    borderStyle: 'solid',
    borderColor: CONST.N238,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  nickname_sticky_btn: {
    backgroundColor: CONST.PRIMARY,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 25,
  },
  safe_box: {
    width: '80%',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: CONST.N200,
    borderRadius: 4,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: 80,
    height: 80,
    padding: 16,
  },
}
