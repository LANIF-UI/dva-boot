import React from 'react';
import dva from 'dva';
import { Router } from 'dva/router';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import createRoutes from '@/routes';
import 'assets/styles/index.less';
import AppConfig from './AppConfig';

// 1. 初始化
const app = dva({ history: createHistory() });
new AppConfig(app);

// 2. 插件
app.use(createLoading());

// 3. 注册全局模型
// app.model(require('./models/global').default);

// 4. 初始化路由
app.router(({ history, app }) => (
  <Router history={history}>{createRoutes(app)}</Router>)
);

// 5. Start
app.start('#root');

// 6. Developer mock data
if (process.env.NODE_ENV === 'development') {
  require('./__mocks__');
}