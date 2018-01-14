import React, { Component } from 'react';
import { connect } from 'dva';
import logo from 'assets/images/logo.png';
import './style.less';

@connect()
export default class Home extends Component {

  render() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
      <div className="home-page">
        <img src={logo} alt="" />
        <div>Welcome Home {user.name}</div>
      </div>
    )
  }
}