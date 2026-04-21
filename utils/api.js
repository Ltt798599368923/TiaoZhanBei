// utils/api.js
const BASE_URL = 'https://tiaozhanbei-backer.onrender.com'

// 通用请求方法
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method: method || 'GET',
      data: data || {},
      header: {
        'content-type': 'application/json'
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
}

// 具体的 API 接口
const api = {
  // 法条检索
  searchLaws: (keyword) => {
    return request('/api/law/search', 'POST', { keyword })
  },
  
  // 聊天/AI 对话
  sendMessage: (data) => {
    return request('/api/chat/send', 'POST', { message: data.content })
  },
  
  // 获取律师列表
  getLawyers: () => {
    return request('/api/lawyers', 'GET')
  },
  
  // 预约律师
  reserveLawyer: (lawyerId) => {
    return request('/api/lawyers/reserve', 'POST', { lawyerId })
  },
  
  // 提交咨询
  submitConsult: (data) => {
    return request('/api/consult', 'POST', data)
  },
  
  // 用户登录
  login: (code) => {
    return request('/api/user/login', 'POST', { code })
  }
}

export { api }