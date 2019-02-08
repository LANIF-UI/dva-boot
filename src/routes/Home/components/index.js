import React from 'react';
import { connect } from 'dva';
import logo from 'assets/images/logo.png';
import './style.less';
import BaseComponent from 'components/BaseComponent';
import $$ from 'cmn-utils';
@connect()
export default class Home extends BaseComponent {
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
        <button onClick={e => this.notice.success('success')}>success</button>
        <button onClick={e => this.notice.error('error')}>error</button>
        <button onClick={e => this.notice.warn('warn')}>warn</button>
        <button onClick={e => this.notice.info('info')}>default</button>
        <button onClick={e => this.notice.close()}>close</button>
      </div>
    )
  }
}