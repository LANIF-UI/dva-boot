import $$, {request} from 'cmn-utils';
import PageInfo from './pageHelper/PageInfo';

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

/**
 * 简单通过判断是否有反回确定是成功或失败，
 * 实际中应该通过服务端反回的response中的
 * 成功失败标识来进行区分
 * @param {*} response 
 */
function checkResponse(response) {
  if (response) {
    return true;
  }
  return false;
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

        let isSuccess;
        if (options && $$.isFunction(options.checkResponse)) {
          isSuccess = options.checkResponse(response);
        } else {
          isSuccess = checkResponse(response);
        }
        
        yield put({
          type: isSuccess ? `${REQUEST_SUCCESS}` : `${REQUEST_ERROR}`,
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