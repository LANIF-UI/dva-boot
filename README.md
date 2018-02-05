# DVA-BOOT

这个脚手架设计的初衷是为了让您不用费心的挑选该用些什么技术搭建我们的工程，它已经包含了构建现代web的所必须的技术和一些流行的类库，它不是一个完整的实际应用程序，而是提供给您一组工具，可以开发出健壮、快捷的web程序。

使用dva 2以及React 16，动态路由，和按功能划分的目录，开发时不用关心其它目录，只在自已的路由下写新功能即可，配置也都在自已的目录中，团队成员开发不会互相冲突。

# Table of Contents
* [Project Structure](#project-structure)
* [Method](#method)
* [Development](#development)
* [Thank You](#thank-you)

## Project Structure
```
.
├── public                   # 不参与编译的资源文件
├── src                      # 主程序目录
│   ├── index.js             # 程序启动和渲染入口文件
│   ├── components           # 全局公共组件
│   ├── layouts              # 页面结构组件
│   │   ├── BasicLayout      # 基本布局
│   │   └── OtherLayout      # 布局组件根据具体功能调整，在路由配置中引用
│   ├── routes               # 动态路由目录（每个功能一个文件夹的MVC结构）
│   │   ├── index.js         # 路由配置文件
│   │   ├── Home             # 功能模块
│   │   │   ├── index.js     # 路由配置文件
│   │   │   ├── assets       # 单独属于这个模块的静态资源文件
│   │   │   ├── components   # 页面组件
│   │   │   ├── model        # dva model
│   │   │   ├── service      # dva service
│   │   │   └── routes **    # 子路由(目录结构与父级相同)
│   │   └── Login            # 功能模块
│   │       ├── index.js     # 路由配置文件
│   │       ├── assets       # 单独属于这个模块的静态资源文件
│   │       ├── components   # 页面组件
│   │       ├── model        # dva model
│   │       ├── service      # dva service
│   │       └── routes **    # 子路由(目录结构与父级相同)
│   ├── utils                # 工具类
│   └── assets               # 资源文件
│           ├── fonts        # 字体 & 字体图标
│           ├── images       # 图片
│           └── styles       # 全局样式
```

## Method

### modelEnhance

modelEnhance是对dva model层的简单包装函数，有时候我们只是想要简单的fetch一下，从服务端获取数据进行展示，之前可能要专门在model中写一些effects和reducers,在service中定义请求函数，如果用modelEnhance包装一下的话可以简写成下面的形式

```javascript
// src/routes/UserInfo/model/index.js

import modelEnhance from '@/utils/modelEnhance';

// 把之间的普通model传入modelEnhance即可，不用定义其它变量
export default modelEnhance({
  namespace: 'userInfo',
});

// src/routes/UserInfo/components/index.js

// 在组件中直接发出一个类型为`@request`的action,
// 结果会存入userInfo对应的state中，使用的key为`valueField`的值
this.props.dispatch({
  type: 'userInfo/@request',
  payload: {
    url: 'http://httpbin.org/get',
    valueField: 'httpbin'
  }
});
```

### exception

全局异常处理

### cmn-utils

脚手架使用了[cmn-utils](https://github.com/LANIF-UI/cmn-utils)做为工具库，这里面提供了请求、存储、事件等许多实用方法

## Development

```bash
$ git clone https://github.com/LANIF-UI/dva-boot.git
$ cd dva-boot
$ yarn
$ yarn start
```

## Thank You
- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [dvajs](https://github.com/dvajs/dva)
- [react-script-antd-pro](https://github.com/WhatAKitty/react-script-antd-pro/tree/master/src)
- [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)