const api = require('../../utils/api.js')

Page({
  data: {
    userInfo: {
      nickname: '',
      avatar: '',
      phone: ''
    }
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    const userId = wx.getStorageSync('userId');
    const cachedUserInfo = wx.getStorageSync('userInfo');
    
    if (cachedUserInfo) {
      cachedUserInfo.avatar = api.toAbsoluteUrl(cachedUserInfo.avatar);
      this.setData({
        userInfo: cachedUserInfo
      });
    }

    if (userId) {
      api.getUserInfo(userId)
        .then(res => {
          if (res.code === 200 && res.data) {
            res.data.avatar = api.toAbsoluteUrl(res.data.avatar);
            this.setData({
              userInfo: res.data
            });
            wx.setStorageSync('userInfo', res.data);
          }
        })
        .catch(err => {
          console.error('获取用户信息失败', err);
        });
    }
  },

  goToSettings() {
    wx.navigateTo({
      url: '/pages/settings/settings'
    })
  },

  goToFavorites() {
    wx.navigateTo({
      url: '/pages/favorite/favorite'
    })
  },

  goToMyConsult() {
    wx.navigateTo({
      url: '/pages/myconsult/myconsult'
    })
  },

  goToAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userId');
          wx.removeStorageSync('userInfo');
          
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    })
  }
})
