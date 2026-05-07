App({
  onLaunch() {
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    const token = wx.getStorageSync('token');
    const userId = wx.getStorageSync('userId');
    if (!token || !userId) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
    }
  }
})