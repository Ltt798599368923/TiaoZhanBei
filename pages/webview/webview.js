//我的--服务--官方服务--链接跳转

// webview.js

/**
 * WebView页面逻辑
 * 用于加载外部网站
 */
Page({
  /**
   * 页面数据
   */
  data: {
    url: ''
  },

  /**
   * 页面加载
   * @param {Object} options - 页面参数
   */
  onLoad(options) {
    // 获取传入的url参数
    if (options.url) {
      this.setData({
        url: decodeURIComponent(options.url)
      });
    }
  },

  /**
   * 接收WebView发送的消息
   * @param {Object} e - 事件对象
   */
  onMessage(e) {
    console.log('WebView消息:', e.detail);
  }
});