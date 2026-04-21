Page({
  data: {
    laws: [
      { id: 1, title: '中华人民共和国反外国制裁法', date: '2021-06-10', effect: '施行', summary: '维护国家主权、安全和发展利益' },
      { id: 2, title: '中华人民共和国个人信息保护法', date: '2021-08-20', effect: '2021-11-01', summary: '保护个人信息权益，规范个人信息处理' },
      { id: 3, title: '中华人民共和国监察法实施条例', date: '2021-09-20', effect: '施行', summary: '规范监察工作，保障监察对象合法权益' },
      { id: 4, title: '最高人民法院关于适用《民法典》合同编的解释', date: '2024-12-28', effect: '2025-01-01', summary: '细化合同编司法适用规则' },
      { id: 5, title: '人民检察院办理网络犯罪案件规定', date: '2024-10-15', effect: '施行', summary: '规范网络犯罪案件办理程序' },
      { id: 6, title: '新修订的行政复议法', date: '2023-09-01', effect: '2024-01-01', summary: '完善行政复议制度，发挥化解行政争议主渠道作用' }
    ]
  },

  onLoad() {
    wx.setNavigationBarTitle({
      title: '法治新程'
    });
  },

  onLawTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看法律法规详情',
      icon: 'none'
    });
  }
})
