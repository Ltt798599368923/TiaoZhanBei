//首页--服务--官方服务

/**
 * 官方服务页面逻辑
 * 用于展示官方法律服务和网站链接
 */
Page({
  /**
   * 页面数据
   */
  data: {
    /**
     * 官方服务列表数据
     * 包含服务类型、名称和描述
     */
    services: [
      {
        type: 'laws',
        name: '法律法规查询',
        description: '查询最新法律法规和政策文件'
      },
      {
        type: 'legal',
        name: '法律援助申请',
        description: '申请免费法律援助服务'
      },
      {
        type: 'notary',
        name: '公证服务',
        description: '办理各类公证业务'
      },
      {
        type: 'court',
        name: '法院诉讼服务',
        description: '在线立案、查询案件进展'
      }
    ]
  },

  /**
   * 页面加载
   * 页面加载时的逻辑
   */
  onLoad() {
    // 页面加载时的逻辑
  },

  /**
   * 返回上一页
   * 点击返回按钮时触发
   */
  goBack() {
    wx.navigateBack();
  },

  /**
   * 打开服务
   * @param {Object} e - 事件对象，包含服务类型
   * 点击服务项时触发，显示确认对话框
   */
  openService(e) {
    const serviceType = e.currentTarget.dataset.type;
    const urls = {
      laws: 'https://flk.npc.gov.cn/',
      legal: 'https://www.12348.gov.cn/',
      notary: 'https://www.chinanotary.org.cn/',
      court: 'https://www.court.gov.cn/'
    };
    this.openExternalSite(urls[serviceType]);
  },

  /**
   * 打开官方网站
   * @param {Object} e - 事件对象，包含网站URL
   * 点击网站链接时触发，显示确认对话框
   */
  openWebsite(e) {
    const url = e.currentTarget.dataset.url;

    this.openExternalSite(url);
  },

  openExternalSite(url) {
    if (!url) {
      wx.showToast({ title: '暂未配置服务地址', icon: 'none' });
      return;
    }
    wx.navigateTo({ url: `/pages/webview/webview?url=${encodeURIComponent(url)}` });
  }
})
