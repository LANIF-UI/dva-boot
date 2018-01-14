import React, { Component } from 'react';
import { connect } from 'dva';
import './style.less';

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login,
}))
export default class Login extends Component {
  onLogin = () => {
    this.props.dispatch({
      type: 'login/login',
      payload: {
        name: document.querySelector("#name").value,
        password: document.querySelector("#password").value,
      }
    })
  }

  render() {
    const { loading, login } = this.props;
    const { loggedIn, message } = login;
    return (
      <div className="login-page">
        {loading ? <strong>登录中...</strong> : null}
        {loggedIn || loading ? null : <strong>{message}</strong>}
        <div>
          <label>用户名:</label>
          <input id="name" />
        </div>
        <div>
          <label>密码:</label>
          <input type="password" id="password" />
        </div>
        <div>
          <button onClick={this.onLogin}>登录</button>
        </div>
      </div>
    )
  }
}