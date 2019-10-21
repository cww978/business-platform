Component({
  mixins: [],
  data: {},
  props: {
    show: false,
    title: '',
    content: '',
    leftButtonText: '取 消',
    rightButtonText: '确 定',
    onLeft: () => {},
    onRight: () => {}
  },
  didMount() {},
  didUpdate() {
  },
  didUnmount() {},
  methods: {
    handleLeft() {
      this.props.onLeft()
    },
    handleRight() {
      this.props.onRight()
    }
  },
});
