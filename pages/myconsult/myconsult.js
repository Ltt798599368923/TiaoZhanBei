const api = require('../../utils/api.js')

Page({
  data: {
    consults: [],
    loading: false
  },

  onLoad() {
    this.loadConsults();
  },

  onShow() {
    this.loadConsults();
  },

  loadConsults() {
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      return;
    }

    this.setData({ loading: true });

    api.getConsultations(userId)
      .then(res => {
        if (res.code === 200 && res.data) {
          const consults = res.data.map(item => {
            item.displayTime = this.formatTime(item.time);
            return item;
          });
          this.setData({
            consults: consults
          });
        }
      })
      .catch(err => {
        console.error('获取咨询列表失败', err);
        wx.showToast({
          title: '获取咨询失败',
          icon: 'none'
        });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  },

  formatTime(timeStr) {
    if (!timeStr) return '';
    var date = new Date(timeStr.replace(/-/g, '/'));
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var yesterday = new Date(today - 86400000);
    var msgDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    var hours = String(date.getHours()).padStart(2, '0');
    var minutes = String(date.getMinutes()).padStart(2, '0');
    var clock = hours + ':' + minutes;

    var month = String(date.getMonth() + 1).padStart(2, '0');
    var day = String(date.getDate()).padStart(2, '0');

    if (msgDate.getTime() === today.getTime()) {
      return '今天 ' + clock;
    } else if (msgDate.getTime() === yesterday.getTime()) {
      return '昨天 ' + clock;
    } else {
      return month + '-' + day + ' ' + clock;
    }
  },

  viewDetail(e) {
    const userId = wx.getStorageSync('userId');
    const id = e.currentTarget.dataset.id;

    api.getConsultationDetail(userId, id)
      .then(res => {
        if (res.code === 200 && res.data) {
          const consultation = res.data;
          const reply = consultation.reply
            ? '\n\n处理回复：\n' + consultation.reply
            : '\n\n当前状态：' + (consultation.status === 'pending' ? '待回复' : '处理中');
          wx.showModal({
            title: consultation.title,
            content: (consultation.content || '暂无内容') + reply,
            showCancel: false,
            confirmText: '知道了'
          });
        }
      })
      .catch(err => {
        console.error('获取咨询详情失败', err);
      });
  },

  deleteConsult(e) {
    const userId = wx.getStorageSync('userId');
    const id = e.currentTarget.dataset.id;

    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条咨询吗？',
      success: (res) => {
        if (res.confirm) {
          api.deleteConsultation(userId, id)
            .then(res => {
              if (res.code === 200) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                });
                this.loadConsults();
              } else {
                wx.showToast({
                  title: res.message || '删除失败',
                  icon: 'none'
                });
              }
            })
            .catch(err => {
              console.error('删除咨询失败', err);
              wx.showToast({
                title: '删除失败',
                icon: 'none'
              });
            });
        }
      }
    });
  },

  goBack() {
    wx.navigateBack();
  }
})
