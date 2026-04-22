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
  }
}

module.exports = api