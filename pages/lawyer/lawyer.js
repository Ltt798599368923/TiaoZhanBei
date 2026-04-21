// lawyer.js
import { api } from '../../utils/api';

Page({
  data: {
    lawyers: []
  },
  onLoad() {
    // 页面加载时获取律师列表
    this.loadLawyers();
  },
  loadLawyers() {
    // 显示加载状态
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    
    // 从后端获取律师列表
    api.getLawyers().then(res => {
      wx.hideLoading();
      this.setData({
        lawyers: res.data || []
      });
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      });
      console.error('获取律师列表失败:', err);
    });
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
          // 显示加载状态
          wx.showLoading({
            title: '正在预约...',
            mask: true
          });
          
          // 调用预约律师API
          api.reserveLawyer(lawyerId).then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '预约成功，请等待律师联系',
              icon: 'success'
            });
          }).catch(err => {
            wx.hideLoading();
            wx.showToast({
              title: '预约失败，请重试',
              icon: 'none'
            });
            console.error('预约律师失败:', err);
          });
        }
      }
    });
  },
  submitConsult() {
    // 显示加载状态
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    
    // 调用提交咨询API
    api.submitConsult({}).then(res => {
      wx.hideLoading();
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
    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: '提交失败，请重试',
        icon: 'none'
      });
      console.error('提交咨询失败:', err);
    });
  }
})