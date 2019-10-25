import { dateFormat } from '/util/tool'
Page({
  data: {
    top: 0,
    tabs: ['未审核', '已审核'],
    activeTab: 0,
    examineTime: dateFormat(new Date(), 'yyyy-MM-dd'),
    shadow: false,
    showPopupTop: false
  },
  examineTimeClick() {
    let that = this
    dd.datePicker({
      format: 'yyyy-MM-dd',
      currentDate: this.data.examineTime,
      success(res) {
        if (res.date != void 0) {
          that.setData({ 'examineTime': res.date })
        }
      }
    })
  },
  // 滚动
  onPageScroll(e) {
    const { scrollTop } = e
    let shadow = false
    if (scrollTop > 10) {
      shadow = true
    } else {
      shadow = false
    }
    this.setData({
      shadow
    })
  },
  // 点击切换TAB
  onTabBarTap(e) {
    const { index } = e.target.dataset
    this.setData({
      activeTab: index,
    })
  },
  // 打开条件筛选框
  openPopup() {
    this.setData({ showPopupTop: true })
  },
  // 关闭筛选框
  onPopupClose() {
    this.setData({ showPopupTop: false })
  },
  openModify() {
    dd.navigateTo({
      url: `/pages/implementationAudit/modifyAudit/modifyAudit`
    })
  },
  openDelete() {
    dd.navigateTo({
      url: `/pages/implementationAudit/deleteAudit/deleteAudit`
    })
  },
  onLoad() {
    dd.getSystemInfo({
      success: (res) => {
        if (res.statusBarHeight && res.titleBarHeight) {
          this.setData({
            top: res.statusBarHeight + res.titleBarHeight,
          })
        }
      }
    })
  },
});
