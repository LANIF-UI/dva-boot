import React, { Component } from 'react';
import { connect } from 'dva';
import $$ from 'cmn-utils';

@connect(({userInfo}) => ({userInfo}))
export default class UserInfo extends Component {
  componentDidMount() {
    const {dispatch, pageData} = this.props;

    dispatch({
      type: 'userInfo/@request',
      payload: {
        url: 'http://httpbin.org/get',
        method: 'GET', // default 'POST'
        valueField: 'httpbin'
      }
    });

    $$.get('/api/getUserInfo').then(resp => console.log(JSON.stringify(resp)));

    $$.post('/api/getUsers').then(resp => console.log(JSON.stringify(resp)));

    // dispatch({
    //   type: 'userInfo/@request',
    //   pageInfo: pageData.startPage(1, 10).filter({name: 'jonn'}),
    //   payload: {
    //     url: 'http://httpbin.org/post',
    //     valueField: 'pageData',
    //   }
    // });
  }
  
  render() {
    const {info, httpbin, pageData} = this.props.userInfo;
    return (
      <div className="userinfo-page">

        <h1>用户信息页</h1>
        <div>性别：{info.sex}</div>
        <div>年龄：{info.age}</div>

        <h2>异步数据</h2>
        <div>{JSON.stringify(httpbin)}</div>

        <h2>分页测试</h2>
        <table>
          {/* {pageData.list.map(item => (

          ))} */}
        </table>
      </div>
    )
  }
}