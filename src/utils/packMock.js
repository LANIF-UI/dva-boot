// http://www.wheresrhys.co.uk/fetch-mock/api
import fetchMock from 'fetch-mock';
import $$ from 'cmn-utils';

export default (...mocks) => {
  /**
   * 配置如果没拦截到直接走原生的fetch方法
   */ 
  fetchMock.config = {
    ...fetchMock.config, 
    fallbackToNetwork: true,
  }

  mocks.forEach(mockFile => {
    let mockAPIs = {};
    if ($$.isFunction(mockFile)) {
      mockAPIs = mockFile(fetchMock);
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