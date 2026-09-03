const api = require('../../utils/api.js')

Page({
  data: {
    isNotificationEnabled: true,
    isDarkModeEnabled: false,
    userInfo: {},
    avatarInitial: '用',
    editingProfile: false,
    nickname: '',
    phone: '',
    savingProfile: false
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '个人设置'
    });
    this.loadUserInfo();
  },

  loadUserInfo() {
    const userId = wx.getStorageSync('userId');
    const cachedUserInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      userInfo: cachedUserInfo,
      avatarInitial: (cachedUserInfo.nickname || '用').slice(0, 1),
      nickname: cachedUserInfo.nickname || '',
      phone: cachedUserInfo.phone || ''
    });
    if (!userId) return;
    api.getUserInfo(userId).then(res => {
      if (res.code !== 200 || !res.data) return;
      wx.setStorageSync('userInfo', res.data);
      this.setData({
        userInfo: res.data,
        avatarInitial: (res.data.nickname || '用').slice(0, 1),
        nickname: res.data.nickname || '',
        phone: res.data.phone || ''
      });
    }).catch(() => {});
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },

  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    if (url) {
      wx.navigateTo({ url });
    }
  },



  // 编辑个人信息
  editProfile() {
    this.setData({ editingProfile: true });
  },

  onNicknameInput(e) {
    this.setData({ nickname: e.detail.value });
  },

  onPhoneInput(e) {
    this.setData({ phone: e.detail.value });
  },

  cancelEditProfile() {
    const userInfo = this.data.userInfo || {};
    this.setData({
      editingProfile: false,
      nickname: userInfo.nickname || '',
      phone: userInfo.phone || ''
    });
  },

  saveProfile() {
    const userId = wx.getStorageSync('userId');
    const nickname = this.data.nickname.trim();
    const phone = this.data.phone.trim();
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    if (!nickname) {
      wx.showToast({ title: '请输入昵称', icon: 'none' });
      return;
    }
    if (phone && !/^1\d{10}$/.test(phone)) {
      wx.showToast({ title: '请输入正确的手机号', icon: 'none' });
      return;
    }
    this.setData({ savingProfile: true });
    api.updateUser(userId, { nickname, phone }).then(res => {
      if (res.code !== 200 || !res.data) {
        wx.showToast({ title: res.message || '保存失败', icon: 'none' });
        return;
      }
      wx.setStorageSync('userInfo', res.data);
      this.setData({
        userInfo: res.data,
        avatarInitial: (res.data.nickname || '用').slice(0, 1),
        editingProfile: false
      });
      wx.showToast({ title: '保存成功', icon: 'success' });
    }).catch(() => {
      wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
    }).finally(() => {
      this.setData({ savingProfile: false });
    });
  },

  // 修改密码
  changePassword() {
    wx.showToast({
      title: '点击了修改密码',
      icon: 'none'
    });
  },

  // 绑定手机号
  bindPhone() {
    wx.showToast({
      title: '点击了绑定手机号',
      icon: 'none'
    });
  },

  // 第三方账号绑定
  bindThirdParty() {
    wx.showToast({
      title: '点击了第三方账号绑定',
      icon: 'none'
    });
  },

  // 切换消息通知
  toggleNotification() {
    this.setData({
      isNotificationEnabled: !this.data.isNotificationEnabled
    });
    wx.showToast({
      title: this.data.isNotificationEnabled ? '消息通知已开启' : '消息通知已关闭',
      icon: 'none'
    });
  },

  // 隐私设置
  privacySettings() {
    wx.showToast({
      title: '点击了隐私设置',
      icon: 'none'
    });
  },

  // 黑名单管理
  blacklist() {
    wx.showToast({
      title: '点击了黑名单管理',
      icon: 'none'
    });
  },

  // 清除缓存
  clearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确定要清除缓存吗？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '缓存已清除',
            icon: 'success'
          });
        }
      }
    });
  },

  // 语言选择
  language() {
    wx.showToast({
      title: '点击了语言选择',
      icon: 'none'
    });
  },

  // 切换深色模式
  toggleDarkMode() {
    this.setData({
      isDarkModeEnabled: !this.data.isDarkModeEnabled
    });
    wx.showToast({
      title: this.data.isDarkModeEnabled ? '深色模式已开启' : '深色模式已关闭',
      icon: 'none'
    });
  },

  // 字体大小
  fontSize() {
    wx.showToast({
      title: '点击了字体大小',
      icon: 'none'
    });
  },

  // 用户协议
  userAgreement() {
    wx.showToast({
      title: '点击了用户协议',
      icon: 'none'
    });
  },

  // 隐私政策
  privacyPolicy() {
    wx.showToast({
      title: '点击了隐私政策',
      icon: 'none'
    });
  },

  // 意见反馈
  feedback() {
    wx.showToast({
      title: '点击了意见反馈',
      icon: 'none'
    });
  },

  // 去评分
  rate() {
    wx.showToast({
      title: '点击了去评分',
      icon: 'none'
    });
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定退出登录？',
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userId');
          wx.removeStorageSync('userInfo');
          wx.reLaunch({ url: '/pages/login/login' });
        }
      }
    });
  }
})
