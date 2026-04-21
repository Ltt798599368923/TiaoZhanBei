// enterprise.js
Page({
  data: {
    services: [
      {
        type: 'setup',
        name: '企业设立',
        description: '公司注册、股权结构设计'
      },
      {
        type: 'contract',
        name: '合同管理',
        description: '合同起草、审查、管理'
      },
      {
        type: 'ip',
        name: '知识产权',
        description: '商标、专利、著作权保护'
      },
      {
        type: 'labor',
        name: '劳动人事',
        description: '劳动合同、社保、工伤处理'
      }
    ],
    plans: [
      {
        plan: 'basic',
        name: '基础服务',
        price: '¥2999/年',
        features: ['企业法律咨询', '合同审查（5份/年）', '法律文书起草（3份/年）']
      },
      {
        plan: 'standard',
        name: '标准服务',
        price: '¥5999/年',
        features: ['企业法律咨询', '合同审查（10份/年）', '法律文书起草（6份/年）', '劳动人事咨询', '知识产权咨询']
      },
      {
        plan: 'premium',
        name: '高级服务',
        price: '¥9999/年',
        features: ['企业法律咨询', '合同审查（不限）', '法律文书起草（不限）', '劳动人事咨询', '知识产权咨询', '企业法律风险评估']
      }
    ]
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  goBack() {
    wx.navigateBack();
  },
  selectService(e) {
    const serviceType = e.currentTarget.dataset.type;
    const service = this.data.services.find(item => item.type === serviceType);

    wx.showModal({
      title: service.name,
      content: `您选择了${service.name}服务，是否继续？`,
      confirmText: '继续',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: `${service.name}功能开发中`,
            icon: 'info'
          });
        }
      }
    });
  },
  selectPlan(e) {
    const planType = e.currentTarget.dataset.plan;
    const plan = this.data.plans.find(item => item.plan === planType);

    wx.showModal({
      title: plan.name,
      content: `您选择了${plan.name}，价格：${plan.price}，是否继续？`,
      confirmText: '选择方案',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: `${plan.name}功能开发中`,
            icon: 'info'
          });
        }
      }
    });
  },
  contactUs() {
    wx.showModal({
      title: '联系我们',
      content: '您可以通过以下方式联系我们：\n电话：400-123-4567\n邮箱：service@falv.com',
      confirmText: '确定',
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