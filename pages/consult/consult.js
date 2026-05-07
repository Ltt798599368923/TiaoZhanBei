const api = require('../../utils/api.js')

Page({
  data: {
    title: '',
    content: '',
    phone: '',
    consultTypeIndex: 0,
    consultTypes: ['民事纠纷', '刑事辩护', '经济纠纷', '婚姻家庭', '房产纠纷', '知识产权', '其他'],
    submitting: false
  },

  onLoad() {
    
  },

  goBack() {
    wx.navigateBack();
  },

  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },

  onContentInput(e) {
    this.setData({
      content: e.detail.value
    });
  },

  onPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  onTypeChange(e) {
    this.setData({
      consultTypeIndex: e.detail.value
    });
  },

  submitConsult() {
    const { title, content, phone, consultTypes, consultTypeIndex } = this.data;

    if (!title || !title.trim()) {
      wx.showToast({
        title: '请输入咨询标题',
        icon: 'none'
      });
      return;
    }

    if (!content || !content.trim()) {
      wx.showToast({
        title: '请输入咨询内容',
        icon: 'none'
      });
      return;
    }

    const userId = wx.getStorageSync('userId');
    if (!userId) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }

    this.setData({ submitting: true });
    wx.showLoading({
      title: '提交中...',
      mask: true
    });

    api.createConsultation(userId, {
      title: title,
      content: content,
      phone: phone,
      type: consultTypes[consultTypeIndex]
    })
      .then(res => {
        wx.hideLoading();
        if (res.code === 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          });
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        } else {
          wx.showToast({
            title: res.message || '提交失败',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.error('提交咨询失败', err);
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
      })
      .finally(() => {
        this.setData({ submitting: false });
      });
  }
})
