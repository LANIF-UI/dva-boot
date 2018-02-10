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
        valueField: 'httpbin',
        url: 'http://httpbin.org/get',
        method: 'GET', // default 'POST'
      }
    });

    dispatch({
      type: 'userInfo/@request',
      payload: {
        valueField: 'pageData',
        url: 'http://httpbin.org/post',
        pageInfo: pageData.startPage(1, 10).filter({name: 'jonn'}),
      }
    });
  }
  
  render() {
    const {info, httpbin, pageData} = this.props.userInfo;
    return (
      <div className="userinfo-page">

        <h1>用户信息页</h1>
        <div>性别：{info.sex}</div>
        <div>年龄：{info.age}</div>

        <h2>异步数据（modelEnhance）</h2>
        <div>{JSON.stringify(httpbin)}</div>

        <h2>分页助手</h2>
        <table>
          {/* {pageData.list.map(item => (

          ))} */}
        </table>
      </div>
    )
  }
}