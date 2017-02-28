import {getListById} from '../services/detail.js';

export default {
  namespace: 'detail',
  state: {
    Entities: [],
    PageIndex: 1,
    PageSize: 10,
    TotalItemCount: 0,
  },
  reducers: {
    save(state, {payload}) {
      const result = payload.data.result;
      const deviceId = payload.deviceId;
      return {
        deviceId,
        ...state,
        ...result,
      }
    },
  },
  effects: {
    *getListById(state, {call, put}) {
      delete state.type;
      const deviceId = state.deviceId;
      const data = yield call(getListById, {
        method: 'post',
        body: state
      });
      yield put({
        type: 'save',
        payload: {
          data,
          deviceId
        }
      })
    },
  },
  subscriptions: {
    setup({history, dispatch}) {
      history.listen(({pathname, state}) => {
        if(pathname.toLowerCase() == '/printer/detail') {
          dispatch({
            type: 'getListById',
            deviceId: state.id,
            pageIndex: 1,
            pageSize: 10
          });
        }
      });
    }
  },
};
