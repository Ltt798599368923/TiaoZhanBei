const api = require('../../utils/api.js')

Page({
  data: {
    name: '',
    messages: [
      {
        id: 1,
        content: '您好，请问有什么法律问题需要咨询？',
        type: 'left',
        time: '10:00'
      }
    ],
    inputValue: '',
    isLoading: false,
    scrollIntoView: '',
    inputBarHeight: 0,
    keyboardHeight: 0
  },

  onLoad(options) {
    this.setData({
      name: 'AI'
    });
    wx.setNavigationBarTitle({
      title: 'AI 法律助手'
    });
  },

  onReady() {
    this.measureLayout();
  },

  measureLayout() {
    const query = wx.createSelectorQuery().in(this);
    query.select('#chat-input-bar').boundingClientRect();
    query.exec((res) => {
      const inputRect = res && res[0];
      this.setData({
        inputBarHeight: inputRect ? inputRect.height : 0
      });
    });
  },

  bindInput(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  onInputFocus() {
    this.measureLayout();
    const last = this.data.messages[this.data.messages.length - 1];
    if (last) {
      this.setData({ scrollIntoView: 'msg-' + last.id });
    }
  },

  onInputBlur() {
    if (this.data.keyboardHeight !== 0) {
      this.setData({ keyboardHeight: 0 });
    }
    this.measureLayout();
  },

  onKeyboardHeightChange(e) {
    const height = (e && e.detail && e.detail.height) ? e.detail.height : 0;
    this.setData({ keyboardHeight: height });
    if (height > 0) {
      const last = this.data.messages[this.data.messages.length - 1];
      if (last) {
        this.setData({ scrollIntoView: 'msg-' + last.id });
      }
    }
    this.measureLayout();
  },

  sendMessage() {
    if (this.data.inputValue.trim() === '' || this.data.isLoading) return
    
    const userMessage = {
      id: this.data.messages.length + 1,
      content: this.data.inputValue,
      type: 'right',
      time: new Date().toLocaleTimeString().substr(0, 5)
    }
    
    this.setData({
      messages: [...this.data.messages, userMessage],
      inputValue: '',
      isLoading: true,
      scrollIntoView: 'msg-' + userMessage.id
    })
    
    wx.showLoading({
      title: 'AI思考中...',
      mask: true
    });
    
    const history = this.data.messages.slice(0, -1).map(msg => ({
      role: msg.type === 'left' ? 'assistant' : 'user',
      content: msg.content
    }));
    
    api.chat(userMessage.content, history)
      .then(res => {
        wx.hideLoading();
        
        if (res.code === 200) {
          const botMessage = {
            id: this.data.messages.length + 1,
            content: res.reply,
            type: 'left',
            time: new Date().toLocaleTimeString().substr(0, 5)
          };
          
          this.setData({
            messages: [...this.data.messages, botMessage],
            isLoading: false,
            scrollIntoView: 'msg-' + botMessage.id
          });
          this.measureLayout();
        } else {
          wx.showToast({
            title: res.message || '请求失败',
            icon: 'none'
          });
          this.setData({ isLoading: false });
        }
      })
      .catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
        this.setData({ isLoading: false });
      });
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    });
  }
})
