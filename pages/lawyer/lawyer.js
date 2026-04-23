//律师咨询

/**
 * 律师列表页面逻辑
 * 用于展示律师列表并提供预约功能
 */
Page({
  /**
   * 页面数据
   */
  data: {
    lawyers: []  // 律师列表数据
  },

  /**
   * 页面加载
   * 页面加载时初始化数据
   */
  onLoad() {
    // 页面加载完成，不需要API调用
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack();  // 调用微信API返回上一页
  },

  /**
   * 预约律师
   * @param {Object} e - 事件对象，包含律师ID
   * 点击预约按钮时触发，显示确认对话框
   */
  reserveLawyer(e) {
    const lawyerId = parseInt(e.currentTarget.dataset.id);  // 获取律师ID
    let lawyerName = '';
    
    // 根据ID获取律师姓名
    switch(lawyerId) {
      case 1:
        lawyerName = '张律师';
        break;
      case 2:
        lawyerName = '李律师';
        break;
      case 3:
        lawyerName = '王律师';
        break;
      default:
        lawyerName = '律师';
    }

    // 显示确认对话框
    wx.showModal({
      title: '预约确认',
      content: `您确定要预约 ${lawyerName} 律师吗？`,
      confirmText: '确认预约',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 显示成功提示
          wx.showToast({
            title: '预约成功，请等待律师联系',
            icon: 'success'
          });
        }
      }
    });
  }
})