const changeTab = index => {
  return {
    type: 'CHANGE_TAB',
    payload: {
      currentTabIndex: index,
    },
  };
};

export default {
  changeTab,
};
