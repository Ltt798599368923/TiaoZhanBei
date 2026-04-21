// contract.js
Page({
  data: {
    contractTypes: [
      {
        type: 'employment',
        name: '劳动合同',
        description: 'employment contracts'
      },
      {
        type: 'business',
        name: '商务合同',
        description: 'business contracts'
      },
      {
        type: 'realestate',
        name: '房地产合同',
        description: 'real estate contracts'
      }
    ]
  },
  onLoad() {
    // 页面加载时的逻辑
  },
  goBack() {
    wx.navigateBack();
  },
  selectContractType(e) {
    const contractType = e.currentTarget.dataset.type;
    const contract = this.data.contractTypes.find(item => item.type === contractType);

    wx.showModal({
      title: contract.name,
      content: `您选择了${contract.name}审查，是否继续？`,
      confirmText: '继续',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: `${contract.name}审查功能开发中`,
            icon: 'info'
          });
        }
      }
    });
  },
  uploadContract() {
    wx.showModal({
      title: '上传合同',
      content: '请选择上传方式',
      confirmText: '拍照上传',
      cancelText: '选择文件',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '拍照上传功能开发中',
            icon: 'info'
          });
        } else if (res.cancel) {
          wx.showToast({
            title: '文件选择功能开发中',
            icon: 'info'
          });
        }
      }
    });
  },
  submitReview() {
    wx.showModal({
      title: '提交成功',
      content: '您的合同审查请求已提交，我们会尽快为您审查',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();
        }
      }
    });
  }
})