const api = require('../../utils/api.js')

Page({
  data: {
    searchKeyword: '',
    searchResults: [],
    hotKeywords: [
      '民法典', '刑法', '劳动法', '合同法', '侵权责任',
      '婚姻家庭', '继承', '物权', '债权', '诉讼时效'
    ]
  },

  onLoad() {
  },

  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  onClearSearch() {
    this.setData({
      searchKeyword: '',
      searchResults: []
    });
  },

  goBack() {
    wx.navigateBack();
  },

  onSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '搜索中...',
      mask: true
    });

    api.searchLaws(keyword).then(res => {
      wx.hideLoading();
      
      if (res.code === 200) {
        this.setData({
          searchResults: [{
            lawName: '搜索结果',
            article: '',
            content: res.aiAdvice
          }]
        });
      } else {
        wx.showToast({
          title: res.message || '搜索失败',
          icon: 'none'
        });
      }
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '搜索失败，请重试',
        icon: 'none'
      });
      console.error('搜索法条失败:', err);
    });
  },

  onHotKeywordTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      searchKeyword: keyword
    });
    this.onSearch();
  },

  onResultTap(e) {
    const result = e.currentTarget.dataset.result;
    wx.showModal({
      title: '法条搜索结果',
      content: result.content,
      showCancel: false
    });
  }
})