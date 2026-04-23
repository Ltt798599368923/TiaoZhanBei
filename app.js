App({
  onLaunch() {
    wx.cloud.init({
      env: 'falv-app', // 替换成你自己的环境ID
      traceUser: true
    })
  }
})