const REQUEST = "@@DVA_REQUEST/REQUEST";
const REQUEST_SUCCESS = "@@DVA_REQUEST/REQUEST_SUCCESS";
const REQUEST_ERROR = "@@DVA_REQUEST/REQUEST_ERROR";

export default (model) => {
  const {namespace, state, subscriptions, effects, reducers} = model;


  return {
    namespace,
    state,
    subscriptions,
    effects: {
      // get old effect
      ...effects,
      // append new request effect
      * [REQUEST]({ payload }, { call, put }) {
        const {status, message, data} = yield call(login, payload)
        if (status) {
          yield put({
            type: 'loginSuccess',
            payload: data
          })
        } else {
          yield put({
            type: 'loginError',
            payload: {message}
          })
        }
      },
    },
  
    reducers: {
      // get old reducers
      ...reducers,
      // append new request reducers
      [REQUEST_SUCCESS](state, { payload }) {
        return {
          ...state,
          user: payload
        };
      },
      [REQUEST_ERROR](state, { payload }) {
        return {
          ...state,
          user: payload
        };
      },
    },
  }
}