Component({
  mixins: [],
  data: {},
  props: {
    title: '',
    content: '',
    old: '',
    extra: '' 
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    titleClick() {
      dd.alert({ content: this.props.title })
    }
  },
});
  