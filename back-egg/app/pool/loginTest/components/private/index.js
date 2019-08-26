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
      uni.showToast({
          icon: 'none',
          title: '用户账号或密码不正确',
      });
    },
  `,
  components: '',
  style: `
    .action-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .action-row navigator {
        color: #007aff;
        padding: 0 10px;
    }

    .oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 50px;
        height: 50px;
        border: 1px solid #dddddd;
        border-radius: 50px;
        margin: 0 20px;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 30px;
        height: 30px;
        margin: 10px;
    }
  `
}