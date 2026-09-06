const BASE_URL = 'https://api.fashijie.top'

function getAuthHeader() {
  const token = wx.getStorageSync('token')
  return token ? { 'Authorization': 'Bearer ' + token } : {}
}

function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('userId')
          wx.removeStorageSync('userInfo')
          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateTo({ url: '/pages/login/login' })
          }, 1500)
          reject(res)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

function uploadFile(options) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: options.url,
      filePath: options.filePath,
      name: options.name || 'file',
      formData: options.formData || {},
      header: {
        ...getAuthHeader()
      },
      success: (res) => {
        if (res.statusCode === 200) {
          try {
            const data = JSON.parse(res.data)
            resolve(data)
          } catch (e) {
            resolve(res.data)
          }
        } else if (res.statusCode === 401) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('userId')
          wx.removeStorageSync('userInfo')
          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none'
          })
          setTimeout(() => {
            wx.navigateTo({ url: '/pages/login/login' })
          }, 1500)
          reject(res)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      header: getAuthHeader(),
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          reject(res)
        }
      },
      fail: reject
    })
  })
}

const api = {
  health: () => {
    return request({ url: BASE_URL + '/api/ai/health', method: 'GET' })
  },

  chat: (message, history) => {
    return request({
      url: BASE_URL + '/api/ai/chat',
      method: 'POST',
      data: {
        message: message,
        history: history || []
      }
    })
  },

  searchLaws: (keyword, category) => {
    return request({
      url: BASE_URL + '/api/ai/law/search',
      method: 'POST',
      data: {
        keyword: keyword,
        category: category || ''
      }
    })
  },

  login: (code, nickname, avatar) => {
    return request({
      url: BASE_URL + '/api/user/login',
      method: 'POST',
      data: {
        code: code,
        nickname: nickname,
        avatar: avatar
      }
    })
  },

  getUserInfo: (userId) => {
    return request({ url: BASE_URL + '/api/user/info/' + userId, method: 'GET' })
  },

  updateUser: (userId, data) => {
    return request({
      url: BASE_URL + '/api/user/update/' + userId,
      method: 'PUT',
      data: data
    })
  },

  uploadUserAvatar: (userId, filePath) => {
    return uploadFile({ url: BASE_URL + '/api/user/avatar/' + userId, filePath, name: 'file' })
  },

  getFeedbacks: (userId) => request({ url: BASE_URL + '/api/feedback/list/' + userId, method: 'GET' }),

  createFeedback: (userId, content) => request({ url: BASE_URL + '/api/feedback/create/' + userId, method: 'POST', data: { content } }),

  getFavorites: (userId) => {
    return request({ url: BASE_URL + '/api/favorite/list/' + userId, method: 'GET' })
  },

  addFavorite: (userId, data) => {
    return request({
      url: BASE_URL + '/api/favorite/add/' + userId,
      method: 'POST',
      data: data
    })
  },

  removeFavorite: (userId, favoriteId) => {
    return request({
      url: BASE_URL + '/api/favorite/remove/' + userId + '/' + favoriteId,
      method: 'DELETE'
    })
  },

  getConsultations: (userId) => {
    return request({ url: BASE_URL + '/api/consultation/list/' + userId, method: 'GET' })
  },

  createConsultation: (userId, data) => {
    return request({
      url: BASE_URL + '/api/consultation/create/' + userId,
      method: 'POST',
      data: data
    })
  },

  getConsultationDetail: (userId, consultationId) => {
    return request({
      url: BASE_URL + '/api/consultation/detail/' + userId + '/' + consultationId,
      method: 'GET'
    })
  },

  getConsultationMessages: (userId, consultationId) => {
    return request({
      url: BASE_URL + '/api/consultation/messages/' + userId + '/' + consultationId,
      method: 'GET'
    })
  },

  sendConsultationMessage: (userId, consultationId, content) => {
    return request({
      url: BASE_URL + '/api/consultation/messages/' + userId + '/' + consultationId,
      method: 'POST',
      data: { content }
    })
  },

  deleteConsultation: (userId, consultationId) => {
    return request({
      url: BASE_URL + '/api/consultation/delete/' + userId + '/' + consultationId,
      method: 'DELETE'
    })
  },

  cancelBooking: (userId, consultationId) => {
    return request({
      url: BASE_URL + '/api/consultation/cancel/' + userId + '/' + consultationId,
      method: 'POST'
    })
  },

  getContracts: (userId) => {
    return request({ url: BASE_URL + '/api/contract/list/' + userId, method: 'GET' })
  },

  getContractsByType: (userId, type) => {
    return request({ url: BASE_URL + '/api/contract/list/' + userId + '/' + type, method: 'GET' })
  },

  createContract: (userId, data) => {
    return request({
      url: BASE_URL + '/api/contract/create/' + userId,
      method: 'POST',
      data: data
    })
  },

  uploadContract: (userId, filePath, type, title) => {
    return uploadFile({
      url: BASE_URL + '/api/contract/upload/' + userId,
      filePath: filePath,
      name: 'file',
      formData: {
        type: type,
        title: title
      }
    })
  },

  getContractDetail: (userId, contractId) => {
    return request({
      url: BASE_URL + '/api/contract/detail/' + userId + '/' + contractId,
      method: 'GET'
    })
  },

  deleteContract: (userId, contractId) => {
    return request({
      url: BASE_URL + '/api/contract/delete/' + userId + '/' + contractId,
      method: 'DELETE'
    })
  },

  downloadContractFile: (userId, contractId) => {
    return downloadFile(BASE_URL + '/api/contract/file/' + userId + '/' + contractId)
  },

  getAllTemplates: () => {
    return request({ url: BASE_URL + '/api/template/list', method: 'GET' })
  },

  getTemplatesByCategory: (category) => {
    return request({ url: BASE_URL + '/api/template/list/' + category, method: 'GET' })
  },

  getTemplateDetail: (templateId) => {
    return request({ url: BASE_URL + '/api/template/detail/' + templateId, method: 'GET' })
  },

  downloadTemplate: (templateId) => {
    return request({
      url: BASE_URL + '/api/template/download/' + templateId,
      method: 'POST'
    })
  },

  downloadTemplateFile: (templateId) => {
    return downloadFile(BASE_URL + '/api/template/file/' + templateId)
  },

  getNotices: () => {
    return request({ url: BASE_URL + '/api/notice/list', method: 'GET' })
  },

  getNoticeDetail: (noticeId) => {
    return request({ url: BASE_URL + '/api/notice/detail/' + noticeId, method: 'GET' })
  },

  getUserNotices: (userId) => {
    return request({ url: BASE_URL + '/api/notice/user/' + userId, method: 'GET' })
  },

  getUserNoticeDetail: (userId, noticeId) => {
    return request({ url: BASE_URL + '/api/notice/user/' + userId + '/detail/' + noticeId, method: 'GET' })
  },

  getContentList: (type) => {
    return request({ url: BASE_URL + '/api/content/' + type, method: 'GET' })
  },

  getContentDetail: (type, contentId) => {
    return request({ url: BASE_URL + '/api/content/' + type + '/' + contentId, method: 'GET' })
  },

  downloadContentFile: (type, contentId) => {
    return downloadFile(BASE_URL + '/api/content/' + type + '/' + contentId + '/file')
  },

  getLawyers: () => {
    return request({ url: BASE_URL + '/api/lawyer/list', method: 'GET' })
  },

  getLawyerDetail: (lawyerId) => {
    return request({ url: BASE_URL + '/api/lawyer/detail/' + lawyerId, method: 'GET' })
  }
}

module.exports = api
