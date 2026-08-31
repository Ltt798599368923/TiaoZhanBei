//首页--服务--法律服务

// enterprise.js
// 企业法律服务页面逻辑
Page({
  /**
   * 页面数据
   */
  data: {
    services: [  // 企业服务列表
      {
        type: 'setup',          // 服务类型
        name: '企业设立',        // 服务名称
        description: '公司注册、股权结构设计'  // 服务描述
      },
      {
        type: 'contract',        // 服务类型
        name: '合同管理',        // 服务名称
        description: '合同起草、审查、管理'  // 服务描述
      },
      {
        type: 'ip',              // 服务类型
        name: '知识产权',        // 服务名称
        description: '商标、专利、著作权保护'  // 服务描述
      },
      {
        type: 'labor',           // 服务类型
        name: '劳动人事',        // 服务名称
        description: '劳动合同、社保、工伤处理'  // 服务描述
      }
    ],
    plans: [  // 服务方案列表
      {
        plan: 'basic',           // 方案类型
        name: '基础服务',        // 方案名称
        price: '¥2999/年',       // 方案价格
        features: ['企业法律咨询', '合同审查（5份/年）', '法律文书起草（3份/年）']  // 方案功能
      },
      {
        plan: 'standard',        // 方案类型
        name: '标准服务',        // 方案名称
        price: '¥5999/年',       // 方案价格
        features: ['企业法律咨询', '合同审查（10份/年）', '法律文书起草（6份/年）', '劳动人事咨询', '知识产权咨询']  // 方案功能
      },
      {
        plan: 'premium',         // 方案类型
        name: '高级服务',        // 方案名称
        price: '¥9999/年',       // 方案价格
        features: ['企业法律咨询', '合同审查（不限）', '法律文书起草（不限）', '劳动人事咨询', '知识产权咨询', '企业法律风险评估']  // 方案功能
      }
    ]
  },

  /**
   * 页面加载
   */
  onLoad() {
    // 页面加载时的逻辑
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack();  // 调用微信API返回上一页
  },

  /**
   * 选择服务
   * @param {Object} e - 事件对象，包含服务类型
   */
  selectService(e) {
    const serviceType = e.currentTarget.dataset.type;  // 获取服务类型
    const service = this.data.services.find(item => item.type === serviceType);  // 查找服务详情

    // 显示确认对话框
    wx.showModal({
      title: service.name,  // 对话框标题
      content: `您选择了${service.name}服务，是否继续？`,  // 对话框内容
      confirmText: '继续',  // 确认按钮文本
      cancelText: '取消',  // 取消按钮文本
      success: (res) => {
        if (res.confirm) {
          // 显示提示信息
          wx.showToast({
            title: `${service.name}功能开发中`,
            icon: 'info'
          });
        }
      }
    });
  },

  /**
   * 选择服务方案
   * @param {Object} e - 事件对象，包含方案类型
   */
  selectPlan(e) {
    const planType = e.currentTarget.dataset.plan;  // 获取方案类型
    const plan = this.data.plans.find(item => item.plan === planType);  // 查找方案详情

    // 显示确认对话框
    wx.showModal({
      title: plan.name,  // 对话框标题
      content: `您选择了${plan.name}，价格：${plan.price}，是否继续？`,  // 对话框内容
      confirmText: '选择方案',  // 确认按钮文本
      cancelText: '取消',  // 取消按钮文本
      success: (res) => {
        if (res.confirm) {
          // 显示提示信息
          wx.showToast({
            title: `${plan.name}功能开发中`,
            icon: 'info'
          });
        }
      }
    });
  },

  /**
   * 联系我们
   */
  contactUs() {
    // 显示联系我们对话框
    wx.showModal({
      title: '联系我们',  // 对话框标题
      content: '您可以通过以下方式联系我们：\n电话：400-123-4567\n邮箱：service@falv.com',  // 对话框内容
      confirmText: '确定',  // 确认按钮文本
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
  },

  /**
   * 联系顾问
   */
  contactAdviser() {
    // 显示联系顾问对话框
    wx.showModal({
      title: '联系顾问',  // 对话框标题
      content: '我们的专业顾问将为您提供一对一的法律咨询服务。',  // 对话框内容
      confirmText: '立即咨询',  // 确认按钮文本
      cancelText: '取消',  // 取消按钮文本
      success: (res) => {
        if (res.confirm) {
          // 显示提示信息
          wx.showToast({
            title: '顾问联系功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },

  /**
   * 按钮按下效果
   * @param {Object} e - 事件对象
   */
  buttonDown(e) {
    this.setData({ btnPressed: e.currentTarget.dataset.id });
  },

  buttonUp(e) {
    this.setData({ btnPressed: null });
  }
})