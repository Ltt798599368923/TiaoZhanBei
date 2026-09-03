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
  return api.getContentDetail(type, id).then(res => {
    if (res.code !== 200 || !res.data) {
      wx.showToast({ title: res.message || '内容不存在', icon: 'none' })
      return
    }
    const item = res.data
    if (item.sourceUrl) {
      wx.navigateTo({ url: `/pages/webview/webview?url=${encodeURIComponent(item.sourceUrl)}` })
      return
    }
    wx.showModal({
      title: item.title,
      content: item.content || item.summary || '该内容暂未提供正文。',
      showCancel: false,
      confirmText: '关闭'
    })
  }).catch(() => {
    wx.showToast({ title: '内容加载失败，请稍后重试', icon: 'none' })
  })
}

module.exports = { load, open }
