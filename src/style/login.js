import * as CONST from './constant'

export const style_login = {
  login_logo: {
    height: 48,
    width: 300,
    borderRadius: 16,
    marginTop: '25%',
  },
  login_ipt: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: CONST.N238,
    width: '70%',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 40,
  },
  login_captchaBox: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  login_captcha: {
    borderWidth: 1,
    borderColor: CONST.N238,
    width: '25%',
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login_btn: {
    width: '70%',
    height: 40,
    borderRadius: 20,
    marginTop: 64,
    backgroundColor: CONST.PRIMARY,
    justifyContent: 'center',
  },
  login_btn_text: {
    color: CONST.N0,
    alignSelf: 'center',
  },
}
