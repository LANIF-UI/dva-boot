export default (fetchMock) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    // 一般用法
    'GET /api/getUserInfo': {
      name: 'jonn'
    },
    // 可以省略 method
    '/api/getUsers': [
      { name: 'jonn' },
      { name: 'weiq' },
    ]
  } 
}