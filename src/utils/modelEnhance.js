import $$, {request} from 'cmn-utils';
import PageInfo from './pageHelper/PageInfo';
import config from '@/config';

const REQUEST = '@request';
const REQUEST_SUCCESS = '@request_success';
const REQUEST_ERROR = '@request_error';
 
async function asyncRequest(payload) {
  if (!payload || !payload.url) throw(new Error('payload require contains url opt'));
  /**
   * other中可以配置 method headers data 等参数
   */
  const {url, pageInfo, ...other} = payload;
  let options = {...other};

  // 如果是分页查询
  if (pageInfo && pageInfo instanceof PageInfo) {
    return pageInfo.send(url, options);
  } else {
    return request.send(url, options);
  }
}

export const simpleModel = {
  namespace: $$.randomStr(4),
  enhance: true,
  state: {},
  effects: {},
  reducers: {},
};

export default (model) => {
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
      /**
       * payload 如果传入数组形式的payload，会合并结果后调用一次渲染
       */
      * [REQUEST]({ payload }, { call, put }) {
        let _payloads = [];
        if ($$.isObject(payload)) {
          _payloads.push(payload);
        } else if ($$.isArray(payload)) {
          _payloads = payload;
        };

        const resultState = {
          success: {},
          error: {}
        };
        for (let i = 0; i < _payloads.length; i++) {
          /**
           * valueField: 返回结果将使用valueField字段的值来接收
           */
          const {valueField, ...otherPayload} = _payloads[i];

          let response = yield call(asyncRequest, otherPayload);
          
          if (config.request.checkResponse(response)) {
            resultState.success[valueField || '_@fake_'] = response;
          } else {
            resultState.error[valueField || '_@fake_'] = response;
          }
        }

        if (Object.keys(resultState.success).length) {
          yield put({
            type: REQUEST_SUCCESS,
            payload: resultState.success
          });
        }
        if (Object.keys(resultState.error).length) {
          yield put({
            type: REQUEST_ERROR,
            payload: resultState.error
          });
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