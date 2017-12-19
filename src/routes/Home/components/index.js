import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect()
export default class Home extends Component {

  render() {
    return <div>Hello World!</div>
  }
}