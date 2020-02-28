const codeMsg = code => {
  switch (code) {
    case 401:
      return '访问令牌已过期'
    case 403:
      return '没有访问权限'

    default:
      return code
  }
}

const errMsg = msg => {
  switch (msg) {
    case 'REGISTRATION.USER_ALREADY_REGISTERED':
      return '该邮箱已注册'
    case 'LOGIN.EMAIL_SENDED_RECENTLY':
      return '发送验证码过于频繁'
    case 'LOGIN.EMAIL_CODE_NOT_VALID':
      return '验证码错误'
    case 'LOGIN.USER_NOT_FOUND':
      return '该邮箱未注册'
    case 'LOGIN.EMAIL_NOT_VERIFIED':
      return '请验证邮箱'
    case 'LOGIN.PASSWORD_NOT_VALID':
      return '密码错误'
    case 'RESET_PASSWORD.EMAIL_SENDED_RECENTLY':
      return '验证码已发送，请检查邮箱'

    default:
      return msg
  }
}

const resMsg = msg => {
  switch (msg) {
    case 'REGISTRATION.USER_REGISTERED_SUCCESSFULLY':
      return '注册成功，请验证您的邮箱'
    case 'LOGIN.EMAIL_VERIFIED':
      return '验证成功'
    case 'LOGIN.EMAIL_RESENT':
      return '验证码已发送到邮箱'
    case 'LOGIN.SUCCESS':
      return '登录成功'
    case 'PROFILE.UPDATE_SUCCESS':
      return '更新个人信息成功'
    case 'RESET_PASSWORD.PASSWORD_CHANGED':
      return '密码已修改'
    case 'COMMON.SUCCESS':
      return '已刷新'

    default:
      return msg
  }
}

export { codeMsg, errMsg, resMsg }
