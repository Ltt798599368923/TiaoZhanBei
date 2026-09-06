const api = require('../../utils/api.js')

Page({
  data: {
    title: '',
    content: '',
    phone: '',
    consultTypeIndex: -1,
    consultTypes: ['民事纠纷', '刑事辩护', '经济纠纷', '婚姻家庭', '房产纠纷', '知识产权', '其他'],
    lawyerId: '',
    lawyerName: '',
    serviceName: '',
    submitting: false
  },

  onLoad(options) {
    if (options.lawyerId) {
      this.setData({
        lawyerId: options.lawyerId,
        lawyerName: decodeURIComponent(options.lawyerName || '')
      })
    }
    if (options.service) {
      this.setData({ serviceName: decodeURIComponent(options.service) })
    }
    if (options.draft) {
      this.setData({ content: decodeURIComponent(options.draft) })
    }
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

  chooseConsultType(e) {
    this.setData({
      consultTypeIndex: Number(e.currentTarget.dataset.index)
    });
  },

  submitConsult() {
    const { title, content, phone, consultTypes, consultTypeIndex, lawyerId, serviceName } = this.data;

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

    if (!serviceName && consultTypeIndex < 0) {
      wx.showToast({
        title: '请选择咨询类型',
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
      type: serviceName || consultTypes[consultTypeIndex],
      lawyerId: lawyerId || null
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
