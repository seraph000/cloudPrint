import {getList} from '../services/printHistory.js';

export default {
  namespace: 'printHistory',
  state: {
    result: []
  },
  reducers: {
    save(state, {payload}) {
      const result = payload.data.result
      return {
        ...state,
        result
      }
    }
  },
  effects: {
    *getList(state, {call, put}) {
      const data = yield call(getList, {
        method: 'get'
      });
      yield put({
        type: 'save',
        payload: {
          data
        }
      });
    }
  },
  subscriptions: {
    setup({history, dispatch}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/printhistory' || pathname.toLowerCase() == '/printer' || pathname.toLowerCase() == '/printer/detail') {
          dispatch({
            type: 'getList'
          })
        }
      })
    }
  },
};
