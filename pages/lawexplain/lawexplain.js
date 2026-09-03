const content = require('../../utils/content.js')

Page({
  data: {
    articles: [],
    loading: true,
    loadError: ''
  },

  onLoad() {
    this.loadArticles()
  },

  loadArticles() {
    return content.load(this, 'article', 'articles')
  },

  onArticleTap(e) {
    content.open('article', e.currentTarget.dataset.id)
  },

  goBack() {
    wx.navigateBack()
  }
})
