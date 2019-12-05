import {query, mutation} from '../../utils/apollo';

const doLogin = (phone, code) => {
  /* here to fetch data */
  let res = {
    nickName: 'in_vane',
  };
  return {
    type: 'DO_LOGIN',
    payload: {
      userInfo: res,
    },
  };
};

const getCode = phone => {
  /* here to fetch data */
  const res = {
    vertificationCode: '1234',
  };
  return {
    type: 'GET_VERTIFICATION_CODE',
    payload: {
      vertificationCode: res.vertificationCode,
    },
  };
};

const change_firm_set = (type, data, index) => {
  data.map(item => (item.checked = false));
  data[index].checked = true;
  return {
    type: 'CHANGE_FIRM_SET',
    payload: {
      [type]: data,
    },
  };
};

const onSelectRechargePrice = (data, index) => {
  data.map(item => (item.selected = false));
  data[index].selected = true;
  return {
    type: 'SELECT_RECHARGE_PRICE',
    payload: {
      recharge_price: data,
    },
  };
};

const resetSelectRecharge = data => {
  data.map(item => (item.selected = false));
  return {
    type: 'RESET_RECHARGE_PRICE',
    payload: {
      recharge_price: data,
    },
  };
};

const test = async (limit, offset) => {
  const variables = {limit, offset};
  const body = `
    query getTokens(
      $limit: Int
      $offset: Int
    ){
      tokens(
        limit:$limit
        offset:$offset
      ){
        tokenID
        tokenName
        tokenIntroduction
        tokenAvatar
      }
    }
  `;
  let res = await query(body, variables);
  console.log({res});
  return {
    type: 'TEST',
    payload: {},
  };
};

export default {
  doLogin,
  getCode,
  change_firm_set,
  onSelectRechargePrice,
  resetSelectRecharge,
  test,
};
