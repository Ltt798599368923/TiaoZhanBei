const api = require('../../utils/api.js')
const API_BASE_URL = 'https://api.fashijie.top'

Page({
  data: {
    lawyers: [],
    lawyerCount: 0,
    loading: true,
    loadError: ''
  },

  onLoad() {
    this.loadLawyers()
  },

  onShow() {
    this.loadLawyers()
  },

  loadLawyers() {
    this.setData({ loading: true, loadError: '' })
    return api.getLawyers()
      .then(res => {
        if (res.code !== 200) throw new Error(res.message || '加载失败')
        const lawyers = (res.data || []).map(item => ({
          ...item,
          avatarUrl: item.avatarUrl && item.avatarUrl.startsWith('/') ? API_BASE_URL + item.avatarUrl : item.avatarUrl,
          initial: item.name ? item.name.slice(0, 1) : '律'
        }))
        this.setData({ lawyers, lawyerCount: lawyers.length })
      })
      .catch(() => this.setData({ lawyers: [], lawyerCount: 0, loadError: '律师信息加载失败，请稍后重试' }))
      .finally(() => this.setData({ loading: false }))
  },

  reserveLawyer(e) {
    const lawyerId = e.currentTarget.dataset.id
    const lawyerName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/consult/consult?lawyerId=${lawyerId}&lawyerName=${encodeURIComponent(lawyerName)}`
    })
  },

  onAvatarError(e) {
    const index = e.currentTarget.dataset.index
    if (index === undefined) return
    this.setData({ [`lawyers[${index}].avatarUrl`]: '' })
  }
})
