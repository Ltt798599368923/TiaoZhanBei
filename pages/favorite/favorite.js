const api = require('../../utils/api.js')

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
      return;
    }

    this.setData({ loading: true });

    api.getFavorites(userId)
      .then(res => {
        if (res.code === 200 && res.data) {
          this.setData({
            favoriteList: res.data
          });
        }
      })
      .catch(err => {
        console.error('获取收藏列表失败', err);
        wx.showToast({
          title: '获取收藏失败',
          icon: 'none'
        });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  },

  goBack() {
    wx.navigateBack();
  },

  removeFavorite(e) {
    const userId = wx.getStorageSync('userId');
    const id = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '确认移除',
      content: '确定要移除这个收藏吗？',
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          api.removeFavorite(userId, id)
            .then(res => {
              if (res.code === 200) {
                wx.showToast({
                  title: '已移除收藏',
                  icon: 'success'
                });
                this.loadFavorites();
              } else {
                wx.showToast({
                  title: res.message || '移除失败',
                  icon: 'none'
                });
              }
            })
            .catch(err => {
              console.error('移除收藏失败', err);
              wx.showToast({
                title: '移除失败',
                icon: 'none'
              });
            });
        }
      }
    });
  }
})
