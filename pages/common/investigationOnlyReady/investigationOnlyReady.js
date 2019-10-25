Page({
  data: {
    investigList: [
      {
        title: '价格',
        form: 'qty',
        tests: ['低', '偏低', '合适', '偏高','高'] 
      },
      {
        title: '烟支',
        form: 'branch',
        tests: ['不喜欢', '不太喜欢', '一般', '喜欢', '很喜欢'] 
      },
      {
        title: '吸味',
        form: 'taste',
        tests: ['太浓', '偏浓', '合适', '偏淡', '太淡'] 
      }
    ],
    investigForm: {
      qty: [0, 0, 0, 0, 0],
      branch: [0, 0, 0, 0, 0],
      taste: [0, 0, 0, 0, 0]
    }
  },
  onLoad(options) {}
});
