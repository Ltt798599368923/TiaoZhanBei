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
            const isBooking = Boolean(item.lawyerId)
            const activeBookingStatuses = ['pending', 'processing', 'replied', 'need_info', 'confirmed']
            return {
              ...item,
              isBooking,
              displayTime: this.formatTime(item.time),
              statusText: this.getStatusText(item.status, Boolean(item.reply), isBooking),
              statusClass: item.status === 'cancelled' ? 'cancelled' : (item.status === 'declined' ? 'declined' : (item.reply ? 'replied' : 'pending')),
              canCancel: isBooking && activeBookingStatuses.includes(item.status)
            };
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

  getStatusText(status, hasReply, isBooking) {
    const bookingLabels = {
      pending: '待确认', processing: '处理中', confirmed: '已确认',
      need_info: '需补充', declined: '无法承接', completed: '已完成',
      cancelled: '已取消', closed: '预约已结束', replied: '已反馈'
    }
    if (isBooking) return bookingLabels[status] || '处理中'
    if (status === 'closed') return '已结束'
    return hasReply ? '已回复' : (status === 'pending' ? '待回复' : '处理中')
  },

  viewDetail(e) {
    const id = e.currentTarget.dataset.id;
    const consultation = this.data.consults.find(item => String(item.id) === String(id));
    if (consultation && consultation.lawyerId) {
      wx.navigateTo({
        url: `/pages/bookingdetail/bookingdetail?consultationId=${id}&lawyerId=${consultation.lawyerId}&lawyerName=${encodeURIComponent(consultation.lawyerName || '')}`
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/lawyerchat/lawyerchat?consultationId=${id}&title=${encodeURIComponent(consultation ? consultation.title : '咨询会话')}`
    });
  },

  deleteConsult(e) {
    const userId = wx.getStorageSync('userId');
    const id = e.currentTarget.dataset.id;
    const consultation = this.data.consults.find(item => String(item.id) === String(id));
    const isBooking = consultation && consultation.lawyerId;

    wx.showModal({
      title: isBooking ? '取消预约' : '确认删除',
      content: isBooking ? '取消后平台将保留该预约记录，您可重新发起预约。' : '确定要删除这条咨询吗？',
      success: (res) => {
        if (res.confirm) {
          const action = isBooking ? api.cancelBooking(userId, id) : api.deleteConsultation(userId, id);
          action
            .then(res => {
              if (res.code === 200) {
                wx.showToast({
                  title: isBooking ? '预约已取消' : '删除成功',
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
