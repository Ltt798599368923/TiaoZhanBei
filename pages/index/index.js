// index.js
Page({
  data: {
    // 定位文本
    locationText: '定位中...',

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

    // 热点新闻列表
    hotNews: [
      { title: '反外国不当域外管辖条例（4月13日施行）', id: 1 },
      { title: '"机闹"正式入刑（4月9日施行）', id: 2 },
      { title: '全国"4·2行动"严打非法放贷（4月启动）', id: 3 },
      { title: 'AI拟人化服务新规（7月15日施行）', id: 4 },
      { title: '贪污贿赂新解释（5月1日施行）', id: 5 },
      { title: '信用修复管理办法（4月1日施行）', id: 6 }
    ],

    // 当前位置
    latitude: null,
    longitude: null,

    // 当前播报索引
    currentSloganIndex: 0,
    sloganOpacity: 0
  },

  onLoad() {
    this.initLocation();
    this.startSloganScroll();
  },

  onUnload() {
    if (this.data.marqueeTimer) {
      clearInterval(this.data.marqueeTimer);
    }
  },

  onShow() {
    this.startSloganScroll();
  },

  onHide() {
    if (this.data.marqueeTimer) {
      clearInterval(this.data.marqueeTimer);
    }
  },

  // ===== 定位功能 =====
  initLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.getAddress(res.latitude, res.longitude);
      },
      fail: () => {
        this.setData({
          locationText: '点击获取位置'
        });
      }
    });
  },

  // 通过经纬度获取地址
  getAddress(lat, lng) {
    // 使用腾讯地图逆地址解析
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: `${lat},${lng}`,
        key: '',
        get_poi: 0
      },
      success: (res) => {
        if (res.data.status === 0 && res.data.result) {
          const addr = res.data.result.address_component;
          const city = addr.city || addr.province || '';
          this.setData({
            locationText: city || '当前位置'
          });
        } else {
          this.setData({
            locationText: '定位成功'
          });
        }
      },
      fail: () => {
        this.setData({
          locationText: '定位成功'
        });
      }
    });
  },

  // 点击定位 - 重新获取位置
  onLocationTap() {
    wx.showLoading({
      title: '定位中...'
    });
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        this.getAddress(res.latitude, res.longitude);
        wx.hideLoading();
      },
      fail: () => {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请开启位置权限以获取当前位置',
          showCancel: false
        });
      }
    });
  },

  // ===== 宣传语滚动切换 =====
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

  // 点击更多
  onMoreTap() {
    wx.showToast({
      title: '更多功能',
      icon: 'none'
    });
  },

  // 点击设置
  onSettingTap() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },

  // 在线咨询
  onOnlineConsult() {
    wx.navigateTo({
      url: '/pages/consult/consult'
    });
  },

  // 法条检索
  onLawSearch() {
    wx.showToast({
      title: '法条检索功能',
      icon: 'none'
    });
  },

  // 功能入口点击
  onFeatureTap(e) {
    const type = e.currentTarget.dataset.type;
    if (type === 'lawyer') {
      wx.navigateTo({
        url: '/pages/consult/consult'
      });
      return;
    }
    const urlMap = {
      document: '/pages/document/document',
      lawexplain: '/pages/lawexplain/lawexplain',
      newlaw: '/pages/newlaw/newlaw',
      lawread: '/pages/lawread/lawread',
      video: '/pages/video/video'
    };
    const url = urlMap[type];
    if (url) {
      wx.navigateTo({ url });
    }
  },

  // 热点新闻点击
  onNewsTap(e) {
    const index = e.currentTarget.dataset.index;
    const newsItem = this.data.hotNews[index];
    if (newsItem) {
      wx.showToast({
        title: '查看新闻详情',
        icon: 'none'
      });
    }
  }
})
