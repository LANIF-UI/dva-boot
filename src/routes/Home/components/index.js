import React, { Component } from 'react';
import { connect } from 'dva';
import logo from 'assets/images/logo.png';

@connect()
export default class Home extends Component {

  render() {
    return <div><img width="50" src={logo} /> Hello World! </div>
  }
}