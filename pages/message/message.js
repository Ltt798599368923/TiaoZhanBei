// message.js
Page({
  data: {
    messages: [
      {
        id: 1,
        name: '张三律师',
        avatar: '../../images/avatar.png',
        content: '您好，请问有什么法律问题需要咨询？',
        time: '10:00',
        unread: true
      },
      {
        id: 2,
        name: '系统通知',
        avatar: '../../images/avatar.png',
        content: '您的法律咨询已收到，我们将尽快为您安排律师回复。',
        time: '昨天',
        unread: false
      },
      {
        id: 3,
        name: '李四律师',
        avatar: '../../images/avatar.png',
        content: '关于您的合同审查，我已经完成了初步分析，需要与您进一步沟通。',
        time: '09:30',
        unread: false
      }
    ]
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  openChat(e) {
    const messageId = e.currentTarget.dataset.id;
    console.log('打开聊天:', messageId);
    // 跳转到聊天页面
    wx.navigateTo({
      url: '../chat/chat'
    });
  }
})