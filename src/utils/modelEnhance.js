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

  // 如果是分页查询
  if (pageInfo && pageInfo instanceof PageInfo) {
    return pageInfo.send(url, other);
  } else {
    switch(other.method && other.method.toLowerCase()) {
      case 'getform':
        return request.getform(url, other.data, other);
      case 'postform':
        return request.postform(url, other.data, other);
      default:
        return request.send(url, other);
    }
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
       * success 在dispatch结束后得到成功的回调
       * error 在dispatch结束后得到失败的回调
       */
      * [REQUEST]({ payload, success, error }, { call, put }) {
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
          const {valueField, notice, ...otherPayload} = _payloads[i];

          let response = yield call(asyncRequest, otherPayload);
          
          if (config.request.checkResponse(response)) {
            // 增加通知功能
            if (notice) config.notice.success(notice === true ? '操作成功' : notice[0], 'success');
            // 增加单个成功回调
            if (otherPayload.success) {
              otherPayload.success(response);
            }
            resultState.success[valueField || '_@fake_'] = response;
          } else {
            if (notice) config.notice.error(notice === true ? '操作失败' : notice[1], 'error');
            if (otherPayload.error) {
              otherPayload.error(response);
            }
            resultState.error[valueField || '_@fake_'] = response;
          }
        }
        // 增加所有成功回调
        if (Object.keys(resultState.error).length === 0 && $$.isFunction(success)) {
          success(resultState.success);
        } 
        // 增加所有失败回调
        if (Object.keys(resultState.error).length !== 0 && $$.isFunction(error)) {
          error(resultState.error);
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