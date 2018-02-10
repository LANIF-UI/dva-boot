import React from 'react';
import dynamic from 'dva/dynamic';
import PageHelper from '@/utils/pageHelper';
import request from 'cmn-utils/lib/request';
import { PageLoading } from '@/components';

/**
 * 应用配置中心 如请求格式，反回格式，异常处理方式，分页格式等
 */
class AppConfig {
  /**
   * DVA app
   * @param {*} app 
   */
  constructor(app) {
    if (!app) throw new Error('application setup need dva object');
    this.app = app;

    this.requestConfig();
    this.pageConfig();
    this.exceptionConfig(app);
    this.otherConfig();
  }
  /**
   * 请求配置
   */
  requestConfig() {
    request.config();
  }

  /**
   * 分页配置
   */
  pageConfig() {
    PageHelper.requestFormat = (pageInfo) => {
      const { pageNum, pageSize, filters, sorts } = pageInfo;
      return {
        pageNum, pageSize, filters, sorts
      }
    };

    PageHelper.responseFormat = (resp) => {
      const { size, total, totalPages, list } = resp;
      return {
        size, total, totalPages, list
      }
    }
  }

  /**
   * 全局异常配置
   */
  exceptionConfig(app) {
    app.use({
      onError: (err, dispatch) => {
        const errName = err.name;
        if (errName === 'RequestError') {
          console.log(err); 
        } else {
          console.error(err);
        }
      }
    })
  }

  /**
   * 其它配置
   */
  otherConfig() {
    // 路由切换时加载中效果
    dynamic.setDefaultLoadingComponent(() => <PageLoading />);
  }
}

export default AppConfig; 