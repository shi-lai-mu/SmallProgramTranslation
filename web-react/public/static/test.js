const app = document.getElementById('app');
app.innerHTML =  `
    <div class="input-group">
        <div class="input-row border">
            <span class="title">账号：</span>
        </div>
        <div class="input-row">
            <span class="title">密码：</span>
        </div>
        <todo-item></todo-item>
        <xxx ></xxx>
    </div>`
// https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js
// let link = document.createElement('link');
// link.href='/static/index.css'
// link.rel='stylesheet'
// link.type='text/css'
// document.head.appendChild(link);

let script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js';
document.body.appendChild(script);
script.onload = () => {
  Vue.component('todo-item', {
    data: function () {
      return {
        message: 'not updated'
      }
    },
    template: '<p @click="s">这是个待办项组件1{{ message }}2</p>',
    methods: {
      s () {
        console.log(this)
      }
    }
  })
  
  Vue.component('xxx', {
    template: '<p>这是个待办项组件2</p>'
  })
  
  new Vue({
      el:'#app',
      data:{
        m:'hello vue.js',
        x: 0,
        account: '',
        password: '',
      },
      methods: {
        s () {
          this.x++
        }
      },
  })
}
