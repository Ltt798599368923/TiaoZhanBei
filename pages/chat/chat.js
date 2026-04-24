//首页下面五个功能的AI

Page({
  /**
   * 页面数据
   */
  data: {
    name: '', // 联系人名称
    messages: [  // 消息列表
      {
        id: 1,
        content: '您好，请问有什么法律问题需要咨询？',
        type: 'left',  // left: 机器人消息, right: 用户消息
        time: '10:00'  // 消息时间
      }
    ],
    inputValue: ''  // 输入框内容
  },

  /**
   * 页面加载
   */
  onLoad(options) {
    // AI聊天界面固定显示"AI"
    this.setData({
      name: 'AI'
    });
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: 'AI'
    });
  },

  /**
   * 输入框输入事件
   * @param {Object} e - 事件对象
   */
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 发送消息
   */
  sendMessage() {
    // 检查输入是否为空
    if (this.data.inputValue.trim() === '') return
    
    // 创建用户消息
    const userMessage = {
      id: this.data.messages.length + 1,
      content: this.data.inputValue,
      type: 'right',
      time: new Date().toLocaleTimeString().substr(0, 5)
    }
    
    // 更新消息列表并清空输入框
    this.setData({
      messages: [...this.data.messages, userMessage],
      inputValue: ''
    })
    
    // 显示加载状态
    wx.showLoading({
      title: '正在发送...',
      mask: true
    });
    
    // 模拟发送消息到后端
    setTimeout(() => {
      wx.hideLoading();
      
      // 添加机器人回复
      const botMessage = {
        id: this.data.messages.length + 1,
        content: '感谢您的咨询，我们会尽快为您解答。',
        type: 'left',
        time: new Date().toLocaleTimeString().substr(0, 5)
      };
      
      this.setData({
        messages: [...this.data.messages, botMessage]
      });
    }, 1000);
  },

  // 返回上一页
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})