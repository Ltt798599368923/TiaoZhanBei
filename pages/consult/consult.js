Page({
  data: {
    lawyers: [
      { id: 1, name: '张律师', title: '主任律师', specialty: '婚姻家庭', rating: 4.9, cases: 520, avatar: '' },
      { id: 2, name: '李律师', title: '高级律师', specialty: '劳动纠纷', rating: 4.8, cases: 380, avatar: '' },
      { id: 3, name: '王律师', title: '资深律师', specialty: '房产纠纷', rating: 4.9, cases: 420, avatar: '' },
      { id: 4, name: '赵律师', title: '高级律师', specialty: '刑事辩护', rating: 4.7, cases: 280, avatar: '' },
      { id: 5, name: '刘律师', title: '资深律师', specialty: '合同纠纷', rating: 4.8, cases: 350, avatar: '' },
      { id: 6, name: '陈律师', title: '主任律师', specialty: '知识产权', rating: 4.9, cases: 210, avatar: '' }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '律师咨询'
    });
  },

  onCallTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '正在呼叫...',
      icon: 'none'
    });
  },

  onChatTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '开始咨询',
      icon: 'none'
    });
  }
})