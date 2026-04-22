const api = require('./utils/api.js')

App({
  onLaunch() {
    console.log('小程序启动，开始测试后端连接...')
    
    api.health().then(res => {
      console.log('✅ 后端连接成功！', res)
      wx.showToast({ title: '后端连接成功', icon: 'success' })
    }).catch(err => {
      console.error('❌ 后端连接失败！', err)
      wx.showToast({ title: '后端连接失败', icon: 'none' })
    })
  }
})