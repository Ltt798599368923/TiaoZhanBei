const BASE_URL = 'https://tiaozhanbei-backer.onrender.com'

const api = {
  health: () => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/ai/health',
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  chat: (message, history) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/ai/chat',
        method: 'POST',
        data: {
          message: message,
          history: history || []
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  searchLaws: (keyword, category) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/ai/law/search',
        method: 'POST',
        data: {
          keyword: keyword,
          category: category || ''
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  login: (code, nickname, avatar) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/user/login',
        method: 'POST',
        data: {
          code: code,
          nickname: nickname,
          avatar: avatar
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getUserInfo: (userId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/user/info/' + userId,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  updateUser: (userId, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/user/update/' + userId,
        method: 'PUT',
        data: data,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getFavorites: (userId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/favorite/list/' + userId,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  addFavorite: (userId, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/favorite/add/' + userId,
        method: 'POST',
        data: data,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  removeFavorite: (userId, favoriteId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/favorite/remove/' + userId + '/' + favoriteId,
        method: 'DELETE',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getConsultations: (userId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/consultation/list/' + userId,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  createConsultation: (userId, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/consultation/create/' + userId,
        method: 'POST',
        data: data,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getConsultationDetail: (userId, consultationId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/consultation/detail/' + userId + '/' + consultationId,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  deleteConsultation: (userId, consultationId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/consultation/delete/' + userId + '/' + consultationId,
        method: 'DELETE',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getContracts: (userId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/contract/list/' + userId,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getContractsByType: (userId, type) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/contract/list/' + userId + '/' + type,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  createContract: (userId, data) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/contract/create/' + userId,
        method: 'POST',
        data: data,
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getContractDetail: (userId, contractId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/contract/detail/' + userId + '/' + contractId,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  deleteContract: (userId, contractId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/contract/delete/' + userId + '/' + contractId,
        method: 'DELETE',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getAllTemplates: () => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/template/list',
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getTemplatesByCategory: (category) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/template/list/' + category,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  getTemplateDetail: (templateId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/template/detail/' + templateId,
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  },

  downloadTemplate: (templateId) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + '/api/template/download/' + templateId,
        method: 'POST',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data)
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
}

module.exports = api