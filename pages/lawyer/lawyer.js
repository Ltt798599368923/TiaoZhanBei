// lawyer.js
Page({
  data: {
    lawyers: [
      {
        id: 1,
        name: '张律师',
        expertise: '民事纠纷、合同纠纷',
        rating: 5.0,
        avatar: '👨‍⚖️'
      },
      {
        id: 2,
        name: '李律师',
        expertise: '刑事辩护、知识产权',
        rating: 4.8,
        avatar: '👩‍⚖️'
      }
    ]
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  goBack() {
    wx.navigateBack();
  },
  reserveLawyer(e) {
    const lawyerId = parseInt(e.currentTarget.dataset.id);
    const lawyer = this.data.lawyers.find(item => item.id === lawyerId);

    wx.showModal({
      title: '预约确认',
      content: `您确定要预约 ${lawyer.name} 律师吗？`,
      confirmText: '确认预约',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '预约成功，请等待律师联系',
            icon: 'success'
          });
        }
      }
    });
  },
  submitConsult() {
    wx.showModal({
      title: '提交成功',
      content: '您的咨询已提交，我们会尽快安排律师为您解答',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
  }
})