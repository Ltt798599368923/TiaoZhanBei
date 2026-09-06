const api = require('../../utils/api.js')

Page({
  data: {
    userInfo: null,
    hasLogin: false,
    loginLoading: false
  },

  onLoad(options) {
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token');
    const userId = wx.getStorageSync('userId');
    if (token && userId) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  wechatLogin() {
    if (this.data.loginLoading) {
      return;
    }
    this.setData({ loginLoading: true });
    wx.showLoading({
      title: '登录中...',
      mask: true
    });

    wx.login({
      success: (loginRes) => {
        if (loginRes.code) {
          wx.getUserProfile({
            desc: '用于完善用户资料',
            success: (profileRes) => {
              const { nickName, avatarUrl } = profileRes.userInfo;
              this.doLogin(loginRes.code, nickName, avatarUrl);
            },
            fail: () => {
              this.doLogin(loginRes.code, '用户', '');
            }
          });
        } else {
          wx.hideLoading();
          this.setData({ loginLoading: false });
          wx.showToast({
            title: '获取登录凭证失败',
            icon: 'none'
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        this.setData({ loginLoading: false });
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  doLogin(code, nickname, avatar) {
    api.login(code, nickname, avatar)
      .then(res => {
        wx.hideLoading();
        this.setData({ loginLoading: false });
        
        if (res.code === 200 && res.data) {
          const { token, userInfo } = res.data;
          
          wx.setStorageSync('token', token);
          wx.setStorageSync('userId', userInfo.id);
          wx.setStorageSync('userInfo', userInfo);
          
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 1000);
        } else {
          wx.showToast({
            title: res.message || '登录失败',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        this.setData({ loginLoading: false });
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
      });
  },

  showAgreement() {
    wx.showModal({
      title: '用户协议',
      content: '欢迎使用法律咨询平台。本协议是您与平台之间的法律协议，旨在规范您的使用行为，保护双方的合法权益。',
      showCancel: false,
      confirmText: '我知道了'
    });
  },

  showPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '我们重视您的隐私保护。本政策描述了我们如何收集、使用、存储和保护您的个人信息。',
      showCancel: false,
      confirmText: '我知道了'
    });
  }
});
