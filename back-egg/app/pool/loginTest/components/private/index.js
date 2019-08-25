module.exports = {
  vue: `
    <div class="content">
      <div class="input-group">
          <div class="input-row border">
              <span class="title">账号：</span>
              <input class="input" type="span" clearable focus v-model="account" placeholder="请输入账号"/>
          </div>
          <div class="input-row">
              <span class="title">密码：</span>
              <input type="password" displayable v-model="password" placeholder="请输入密码"/>
          </div>
      </div>
      <div class="btn-row">
          <button type="primary" class="primary" @click="bindLogin">登录</button>
      </div>
      <div class="action-row">
          <a href="../reg/reg">注册账号</a>
          <span>|</span>
          <a href="../pwd/pwd">忘记密码</a>
      </div>
    </div>
  `,
  defaultData: `
    providerList: [],
    hasProvider: false,
    account: '',
    password: '',
    positionTop: 0,
  `,
  methods: `
    bindLogin() {
      /**
       * 客户端对账号信息进行一些必要的校验。
       * 实际开发中，根据业务需要进行处理，这里仅做示例。
       */
      if (this.account.length < 5) {
          uni.showToast({
              icon: 'none',
              title: '账号最短为 5 个字符'
          });
          return;
      }
      if (this.password.length < 6) {
          uni.showToast({
              icon: 'none',
              title: '密码最短为 6 个字符'
          });
          return;
      }
      /**
       * 下面简单模拟下服务端的处理
       * 检测用户账号密码是否在已注册的用户列表中
       * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
       */
      const data = {
          account: this.account,
          password: this.password
      };
      const validUser = service.getUsers().some(function (user) {
          return data.account === user.account && data.password === user.password;
      });
      if (validUser) {
          this.toMain(this.account);
      } else {
          uni.showToast({
              icon: 'none',
              title: '用户账号或密码不正确',
          });
      }
    },
  `,
  components: ''
}