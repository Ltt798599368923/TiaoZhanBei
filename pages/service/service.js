// service.js
Page({
  data: {
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
  onLoad() {
    // 页面加载时的逻辑
  },
  handleServiceTap(e) {
    const serviceId = parseInt(e.currentTarget.dataset.id);
    const service = this.data.services.find(item => item.id === serviceId);

    switch(serviceId) {
      case 1:
        wx.navigateTo({
          url: '/pages/lawyer/lawyer'
        });
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/official/official'
        });
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/document/document'
        });
        break;
      case 4:
        wx.navigateTo({
          url: '/pages/contract/contract'
        });
        break;
      case 5:
        wx.navigateTo({
          url: '/pages/enterprise/enterprise'
        });
        break;
      default:
        break;
    }
  }
})