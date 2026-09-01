const api = require('../../utils/api.js')

Page({
  data: {
    notice: null,
    loading: true
  },

  onLoad(options) {
    wx.setNavigationBarTitle({ title: '系统通知' })
    if (options.id) {
      this.loadNotice(options.id)
    } else {
      this.setData({ loading: false })
    }
  },

  loadNotice(id) {
    api.getNoticeDetail(id).then(res => {
      if (res.code === 200) {
        this.setData({ notice: res.data })
      } else {
        wx.showToast({ title: res.message || '加载失败', icon: 'none' })
      }
    }).catch(() => {
      wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
    }).finally(() => {
      this.setData({ loading: false })
    })
  },

  goBack() {
    wx.navigateBack({ delta: 1 })
  }
})
