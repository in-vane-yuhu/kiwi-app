const initialState = {
  currentTabIndex: 0,
};

const Firm = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'CHANGE_TAB':
      return {
        ...state,
        currentTabIndex: payload.currentTabIndex,
      };

    default:
      return state;
  }
};

export default Firm;
