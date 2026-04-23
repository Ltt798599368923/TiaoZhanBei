Page({
  data: {
    id: ''
  },

  onLoad(options) {
    // 接收传递的参数
    if (options) {
      this.setData({
        id: options.id
      });
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: '系统通知'
      });
    }
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})