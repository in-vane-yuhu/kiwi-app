import * as CONST from './constant'

export const style_data = {
  data_box: {
    marginTop: 8,
    padding: 16,
    backgroundColor: CONST.N0,
  },
  data_title_box: {
    borderStyle: 'solid',
    borderLeftWidth: 2,
    borderColor: CONST.PRIMARY,
  },
  data_title_text: {
    color: CONST.PRIMARY,
    marginLeft: 8,
  },
  data_bar_title: {
    textAlign: 'center',
    color: CONST.N96,
  },
  data_bar_green: {
    backgroundColor: CONST.GREEN,
    height: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingLeft: 8,
    justifyContent: 'center',
  },
  data_bar_red: {
    backgroundColor: CONST.RED,
    height: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
}
