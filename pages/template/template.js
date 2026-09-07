const api = require('../../utils/api.js')

Page({
  data: {
    categories: [
      { id: 'civil', name: '民事类', mark: '民' },
      { id: 'criminal', name: '刑事类', mark: '刑' },
      { id: 'contract', name: '合同类', mark: '合' },
      { id: 'administrative', name: '行政类', mark: '行' },
      { id: 'company', name: '公司类', mark: '企' },
      { id: 'other', name: '其他类', mark: '其' }
    ],
    templates: [],
    selectedCategory: '',
    loading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '文书模板' })
    this.loadTemplates()
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
    if (!id) {
      wx.showToast({ title: '模板信息不完整', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: '/pages/templatedetail/templatedetail?id=' + encodeURIComponent(id)
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

})
