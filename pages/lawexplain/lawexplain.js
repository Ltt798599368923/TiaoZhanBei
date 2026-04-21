Page({
  data: {
    articles: [
      { id: 1, title: '什么是正当防卫？', summary: '用通俗易懂的语言解释正当防卫的构成要件和适用范围', readCount: 3250, date: '04-20' },
      { id: 2, title: '民间借贷利率新规', summary: '详解最新民间借贷司法解释的变化与影响', readCount: 2890, date: '04-19' },
      { id: 3, title: '婚姻法新变化', summary: '民法典实施后婚姻家庭编的主要修改点', readCount: 4560, date: '04-18' },
      { id: 4, title: '继承顺序详解', summary: '法定继承与遗嘱继承的区别与适用', readCount: 2340, date: '04-17' },
      { id: 5, title: '劳动仲裁流程', summary: '劳动者维权必知的仲裁申请步骤', readCount: 4120, date: '04-16' },
      { id: 6, title: '房屋买卖避坑指南', summary: '二手房交易中需要注意的法律风险', readCount: 3780, date: '04-15' }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '法理白话'
    });
  },

  onArticleTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看文章详情',
      icon: 'none'
    });
  }
})
