const api = require('../../utils/api.js')

Page({
  data: {
    searchKeyword: '',
    searchResults: [],
    aiAdvice: '',
    officialSources: [],
    searching: false,
    hasSearched: false,
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
      searchResults: [],
      aiAdvice: '',
      officialSources: [],
      searching: false,
      hasSearched: false
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
    this.setData({ searching: true, hasSearched: false, searchResults: [] });

    api.searchLaws(keyword).then(res => {
      wx.hideLoading();
      
      if (res.code === 200) {
        const results = (res.results || []).map((item, index) => ({
          ...item,
          id: item.id || 'law-' + index
        }));
        this.setData({
          searchResults: results,
          aiAdvice: res.aiAdvice || '',
          officialSources: res.officialSources || [],
          hasSearched: true
        });
      } else {
        this.setData({ hasSearched: true });
        wx.showToast({
          title: res.message || '搜索失败',
          icon: 'none'
        });
      }
    }).catch(err => {
      wx.hideLoading();
      this.setData({ hasSearched: true });
      wx.showToast({
        title: '搜索失败，请重试',
        icon: 'none'
      });
      console.error('搜索法条失败:', err);
    }).finally(() => {
      this.setData({ searching: false });
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
  },

  copyOfficialSource(e) {
    const url = e.currentTarget.dataset.url
    if (!url) return
    wx.setClipboardData({ data: url, success: () => wx.showToast({ title: '官方地址已复制', icon: 'success' }) })
  }
})
