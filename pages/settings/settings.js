const api = require('../../utils/api.js');

Page({
  data: { userInfo: {}, nickname: '', phone: '', editing: false, saving: false, notificationEnabled: true, feedbackVisible: false, feedbackContent: '', feedbacks: [] },
  onLoad() { this.loadData(); },
  onShow() { this.loadData(); },
  loadData() {
    const userId = wx.getStorageSync('userId');
    const cached = { ...(wx.getStorageSync('userInfo') || {}) };
    cached.avatar = api.toAbsoluteUrl(cached.avatar);
    this.setData({ userInfo: cached, nickname: cached.nickname || '', phone: cached.phone || '', notificationEnabled: cached.notificationEnabled !== false });
    if (!userId) return;
    api.getUserInfo(userId).then(res => {
      if (res.code === 200 && res.data) this.applyUser(res.data);
    }).catch(() => {});
    api.getFeedbacks(userId).then(res => {
      if (res.code === 200) this.setData({ feedbacks: res.data || [] });
    }).catch(() => {});
  },
  applyUser(userInfo) {
    const normalized = { ...userInfo, avatar: api.toAbsoluteUrl(userInfo.avatar) };
    wx.setStorageSync('userInfo', normalized);
    this.setData({ userInfo: normalized, nickname: normalized.nickname || '', phone: normalized.phone || '', notificationEnabled: normalized.notificationEnabled !== false });
  },
  onNicknameInput(e) { this.setData({ nickname: e.detail.value }); },
  onPhoneInput(e) { this.setData({ phone: e.detail.value }); },
  editProfile() { this.setData({ editing: true }); },
  cancelEdit() { const { userInfo } = this.data; this.setData({ editing: false, nickname: userInfo.nickname || '', phone: userInfo.phone || '' }); },
  saveProfile() {
    const userId = wx.getStorageSync('userId'); const nickname = this.data.nickname.trim(); const phone = this.data.phone.trim();
    if (!nickname) return wx.showToast({ title: '请输入昵称', icon: 'none' });
    if (phone && !/^1\d{10}$/.test(phone)) return wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
    this.setData({ saving: true });
    api.updateUser(userId, { nickname, phone }).then(res => { if (res.code === 200) { this.applyUser(res.data); this.setData({ editing: false }); wx.showToast({ title: '保存成功', icon: 'success' }); } else wx.showToast({ title: res.message || '保存失败', icon: 'none' }); }).catch(() => wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })).finally(() => this.setData({ saving: false }));
  },
  onChooseAvatar(e) {
    const userId = wx.getStorageSync('userId'); const filePath = e.detail.avatarUrl;
    if (!userId || !filePath) return;
    wx.showLoading({ title: '上传头像...', mask: true });
    api.uploadUserAvatar(userId, filePath).then(res => { wx.hideLoading(); if (res.code === 200) { this.applyUser(res.data); wx.showToast({ title: '头像已更新', icon: 'success' }); } else wx.showToast({ title: res.message || '头像上传失败', icon: 'none' }); }).catch(() => { wx.hideLoading(); wx.showToast({ title: '头像上传失败', icon: 'none' }); });
  },
  toggleNotification(e) {
    const userId = wx.getStorageSync('userId'); const notificationEnabled = e.detail.value;
    this.setData({ notificationEnabled });
    api.updateUser(userId, { notificationEnabled }).then(res => { if (res.code === 200) this.applyUser(res.data); else throw new Error(); }).catch(() => { this.setData({ notificationEnabled: !notificationEnabled }); wx.showToast({ title: '保存失败，请重试', icon: 'none' }); });
  },
  toggleFeedback() { this.setData({ feedbackVisible: !this.data.feedbackVisible }); },
  onFeedbackInput(e) { this.setData({ feedbackContent: e.detail.value }); },
  submitFeedback() {
    const userId = wx.getStorageSync('userId'); const content = this.data.feedbackContent.trim();
    if (content.length < 5) return wx.showToast({ title: '请至少填写 5 个字', icon: 'none' });
    api.createFeedback(userId, content).then(res => { if (res.code === 200) { this.setData({ feedbackContent: '' }); wx.showToast({ title: '反馈已提交', icon: 'success' }); this.loadData(); } else wx.showToast({ title: res.message || '提交失败', icon: 'none' }); }).catch(() => wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' }));
  },
  clearCache() {
    wx.showModal({ title: '清理本地缓存', content: '将清理临时缓存，登录状态和个人资料会保留。', success: res => { if (!res.confirm) return; const token = wx.getStorageSync('token'); const userId = wx.getStorageSync('userId'); const userInfo = wx.getStorageSync('userInfo'); wx.clearStorageSync(); wx.setStorageSync('token', token); wx.setStorageSync('userId', userId); wx.setStorageSync('userInfo', userInfo); wx.showToast({ title: '缓存已清理', icon: 'success' }); } });
  },
  logout() { wx.showModal({ title: '退出登录', content: '确定退出当前账号吗？', success: res => { if (res.confirm) { wx.clearStorageSync(); wx.reLaunch({ url: '/pages/login/login' }); } } }); }
});
