Page({
  data: {
    categories: [
      { id: 1, name: '民事诉讼', count: 28 },
      { id: 2, name: '刑事诉讼', count: 15 },
      { id: 3, name: '行政诉讼', count: 12 },
      { id: 4, name: '仲裁业务', count: 9 },
      { id: 5, name: '公证事务', count: 18 },
      { id: 6, name: '合同协议', count: 35 }
    ],
    documents: [
      { id: 1, title: '民事起诉状', category: '民事诉讼', download: 1250 },
      { id: 2, title: '离婚协议书', category: '民事诉讼', download: 2340 },
      { id: 3, title: '房屋租赁合同', category: '合同协议', download: 1890 },
      { id: 4, title: '借条模板', category: '合同协议', download: 3100 },
      { id: 5, title: '刑事辩护词', category: '刑事诉讼', download: 560 },
      { id: 6, title: '行政起诉状', category: '行政诉讼', download: 420 },
      { id: 7, title: '仲裁申请书', category: '仲裁业务', download: 380 },
      { id: 8, title: '委托公证书', category: '公证事务', download: 720 }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '文书模板'
    });
  },

  onDocumentTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看文书详情',
      icon: 'none'
    });
  },

  selectCategory(e) {
    const id = e.currentTarget.dataset.id;
    const category = this.data.categories.find(item => item.id === id);
    wx.showToast({
      title: `查看${category.name}模板`,
      icon: 'none'
    });
  },

  viewAllTemplates() {
    wx.showToast({
      title: '查看全部模板',
      icon: 'none'
    });
  },

  viewMoreDocuments() {
    wx.showToast({
      title: '查看更多文书',
      icon: 'none'
    });
  },

  useDocument(e) {
    const id = e.currentTarget.dataset.id;
    const document = this.data.documents.find(item => item.id === id);
    wx.showToast({
      title: `使用${document.title}`,
      icon: 'none'
    });
  },

  contactLawyer() {
    wx.showModal({
      title: '联系律师',
      content: '我们的专业律师将为您提供一对一的文书定制服务。',
      confirmText: '立即联系',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '联系功能开发中',
            icon: 'info'
          });
        }
      }
    });
  }
})
