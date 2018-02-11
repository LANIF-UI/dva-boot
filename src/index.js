import React from 'react';
import dva from 'dva';
import { Router } from 'dva/router';
import dynamic from 'dva/dynamic';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import request from 'cmn-utils/lib/request';
import createRoutes from '@/routes';
import 'assets/styles/index.less';
import config from './config';

// -> 初始化
const app = dva({ history: createHistory() });

// -> 插件
app.use(createLoading());
app.use({onError: config.exception.global});
request.config(config.request);
dynamic.setDefaultLoadingComponent(() => config.router.loading);

// -> 注册全局模型
// app.model(require('./models/global').default);

// -> 初始化路由
app.router(({ history, app }) => (
  <Router history={history}>{createRoutes(app)}</Router>)
);

// -> Start
app.start('#root');

// -> Developer mock data
if (process.env.NODE_ENV === 'development') {
  require('./__mocks__');
}