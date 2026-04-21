// chat.js
import { api } from '../../utils/api';

Page({
  data: {
    messages: [
      {
        id: 1,
        content: '您好，请问有什么法律问题需要咨询？',
        type: 'left',
        time: '10:00'
      }
    ],
    inputValue: ''
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  sendMessage() {
    if (this.data.inputValue.trim() === '') return
    
    const userMessage = {
      id: this.data.messages.length + 1,
      content: this.data.inputValue,
      type: 'right',
      time: new Date().toLocaleTimeString().substr(0, 5)
    }
    
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