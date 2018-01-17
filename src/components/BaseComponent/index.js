import React from 'react';
import PropTypes from 'prop-types';

class BaseComponent extends React.Component {
  /**
   * 在没有dispatch函数时，如果想要在组件内进行跳转可以用router进行跳转
   */
  static contextTypes = {
    router: PropTypes.object,
  };
}

export default BaseComponent;