import { dateFormat } from '/util/tool'
import { selApprovalManRegList } from '/api/programExecute'
const app = getApp()
Page({
  data: {
    top: 0,
    tabs: ['未审核', '已审核'],
    activeTab: 0,
    examineTime: dateFormat(new Date(), 'yyyy-MM-dd'),
    shadow: false,
    showPopupTop: false,
    alreadyList: [],
    notList: [],
    not: false,
    already: false
  },
  // 筛选时间点击
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
    this.setData({ activeTab: index })
    if (index == 0 && this.data.not == false) {
      this.getApprovalManRegList()
    } else if (index == 1 && this.data.already == false) {
      this.getApprovalManRegList()
    }
  },
  // 打开条件筛选框
  openPopup() {
    this.setData({ showPopupTop: true })
  },
  // 关闭筛选框
  onPopupClose() {
    this.setData({ showPopupTop: false })
  },
  // 打开执行单修改详情
  openModify() {
    dd.navigateTo({
      url: `/pages/implementationAudit/modifyAudit/modifyAudit`
    })
  },
  // 打开执行单删除详情
  openDelete() {
    dd.navigateTo({
      url: `/pages/implementationAudit/deleteAudit/deleteAudit`
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getApprovalManRegList().then(() => {
      dd.stopPullDownRefresh()
    }).catch(() => {
      dd.stopPullDownRefresh()
    })
  },
  // 查询审核执行单
  getApprovalManRegList() {
    return new Promise((resolve, reject) => {
      selApprovalManRegList({
        state: this.data.activeTab,
        userId: app.globalData.userInfo.userId,
        date: this.data.examineTime,
        regCode: ''
      }).then(res => {
        if (this.data.activeTab == 0) {
          this.setData({ notList: res.data.list, not: true })
        } else {
          this.setData({ alreadyList: res.data.list, already: true })
        }
        resolve()
      }).catch(error => {
        reject()
      })
    }) 
  },
  onReady() {
    this.getApprovalManRegList()
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
