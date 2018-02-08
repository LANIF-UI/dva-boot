export default (fetchMock, delay) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    // 一般用法
    'GET /api/getUserInfo': {
      name: 'jonn'
    },
    // 可以省略 method, 模拟延时
    '/api/getUsers': delay([
      { name: 'jonn' },
      { name: 'weiq' },
    ])
  } 
}