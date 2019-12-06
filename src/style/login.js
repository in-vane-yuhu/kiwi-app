import * as CONST from './constant'

export const style_login = {
  login_logo: {
    height: 100,
    width: 100,
    borderRadius: 16,
    marginTop: '25%',
  },
  login_title: {
    fontSize: 25,
    marginTop: 16,
    color: CONST.PRIMARY,
    fontWeight: 'bold',
  },
  login_ipt_phone: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: CONST.N238,
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
    borderColor: CONST.N238,
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
    borderColor: CONST.N238,
    borderLeftWidth: 1,
  },
  login_ipt_code_btn_text: {
    alignSelf: 'center',
    color: CONST.PRIMARY,
  },
  login_ipt_code_btn_count: {
    alignSelf: 'center',
    color: CONST.N96,
  },
  login_tip: {
    color: CONST.RED,
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
    backgroundColor: CONST.PRIMARY,
    justifyContent: 'center',
  },
  login_btn_text: {
    color: CONST.N0,
    alignSelf: 'center',
  },
}
