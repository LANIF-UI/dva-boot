import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect(state => ({
  login: state.login,
}))
export default class Login extends Component {

  render() {
    return <div>User Login</div>
  }
}