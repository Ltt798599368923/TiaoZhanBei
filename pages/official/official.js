Page({
  data: {
    services: [
      { type: 'laws', icon: '法律', name: '法律法规查询', description: '查询现行法律法规和政策文件', url: 'https://flk.npc.gov.cn/' },
      { type: 'legal', icon: '援助', name: '法律援助申请', description: '获取公共法律服务与援助指引', url: 'https://www.12348.gov.cn/' },
      { type: 'notary', icon: '公证', name: '公证服务', description: '查询各类公证业务办理信息', url: 'https://www.chinanotary.org.cn/' },
      { type: 'court', icon: '诉讼', name: '法院诉讼服务', description: '访问法院诉讼服务官方渠道', url: 'https://www.court.gov.cn/' }
    ],
    websites: [
      { name: '司法部官网', description: '政府法律服务官方网站', url: 'https://www.moj.gov.cn' },
      { name: '最高人民法院官网', description: '国家最高审判机关官方网站', url: 'https://www.court.gov.cn' },
      { name: '中国政府网', description: '中央人民政府官方网站', url: 'https://www.gov.cn' },
      { name: '最高人民检察院官网', description: '国家最高检察机关官方网站', url: 'https://www.spp.gov.cn' },
      { name: '裁判文书网', description: '全国法院裁判文书公开平台', url: 'https://wenshu.court.gov.cn' },
      { name: '公安部官网', description: '国家公安部门官方网站', url: 'https://www.mps.gov.cn' },
      { name: '执行信息公开网', description: '全国法院执行信息公开平台', url: 'https://zxgk.court.gov.cn' },
      { name: '被执行人信息查询', description: '全国法院被执行人信息查询平台', url: 'https://zxgk.court.gov.cn/zhixing/' },
      { name: '最高人民法院案例库', description: '典型案例参考平台', url: 'https://www.court.gov.cn/zixun-xiangqing-36011.html' },
      { name: '法学研究杂志社', description: '法学学术研究期刊', url: 'https://www.fxyj.org' },
      { name: '中国国际条约数据库', description: '国际条约查询平台', url: 'https://treaty.mfa.gov.cn' }
    ]
  },

  copyLink(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) {
      wx.showToast({ title: '服务地址暂未配置', icon: 'none' });
      return;
    }

    wx.setClipboardData({
      data: url,
      success: () => wx.showToast({ title: '官网地址已复制', icon: 'success' }),
      fail: () => wx.showToast({ title: '复制失败，请稍后重试', icon: 'none' })
    });
  }
});
