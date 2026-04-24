//首页--服务--合同审查服务
// contract.js
// 合同审查页面逻辑
Page({
  /**
   * 页面数据
   */
  data: {
    contractTypes: [  // 合同类型列表
      {
        type: 'employment',        // 类型标识
        name: '劳动合同',          // 类型名称
        description: 'employment contracts'  // 类型描述
      },
      {
        type: 'business',          // 类型标识
        name: '商务合同',          // 类型名称
        description: 'business contracts'  // 类型描述
      },
      {
        type: 'realestate',        // 类型标识
        name: '房地产合同',        // 类型名称
        description: 'real estate contracts'  // 类型描述
      }
    ]
  },

  /**
   * 页面加载
   */
  onLoad() {
    // 页面加载时的逻辑
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack();  // 调用微信API返回上一页
  },

  /**
   * 选择合同类型
   * @param {Object} e - 事件对象，包含选择的合同类型
   */
  selectContractType(e) {
    const contractType = e.currentTarget.dataset.type;  // 获取选择的合同类型
    const contract = this.data.contractTypes.find(item => item.type === contractType);  // 查找合同类型详情

    // 显示确认对话框
    wx.showModal({
      title: contract.name,  // 对话框标题
      content: `您选择了${contract.name}审查，是否继续？`,  // 对话框内容
      confirmText: '继续',  // 确认按钮文本
      cancelText: '取消',  // 取消按钮文本
      success: (res) => {
        if (res.confirm) {
          // 显示提示信息
          wx.showToast({
            title: `${contract.name}审查功能开发中`,
            icon: 'info'
          });
        }
      }
    });
  },

  /**
   * 上传合同
   */
  uploadContract() {
    // 显示操作菜单，让用户选择上传方式
    wx.showActionSheet({
      itemList: ['从文件选择', '拍照上传'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 从文件选择
          wx.chooseMessageFile({
            count: 1,
            type: 'file',
            extension: ['.pdf', '.doc', '.docx'],
            success: (res) => {
              const tempFilePaths = res.tempFilePaths;
              console.log('选择的文件:', tempFilePaths);
              
              // 显示选择的文件信息
              wx.showModal({
                title: '文件选择成功',
                content: `已选择文件: ${res.tempFiles[0].name}`,
                confirmText: '确定',
                success: (res) => {
                  if (res.confirm) {
                    // 这里可以添加文件上传逻辑
                    wx.showToast({
                      title: '文件上传成功',
                      icon: 'success'
                    });
                  }
                }
              });
            },
            fail: (err) => {
              console.log('选择文件失败:', err);
              wx.showToast({
                title: '选择文件失败',
                icon: 'error'
              });
            }
          });
        } else if (res.tapIndex === 1) {
          // 拍照上传
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: (res) => {
              const tempFilePaths = res.tempFilePaths;
              console.log('拍摄的照片:', tempFilePaths);
              
              // 显示拍摄成功信息
              wx.showModal({
                title: '拍照成功',
                content: '照片已准备上传',
                confirmText: '确定',
                success: (res) => {
                  if (res.confirm) {
                    // 这里可以添加照片上传逻辑
                    wx.showToast({
                      title: '照片上传成功',
                      icon: 'success'
                    });
                  }
                }
              });
            },
            fail: (err) => {
              console.log('拍照失败:', err);
              wx.showToast({
                title: '拍照失败',
                icon: 'error'
              });
            }
          });
        }
      },
      fail: (err) => {
        console.log('选择上传方式失败:', err);
      }
    });
  },

  /**
   * 提交审查
   */
  submitReview() {
    // 显示提交成功对话框
    wx.showModal({
      title: '提交成功',  // 对话框标题
      content: '您的合同审查请求已提交，我们会尽快为您审查',  // 对话框内容
      confirmText: '确定',  // 确认按钮文本
      success: (res) => {
        if (res.confirm) {
          wx.navigateBack();  // 调用微信API返回上一页
        }
      }
    });
  }
})