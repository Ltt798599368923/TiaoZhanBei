const api = require('../../utils/api.js')
const SOCKET_BASE_URL = 'wss://api.fashijie.top/ws/chat'

Page({
  data: {
    title: '',
    consultationId: '',
    messages: [],
    inputValue: '',
    scrollTop: 0,
    sending: false,
    connected: false
  },

  onLoad(options) {
    const consultationId = options.consultationId || options.id || ''
    const title = options.title ? decodeURIComponent(options.title) : '咨询会话'
    if (!consultationId) {
      wx.showToast({ title: '未找到咨询会话', icon: 'none' })
      setTimeout(() => wx.navigateBack(), 1200)
      return
    }
    this.shouldReconnect = true
    this.setData({ consultationId, title })
    wx.setNavigationBarTitle({ title: '咨询会话' })
    this.loadMessages().then(() => this.connectSocket())
  },

  onShow() {
    if (this.data.consultationId && !this.socketTask) this.connectSocket()
  },

  onUnload() {
    this.shouldReconnect = false
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer)
    if (this.socketTask) this.socketTask.close()
    this.socketTask = null
  },

  loadMessages() {
    const userId = wx.getStorageSync('userId')
    if (!userId) return Promise.resolve()
    return api.getConsultationMessages(userId, this.data.consultationId)
      .then(res => {
        if (res.code !== 200) throw new Error(res.message || '加载失败')
        const messages = (res.data || []).map(item => this.formatMessage(item))
        this.setData({ messages, scrollTop: messages.length * 1000 })
      })
      .catch(() => wx.showToast({ title: '会话加载失败，请稍后重试', icon: 'none' }))
  },

  connectSocket() {
    if (this.socketTask || !this.shouldReconnect) return
    const token = wx.getStorageSync('token')
    if (!token) return
    const url = `${SOCKET_BASE_URL}?role=user&consultationId=${encodeURIComponent(this.data.consultationId)}&token=${encodeURIComponent(token)}`
    const socketTask = wx.connectSocket({ url })
    this.socketTask = socketTask
    socketTask.onOpen(() => this.setData({ connected: true }))
    socketTask.onMessage(event => {
      try {
        const payload = JSON.parse(event.data)
        this.appendMessage(payload)
      } catch (_) {
        // Ignore a malformed realtime payload and keep the REST history available.
      }
    })
    socketTask.onClose(() => {
      this.socketTask = null
      this.setData({ connected: false })
      this.scheduleReconnect()
    })
    socketTask.onError(() => {
      this.setData({ connected: false })
    })
  },

  scheduleReconnect() {
    if (!this.shouldReconnect || this.reconnectTimer) return
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      this.connectSocket()
    }, 3000)
  },

  formatMessage(message) {
    const value = message.createdTime || ''
    const timestamp = new Date(String(value).replace(/-/g, '/')).getTime()
    const date = Number.isNaN(timestamp) ? null : new Date(timestamp)
    const displayTime = date
      ? `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
      : ''
    return {
      ...message,
      isMine: message.senderRole === 'user',
      displayTime
    }
  },

  appendMessage(message) {
    if (!message || (message.consultationId && String(message.consultationId) !== String(this.data.consultationId))) return
    if (this.data.messages.some(item => String(item.id) === String(message.id))) return
    const messages = [...this.data.messages, this.formatMessage(message)]
    this.setData({ messages, scrollTop: messages.length * 1000 })
  },

  bindInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  sendMessage() {
    const content = this.data.inputValue.trim()
    if (!content || this.data.sending) return
    this.setData({ sending: true })
    if (this.socketTask && this.data.connected) {
      this.socketTask.send({
        data: JSON.stringify({ content }),
        success: () => this.setData({ inputValue: '', sending: false }),
        fail: () => this.sendWithFallback(content)
      })
      return
    }
    this.sendWithFallback(content)
  },

  sendWithFallback(content) {
    const userId = wx.getStorageSync('userId')
    api.sendConsultationMessage(userId, this.data.consultationId, content)
      .then(res => {
        if (res.code !== 200) throw new Error(res.message || '发送失败')
        this.appendMessage(res.data)
        this.setData({ inputValue: '' })
      })
      .catch(error => wx.showToast({ title: error.message || '发送失败，请重试', icon: 'none' }))
      .finally(() => this.setData({ sending: false }))
  }
})
