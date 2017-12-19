import React from 'react';
import dynamic from 'dva/dynamic';
import { Route } from 'dva/router';
import { dynamicWrapper, createRoute } from '../../utils/core';

const routesConfig = (app) => ({
  path: '/user/login',
  title: '用户登录',
  indexRoute: '/user',
  component: dynamicWrapper(app, [import('./model')], import('./components')),
});

export default (app) => createRoute(app, routesConfig);
