const content = require('../../utils/content.js')

Page({
  data: {
    books: [],
    loading: true,
    loadError: ''
  },

  onLoad() {
    this.loadBooks()
  },

  loadBooks() {
    return content.load(this, 'book', 'books')
  },

  onBookTap(e) {
    content.open('book', e.currentTarget.dataset.id)
  },

  goBack() {
    wx.navigateBack()
  }
})
