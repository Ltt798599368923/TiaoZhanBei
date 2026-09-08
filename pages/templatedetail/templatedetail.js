const api = require('../../utils/api.js')

const CATEGORY_LABELS = {
  complaint: '起诉状 / 自诉状',
  defense: '答辩状',
  appeal: '上诉状',
  application: '申请书 / 申诉书',
  authorization: '授权委托',
  preservation: '保全措施',
  execution: '执行程序',
  statement: '意见 / 陈述',
  other: '其他文书',
  civil: '民事类'
}

const PRACTICE_AREA_LABELS = {
  civil_commercial: '民商事',
  criminal: '刑事',
  administrative: '行政',
  intellectual_property: '知识产权',
  state_compensation: '国家赔偿',
  enforcement: '执行',
  maritime: '海事',
  environmental: '环境资源',
  other: '其他领域'
}

const MATERIAL_TYPE_LABELS = {
  template: '空白模板',
  example: '填写实例',
  guide: '填写说明'
}

const inferCategory = item => {
  if (CATEGORY_LABELS[item.category]) return item.category
  const text = `${item.title || ''}${item.category || ''}`
  if (text.includes('答辩')) return 'defense'
  if (text.includes('上诉')) return 'appeal'
  if (text.includes('委托')) return 'authorization'
  if (text.includes('保全')) return 'preservation'
  if (text.includes('执行')) return 'execution'
  if (text.includes('起诉') || text.includes('自诉') || text.includes('反诉')) return 'complaint'
  if (text.includes('申请') || text.includes('申诉') || text.includes('复议')) return 'application'
  if (text.includes('意见') || text.includes('陈述')) return 'statement'
  return 'other'
}

const inferPracticeArea = item => {
  if (PRACTICE_AREA_LABELS[item.practiceArea]) return item.practiceArea
  const text = `${item.title || ''}${item.category || ''}`
  if (text.includes('刑事') || text.includes('criminal')) return 'criminal'
  if (text.includes('行政') || text.includes('administrative')) return 'administrative'
  if (text.includes('知识产权') || text.includes('intellectual')) return 'intellectual_property'
  if (text.includes('赔偿') || text.includes('compensation')) return 'state_compensation'
  if (text.includes('执行') || text.includes('enforcement')) return 'enforcement'
  if (text.includes('海事') || text.includes('maritime')) return 'maritime'
  if (text.includes('环境') || text.includes('environmental')) return 'environmental'
  return 'civil_commercial'
}

Page({
  data: {
    templateId: '',
    item: null,
    loading: true,
    loadError: '',
    categoryLabel: '',
    practiceAreaLabel: '',
    materialTypeLabel: '',
    isExample: false
  },

  onLoad(options) {
    const templateId = options.id || ''
    if (!templateId) {
      this.setData({ loading: false, loadError: '模板参数无效' })
      return
    }
    this.setData({ templateId })
    this.loadTemplate()
  },

  loadTemplate() {
    this.setData({ loading: true, loadError: '' })
    return api.getTemplateDetail(this.data.templateId)
      .then(res => {
        if (res.code !== 200 || !res.data) {
          throw new Error(res.message || '模板不存在')
        }
        const item = res.data
        const category = inferCategory(item)
        const practiceArea = inferPracticeArea(item)
        const materialType = MATERIAL_TYPE_LABELS[item.materialType] ? item.materialType : 'template'
        wx.setNavigationBarTitle({ title: item.title || '模板详情' })
        this.setData({
          item: { ...item, category, practiceArea, materialType },
          categoryLabel: CATEGORY_LABELS[category],
          practiceAreaLabel: PRACTICE_AREA_LABELS[practiceArea],
          materialTypeLabel: MATERIAL_TYPE_LABELS[materialType],
          isExample: materialType === 'example'
        })
      })
      .catch(error => {
        this.setData({ loadError: error.message || '模板加载失败，请稍后重试' })
      })
      .finally(() => this.setData({ loading: false }))
  },

  copyTemplate() {
    const item = this.data.item
    if (!item || !item.content) {
      wx.showToast({ title: '该模板暂无可复制正文', icon: 'none' })
      return
    }

    wx.showLoading({ title: '处理中...', mask: true })
    api.downloadTemplate(item.id)
      .then(res => {
        wx.hideLoading()
        if (res.code !== 200) {
          wx.showToast({ title: res.message || '操作失败', icon: 'none' })
          return
        }
        wx.setClipboardData({
          data: item.content,
          success: () => wx.showToast({ title: '模板正文已复制', icon: 'success' }),
          fail: () => wx.showToast({ title: '复制失败，请稍后重试', icon: 'none' })
        })
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
      })
  },

  openAttachment() {
    const item = this.data.item
    if (!item || !item.hasFile) return

    wx.showLoading({ title: '下载中...', mask: true })
    api.downloadTemplateFile(item.id)
      .then(filePath => {
        wx.hideLoading()
        wx.openDocument({
          filePath,
          showMenu: true,
          fail: () => wx.showToast({ title: '文件打开失败，请稍后重试', icon: 'none' })
        })
      })
      .catch(() => {
        wx.hideLoading()
        wx.showToast({ title: '文件下载失败，请稍后重试', icon: 'none' })
      })
  },

  retry() {
    this.loadTemplate()
  },

  onShareAppMessage() {
    const item = this.data.item || {}
    return {
      title: item.title || '法视界文书模板',
      path: '/pages/templatedetail/templatedetail?id=' + this.data.templateId
    }
  }
})
