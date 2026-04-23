// favorite.js
// 我的收藏页面逻辑
Page({
  /**
   * 页面数据
   */
  data: {
    favoriteList: [
      {
        id: 1,
        title: '民法典解读',
        desc: '民法典的核心内容和应用指南',
        time: '2026-04-20',
        icon: '📚'
      },
      {
        id: 2,
        title: '劳动合同法详解',
        desc: '劳动者权益保护指南',
        time: '2026-04-18',
        icon: '⚖️'
      },
      {
        id: 3,
        title: '房产买卖法律指南',
        desc: '房屋交易中的法律风险防范',
        time: '2026-04-15',
        icon: '🏠'
      }
    ]  // 收藏列表数据
  },

  /**
   * 页面加载
   */
  onLoad() {
    // 页面加载时的初始化操作
  },

  /**
   * 页面显示
   */
  onShow() {
    // 页面显示时的操作
  },

  /**
   * 页面隐藏
   */
  onHide() {
    // 页面隐藏时的操作
  },

  /**
   * 页面卸载
   */
  onUnload() {
    // 页面卸载时的操作
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack();  // 调用微信API返回上一页
  },

  /**
   * 移除收藏
   * @param {Object} e - 事件对象，包含收藏ID
   */
  removeFavorite(e) {
    const id = parseInt(e.currentTarget.dataset.id);  // 获取收藏ID
    
    // 显示确认对话框
    wx.showModal({
      title: '确认移除',
      content: '确定要移除这个收藏吗？',
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 移除收藏
          const newList = this.data.favoriteList.filter(item => item.id !== id);
          this.setData({
            favoriteList: newList
          });
          
          // 显示成功提示
          wx.showToast({
            title: '已移除收藏',
            icon: 'success'
          });
        }
      }
    });
  }
})