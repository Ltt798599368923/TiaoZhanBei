const api = require('../../utils/api.js')
const API_BASE_URL = 'https://api.fashijie.top'

Page({
  data: {
    lawyerId: '',
    lawyer: null,
    title: '',
    content: '',
    phone: '',
    submitting: false,
    loading: true
  },

  onLoad(options) {
    const lawyerId = options.lawyerId || ''
    if (!lawyerId) {
      wx.showToast({ title: '未找到律师信息', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1000)
      return
    }
    this.setData({ lawyerId })
    api.getLawyerDetail(lawyerId)
      .then(res => {
        if (res.code !== 200 || !res.data) throw new Error(res.message || '律师信息加载失败')
        const lawyer = {
          ...res.data,
          avatarUrl: res.data.avatarUrl && res.data.avatarUrl.startsWith('/') ? API_BASE_URL + res.data.avatarUrl : res.data.avatarUrl,
          initial: (res.data.name || '律').slice(0, 1)
        }
        this.setData({ lawyer })
        wx.setNavigationBarTitle({ title: `预约${lawyer.name}` })
      })
      .catch(error => wx.showToast({ title: error.message || '律师信息加载失败', icon: 'none' }))
      .finally(() => this.setData({ loading: false }))
  },

  bindInput(e) {
    this.setData({ [e.currentTarget.dataset.field]: e.detail.value })
  },

  submitBooking() {
    const { lawyerId, lawyer, title, content, phone, submitting } = this.data
    if (submitting) return
    if (!title.trim() || !content.trim()) {
      wx.showToast({ title: '请填写预约事项和情况说明', icon: 'none' })
      return
    }
    if (!/^1\d{10}$/.test(phone.trim())) {
      wx.showToast({ title: '请填写正确的 11 位手机号码', icon: 'none' })
      return
    }
    const userId = wx.getStorageSync('userId')
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      return
    }
    this.setData({ submitting: true })
    api.createConsultation(userId, {
      title: title.trim(),
      content: content.trim(),
      phone: phone.trim(),
      type: '律师预约',
      lawyerId: Number(lawyerId)
    }).then(res => {
      if (res.code !== 200 || !res.data || !res.data.id) throw new Error(res.message || '提交失败')
      wx.showToast({ title: '预约申请已提交', icon: 'success' })
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/bookingdetail/bookingdetail?consultationId=${res.data.id}&lawyerId=${lawyerId}&lawyerName=${encodeURIComponent(lawyer ? lawyer.name : '')}`
        })
      }, 900)
    }).catch(error => wx.showToast({ title: error.message || '提交失败，请稍后重试', icon: 'none' }))
      .finally(() => this.setData({ submitting: false }))
  }
})
