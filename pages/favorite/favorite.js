const api = require('../../utils/api.js');

Page({
  data: {
    favoriteList: [],
    loading: false
  },

  onLoad() {
    this.loadFavorites();
  },

  onShow() {
    this.loadFavorites();
  },

  loadFavorites() {
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      this.setData({ favoriteList: [], loading: false });
      return;
    }

    this.setData({ loading: true });
    api.getFavorites(userId)
      .then(res => {
        if (res.code === 200) {
          this.setData({ favoriteList: res.data || [] });
          return;
        }
        wx.showToast({ title: res.message || '获取收藏失败', icon: 'none' });
      })
      .catch(() => wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' }))
      .finally(() => this.setData({ loading: false }));
  },

  viewFavorite(e) {
    const { contenttype: contentType, contentid: contentId } = e.currentTarget.dataset;
    if (contentType !== 'template' || !contentId) {
      wx.showToast({ title: '原内容暂不可打开', icon: 'none' });
      return;
    }

    wx.navigateTo({
      url: '/pages/templatedetail/templatedetail?id=' + encodeURIComponent(contentId)
    });
  },

  removeFavorite(e) {
    const userId = wx.getStorageSync('userId');
    const id = e.currentTarget.dataset.id;
    if (!userId || !id) return;

    wx.showModal({
      title: '取消收藏',
      content: '取消后可在模板页重新收藏。',
      confirmText: '取消收藏',
      confirmColor: '#bd1d17',
      success: modalRes => {
        if (!modalRes.confirm) return;
        api.removeFavorite(userId, id)
          .then(res => {
            if (res.code === 200) {
              wx.showToast({ title: '已取消收藏', icon: 'success' });
              this.loadFavorites();
              return;
            }
            wx.showToast({ title: res.message || '操作失败', icon: 'none' });
          })
          .catch(() => wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' }));
      }
    });
  }
});
