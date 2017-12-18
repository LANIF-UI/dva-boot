import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './index.less';

// 1. 初始化
const app = dva({
  history: createHistory(),
  onError(e) {
    console.error(e);
  },
});

// 2. 插件
// app.use({});

// 3. 注册全局模型
app.model(require('./models/global').default);

// 4. 路由
app.router(require('./router').default);

// 5. Start
app.start('#root');