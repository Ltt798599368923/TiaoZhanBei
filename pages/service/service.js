Page({
  data: {
    services: [
      {
        id: 1,
        name: '律师咨询与预约',
        description: '专业律师在线解答，一键预约',
        mark: '咨',
        label: '专业律师',
        tone: 'red'
      },
      {
        id: 2,
        name: '官方服务入口',
        description: '政府法律服务官方通道',
        mark: '官',
        label: '权威渠道',
        tone: 'blue'
      },
      {
        id: 3,
        name: '法律文书代写',
        description: '专业律师帮您起草各类法律文书',
        mark: '文',
        label: '文书支持',
        tone: 'gold'
      },
      {
        id: 4,
        name: '合同审查服务',
        description: '专业律师审查合同，规避法律风险',
        mark: '审',
        label: '风险把关',
        tone: 'green'
      },
      {
        id: 5,
        name: '企业法律服务',
        description: '为企业提供全方位法律服务',
        mark: '企',
        label: '企业服务',
        tone: 'ink',
        featured: true
      }
    ]
  },

  handleServiceTap(e) {
    const serviceId = parseInt(e.currentTarget.dataset.id);

    switch (serviceId) {
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
          url: '/pages/consult/consult?service=' + encodeURIComponent('法律文书代写')
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
