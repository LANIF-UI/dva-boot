import React from 'react';
import { PageLoading } from '@/components';

/**
 * 应用配置 如请求格式，反回格式，异常处理方式，分页格式等
 */
export default {
  // 异步请求配置
  request: {
    prefix: '',
  },

  // 全局异常
  exception: {
    global: (err, dispatch) => {
      const errName = err.name;
      // RequestError为拦截请求异常
      if (errName === 'RequestError') {
        console.error(err); 
      } else {
        console.error(err);
      }
    },
  },

  // 分页助手
  pageHelper: {
    // 格式化要发送到后端的数据
    requestFormat: (pageInfo) => {
      const { pageNum, pageSize, filters, sorts } = pageInfo;
      return {
        pageNum, pageSize, filters, sorts
      }
    },

    // 格式化从后端反回的数据
    responseFormat: (resp) => {
      const { status, data, message } = resp;
      if (status) {
        const { pageNum, size, total, totalPages, list } = data;
        return {
          pageNum, size, total, totalPages, list
        }
      } else {
        throw new Error(message);
      }
    }
  },

  // 路由加载效果
  router: {
    loading: <PageLoading loading />
  },
  
  /**
   * 模拟数据时包装反回数据
   * 因为，后端反回数据时一般都会在外边包装一层状态信息
   * 如成功时：
   * {
   *   status: true,
   *   data: responseData
   * }
   * 或出错时：
   * {
   *   status: false,
   *   code: 500,
   *   message: '用户名或密码错误'
   * }
   * 这里就是配置这两个函数，为了我们模拟数据时可以少写几行代码的 orz...
   */
  mock: {
    toSuccess: (response) => ({
      status: true,
      data: response,
    }),

    toError: (message) => ({
      status: false,
      message: message,
    }),
  }
}