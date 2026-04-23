/**
 * 个人中心页面逻辑
 * 用于展示用户个人信息和相关操作
 */
Page({
  /**
   * 页面数据
   */
  data: {
    /**
     * 用户信息数据
     * 包含用户姓名、角色、学习目标、学习记录数、律师和热线电话
     */
    userInfo: {
      name: '张三',
      role: '普通用户',
      goal: '了解婚姻法律',
      studyRecords: 3,
      lawyer: '李四律师',
      hotline: '400-123-4567'
    }
  },

  /**
   * 页面加载
   * 页面加载时的逻辑
   */
  onLoad() {
    // 页面加载时的逻辑
  },

  /**
   * 退出登录
   * 点击退出登录按钮时触发，显示确认对话框
   */
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