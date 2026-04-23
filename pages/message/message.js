/**
 * 消息页面逻辑
 * 用于展示消息列表并提供聊天功能入口
 */
Page({
  /**
   * 页面数据
   */
  data: {
    /**
     * 消息列表数据
     * 包含消息ID、发送者姓名、头像、内容、时间和未读状态
     */
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
    ],
    filteredMessages: [],
    searchText: ''
  },
  
  onLoad() {
    // 页面加载时初始化消息列表
    this.setData({
      filteredMessages: this.data.messages
    });
  },
  
  // 搜索输入处理
  onSearchInput(e) {
    const searchText = e.detail.value;
    this.setData({ searchText });
    
    // 过滤消息
    if (searchText) {
      const filtered = this.data.messages.filter(item => 
        item.name.includes(searchText) || 
        item.content.includes(searchText)
      );
      this.setData({ filteredMessages: filtered });
    } else {
      this.setData({ filteredMessages: this.data.messages });
    }
  },
  
  // 清除搜索
  clearSearch() {
    this.setData({ 
      searchText: '',
      filteredMessages: this.data.messages
    });
  },
  
  // 跳转到详情页面
  goToDetail(e) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    const type = e.currentTarget.dataset.type;
    
    // 标记为已读（非系统通知）
    if (type === 'chat') {
      const messages = [...this.data.messages];
      const index = messages.findIndex(item => item.id === id);
      if (index !== -1) {
        messages[index].unread = false;
        this.setData({ messages, filteredMessages: messages });
      }
      
      // 跳转到聊天页面
      wx.navigateTo({
        url: `/pages/chat/chat?id=${id}&name=${name}`
      });
    } else if (type === 'system') {
      // 跳转到系统通知页面
      wx.navigateTo({
        url: `/pages/systemnotice/systemnotice?id=${id}`
      });
    }
  }
})