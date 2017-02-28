import {getList} from '../services/studentInfo.js';

export default {
  namespace: 'studentInfo',
  state: {
    Entities: [],
    PageIndex: 1,
    PageSize: 10,
    TotalItemCount: 0
  },
  reducers: {
    save(state, { payload }) {
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
        },
      });
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((prop) => {
        if(prop.pathname.toLowerCase() == '/studentinfo') {
          dispatch({
            type: 'getList',
            pageIndex: 1,
            pageSize: 10,
          });
        }
      });
    }
  },
};
