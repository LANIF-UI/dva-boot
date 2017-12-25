import React from 'react';
import dynamic from 'dva/dynamic';
import { Route, Switch, Redirect } from 'dva/router';
import DocumentTitle from 'react-document-title';
import assign from 'object-assign';
/**
 * 生成动态组件
 * @param {*} app 
 * @param {*} models 
 * @param {*} component 
 */
export const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models,
  component: () => component,
});

/**
 * 生成一组路由
 * @param {*} app 
 * @param {*} routesConfig 
 */
export const createRoutes = (app, routesConfig) => {
  return (
    <Switch>
      {
        routesConfig(app).map(config => createRoute(app, () => config))
      }
    </Switch>
  )
};

/**
 * 生成单个路由
 * @param {*} app 
 * @param {*} routesConfig 
 */
export const createRoute = (app, routesConfig) => {
  const {component: Comp, path, indexRoute, title, ...otherProps} = routesConfig(app);
  const routeProps = assign({
    key: path || randomStr(4),
    render: props => (
      <DocumentTitle title={title}>
        <Comp routerData={otherProps} {...props} />
      </DocumentTitle>
    )
  }, path && {
    path: path
  });

  if (indexRoute) {
    return [
      <Route {...routeProps} />,
      <Redirect key={path + "_redirect"} exact from={indexRoute} to={path} />
    ]
  }
  
  return (
    <Route {...routeProps} />
  )
};

/**
 * 生成指定位数的随机数
 * @param {*} x 
 */
export const randomStr = (x) => {
  let s = "";
  while(s.length < x && x > 0){
    let v = Math.random() < 0.5 ? 32 : 0;
    s += String.fromCharCode(Math.round(Math.random() * ((122 - v) - (97 - v)) + (97 - v)));
  }
  return s;
}