import $$ from 'cmn-utils';
import PageHelper from './index';
/**
 * 分页对象
 */
export default class PageInfo {
  // 页码，从1开始
  pageNum = 1;

  // 每页数量
  pageSize = 10;

  // 当前页的数量
  size = -1;

  // 总记录数
  total = -1;

  // 总页数
  totalPages = -1;

  // 结果集
  list = [];

  // 过滤条件 {name: 'jonn'}
  filters = {};

  // 排序条件 {name: 'asc', age: 'desc'}
  sorts = {};

  /**
   * 希望用户输入的页数不在合法范围（第一页到最后一页之外）
   * 时能够正确的响应到正确的结果页面，那么你可以配置reasonable为true，
   * 这时如果pageNum<1,会查询第一页，如果pageNum>总页数,会查询最后一页
   */
  reasonable = false;

  /**
   * 组装分页信息
   * @param {number} pageNum page number, default 1
   * @param {number} pageSize page size, default 10
   */
  startPage(pageNum = 1, pageSize = 10) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
    return this;
  }

  /**
   * 拼接过滤条件
   * @param {object} q 过滤条件 {name: 'jonn', sex: 1}
   * @param {boolean} merge 是否将新条件与现有条件合并
   */
  filter(q, merge) {
    if ($$.isObject(q)) {
      if (merge) {
        this.filters = {...this.filters, ...q};
      } else {
        this.filters = q;
      }
    }
    return this;
  }

  /**
   * 拼接排序条件
   * @param {object} q 排序字段 {name: 'asc', age: 'desc'}
   */
  sortBy(q) {
    if ($$.isObject(q)) {
      this.sorts = q;
    }
    return this;
  }

  nextPage() {
    if (this.totalPages !== -1) {
      if (this.pageNum + 1 <= this.totalPages) {
        this.pageNum ++;
      }
    } else {
      this.pageNum = 1;
    }
    return this;
  }

  prevPage() {
    if (this.totalPages !== -1) {
      if (this.pageNum - 1 > 0) {
        this.pageNum --;
      }
    } else {
      this.pageNum = 1;
    }
    return this;
  }

  async getList(url, options) {
    const { pageNum, pageSize, filters, sorts } = this;
    let data = { pageNum, pageSize, filters, sorts };

    if ($$.isFunction(PageHelper.requestFormat)) {
      data = PageHelper.requestFormat(this);
    }
    return $$.send(url, { data, ...options }).then(resp => {
      if ($$.isFunction(PageHelper.responseFormat)) {
        const { size, total, totalPages, list } = PageHelper.responseFormat(resp);
        this.size = size;
        this.total = total;
        this.totalPages = totalPages;
        this.list = list;
        return this;
      }
    })
  }
} 