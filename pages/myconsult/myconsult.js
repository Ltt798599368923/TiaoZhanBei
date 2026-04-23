Page({
  data: {
    consults: [
      {
        id: 1,
        title: '婚姻财产分割咨询',
        content: '我想了解离婚时财产如何分割，特别是房产和存款的处理方式。',
        date: '2026-04-22',
        status: '已回复'
      },
      {
        id: 2,
        title: '劳动合同纠纷咨询',
        content: '公司拖欠工资，我想了解如何维护自己的权益。',
        date: '2026-04-20',
        status: '已回复'
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '我的咨询'
    });
  },

  // 查看详情
  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看咨询详情',
      icon: 'none'
    });
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})