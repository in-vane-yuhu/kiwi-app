import * as constant from './constant';

export const style_login = {
  login_logo: {
    height: 100,
    width: 100,
    borderRadius: 16,
    marginTop: 160,
  },
  login_title: {
    fontSize: 25,
    marginTop: 16,
    color: constant.primary_color,
    fontWeight: 'bold',
  },
  login_ipt_phone: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: constant.border_gray,
    width: '70%',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 40,
  },
  login_ipt_code_box: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: constant.border_gray,
    borderRadius: 8,
    marginTop: 24,
  },
  login_ipt_code: {
    width: '70%',
    height: 40,
    paddingHorizontal: 8,
  },
  login_ipt_code_btn: {
    width: '30%',
    borderStyle: 'solid',
    borderColor: constant.border_gray,
    borderLeftWidth: 1,
  },
  login_ipt_code_btn_text: {
    alignSelf: 'center',
    color: '#ff5e00',
  },
  login_tip: {
    color: constant.text_red,
    fontSize: 12,
    marginLeft: 10,
    marginTop: 10,
    position: 'absolute',
    left: 0,
    top: 36,
  },
  login_btn: {
    width: '70%',
    height: 40,
    borderRadius: 20,
    marginTop: 64,
    backgroundColor: constant.primary_color,
    justifyContent: 'center',
  },
  login_btn_text: {
    color: constant.text_white,
    alignSelf: 'center',
  },
};
