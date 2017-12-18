import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/nav';

dynamic.setDefaultLoadingComponent(() => {
  console.log("loading...")
  return null;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const BasicLayout = routerData['/'].component;

  const passProps = {
    app,
    routerData,
  };

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" render={props => <BasicLayout {...props} {...passProps} />} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;