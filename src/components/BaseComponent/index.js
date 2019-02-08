import React from 'react';
import PropTypes from 'prop-types';
import config from '@/config';

class BaseComponent extends React.Component {
  /**
   * 在没有dispatch函数时，如果想要在组件内进行跳转可以用router进行跳转
   */
  static contextTypes = {
    router: PropTypes.object,
  };

  notice = config.notice; // 消息通知

  /**
   * history api 路由跳转
   */
  get history() { 
    return this.context.router.history;
  }
}

export default BaseComponent;