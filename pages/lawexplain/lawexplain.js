/**
 * 法理白话页面逻辑
 * 用于展示法律知识文章列表，提供法律知识普及功能
 */
Page({
  /**
   * 页面数据
   */
  data: {
    /**
     * 文章列表数据
     * 包含文章ID、标题、摘要、阅读量和日期
     */
    articles: [
      { id: 1, title: '什么是正当防卫？', summary: '用通俗易懂的语言解释正当防卫的构成要件和适用范围', readCount: 3250, date: '04-20' },
      { id: 2, title: '民间借贷利率新规', summary: '详解最新民间借贷司法解释的变化与影响', readCount: 2890, date: '04-19' },
      { id: 3, title: '婚姻法新变化', summary: '民法典实施后婚姻家庭编的主要修改点', readCount: 4560, date: '04-18' },
      { id: 4, title: '继承顺序详解', summary: '法定继承与遗嘱继承的区别与适用', readCount: 2340, date: '04-17' },
      { id: 5, title: '劳动仲裁流程', summary: '劳动者维权必知的仲裁申请步骤', readCount: 4120, date: '04-16' },
      { id: 6, title: '房屋买卖避坑指南', summary: '二手房交易中需要注意的法律风险', readCount: 3780, date: '04-15' }
    ]
  },

  /**
   * 页面加载
   * 设置导航栏标题为"法理白话"
   */
  onLoad() {
    wx.setNavigationBarTitle({
      title: '法理白话'
    });
  },

  /**
   * 文章点击事件
   * @param {Object} e - 事件对象，包含文章ID
   * 点击文章时显示提示信息
   */
  onArticleTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看文章详情',
      icon: 'none'
    });
  }
})
