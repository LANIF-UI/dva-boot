import React, { Component } from 'react';
import { connect } from 'dva';

@connect()
export default class Home extends Component {

  render() {
    return <div>Hello World!</div>
  }
}