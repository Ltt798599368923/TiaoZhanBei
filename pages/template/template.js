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
  other: '其他文书'
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
  if (text.includes('刑事')) return 'criminal'
  if (text.includes('行政')) return 'administrative'
  if (text.includes('知识产权')) return 'intellectual_property'
  if (text.includes('赔偿')) return 'state_compensation'
  if (text.includes('执行')) return 'enforcement'
  if (text.includes('海事')) return 'maritime'
  if (text.includes('环境')) return 'environmental'
  return 'civil_commercial'
}

Page({
  data: {
    categories: [
      { id: '', name: '全部', mark: '全' },
      { id: 'complaint', name: '起诉状', mark: '诉' },
      { id: 'defense', name: '答辩状', mark: '辩' },
      { id: 'appeal', name: '上诉状', mark: '上' },
      { id: 'application', name: '申请书', mark: '申' },
      { id: 'authorization', name: '委托书', mark: '委' },
      { id: 'preservation', name: '保全', mark: '保' },
      { id: 'execution', name: '执行', mark: '执' },
      { id: 'other', name: '其他', mark: '其' }
    ],
    practiceAreas: [
      { id: '', name: '全部领域' },
      { id: 'civil_commercial', name: '民商事' },
      { id: 'criminal', name: '刑事' },
      { id: 'administrative', name: '行政' },
      { id: 'intellectual_property', name: '知识产权' },
      { id: 'state_compensation', name: '国家赔偿' },
      { id: 'enforcement', name: '执行程序' },
      { id: 'maritime', name: '海事' },
      { id: 'environmental', name: '环境资源' }
    ],
    materialTypes: [
      { id: '', name: '全部资料' },
      { id: 'template', name: '空白模板' },
      { id: 'example', name: '填写实例' },
      { id: 'guide', name: '填写说明' }
    ],
    allTemplates: [],
    templates: [],
    selectedCategory: '',
    selectedPracticeArea: '',
    selectedMaterialType: '',
    loading: false
  },

  onLoad() {
    wx.setNavigationBarTitle({ title: '文书模板' })
    this.loadTemplates()
  },

  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({ selectedCategory: category })
    this.applyFilters()
  },

  selectPracticeArea(e) {
    this.setData({ selectedPracticeArea: e.currentTarget.dataset.practiceArea })
    this.applyFilters()
  },

  selectMaterialType(e) {
    this.setData({ selectedMaterialType: e.currentTarget.dataset.materialType })
    this.applyFilters()
  },

  applyFilters() {
    const { allTemplates, selectedCategory, selectedPracticeArea, selectedMaterialType } = this.data
    const templates = allTemplates.filter(item => {
      return (!selectedCategory || item.displayCategory === selectedCategory) &&
        (!selectedPracticeArea || item.displayPracticeArea === selectedPracticeArea) &&
        (!selectedMaterialType || item.displayMaterialType === selectedMaterialType)
    })
    this.setData({ templates })
  },

  loadTemplates() {
    this.setData({ loading: true })

    api.getAllTemplates().then(res => {
      if (res.code === 200) {
        const allTemplates = (res.data || []).map(item => {
          const displayCategory = inferCategory(item)
          const displayPracticeArea = inferPracticeArea(item)
          const displayMaterialType = MATERIAL_TYPE_LABELS[item.materialType] ? item.materialType : 'template'
          return {
            ...item,
            displayCategory,
            displayPracticeArea,
            displayMaterialType,
            categoryLabel: CATEGORY_LABELS[displayCategory],
            practiceAreaLabel: PRACTICE_AREA_LABELS[displayPracticeArea],
            materialTypeLabel: MATERIAL_TYPE_LABELS[displayMaterialType],
            readingLabel: item.hasContent ? '可在线阅读' : '打开原件'
          }
        })
        this.setData({ allTemplates }, () => this.applyFilters())
      } else {
        wx.showToast({ title: res.message || '加载失败', icon: 'none' })
      }
    }).catch(() => {
      wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
    }).finally(() => {
      this.setData({ loading: false })
    })
  },

  viewTemplateDetail(e) {
    const id = e.currentTarget.dataset.id
    if (!id) {
      wx.showToast({ title: '模板信息不完整', icon: 'none' })
      return
    }
    wx.navigateTo({
      url: '/pages/templatedetail/templatedetail?id=' + encodeURIComponent(id)
    })
  },

  addFavorite(e) {
    const userId = wx.getStorageSync('userId')
    const id = e.currentTarget.dataset.id
    const title = e.currentTarget.dataset.title
    const description = e.currentTarget.dataset.description
    if (!userId) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      return
    }

    api.addFavorite(userId, {
      title,
      description,
      icon: '📄',
      contentType: 'template',
      contentId: id
    }).then(res => {
      wx.showToast({ title: res.code === 200 ? '已收藏' : (res.message || '收藏失败'), icon: res.code === 200 ? 'success' : 'none' })
    }).catch(() => {
      wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' })
    })
  },

})
