const api = require('../../utils/api.js')

Page({
  data: {
    lawyers: [],
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
          initial: item.name ? item.name.slice(0, 1) : '律'
        }))
        this.setData({ lawyers })
      })
      .catch(() => this.setData({ lawyers: [], loadError: '律师信息加载失败，请稍后重试' }))
      .finally(() => this.setData({ loading: false }))
  },

  reserveLawyer(e) {
    const lawyerId = e.currentTarget.dataset.id
    const lawyerName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/consult/consult?lawyerId=${lawyerId}&lawyerName=${encodeURIComponent(lawyerName)}`
    })
  }
})
