import React from 'react';
import dynamic from 'dva/dynamic';
import {dynamicWrapper, createRoutes} from '../../utils/core';

const routesConfig = (app) => ({
  path: '/home',
  title: '首页',
  models: ['./model'],
  component: dynamicWrapper(app, ['user', 'login'], './components')
});

export const createRoutes = (app) => <Route {...routesConfig(app)} />
