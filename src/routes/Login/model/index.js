import { routerRedux } from 'dva/router';
import { } from '../service';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
     
    },
    *logout(_, { put }) {
      
    },
  },

  reducers: {
    
  },
};