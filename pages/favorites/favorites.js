//首页--我的--我的收藏

Page({
  data: {
    favorites: [
      {
        id: 1,
        title: '婚姻法解读',
        date: '2026-04-20',
        category: '法律解读'
      },
      {
        id: 2,
        title: '劳动合同模板',
        date: '2026-04-18',
        category: '文书模板'
      },
      {
        id: 3,
        title: '民事诉讼流程',
        date: '2026-04-15',
        category: '法律流程'
      }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '我的收藏'
    });
  },

  // 查看详情
  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看收藏详情',
      icon: 'none'
    });
  },

  // 移除收藏
  removeFavorite(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '移除收藏',
      content: '确定要移除这个收藏吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 移除收藏的逻辑
          const newFavorites = this.data.favorites.filter(item => item.id !== id);
          this.setData({
            favorites: newFavorites
          });
          wx.showToast({
            title: '已移除收藏',
            icon: 'success'
          });
        }
      }
    });
  }
})