import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

export default modelEnhance({
  namespace: 'userInfo',

  state: {
    info: {
      sex: '男',
      age: '18',
    },
    pageData: PageHelper.create()
  },

  effects: {

  },

  reducers: {
    
  },
});