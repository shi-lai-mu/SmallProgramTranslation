import { Controller } from 'egg';
// const csjs = require('@gotoeasy/csjs');

// const spawn = require('cross-spawn');

export default class HomeController extends Controller {
  
  public async test() {
    const { ctx } = this;
    // const shell = spawn.sync('test.bat' ,{ stdio: 'inherit' })
    // console.log(
    //   shell,
    //   shell.stderr
    // )
    // ctx.body = shell.stdout;
    
    /**
     * 测试阶段
     */
    // 假设请求传入的 请求编译DOM树 数据为
    const DOMTREE = [
      {
        poolId: 0,
        style: {},
        setting: {},
      }
    ];
    
    // 内部组建池 虚拟
    const componentPoolArray = [
      {
        vue: `
          <div class="input-group">
              <div class="input-row border">
                  <span class="title">实时测试</span>
              </div>
              <div class="input-row">
                  <span class="title">组建池1号编译测试：</span>
                  {{ x + x }}:{{ x }}:{{ x }}
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
            this.x++
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
        `,
        build: {
          paths: [],
          styles: [],
          imgs: [],
        },
        info: {}
      }
    ];

    // Vue DOM 解释器模式
    let VueJsModels = `
      var doc = document;
      doc.getElementById('app').innerHTML =  \`%_INNER_VUE_HTML_%\`
      new Vue({
        el: "#app",
        data: {%_DATA_%},
        methods: {%_METHODS_%},
        components: {%_COMPONENTS_%} 
      })
    `;
    let innerVue = {
      Html: '',
      data: '',
      methods: '',
      components: '',
    };
    // 从上至下解析DOM
    for (let index = 0, len = DOMTREE.length; index < len; index++) {
      const component = componentPoolArray[DOMTREE[index].poolId];
      innerVue.Html += component.vue;
      innerVue.data += component.defaultData;
      innerVue.methods += component.methods;
      innerVue.components += component.components;
    }
    ctx.set('Content-Type', 'text/javascript');

    VueJsModels = VueJsModels.replace('%_DATA_%', innerVue.data)
      .replace('%_METHODS_%', innerVue.methods)
      .replace('%_COMPONENTS_%', innerVue.components)
      .replace('%_INNER_VUE_HTML_%', innerVue.Html.replace(/(\t|\n|(\s){2})+/g, ''));
    // csjs.miniJs(VueJsModels) + '// 注释'

    const loginTest = await (await import('../pool/poolLoading'))('loginTest');
    ctx.body = await loginTest.vueInterpreter();
  }
}
