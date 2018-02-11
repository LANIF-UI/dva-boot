// http://www.wheresrhys.co.uk/fetch-mock/api
// http://mockjs.com/
import fetchMock from 'fetch-mock';
import $$ from 'cmn-utils';
import Mock from 'mockjs';
import config from '@/config';
const mock = Mock.mock;

/**
 * 模拟延时请求
 * @param {any} response 模拟响应数据
 * @param {number} time 延时多少毫秒，省略这个省数将会生成100ms内的一个延时
 */
const delay = (response, time) => {
  return () => $$.delay(time || Math.random() * 100).then(() => response)
}

// 模拟数据时包装反回数据
const toSuccess = (response, time) => {
  if (time) {
    return delay(config.mock.toSuccess(response), time);
  } else {
    return config.mock.toSuccess(response);
  }
}
const toError = (message, time) => {
  if (time) {
    return delay(config.mock.toError(message), time);
  } else {
    return config.mock.toError(message);
  }
}

export default (...mocks) => {
  /**
   * 配置如果没拦截到直接走原生的fetch方法
   */ 
  fetchMock.config = {
    ...fetchMock.config, 
    fallbackToNetwork: true,
    warnOnFallback: false
  }

  mocks.forEach(mockFile => {
    let mockAPIs = {};
    if ($$.isFunction(mockFile)) {
      mockAPIs = mockFile({fetchMock, delay, mock, toSuccess, toError});
    } else if ($$.isObject(mockFile)) {
      mockAPIs = mockFile;
    } else {
      throw new Error('mock file require both Function or Object');
    }

    for (const key in mockAPIs) {
      const method_url = key.split(" ");
      // simle 'GET /api/getUserInfo'
      if (method_url.length === 2) {
        const method = method_url[0].toLowerCase();
        const url = method_url[1];
        fetchMock[method](url, mockAPIs[key]);
      } else {
        fetchMock.mock(method_url[0], mockAPIs[key]);
      }
    }
  })
}

export {mock};