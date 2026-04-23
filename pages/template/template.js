// template.js
Page({
  data: {
    // 模板分类数据
    categories: [
      { id: 'civil', name: '民事类', icon: '⚖️' },
      { id: 'criminal', name: '刑事类', icon: '🔒' },
      { id: 'contract', name: '合同类', icon: '📄' },
      { id: 'administrative', name: '行政类', icon: '🏛️' },
      { id: 'company', name: '公司类', icon: '🏢' },
      { id: 'other', name: '其他类', icon: '📋' }
    ],
    // 热门模板数据
    hotTemplates: [
      { id: 1, name: '民事起诉状', usage: 1250 },
      { id: 2, name: '离婚协议书', usage: 980 },
      { id: 3, name: '房屋租赁合同', usage: 860 }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '文书模板'
    });
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  // 选择模板分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    wx.showToast({
      title: `选择了${category}分类`,
      icon: 'none'
    });
  },

  // 查看模板详情
  viewTemplateDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看模板详情',
      icon: 'none'
    });
  },

  // 查看全部模板
  viewAllTemplates() {
    wx.showToast({
      title: '查看全部模板',
      icon: 'none'
    });
  }
})