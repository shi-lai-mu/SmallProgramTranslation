module.exports = {
  vue: `
    <div class="input-group">
        <div class="input-row border">
            <span class="title">实时测试</span>
        </div>
        <div class="input-row">
            <span class="title">组建池1号编译测试：</span>
            {{ x + x }}:{{ x }}:{{ x }}.sdsdsd
            <button @click="s">➕</button>
        </div>
        <all :z="x"></all>
        <test></test>
    </div>
  `,
  defaultData: `
    x: 0,
  `,
  methods: `
    s () {
      this.x++;
    },
    un() {
      document.body.removeChild(vue);
      var script = document.createElement('script');
      script.id = 'vue';
      script.src = 'http://127.0.0.1:7001/test.js';
      document.body.append(script);
    },
  `,
  components: `
    'test': {
      data: () => ({
        msg: 'vue'
      }),
      methods: {
        test() {
          console.log(this)
        }
      },
      template: '<p @click="test">Hi,{{ msg }}!</p>'
    },
    'all': {
      props: ['z'],
      template: '<p>这是个子组件 通讯测试：{{ z }}</p>'
    },
  `
}