const api = require('../../utils/api.js')

Page({
  data: {
    contractTypes: [
      {
        type: 'employment',
        name: '劳动合同',
        description: 'employment contracts',
        icon: '📝'
      },
      {
        type: 'business',
        name: '商务合同',
        description: 'business contracts',
        icon: '💼'
      },
      {
        type: 'realestate',
        name: '房地产合同',
        description: 'real estate contracts',
        icon: '🏠'
      }
    ],
    selectedType: null,
    title: '',
    fileName: '',
    filePath: '',
    submitting: false,
    contracts: [],
    loadingContracts: false
  },

  onLoad() {
    this.loadContracts();
  },

  onShow() {
    this.loadContracts();
  },

  goBack() {
    wx.navigateBack();
  },

  selectContractType(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      selectedType: type
    });
  },

  onTitleInput(e) {
    this.setData({
      title: e.detail.value
    });
  },

  loadContracts() {
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      this.setData({ contracts: [] });
      return;
    }

    this.setData({ loadingContracts: true });
    api.getContracts(userId)
      .then(res => {
        if (res.code === 200) {
          this.setData({ contracts: res.data || [] });
        }
      })
      .catch(err => {
        console.error('获取合同记录失败', err);
      })
      .finally(() => {
        this.setData({ loadingContracts: false });
      });
  },

  uploadContract() {
    wx.showActionSheet({
      itemList: ['从文件选择', '拍照上传'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.chooseMessageFile({
            count: 1,
            type: 'file',
            extension: ['pdf', 'doc', 'docx', 'txt'],
            success: (res) => {
              const file = res.tempFiles[0];
              this.setData({
                fileName: file.name,
                filePath: file.path
              });
              wx.showToast({
                title: '文件选择成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              console.log('选择文件失败:', err);
            }
          });
        } else if (res.tapIndex === 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: (res) => {
              this.setData({
                fileName: '合同照片_' + Date.now() + '.jpg',
                filePath: res.tempFilePaths[0]
              });
              wx.showToast({
                title: '拍照成功',
                icon: 'success'
              });
            },
            fail: (err) => {
              console.log('拍照失败:', err);
            }
          });
        }
      }
    });
  },

  submitReview() {
    const { selectedType, title, fileName, filePath } = this.data;

    if (!selectedType) {
      wx.showToast({
        title: '请选择合同类型',
        icon: 'none'
      });
      return;
    }

    if (!title || !title.trim()) {
      wx.showToast({
        title: '请输入合同标题',
        icon: 'none'
      });
      return;
    }

    if (!filePath) {
      wx.showToast({
        title: '请先选择或拍照上传文件',
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

    api.uploadContract(userId, filePath, selectedType, title)
      .then(res => {
        wx.hideLoading();
        if (res.code === 200) {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          });
          this.setData({
            selectedType: null,
            title: '',
            fileName: '',
            filePath: ''
          });
          this.loadContracts();
        } else {
          wx.showToast({
            title: res.message || '提交失败',
            icon: 'none'
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.error('提交合同审查失败', err);
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
      })
      .finally(() => {
        this.setData({ submitting: false });
      });
  },

  viewContract(e) {
    const userId = wx.getStorageSync('userId');
    const contractId = e.currentTarget.dataset.id;
    if (!userId || !contractId) return;

    api.getContractDetail(userId, contractId)
      .then(res => {
        if (res.code !== 200 || !res.data) {
          wx.showToast({ title: res.message || '加载失败', icon: 'none' });
          return;
        }
        const contract = res.data;
        wx.showModal({
          title: contract.title,
          content: contract.reviewResult || '当前合同正在等待审核，请留意后续消息通知。',
          confirmText: contract.fileName ? '下载原文件' : '知道了',
          showCancel: !!contract.fileName,
          cancelText: '关闭',
          success: modalRes => {
            if (!modalRes.confirm || !contract.fileName) return;
            wx.showLoading({ title: '下载中...', mask: true });
            api.downloadContractFile(userId, contractId).then(filePath => {
              wx.hideLoading();
              this.openContractFile(filePath, contract.fileName);
            }).catch(() => {
              wx.hideLoading();
              wx.showToast({ title: '文件下载失败', icon: 'none' });
            });
          }
        });
      })
      .catch(() => {
        wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
      });
  },

  openContractFile(filePath, fileName) {
    if (/\.(jpg|jpeg|png)$/i.test(fileName || '')) {
      wx.previewImage({ current: filePath, urls: [filePath] });
      return;
    }
    wx.openDocument({ filePath, showMenu: true });
  },

  deleteContract(e) {
    const userId = wx.getStorageSync('userId');
    const contractId = e.currentTarget.dataset.id;
    if (!userId || !contractId) return;

    wx.showModal({
      title: '删除合同记录',
      content: '删除后无法恢复，确定继续吗？',
      success: modalRes => {
        if (!modalRes.confirm) return;
        api.deleteContract(userId, contractId)
          .then(res => {
            if (res.code === 200) {
              wx.showToast({ title: '已删除', icon: 'success' });
              this.loadContracts();
            } else {
              wx.showToast({ title: res.message || '删除失败', icon: 'none' });
            }
          })
          .catch(() => {
            wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
          });
      }
    });
  }
})
