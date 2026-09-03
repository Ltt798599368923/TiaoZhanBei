const content = require('../../utils/content.js')

Page({
  data: {
    laws: [],
    loading: true,
    loadError: ''
  },

  onLoad() {
    this.loadLaws()
  },

  loadLaws() {
    return content.load(this, 'law', 'laws')
  },

  onLawTap(e) {
    content.open('law', e.currentTarget.dataset.id)
  },

  goBack() {
    wx.navigateBack()
  }
})
