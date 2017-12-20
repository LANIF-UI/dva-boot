import React from 'react';
import { connect } from 'dva';
import { Switch } from 'dva/router';

@connect()
export default class BasicLayout extends React.PureComponent {
  render() {
    const {routerData} = this.props;
    const {childRoutes} = routerData;

    return (
      <Switch>
        {childRoutes}
      </Switch>
    );
  }
}