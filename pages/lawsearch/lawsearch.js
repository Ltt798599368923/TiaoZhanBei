// lawsearch.js
import { api } from '../../utils/api';

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
    // 页面加载时的初始化操作
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 清除搜索
  onClearSearch() {
    this.setData({
      searchKeyword: '',
      searchResults: []
    });
  },

  // 搜索
  onSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    // 显示加载状态
    wx.showLoading({
      title: '搜索中...',
      mask: true
    });

    // 调用搜索API
    api.searchLaws(keyword).then(res => {
      wx.hideLoading();
      this.setData({
        searchResults: res.data || []
      });
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '搜索失败，请重试',
        icon: 'none'
      });
      console.error('搜索法条失败:', err);
    });
  },

  // 热门关键词点击
  onHotKeywordTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      searchKeyword: keyword
    });
    this.onSearch();
  },

  // 结果点击
  onResultTap(e) {
    const result = e.currentTarget.dataset.result;
    wx.showModal({
      title: `${result.lawName} 第 ${result.article} 条`,
      content: result.content,
      showCancel: false
    });
  }
})