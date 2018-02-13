import React from 'react';
import { connect } from 'dva';
import logo from 'assets/images/logo.png';
import './style.less';
import BaseComponent from 'components/BaseComponent';
import { Notification } from 'components';
import $$ from 'cmn-utils';
const notice = Notification.notice;

@connect()
export default class Home extends BaseComponent {
  notice = (e) => {
    this.close = notice(e.target.innerHTML, e.target.innerHTML);
  }

  closeNotice = () => {
    this.close && this.close();
  }

  render() {
    const user = $$.getStore('user');
    
    return ( 
      <div className="home-page">
        <img src={logo} alt="" />
        <div>Welcome Home {user.name}</div>
        <hr />
        <button onClick={this.notice}>success</button>
        <button onClick={this.notice}>error</button>
        <button onClick={this.notice}>warn</button>
        <button onClick={this.notice}>default</button>
        <button onClick={this.notice}>dark</button> &nbsp;
        <button onClick={this.closeNotice}>close</button>
      </div>
    )
  }
}