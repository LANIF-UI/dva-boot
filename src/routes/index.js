import React from 'react';
import dynamic from 'dva/dynamic';
import assign from 'object-assign';
import {createRoutes} from '../utils/core';
import BaseLayout from '../layouts/BasicLayout';
import NotFound from '../components/Pages/404';
import Login from './Login';
import Home from './Home';

const routesConfig = (app) => ([
  {
    path: '/',
    title: '基本布局',
    models: ['.login/model'],
    component: BaseLayout,
    indexPath: '/home',
    childRoutes: [
      Home(app),
      NotFound
    ]
  }, {
    path: '/login',
    title: '登录',
    component: Login(app),
  }
]);

export default app => createRoutes(app, routesConfig);