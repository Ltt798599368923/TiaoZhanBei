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
    if (item.hasFile) {
      wx.showModal({
        title: item.title,
        content: item.summary || '该内容包含可下载的阅读附件。',
        confirmText: '打开资料',
        success: modalRes => {
          if (!modalRes.confirm) return
          wx.showLoading({ title: '下载中...', mask: true })
          api.downloadContentFile(type, item.id)
            .then(filePath => {
              wx.hideLoading()
              wx.openDocument({ filePath, showMenu: true })
            })
            .catch(() => {
              wx.hideLoading()
              wx.showToast({ title: '资料下载失败，请稍后重试', icon: 'none' })
            })
        }
      })
      return
    }
    if (item.sourceUrl) {
      wx.showModal({
        title: item.title,
        content: '该内容来自外部公开网站。点击“复制地址”后可在浏览器中打开原文。',
        confirmText: '复制地址',
        success: modalRes => {
          if (modalRes.confirm) {
            wx.setClipboardData({
              data: item.sourceUrl,
              success: () => wx.showToast({ title: '原文地址已复制', icon: 'success' }),
              fail: () => wx.showToast({ title: '复制失败，请稍后重试', icon: 'none' })
            })
          }
        }
      })
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
