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
    submitting: false
  },

  onLoad() {
    
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

  uploadContract() {
    wx.showActionSheet({
      itemList: ['从文件选择', '拍照上传'],
      success: (res) => {
        if (res.tapIndex === 0) {
          wx.chooseMessageFile({
            count: 1,
            type: 'file',
            extension: ['.pdf', '.doc', '.docx', '.txt'],
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
    const { selectedType, title, fileName } = this.data;

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

    api.createContract(userId, {
      type: selectedType,
      title: title,
      fileName: fileName
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
        console.error('提交合同审查失败', err);
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
