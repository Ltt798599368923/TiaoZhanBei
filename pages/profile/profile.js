// profile.js
Page({
  data: {
    userInfo: {
      name: '张三',
      role: '普通用户',
      goal: '了解婚姻法律',
      studyRecords: 3,
      lawyer: '李四律师',
      hotline: '400-123-4567'
    }
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  exitLogin() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 执行退出登录逻辑
          console.log('用户点击确定');
        }
      }
    })
  }
})