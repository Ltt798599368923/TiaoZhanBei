const api = require('../../utils/api.js')
const API_BASE_URL = 'https://api.fashijie.top'

Page({
  data: {
    consultationId: '',
    detail: null,
    lawyer: null,
    updates: [],
    loading: true
  },

  onLoad(options) {
    const consultationId = options.consultationId || ''
    if (!consultationId) {
      wx.showToast({ title: '未找到预约记录', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1000)
      return
    }
    this.setData({ consultationId })
    this.loadDetail(options.lawyerId || '')
  },

  loadDetail(initialLawyerId) {
    const userId = wx.getStorageSync('userId')
    if (!userId) return
    this.setData({ loading: true })
    api.getConsultationDetail(userId, this.data.consultationId)
      .then(res => {
        if (res.code !== 200 || !res.data) throw new Error(res.message || '预约记录加载失败')
        const detail = res.data
        this.setData({ detail })
        const lawyerId = detail.lawyerId || initialLawyerId
        const tasks = [api.getConsultationMessages(userId, this.data.consultationId)]
        if (lawyerId) tasks.push(api.getLawyerDetail(lawyerId))
        return Promise.all(tasks)
      })
      .then(results => {
        const messageResult = results[0]
        const lawyerResult = results[1]
        const updates = messageResult && messageResult.code === 200
          ? (messageResult.data || []).map(item => this.formatUpdate(item))
          : []
        const lawyer = lawyerResult && lawyerResult.code === 200
          ? {
            ...lawyerResult.data,
            avatarUrl: lawyerResult.data.avatarUrl && lawyerResult.data.avatarUrl.startsWith('/')
              ? API_BASE_URL + lawyerResult.data.avatarUrl : lawyerResult.data.avatarUrl,
            initial: (lawyerResult.data.name || '律').slice(0, 1)
          }
          : null
        this.setData({ updates, lawyer })
      })
      .catch(error => wx.showToast({ title: error.message || '预约记录加载失败', icon: 'none' }))
      .finally(() => this.setData({ loading: false }))
  },

  formatUpdate(item) {
    const timestamp = new Date(String(item.createdTime || '').replace(/-/g, '/')).getTime()
    const date = Number.isNaN(timestamp) ? null : new Date(timestamp)
    return {
      ...item,
      label: item.senderRole === 'user' ? '已提交预约申请' : '平台反馈',
      displayTime: date ? `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}` : ''
    }
  }
})
