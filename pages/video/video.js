const content = require('../../utils/content.js')

Page({
  data: {
    videos: [],
    loading: true,
    loadError: ''
  },

  onLoad() {
    this.loadVideos()
  },

  loadVideos() {
    return content.load(this, 'video', 'videos')
  },

  onVideoTap(e) {
    content.open('video', e.currentTarget.dataset.id)
  },

  goBack() {
    wx.navigateBack()
  }
})
