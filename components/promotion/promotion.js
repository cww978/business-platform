import { savePromotionals } from '/mock/account'
Component({
  mixins: [],
  data: {
    value: [0, 0, 0],
    columnIndex1: 0,
    columnIndex2: 0,
    columnIndex3: 0,
    promotion: null,
    units: [{ text: '条', value: 1 }, { text: '包', value: 2 }],
    promotionProducts: [],
    promotionTobaccos: []
  },
  props: { 
    show: false,
    type: 1,
    num: true,
    unit: true,
    onConfirm: () => {},
    onCancel: () => {}
  },
  didMount() {
    savePromotionals().then(res => {
      this.setData({
        promotionProducts: res.data.products,
        promotionTobaccos: res.data.tobaccos
      })
    })
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onChange(e) {
      this.setData({
        columnIndex1: e.detail.value[0],
        columnIndex2: e.detail.value[1],
        columnIndex3: e.detail.value[2]
      })
      let unit =  this.props.unit ? this.data.units[e.detail.value[2]] : null
      let num =  this.props.num ? e.detail.value[1] + 1 : null
      let promotion = this.props.type == 1 ? this.data.promotionProducts[e.detail.value[0]] : this.data.promotionTobaccos[e.detail.value[0]]
      this.setData({
        value: e.detail.value,
        promotion: promotion,
        unit: unit,
        num: num
      })
    },
    clickItem() {
      let unit =  this.props.unit ? this.data.units[this.data.columnIndex3] : null
      let num =  this.props.num ? this.data.columnIndex2 + 1 : null
      let promotion = this.props.type == 1 ? this.data.promotionProducts[this.data.columnIndex1] : this.data.promotionTobaccos[this.data.columnIndex1]
      this.props.onConfirm({
        promotion: promotion,
        unit: unit,
        num: num
      })
    },
    clickCancel() {
      this.props.onCancel()
    }
  },
})
