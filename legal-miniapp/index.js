// 法律助手首页逻辑
Page({
  data: {
    gridItems: [
      { id: 'lawyer',   label: '律师咨询', icon: '/images/icon_lawyer.png' },
      { id: 'template', label: '文书模板', icon: '/images/icon_template.png' },
      { id: 'plain',    label: '法理白话', icon: '/images/icon_plain.png' },
      { id: 'course',   label: '法治新程', icon: '/images/icon_course.png' },
      { id: 'read',     label: '法文阅读', icon: '/images/icon_read.png' },
      { id: 'video',    label: '小视讲堂', icon: '/images/icon_video.png' },
    ],
    hotItems: [
      { id: 'constitution', title: '中华人民共和国宪法' },
      { id: 'civil',        title: '中华人民共和国民法典' },
    ],
  },

  onLoad() {
    // 获取用户定位（需在 app.json 配置 permission）
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log('定位成功', res)
      },
      fail: () => {
        console.log('定位失败，使用默认城市')
      }
    })
  },

  // 在线咨询
  goConsult() {
    wx.navigateTo({ url: '/pages/consult/index' })
  },

  // 法条检索
  goSearch() {
    wx.navigateTo({ url: '/pages/search/index' })
  },

  // 六宫格点击
  onGridTap(e) {
    const id = e.currentTarget.dataset.id
    const routes = {
      lawyer:   '/pages/lawyer/index',
      template: '/pages/template/index',
      plain:    '/pages/plain/index',
      course:   '/pages/course/index',
      read:     '/pages/read/index',
      video:    '/pages/video/index',
    }
    if (routes[id]) {
      wx.navigateTo({ url: routes[id] })
    }
  },

  // 热点咨询点击
  onHotTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/lawdetail/index?id=${id}`
    })
  },
})
