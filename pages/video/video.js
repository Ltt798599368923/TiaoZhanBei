Page({
  data: {
    videos: [
      { id: 1, title: '一分钟了解民法典', author: '法治讲堂', duration: '01:25', views: 12560, thumbnail: '' },
      { id: 2, title: '劳动纠纷维权指南', author: '法律快车', duration: '03:45', views: 9870, thumbnail: '' },
      { id: 3, title: '合同签订避坑指南', author: '律师说法', duration: '02:30', views: 8760, thumbnail: '' },
      { id: 4, title: '交通事故处理流程', author: '交警在线', duration: '04:15', views: 7650, thumbnail: '' },
      { id: 5, title: '继承纠纷案例分析', author: '法治讲堂', duration: '05:20', views: 6540, thumbnail: '' },
      { id: 6, title: '婚姻财产保护指南', author: '律师说法', duration: '03:50', views: 5430, thumbnail: '' }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '小视讲堂'
    });
  },

  onVideoTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '播放视频',
      icon: 'none'
    });
  }
})
