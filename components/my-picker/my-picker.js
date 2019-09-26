Component({
  mixins: [],
  data: {
    value: [0, 0, 0],
    columnIndex1: 0,
    columnIndex2: 0,
    columnIndex3: 0
  },
  props: { 
    show: false,
    col: 3,
    dataList: [],
    onConfirm: () => {},
    onCancel: () => {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onChange(e) {
      this.setData({
        columnIndex1: e.detail.value[0],
        columnIndex2: e.detail.value[1],
        columnIndex3: e.detail.value[2]
      })
    },
    clickItem() {
      let dataList = this.props.dataList
      let columnIndex1 = this.data.columnIndex1
      let columnIndex2 = this.data.columnIndex2
      let columnIndex3 = this.data.columnIndex3
      let param = [
        { text: dataList[columnIndex1].text, value: dataList[columnIndex1].value },
        { text: dataList[columnIndex1].child[columnIndex2].text, value: dataList[columnIndex1].child[columnIndex2].value },
        { text: dataList[columnIndex1].child[columnIndex2].child[columnIndex3].text, value: dataList[columnIndex1].child[columnIndex2].child[columnIndex3].value }
      ]
      this.props.onConfirm(param)
    },
    clickCancel() {
      this.props.onCancel()
    }
  },
})
