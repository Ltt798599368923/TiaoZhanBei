/**
 * 服务页面逻辑
 * 用于展示各类法律服务并提供跳转功能
 */
Page({
  /**
   * 页面数据
   */
  data: {
    /**
     * 服务列表数据
     * 包含服务ID、名称、描述和图标
     */
    services: [
      {
        id: 1,
        name: '律师咨询与预约',
        description: '专业律师在线解答，一键预约',
        icon: '👨‍⚖️'
      },
      {
        id: 2,
        name: '官方服务入口',
        description: '政府法律服务官方通道',
        icon: '🏛️'
      },
      {
        id: 3,
        name: '法律文书代写',
        description: '专业律师帮您起草各类法律文书',
        icon: '📄'
      },
      {
        id: 4,
        name: '合同审查服务',
        description: '专业律师审查合同，规避法律风险',
        icon: '🔍'
      },
      {
        id: 5,
        name: '企业法律服务',
        description: '为企业提供全方位法律服务',
        icon: '💼'
      }
    ]
  },

  /**
   * 页面加载
   * 页面加载时的逻辑
   */
  onLoad() {
    // 页面加载时的逻辑
  },

  /**
   * 处理服务点击事件
   * @param {Object} e - 事件对象，包含服务ID
   * 根据服务ID跳转到对应的页面
   */
  handleServiceTap(e) {
    const serviceId = parseInt(e.currentTarget.dataset.id);
    const service = this.data.services.find(item => item.id === serviceId);

    switch(serviceId) {
      case 1:
        // 跳转到律师咨询与预约页面
        wx.navigateTo({
          url: '/pages/lawyer/lawyer'
        });
        break;
      case 2:
        // 跳转到官方服务入口页面
        wx.navigateTo({
          url: '/pages/official/official'
        });
        break;
      case 3:
        // 跳转到法律文书代写页面
        wx.navigateTo({
          url: '/pages/document/document'
        });
        break;
      case 4:
        // 跳转到合同审查服务页面
        wx.navigateTo({
          url: '/pages/contract/contract'
        });
        break;
      case 5:
        // 跳转到企业法律服务页面
        wx.navigateTo({
          url: '/pages/enterprise/enterprise'
        });
        break;
      default:
        break;
    }
  }
})