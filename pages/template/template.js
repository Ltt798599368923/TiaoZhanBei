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
        confirmText: '使用模板',
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

  useTemplate(template) {
    api.downloadTemplate(template.id).finally(() => {
      if (template.content) {
        wx.setClipboardData({ data: template.content })
      } else {
        wx.showToast({ title: '模板已记录使用', icon: 'success' })
      }
      this.loadTemplates(this.data.selectedCategory)
    })
  }
})
