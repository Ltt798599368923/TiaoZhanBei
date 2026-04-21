// lawsearch.js
Page({
  data: {
    searchKeyword: '',
    searchResults: [],
    hotKeywords: [
      '民法典', '刑法', '劳动法', '合同法', '侵权责任',
      '婚姻家庭', '继承', '物权', '债权', '诉讼时效'
    ],
    // 模拟法条数据
    lawData: [
      {
        id: 1,
        lawName: '中华人民共和国民法典',
        article: '1',
        content: '为了保护民事主体的合法权益，调整民事关系，维护社会和经济秩序，适应中国特色社会主义发展要求，弘扬社会主义核心价值观，根据宪法，制定本法。'
      },
      {
        id: 2,
        lawName: '中华人民共和国民法典',
        article: '2',
        content: '民法调整平等主体的自然人、法人和非法人组织之间的人身关系和财产关系。'
      },
      {
        id: 3,
        lawName: '中华人民共和国民法典',
        article: '3',
        content: '民事主体的人身权利、财产权利以及其他合法权益受法律保护，任何组织或者个人不得侵犯。'
      },
      {
        id: 4,
        lawName: '中华人民共和国刑法',
        article: '1',
        content: '为了惩罚犯罪，保护人民，根据宪法，结合我国同犯罪作斗争的具体经验及实际情况，制定本法。'
      },
      {
        id: 5,
        lawName: '中华人民共和国刑法',
        article: '2',
        content: '中华人民共和国刑法的任务，是用刑罚同一切犯罪行为作斗争，以保卫国家安全，保卫人民民主专政的政权和社会主义制度，保护国有财产和劳动群众集体所有的财产，保护公民私人所有的财产，保护公民的人身权利、民主权利和其他权利，维护社会秩序、经济秩序，保障社会主义建设事业的顺利进行。'
      },
      {
        id: 6,
        lawName: '中华人民共和国劳动法',
        article: '1',
        content: '为了保护劳动者的合法权益，调整劳动关系，建立和维护适应社会主义市场经济的劳动制度，促进经济发展和社会进步，根据宪法，制定本法。'
      },
      {
        id: 7,
        lawName: '中华人民共和国劳动法',
        article: '2',
        content: '在中华人民共和国境内的企业、个体经济组织（以下统称用人单位）和与之形成劳动关系的劳动者，适用本法。国家机关、事业组织、社会团体和与之建立劳动合同关系的劳动者，依照本法执行。'
      }
    ]
  },

  onLoad() {
    // 页面加载时的初始化操作
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 清除搜索
  onClearSearch() {
    this.setData({
      searchKeyword: '',
      searchResults: []
    });
  },

  // 搜索
  onSearch() {
    const keyword = this.data.searchKeyword.trim();
    if (!keyword) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      });
      return;
    }

    // 模拟搜索逻辑
    const results = this.data.lawData.filter(item => 
      item.lawName.includes(keyword) || 
      item.content.includes(keyword)
    );

    this.setData({
      searchResults: results
    });
  },

  // 热门关键词点击
  onHotKeywordTap(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData({
      searchKeyword: keyword
    });
    this.onSearch();
  },

  // 结果点击
  onResultTap(e) {
    const result = e.currentTarget.dataset.result;
    wx.showModal({
      title: `${result.lawName} 第 ${result.article} 条`,
      content: result.content,
      showCancel: false
    });
  }
})