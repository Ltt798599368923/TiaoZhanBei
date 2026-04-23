// document.js
// 文书模板页面逻辑
Page({
  /**
   * 页面数据
   */
  data: {
    categories: [  // 文书分类列表
      { id: 1, name: '民事诉讼', count: 28 },
      { id: 2, name: '刑事诉讼', count: 15 },
      { id: 3, name: '行政诉讼', count: 12 },
      { id: 4, name: '仲裁业务', count: 9 },
      { id: 5, name: '公证事务', count: 18 },
      { id: 6, name: '合同协议', count: 35 }
    ],
    documents: [  // 文书模板列表
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

  /**
   * 页面加载
   */
  onLoad() {
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: '文书模板'
    });
  },

  /**
   * 点击文书
   * @param {Object} e - 事件对象，包含文书ID
   */
  onDocumentTap(e) {
    const id = e.currentTarget.dataset.id;  // 获取文书ID
    // 显示提示信息
    wx.showToast({
      title: '查看文书详情',
      icon: 'none'
    });
  },

  /**
   * 选择分类
   * @param {Object} e - 事件对象，包含分类ID
   */
  selectCategory(e) {
    const id = e.currentTarget.dataset.id;  // 获取分类ID
    const category = this.data.categories.find(item => item.id === id);  // 查找分类详情
    // 显示提示信息
    wx.showToast({
      title: `查看${category.name}模板`,
      icon: 'none'
    });
  },

  /**
   * 查看全部模板
   */
  viewAllTemplates() {
    // 显示提示信息
    wx.showToast({
      title: '查看全部模板',
      icon: 'none'
    });
  },

  /**
   * 查看更多文书
   */
  viewMoreDocuments() {
    // 显示提示信息
    wx.showToast({
      title: '查看更多文书',
      icon: 'none'
    });
  },

  /**
   * 使用文书模板
   * @param {Object} e - 事件对象，包含文书ID
   */
  useDocument(e) {
    const id = e.currentTarget.dataset.id;  // 获取文书ID
    const document = this.data.documents.find(item => item.id === id);  // 查找文书详情
    // 显示提示信息
    wx.showToast({
      title: `使用${document.title}`,
      icon: 'none'
    });
  },

  /**
   * 联系律师
   */
  contactLawyer() {
    // 显示联系律师对话框
    wx.showModal({
      title: '联系律师',  // 对话框标题
      content: '我们的专业律师将为您提供一对一的文书定制服务。',  // 对话框内容
      confirmText: '立即联系',  // 确认按钮文本
      cancelText: '取消',  // 取消按钮文本
      success: (res) => {
        if (res.confirm) {
          // 显示提示信息
          wx.showToast({
            title: '联系功能开发中',
            icon: 'info'
          });
        }
      }
    });
  }
})
