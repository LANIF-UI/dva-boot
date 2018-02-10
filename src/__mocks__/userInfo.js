/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {number} delay 增加延迟时间 ms
 * @param {function} mock 使用mock生成数据，例如：

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })

   // {'string': '★★★★★★'} 

  更多用法参考 http://mockjs.com/examples.html
 */
export default (fetchMock, delay, mock) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    // 一般用法
    'GET /api/getUserInfo': {
      name: 'jonn'
    },
    // 省略 method, 模拟真实请求延迟效果
    '/api/getUsers': delay([
      { name: 'jonn' },
      { name: 'weiq' },
    ]),
    // 表格带分页
    '/api/userInfo/getList': delay(mock({
      'pageNum|+1': 1,                      // 递增加1
      'pageSize': 10,
      'size': 10,
      'total': 500,
      'totalPages': 50,
      'list|10': [{
        'name': '@cname',                   // 中文名称
        'age|1-100': 100,                   // 100以内随机整数
        'birthday': '@date("yyyy-MM-dd")',  // 日期
        'city': '@city(true)',              // 中国城市
        'phone': /^1[385][1-9]\d{8}/        // 手机号
      }],
    })) 
  } 
}