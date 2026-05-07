// 律师聊天页面

Page({
  /**
   * 页面数据
   */
  data: {
    name: '', // 联系人名称
    messages: [], // 消息列表
    inputValue: ''  // 输入框内容
  },

  /**
   * 页面加载
   */
  onLoad(options) {
    // 接收从message页面传递的参数
    if (options && options.name) {
      this.setData({
        name: options.name
      });
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: options.name
      });
      
      // 根据律师名称设置不同的初始消息
      let initialMessage = [];
      if (options.name === '李四律师') {
        initialMessage = [{
          id: 1,
          content: '关于您的合同审查，我已经完成了初步分析，需要和您进一步沟通。',
          type: 'left',
          time: '09:30'
        }];
      } else if (options.name === '张三律师') {
        initialMessage = [{
          id: 1,
          content: '您好，请问有什么法律问题需要咨询？',
          type: 'left',
          time: '10:00'
        }];
      }
      
      this.setData({
        messages: initialMessage
      });
    }
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
      
      // 添加律师回复
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