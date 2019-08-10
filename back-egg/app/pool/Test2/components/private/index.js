module.exports = {
  vue: `
    <div class="input-group">
      <hr>
        <div class="input-row border">
            <span class="title">实时测试</span>
        </div>
        <div class="input-row">
            <span class="title">组建池2号编译测试：</span>
            <b>组件独立作用域</b> {{ a }}
            <button @click="l">➕</button>
            <button @click="aaa">弹窗测试2135</button>
        </div>
        <hr>
    </div>
  `,
  defaultData: `
    a: 0,
  `,
  methods: `
    l () {
      this.a++;
    },
    aaa() {
      alert('弹窗测试');
    },
  `,
  components: ``
}