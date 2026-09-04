const api = require('../../utils/api.js')

Page({
  data: {
    categories: [
      { id: 'civil', name: '民事类', icon: '📄' },
      { id: 'criminal', name: '刑事类', icon: '⚖️' },
      { id: 'contract', name: '合同类', icon: '📝' },
      { id: 'administrative', name: '行政类', icon: '🏛️' },
      { id: 'company', name: '公司类', icon: '🏢' },
      { id: 'other', name: '其他类', icon: '📚' }
    ],
    templates: [],
    selectedCategory: '',
    loading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '文书模板' })
    this.loadTemplates()
  },

  goBack() {
    wx.navigateBack({ delta: 1 })
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.loadTemplates(this.data.selectedCategory === category ? '' : category)
  },

  viewAllTemplates() {
    this.loadTemplates()
  },

  loadTemplates(category = '') {
    this.setData({ loading: true, selectedCategory: category })
    const request = category ? api.getTemplatesByCategory(category) : api.getAllTemplates()

    request.then(res => {
      if (res.code === 200) {
        this.setData({ templates: res.data || [] })
      } else {
        wx.showToast({ title: res.message || '加载失败', icon: 'none' })
      }
    }).catch(() => {
      wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
    }).finally(() => {
      this.setData({ loading: false })
    })
  },

  viewTemplateDetail(e) {
    const id = e.currentTarget.dataset.id
    api.getTemplateDetail(id).then(res => {
      if (res.code !== 200 || !res.data) {
        wx.showToast({ title: res.message || '加载失败', icon: 'none' })
        return
      }

      const template = res.data
      wx.showModal({
        title: template.title,
        content: template.content || template.description || '该模板暂无正文内容。',
        confirmText: template.hasFile ? '下载文件' : '复制模板',
        success: modalRes => {
          if (modalRes.confirm) {
            this.useTemplate(template)
          }
        }
      })
    }).catch(() => {
      wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
    })
  },

  addFavorite(e) {
    const userId = wx.getStorageSync('userId')
    const id = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.title
    const description = e.currentTarget.dataset.description
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      return
    }

    api.addFavorite(userId, {
      title,
      description,
      icon: '📄',
      contentType: 'template',
      contentId: id
    }).then(res => {
      wx.showToast({ title: res.code === 200 ? '已收藏' : (res.message || '收藏失败'), icon: res.code === 200 ? 'success' : 'none' })
    }).catch(() => {
      wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
    })
  },

  useTemplate(template) {
    if (template.hasFile) {
      wx.showLoading({ title: '下载中...', mask: true })
      api.downloadTemplateFile(template.id).then(filePath => {
        wx.hideLoading()
        wx.openDocument({ filePath, showMenu: true })
        this.loadTemplates(this.data.selectedCategory)
      }).catch(() => {
        wx.hideLoading()
        wx.showToast({ title: '文件下载失败', icon: 'none' })
      })
      return
    }

    if (!template.content) {
      wx.showToast({ title: '该模板暂无可复制正文', icon: 'none' })
      return
    }
    api.downloadTemplate(template.id).then(res => {
      if (res.code !== 200) {
        wx.showToast({ title: res.message || '操作失败', icon: 'none' })
        return
      }
      wx.setClipboardData({ data: template.content })
      this.loadTemplates(this.data.selectedCategory)
    }).catch(() => wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' }))
  }
})
