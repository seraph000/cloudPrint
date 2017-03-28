import {getList} from '../services/printer.js';

export default {
  namespace: 'printer',
  state: {
    result: []
  },
  reducers: {
    save(state, {payload}) {
      const {result} = payload;
      return {
        ...state,
        result
      }
    }
  },
  effects: {
    *getList(state, {call, put}) {
      const {result} = yield call(getList, {
        method: 'get'
      });
      yield put({
        type: 'save',
        payload: {
          result
        }
      })
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/printer' || pathname.toLowerCase() == '/printer/detail') {
          dispatch({
            type: 'getList'
          });
        }
      });
    }
  },
};
