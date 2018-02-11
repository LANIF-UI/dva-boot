import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({userInfo}) => ({userInfo}))
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

    dispatch({
      type: 'userInfo/@request',
      payload: {
        valueField: 'httpbin',
        url: 'http://httpbin.org/get',
        method: 'GET', // default 'POST'
      }
    });

    dispatch({
      type: 'userInfo/@request',
      payload: {
        valueField: 'pageData',
        url: '/api/userInfo/getList',
        pageInfo: pageData.startPage(1, 10),
      }
    });
  }
  
  render() {
    const {info, httpbin, pageData} = this.props.userInfo;
    return (
      <div className="userinfo-page">

        <h2>用户信息</h2>
        <div>姓名：{info.name}</div>
        <div>性别：{info.sex}</div>
        <div>年龄：{info.age}</div>

        <h2>异步数据（modelEnhance）</h2>
        <div>{JSON.stringify(httpbin)}</div>

        <h2>分页助手（PageHelper）</h2>
        <table style={{width: 800, textAlign: "left"}}>
          <thead>
            <tr>
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
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.birthday}</td>
              <td>{item.city}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}