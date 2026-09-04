const api = require('../../utils/api.js')

Page({
  data: {
    chatMessages: [],
    messages: [],
    filteredMessages: [],
    searchText: ''
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
      this.setData({ messages: [], filteredMessages: [] })
      return
    }
    api.getUserNotices(userId).then(res => {
      const notices = res.code === 200
        ? (res.data || []).map(item => ({
            id: item.id,
            name: '系统通知',
            type: 'system',
            content: item.title || item.content,
            time: this.formatTime(item.createdTime),
            unread: false
          }))
        : []
      const messages = [...this.data.chatMessages, ...notices]
      this.setData({ messages })
      this.applySearch(this.data.searchText, messages)
    }).catch(() => {
      const messages = this.data.chatMessages
      this.setData({ messages, filteredMessages: messages })
    })
  },

  formatTime(value) {
    if (!value) return ''
    const date = new Date(String(value).replace(/-/g, '/'))
    if (Number.isNaN(date.getTime())) return ''
    return String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')
  },

  onSearchInput(e) {
    const searchText = e.detail.value
    this.setData({ searchText })
    this.applySearch(searchText, this.data.messages)
  },

  applySearch(searchText, messages) {
    const keyword = (searchText || '').trim()
    this.setData({
      filteredMessages: keyword
        ? messages.filter(item => item.name.includes(keyword) || item.content.includes(keyword))
        : messages
    })
  },

  clearSearch() {
    this.setData({ searchText: '', filteredMessages: this.data.messages })
  },

  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name
    const type = e.currentTarget.dataset.type

    if (type === 'system') {
      wx.navigateTo({ url: `/pages/systemnotice/systemnotice?id=${id}&scope=user` })
      return
    }

    const messages = this.data.messages.map(item => item.id === id ? { ...item, unread: false } : item)
    this.setData({ messages })
    this.applySearch(this.data.searchText, messages)
    wx.navigateTo({ url: `/pages/lawyerchat/lawyerchat?id=${id}&name=${name}` })
  }
})
