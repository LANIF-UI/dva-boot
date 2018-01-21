import request from 'cmn-utils/lib/request';
import $$ from 'cmn-utils';

const REQUEST = "@request";
const REQUEST_SUCCESS = "@request_success";
const REQUEST_ERROR = "@request_error";

async function asyncRequest(payload) {
  if (!payload || !payload.url) throw(new Error('payload require contains url opt'));
  /**
   * other中可以配置 method headers data 等参数
   */
  const {url, ...other} = payload;

  let options = {...other};

  return request.send(url, options);
}

function getResponse(response) {
  if ($$.isObject) {
    return { status: true, data: response };
  }
  return { status: false };
}

export const simpleModel = {
  namespace: $$.randomStr(4),
  enhance: true,
  state: {},
  effects: {},
  reducers: {},
};

export default (model, options={}) => {
  const {namespace, state, subscriptions, effects, reducers, enhance} = {...simpleModel, ...model};

  if (!enhance) {
    return {namespace, state, subscriptions, effects, reducers};
  }
  return {
    namespace,
    state,
    subscriptions,
    effects: {
      // get old effect
      ...effects,
      // append new request effect
      * [REQUEST]({ payload }, { call, put }) {
        /**
         * valueField: 返回结果将使用valueField字段的值来接收
         */
        const {valueField, ...otherPayload} = payload;
        let response = yield call(asyncRequest, otherPayload);

        if (options && $$.isFunction(options.getResponse)) {
          response = options.getResponse(response);
        } else {
          response = getResponse(response);
        }
        
        yield put({
          type: response.status ? `${REQUEST_SUCCESS}` : `${REQUEST_ERROR}`,
          payload: { [valueField]: response }
        });
      },
    },
  
    reducers: {
      // get old reducers
      ...reducers,
      // append new request reducers
      [REQUEST_SUCCESS](state, { payload }) {
        return {
          ...state,
          ...payload
        };
      },
      [REQUEST_ERROR](state, { payload }) {
        return {
          ...state,
          ...payload
        };
      },
    },
  }
}