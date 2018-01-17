import React from 'react';
import { connect } from 'dva';
import logo from 'assets/images/logo.png';
import './style.less';
import BaseComponent from 'components/BaseComponent';
import $$ from 'cmn-utils';

@connect()
export default class Home extends BaseComponent {

  render() {
    const user = $$.getStore('user');
    
    return ( 
      <div className="home-page">
        <img src={logo} alt="" />
        <div>Welcome Home {user.name}</div>
      </div>
    )
  }
}