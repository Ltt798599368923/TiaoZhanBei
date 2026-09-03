const api = require('../../utils/api.js')
const content = require('../../utils/content.js')

Page({
  data: {
    // 定位文本
    locationText: '定位中...',
    
    bookList: [],
    currentBookIndex: 0,
    currentBook: { line1: '法律', line2: '资料', line3: '' },
  
    // 滚动播报数据
    slogans: [
      '弘扬法治精神，提供法律支援',
      '免费法律咨询、法律知识学习',
      '文书指导与参考',
      '守护公平正义，构建法治社会',
      '专业律师在线解答',
      '法条信息速查直达'
    ],
    marqueeAnimation: null,
    marqueeTimer: null,
  
    hotNews: [],
  
    // 当前位置
    latitude: null,
    longitude: null,
  
    // 当前播报索引
    currentSloganIndex: 0,
    sloganOpacity: 0
  },

  /**
   * 页面加载
   */
  onNextBook() {
    if (this.data.bookList.length === 0) return;
    let newIndex = this.data.currentBookIndex + 1;
    if (newIndex >= this.data.bookList.length) {
      newIndex = 0;
    }
  
    const newBook = this.data.bookList[newIndex];
  
    // 带动画效果：先淡出再淡入（可选）
    this.setData({
      currentBookIndex: newIndex,
      currentBook: newBook
    });
  
    // 可选：轻微震动提示（不强制）
    wx.vibrateShort({ type: 'light' });
  },
  onLoad() {
    this.initLocation();
    this.startSloganScroll();
    this.loadHomepageContent();
  },

  loadHomepageContent() {
    api.getContentList('book').then(res => {
      if (res.code !== 200 || !res.data || res.data.length === 0) return;
      const bookList = res.data.map(item => ({
        id: item.id,
        line1: item.sourceName || '法律资料',
        line2: item.title,
        line3: item.title
      }));
      this.setData({ bookList, currentBook: bookList[0] });
      if (bookList.length > 1) {
        this.autoBookTimer = setInterval(() => this.onNextBook(), 3500);
      }
    }).catch(() => {});

    api.getContentList('law').then(res => {
      if (res.code === 200) this.setData({ hotNews: res.data || [] });
    }).catch(() => this.setData({ hotNews: [] }));
  },

  onUnload() {
    if (this.data.marqueeTimer) {
      clearInterval(this.data.marqueeTimer);
    }
    if (this.autoBookTimer) {
      clearInterval(this.autoBookTimer);
    }
  },

  /**
   * 页面显示
   */
  onShow() {
    this.startSloganScroll();  // 重新开始宣传语滚动
  },

  /**
   * 页面隐藏
   */
  onHide() {
    // 清除定时器
    if (this.data.marqueeTimer) {
      clearInterval(this.data.marqueeTimer);
    }
  },

  // ===== 定位功能 =====
  /**
   * 初始化定位
   */
  initLocation() {
    this.setData({
      locationText: '点击获取位置'
    });
  },

  /**
   * 点击定位 - 获取位置
   */
  onLocationTap() {
    wx.chooseLocation({
      success: (res) => {
        // 设置位置信息
        this.setData({
          locationText: res.name || res.address,
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: (err) => {
        // 处理授权失败
        if (err.errCode === 1) {
          wx.showModal({
            title: '提示',
            content: '请开启位置权限以获取当前位置',
            showCancel: false
          });
        }
      }
    });
  },

  // ===== 宣传语滚动切换 =====
  /**
   * 开始宣传语滚动
   */
  startSloganScroll() {
    // 清除之前的定时器
    if (this.data.marqueeTimer) {
      clearInterval(this.data.marqueeTimer);
    }

    let index = 0;
    const slogans = this.data.slogans;

    // 初始显示第一条
    this.setData({
      currentSloganIndex: index,
      sloganOpacity: 1
    });

    // 每隔3秒切换下一条
    const timer = setInterval(() => {
      index = (index + 1) % slogans.length;

      // 淡出效果
      this.setData({ sloganOpacity: 0 });

      // 300ms后切换文字并淡入
      setTimeout(() => {
        this.setData({
          currentSloganIndex: index,
          sloganOpacity: 1
        });
      }, 300);
    }, 3000);

    this.setData({
      marqueeTimer: timer
    });
  },

  // ===== 事件处理 =====

  /**
   * 点击更多
   */
  onMoreTap() {
    wx.showToast({
      title: '更多功能',
      icon: 'none'
    });
  },

  /**
   * 点击设置
   */
  onSettingTap() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },

  /**
   * 在线咨询
   */
  onOnlineConsult() {
    wx.navigateTo({
      url: '/pages/consult/consult'
    });
  },

  /**
   * 法条检索
   */
  onLawSearch() {
    wx.navigateTo({
      url: '/pages/lawsearch/lawsearch'
    });
  },

  /**
   * 功能入口点击
   * @param {Object} e - 事件对象
   */
  onFeatureTap(e) {
    const type = e.currentTarget.dataset.type;
    // 功能类型映射
    const urlMap = {
      lawyer: '/pages/lawyer/lawyer',//律师咨询
      document: '/pages/template/template',//文书模版
      lawexplain: '/pages/lawexplain/lawexplain',//法理白话
      newlaw: '/pages/newlaw/newlaw',//法治新程
      lawread: '/pages/lawread/lawread',//法文阅读
      video: '/pages/video/video'//小视课堂
    };
    const url = urlMap[type];
    if (url) {
      wx.navigateTo({ url });
    }
  },

  /**
   * 热点新闻点击
   * @param {Object} e - 事件对象
   */
  onNewsTap(e) {
    const index = e.currentTarget.dataset.index;
    const newsItem = this.data.hotNews[index];
    if (newsItem) content.open('law', newsItem.id);
  }
})
