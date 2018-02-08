import React from 'react';
import dva from 'dva';
import dynamic from 'dva/dynamic';
import { Router } from 'dva/router';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import createRoutes from '@/routes';
import exception from '@/utils/exception';
import 'assets/styles/index.less';

// 0. 加载中效果
dynamic.setDefaultLoadingComponent(() => {
  console.log("loading...")
  return null;
});

// 1. 初始化
const app = dva({
  history: createHistory(),
  onError: exception,
});

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
  require('./mocks');
}