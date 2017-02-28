
export default {
  namespace: 'deviceId',
  state: {
    deviceId: 0
  },
  reducers: {
    setId(state, {deviceId}) {
      return deviceId;
    },
    getId(state, action) {
      return state;
    }
  },
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, state}) => {
        if(pathname.toLowerCase() == '/printer/detail') {
          dispatch({
            type: 'setId',
            deviceId: state.id,
          })
        }
      });
    }
  },
};
