import React from 'react';
import { connect } from 'dva';
import BaseComponent from 'components/BaseComponent';
import './index.less';

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <div className="<%=namespace %>-page">
        Route created success, happy work!
      </div>
    );
  }
}
