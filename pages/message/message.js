const api = require('../../utils/api.js')

Page({
  data: {
    messages: [],
    filteredMessages: [],
    searchText: '',
    loading: true
  },

  onLoad() {
    this.loadMessages()
  },

  onShow() {
    this.loadMessages()
  },

  loadMessages() {
    const userId = wx.getStorageSync('userId')
    if (!userId) {
      this.setData({ messages: [], filteredMessages: [], loading: false })
      return
    }

    this.setData({ loading: true })
    Promise.all([
      api.getConsultations(userId).catch(() => null),
      api.getUserNotices(userId).catch(() => null)
    ]).then(([consultationResult, noticeResult]) => {
      const consultationReplies = consultationResult && consultationResult.code === 200
        ? (consultationResult.data || [])
          .filter(item => item.reply && item.reply.trim())
          .map(item => this.toConsultationReply(item))
        : []
      const notices = noticeResult && noticeResult.code === 200
        ? (noticeResult.data || []).map(item => this.toSystemNotice(item))
        : []
      const messages = [...consultationReplies, ...notices]
        .sort((first, second) => second.timestamp - first.timestamp)
      this.setData({ messages })
      this.applySearch(this.data.searchText, messages)
    }).finally(() => this.setData({ loading: false }))
  },

  toConsultationReply(item) {
    const rawTime = item.repliedTime || item.time
    return {
      id: `consult-${item.id}`,
      sourceId: item.id,
      type: 'consultReply',
      name: '咨询回复',
      subject: item.title || '您的法律咨询',
      content: item.reply.trim(),
      time: this.formatTime(rawTime),
      timestamp: this.toTimestamp(rawTime)
    }
  },

  toSystemNotice(item) {
    return {
      id: `notice-${item.id}`,
      sourceId: item.id,
      type: 'system',
      name: '系统通知',
      subject: item.title || '系统消息',
      content: item.content || item.title || '您有一条新通知',
      time: this.formatTime(item.createdTime),
      timestamp: this.toTimestamp(item.createdTime)
    }
  },

  toTimestamp(value) {
    if (!value) return 0
    const timestamp = new Date(String(value).replace(/-/g, '/')).getTime()
    return Number.isNaN(timestamp) ? 0 : timestamp
  },

  formatTime(value) {
    const timestamp = this.toTimestamp(value)
    if (!timestamp) return ''
    const date = new Date(timestamp)
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const dateDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
    const clock = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    if (dateDay === today) return `今天 ${clock}`
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${clock}`
  },

  onSearchInput(e) {
    const searchText = e.detail.value
    this.setData({ searchText })
    this.applySearch(searchText, this.data.messages)
  },

  applySearch(searchText, messages) {
    const keyword = (searchText || '').trim().toLowerCase()
    this.setData({
      filteredMessages: keyword
        ? messages.filter(item => [item.name, item.subject, item.content].some(value => String(value).toLowerCase().includes(keyword)))
        : messages
    })
  },

  clearSearch() {
    this.setData({ searchText: '', filteredMessages: this.data.messages })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    const message = this.data.messages.find(item => item.id === id)
    if (!message) return
    if (message.type === 'consultReply') {
      wx.showModal({
        title: message.subject,
        content: message.content,
        showCancel: false,
        confirmText: '知道了'
      })
      return
    }
    wx.navigateTo({ url: `/pages/systemnotice/systemnotice?id=${message.sourceId}&scope=user` })
  }
})
