Page({
  data: {
    books: [
      { id: 1, title: '民法典', author: '全国人大常委会', category: '基础法律', readCount: 12560, progress: 75 },
      { id: 2, title: '刑法', author: '全国人大常委会', category: '基础法律', readCount: 9870, progress: 60 },
      { id: 3, title: '民事诉讼法', author: '全国人大常委会', category: '诉讼法律', readCount: 6540, progress: 45 },
      { id: 4, title: '刑事诉讼法', author: '全国人大常委会', category: '诉讼法律', readCount: 5430, progress: 30 },
      { id: 5, title: '行政诉讼法', author: '全国人大常委会', category: '诉讼法律', readCount: 4320, progress: 20 },
      { id: 6, title: '劳动合同法', author: '全国人大常委会', category: '劳动法律', readCount: 8760, progress: 55 }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '法文阅读'
    });
  },

  onBookTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '开始阅读',
      icon: 'none'
    });
  }
})
