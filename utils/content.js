const api = require('./api.js')

function load(page, type, key) {
  page.setData({ loading: true, loadError: '' })
  return api.getContentList(type)
    .then(res => {
      if (res.code !== 200) throw new Error(res.message || '加载失败')
      page.setData({ [key]: res.data || [] })
    })
    .catch(() => {
      page.setData({ [key]: [], loadError: '内容加载失败，请稍后重试' })
    })
    .finally(() => page.setData({ loading: false }))
}

function open(type, id) {
  if (!type || !id) {
    wx.showToast({ title: '内容信息不完整', icon: 'none' })
    return
  }
  wx.navigateTo({
    url: `/pages/contentdetail/contentdetail?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`
  })
}

module.exports = { load, open }
