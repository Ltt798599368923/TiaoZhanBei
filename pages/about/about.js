Page({
  data: {
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '关于我们'
    });
  },

  // 拨打电话
  makeCall() {
    wx.makePhoneCall({
      phoneNumber: '4001234567',
      success: function() {
        console.log('拨打电话成功');
      },
      fail: function() {
        console.log('拨打电话失败');
      }
    });
  },
  
  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})