import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({userInfo}) => ({userInfo}))
export default class UserInfo extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'userInfo/@request',
      payload: {
        url: 'http://httpbin.org/get',
        valueField: 'httpbin'
      }
    });
  }
  
  render() {
    const {info} = this.props.userInfo;
    return (
      <div className="userinfo-page">
        <h1>用户信息页</h1>
        <div>性别：{info.sex}</div>
        <div>年龄：{info.age}</div>
      </div>
    )
  }
}