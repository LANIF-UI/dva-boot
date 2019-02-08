import React, { Component } from 'react';
import { connect } from 'dva';
import PageLoading from 'components/Loading/PageLoading';

@connect(({userInfo, loading}) => ({userInfo, loading: loading.global}))
export default class UserInfo extends Component {
  componentDidMount() {
    const {dispatch, userInfo} = this.props;
    const {pageData} = userInfo;

    dispatch({
      type: 'userInfo/@request',
      payload: {
        valueField: 'info',
        url: '/api/getUserInfo',
        method: 'GET',
      }
    });

    // 数组形式的payload
    dispatch({
      type: 'userInfo/@request',
      payload: [{
        valueField: 'httpbin',
        url: 'http://httpbin.org/get',
        method: 'GET', // default 'POST'
      }, {
        valueField: 'pageData',
        url: '/api/userInfo/getList',
        pageInfo: pageData.startPage(1, 10),
      }]
    });
  }

  turnPage = (isPrevPage) => {
    const {dispatch, userInfo} = this.props;
    const {pageData} = userInfo;

    dispatch({
      type: 'userInfo/@request',
      payload: {
        valueField: 'pageData',
        url: '/api/userInfo/getList',
        pageInfo: isPrevPage ? pageData.prevPage() : pageData.nextPage(),
      }
    });
  }

  throwRequestError = () => {
    this.props.dispatch({
      type: 'userInfo/@request',
      payload: {
        valueField: 'httpbin',
        url: 'http://httpbin.org/post',
        method: 'GET',
      }
    });
  }

  render() {
    const {info, httpbin, pageData} = this.props.userInfo;
    const {pageNum, total, totalPages} = pageData;
    return (
      <div className="userinfo-page">

        <h2>用户信息</h2>
        <div>姓名：{info.name}</div>
        <div>性别：{info.sex}</div>
        <div>年龄：{info.age}</div>

        <h2>异步数据（modelEnhance）</h2>
        <div>{JSON.stringify(httpbin)}</div>

        <h2>分页助手（PageHelper）模拟真实请求</h2>
        <table style={{width: 800, textAlign: "left"}}>
          <thead>
            <tr>
              <th></th>
              <th>姓名</th>
              <th>年龄</th>
              <th>生日</th>
              <th>所在城市</th>
              <th>电话号码</th>
            </tr>
          </thead>
          <tbody>
          {pageData.list.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.birthday}</td>
              <td>{item.city}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
          </tbody>
        </table>
        <div>
          <button disabled={pageNum > 1 ? false : true} onClick={e => this.turnPage(true)}>上一页</button>&nbsp;
          <button disabled={pageNum < totalPages ? false : true} onClick={e => this.turnPage()}>下一页</button>
          当前为第<b>{pageNum}</b>页，总计<b>{total}</b>条数据,共<b>{totalPages}</b>页
        </div>

        <h2>全局异常捕获</h2>
        <button onClick={this.throwRequestError}>点我生成一个异常</button>

        <PageLoading loading={this.props.loading} />
      </div>
    )
  }
}