import {createRoutes} from '../utils/core';
import BaseLayout from '../layouts/BasicLayout';
import UserLayout from '../layouts/UserLayout';
import NotFound from './Pages/404';
import Login from './Login';
import Home from './Home';

const routesConfig = (app) => ([
  {
    path: '/user',
    title: '登录',
    component: UserLayout,
    childRoutes: [
      Login(app)
    ]
  }, {
    path: '/',
    title: '系统中心',
    component: BaseLayout,
    childRoutes: [
      Home(app),
      NotFound()
    ]
  }
]);

export default app => createRoutes(app, routesConfig);