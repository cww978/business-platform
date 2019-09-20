import { selAccountDetail } from '/mock/account'
Page({
  data: {
    accountId: '',
    accountInfo: null,
    tobaccos: [],
    products: []
  },
  onReady() {
    let that = this
    selAccountDetail({ id: this.data.accountId }).then(res => {
      that.setData({
        accountInfo: res.data.accountInfo,
        tobaccos: res.data.tobaccos,
        products: res.data.products
      })
    })
  },
  onLoad(options) {
    this.setData({
      accountId: options.id
    })
  },
});
