const api = require('../../utils/api.js')

const TYPE_LABELS = {
  article: '普法文章',
  law: '法规动态',
  book: '法规阅读',
  video: '视频内容'
}

function isDirectVideo(url) {
  return /\.(mp4|m3u8)(?:\?.*)?$/i.test(url || '')
}

function isImageFile(fileName) {
  return /\.(jpg|jpeg|png)$/i.test(fileName || '')
}

Page({
  data: {
    type: '',
    contentId: '',
    item: null,
    loading: true,
    loadError: '',
    typeLabel: '',
    hasSource: false,
    showSource: false,
    showAttachment: false,
    canPlayVideo: false
  },

  onLoad(options) {
    const type = options.type || ''
    const contentId = options.id || ''
    if (!TYPE_LABELS[type] || !contentId) {
      this.setData({ loading: false, loadError: '内容参数无效' })
      return
    }
    this.setData({
      type,
      contentId,
      typeLabel: TYPE_LABELS[type]
    })
    this.loadContent()
  },

  loadContent() {
    this.setData({ loading: true, loadError: '' })
    return api.getContentDetail(this.data.type, this.data.contentId)
      .then(res => {
        if (res.code !== 200 || !res.data) {
          throw new Error(res.message || '内容不存在')
        }
        const item = res.data
        const canShowSource = this.data.type !== 'article' && Boolean(item.sourceUrl)
        const canShowAttachment = this.data.type === 'book' && Boolean(item.hasFile)
        wx.setNavigationBarTitle({ title: item.title || '内容详情' })
        this.setData({
          item,
          hasSource: Boolean(item.sourceUrl),
          showSource: canShowSource,
          showAttachment: canShowAttachment,
          canPlayVideo: this.data.type === 'video' && isDirectVideo(item.sourceUrl)
        })
      })
      .catch(error => {
        this.setData({ loadError: error.message || '内容加载失败，请稍后重试' })
      })
      .finally(() => this.setData({ loading: false }))
  },

  openAttachment() {
    const item = this.data.item
    if (!item || !item.hasFile) return
    wx.showLoading({ title: '下载中...', mask: true })
    api.downloadContentFile(this.data.type, item.id)
      .then(filePath => {
        wx.hideLoading()
        if (isImageFile(item.fileName)) {
          wx.previewImage({ current: filePath, urls: [filePath] })
          return
        }
        wx.openDocument({ filePath, showMenu: true })
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({ title: '资料下载失败，请稍后重试', icon: 'none' })
      })
  },

  copySourceUrl() {
    const sourceUrl = this.data.item && this.data.item.sourceUrl
    if (!sourceUrl) return
    wx.setClipboardData({
      data: sourceUrl,
      success: () => wx.showToast({ title: '原文地址已复制', icon: 'success' }),
      fail: () => wx.showToast({ title: '复制失败，请稍后重试', icon: 'none' })
    })
  },

  retry() {
    this.loadContent()
  },

  onShareAppMessage() {
    const item = this.data.item || {}
    return {
      title: item.title || '法视界',
      path: `/pages/contentdetail/contentdetail?type=${this.data.type}&id=${this.data.contentId}`
    }
  }
})
