//登录界面

Page({
  data: {
    // 页面数据
  },
  
  onLoad(options) {
    // 页面加载时检查是否已登录
    this.checkLoginStatus();
  },
  
  /**
   * 检查登录状态
   */
  checkLoginStatus() {
    const token = wx.getStorageSync('token');
    if (token) {
      // 已登录，跳转到首页
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },
  
  /**
   * 微信一键登录
   */
  wechatLogin() {
    wx.showLoading({
      title: '登录中...',
      mask: true
    });
    
    // 模拟登录成功（不需要后端）
    setTimeout(() => {
      wx.hideLoading();
      
      // 保存登录状态
      wx.setStorageSync('token', 'mock-token');
      wx.setStorageSync('userInfo', {
        nickname: '用户',
        avatar: 'https://example.com/avatar.png'
      });
      
      // 显示登录成功提示
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      // 跳转到首页
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        });
      }, 1000);
    }, 1000);
  },
  
  /**
   * 显示用户协议
   */
  showAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '欢迎使用法律咨询平台。本协议是您与平台之间的法律协议，旨在规范您的使用行为，保护双方的合法权益。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },
  
  /**
   * 显示隐私政策
   */
  showPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们重视您的隐私保护。本政策描述了我们如何收集、使用、存储和保护您的个人信息。',
      showCancel: false,
      confirmText: '我知道了'
    });
  }
});