const app = document.getElementById('app');
app.innerHTML =  `
    <div class="input-group">
        <div class="input-row border">
            <span class="title">账号：</span>
        </div>
        <div class="input-row">
            <span class="title">密码：</span>
        </div>
    </div>`
// https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js
let link = document.createElement('link');
link.href='/static/index.css'
link.rel='stylesheet'
link.type='text/css'
document.head.appendChild(link);

let script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js';
document.body.appendChild(script);
script.onload = () => {
  Vue.component('todo-item', {
   
    template: '<p>这是个待办项组件</p>'
  })
  
  
  new Vue({
      el:"#app",
      data:{
        m:"hello vue.js",
        x: 0,
        account: '',
        password: '',
      },
      methods: {
        s () {
          this.x++
        }
      },
      components: { 
        'all': {
          template: '<p>这是个待办项组件</p>'
        }
      }	 
  })
}
