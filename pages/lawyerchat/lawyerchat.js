Page({
  data: {
    name: '',
    lawyerId: '',
    inputValue: ''
  },

  onLoad(options) {
    const name = options.name ? decodeURIComponent(options.name) : ''
    this.setData({ name, lawyerId: options.id || '' })
    wx.setNavigationBarTitle({ title: name || '律师咨询' })
  },

  bindInput(e) {
    this.setData({ inputValue: e.detail.value })
  },

  sendMessage() {
    if (!this.data.inputValue.trim()) {
      wx.showToast({ title: '请先填写咨询内容', icon: 'none' })
      return
    }
    wx.showModal({
      title: '提交咨询',
      content: '即时聊天尚未开通。确认后将进入咨询表单，提交内容会保存到我的咨询。',
      confirmText: '去提交',
      success: result => {
        if (result.confirm) {
          const query = this.data.lawyerId
            ? `?lawyerId=${this.data.lawyerId}&lawyerName=${encodeURIComponent(this.data.name)}&draft=${encodeURIComponent(this.data.inputValue)}`
            : `?draft=${encodeURIComponent(this.data.inputValue)}`
          wx.redirectTo({ url: `/pages/consult/consult${query}` })
        }
      }
    })
  }
})
