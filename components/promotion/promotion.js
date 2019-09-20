Component({
  mixins: [],
  data: {},
  props: { 
    show: false,
    columns: [],
    onClickItem: () => {},
    onClickCancel: () => {}
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    clickItem(e) {
      this.props.onClickItem(1)
    },
    clickCancel() {
      this.props.onClickCancel(1)
    }
  },
});
