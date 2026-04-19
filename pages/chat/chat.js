// chat.js
Page({
  data: {
    messages: [
      {
        id: 1,
        content: '您好，请问有什么法律问题需要咨询？',
        type: 'left',
        time: '10:00'
      },
      {
        id: 2,
        content: '我想咨询一下婚姻家庭方面的问题，关于离婚财产分割的',
        type: 'right',
        time: '10:01'
      },
      {
        id: 3,
        content: '好的，请问您是协议离婚还是诉讼离婚？财产主要包括哪些？',
        type: 'left',
        time: '10:02'
      },
      {
        id: 4,
        content: '是诉讼离婚，财产包括房产、车辆和存款',
        type: 'right',
        time: '10:03'
      },
      {
        id: 5,
        content: '好的，根据我国《民法典》的相关规定，夫妻共同财产在离婚时一般会平均分割，但会考虑照顾子女和女方权益的原则。具体情况需要根据您的实际情况进行分析。',
        type: 'left',
        time: '10:04'
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
    
    const newMessage = {
      id: this.data.messages.length + 1,
      content: this.data.inputValue,
      type: 'right',
      time: new Date().toLocaleTimeString().substr(0, 5)
    }
    
    this.setData({
      messages: [...this.data.messages, newMessage],
      inputValue: ''
    })
  }
})