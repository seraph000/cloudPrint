import {getList} from '../services/synchronization.js';

export default {
  namespace: 'synchronization',
  state: {
    Entities: [],
    PageIndex: 1,
    PageSize: 10,
    TotalItemCount: 0
  },
  reducers: {
    save(state, {payload}) {
      const result = payload.data.result;
      return {
        ...state,
        ...result,
      }
    }
  },
  effects: {
    *getList(state, {call, put}) {
      delete state.type;
      const data = yield call(getList, {
        method: 'post',
        body: state
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
    setpu({history, dispatch}) {
      history.listen(({pathname}) => {
        if(pathname.toLowerCase() == '/synchronization') {
          dispatch({
            type: 'getList',
            pageIndex: 1,
            pageSize: 10
          });
        }
      });
    }
  },
};
