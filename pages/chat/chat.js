// chat.js
// 智能法律咨询页面逻辑
import { api } from '../../utils/api';

Page({
  /**
   * 页面数据
   */
  data: {
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
  onLoad() {
    // 页面加载时的逻辑
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
    
    // 发送消息到后端
    api.sendMessage({ content: userMessage.content }).then(res => {
      wx.hideLoading();
      
      // 添加机器人回复
      const botMessage = {
        id: this.data.messages.length + 1,
        content: res.reply || '感谢您的咨询，我们会尽快为您解答。',
        type: 'left',
        time: new Date().toLocaleTimeString().substr(0, 5)
      };
      
      this.setData({
        messages: [...this.data.messages, botMessage]
      });
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '发送失败，请重试',
        icon: 'none'
      });
      console.error('发送消息失败:', err);
    });
  }
})