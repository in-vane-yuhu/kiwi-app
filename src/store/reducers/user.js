const initialState = {
  vertificationCode: '',
  userInfo: {
    nickName: 'initName',
  },
  firm_set_assets: [
    {checked: true, title: '公开'},
    {checked: false, title: '订阅者可见'},
    {checked: false, title: '仅自己可见'},
  ],
  firm_set_position: [
    {checked: true, title: '公开'},
    {checked: false, title: '订阅者可见'},
    {checked: false, title: '仅自己可见'},
  ],
  firm_set_operation: [
    {checked: true, title: '公开'},
    {checked: false, title: '订阅者可见'},
    {checked: false, title: '仅自己可见'},
  ],
  recharge_price: [
    {amount: '1', price: '1', selected: false},
    {amount: '10', price: '10', selected: false},
    {amount: '20', price: '20', selected: false},
    {amount: '30', price: '30', selected: false},
    {amount: '50', price: '50', selected: false},
    {amount: '100', price: '100', selected: false},
  ],
};

const User = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'DO_LOGIN':
      return {
        ...state,
        userInfo: payload.userInfo,
      };
    case 'GET_VERTIFICATION_CODE':
      return {
        ...state,
        vertificationCode: payload.vertificationCode,
      };
    case 'CHANGE_FIRM_SET':
      return {
        ...state,
        [payload.type]: payload.data,
      };
    case 'SELECT_RECHARGE_PRICE':
      return {
        ...state,
        recharge_price: payload.recharge_price,
      };
    case 'RESET_RECHARGE_PRICE':
      return {
        ...state,
        recharge_price: payload.recharge_price,
      };

    default:
      return state;
  }
};

export default User;
