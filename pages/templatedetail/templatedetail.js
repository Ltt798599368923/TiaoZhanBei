const api = require('../../utils/api.js')

const CATEGORY_LABELS = {
  civil: '民事类',
  criminal: '刑事类',
  contract: '合同类',
  administrative: '行政类',
  company: '公司类',
  other: '其他类'
}

Page({
  data: {
    templateId: '',
    item: null,
    loading: true,
    loadError: '',
    categoryLabel: ''
  },

  onLoad(options) {
    const templateId = options.id || ''
    if (!templateId) {
      this.setData({ loading: false, loadError: '模板参数无效' })
      return
    }
    this.setData({ templateId })
    this.loadTemplate()
  },

  loadTemplate() {
    this.setData({ loading: true, loadError: '' })
    return api.getTemplateDetail(this.data.templateId)
      .then(res => {
        if (res.code !== 200 || !res.data) {
          throw new Error(res.message || '模板不存在')
        }
        const item = res.data
        wx.setNavigationBarTitle({ title: item.title || '模板详情' })
        this.setData({
          item,
          categoryLabel: CATEGORY_LABELS[item.category] || item.category || '法律文书'
        })
      })
      .catch(error => {
        this.setData({ loadError: error.message || '模板加载失败，请稍后重试' })
      })
      .finally(() => this.setData({ loading: false }))
  },

  copyTemplate() {
    const item = this.data.item
    if (!item || !item.content) {
      wx.showToast({ title: '该模板暂无可复制正文', icon: 'none' })
      return
    }

    wx.showLoading({ title: '处理中...', mask: true })
    api.downloadTemplate(item.id)
      .then(res => {
        wx.hideLoading()
        if (res.code !== 200) {
          wx.showToast({ title: res.message || '操作失败', icon: 'none' })
          return
        }
        wx.setClipboardData({
          data: item.content,
          success: () => wx.showToast({ title: '模板正文已复制', icon: 'success' }),
          fail: () => wx.showToast({ title: '复制失败，请稍后重试', icon: 'none' })
        })
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
      })
  },

  openAttachment() {
    const item = this.data.item
    if (!item || !item.hasFile) return

    wx.showLoading({ title: '下载中...', mask: true })
    api.downloadTemplateFile(item.id)
      .then(filePath => {
        wx.hideLoading()
        wx.openDocument({
          filePath,
          showMenu: true,
          fail: () => wx.showToast({ title: '文件打开失败，请稍后重试', icon: 'none' })
        })
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({ title: '文件下载失败，请稍后重试', icon: 'none' })
      })
  },

  retry() {
    this.loadTemplate()
  },

  onShareAppMessage() {
    const item = this.data.item || {}
    return {
      title: item.title || '法视界文书模板',
      path: '/pages/templatedetail/templatedetail?id=' + this.data.templateId
    }
  }
})
