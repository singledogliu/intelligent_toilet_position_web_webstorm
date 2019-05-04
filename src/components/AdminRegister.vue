<template>
  <body>
  <img src="../assets/bgImg.jpg" class="bgImg"/>
  <div id="content">
    <div class="bidTitle">厕位管理系统注册</div>
    <div class="logCon">
      <div class="line">
        <span>账号:&nbsp;&nbsp;&nbsp;</span>
        <input
          v-model="account"
          class="bt_input"
          type="text"
          placeholder="账号"
        />
      </div>
      <div class="line">
        <span>密码:&nbsp;&nbsp;&nbsp;</span>
        <input
          v-model="password"
          class="bt_input"
          type="password"
          placeholder="密码"
        />
      </div>
      <div class="line">
        <span>姓名:&nbsp;&nbsp;&nbsp;</span>
        <input
          v-model="name"
          class="bt_input"
          type="text"
          placeholder="姓名"
        />
      </div>
      <div class="line">
        <span>电话:&nbsp;&nbsp;&nbsp;</span>
        <input
          v-model="phone"
          class="bt_input"
          type="text"
          placeholder="电话"
        />
      </div>
      <div class="line">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
      >验证码:</span
      >
        <input
          v-model="identifyingCode"
          class="bt_input"
          type="text"
          placeholder="请填写手机接收到的验证码"
        />
        <button v-on:click="identify" type="button" class="identifyBut">获取验证码</button>
      </div>
      <div class="line">
        <span>区域:&nbsp;&nbsp;&nbsp;</span>
        <input
          v-model="regionalCode"
          class="bt_input"
          type="text"
          placeholder="所负责区域"
        />
      </div>
      <!--      <button v-on:click="login" type="button" class="loginBut">-->
      <!--        返回登录-->
      <!--      </button>-->
      <router-link to="/" tag="button" class="loginBut">返回登录</router-link>
      <button v-on:click="register" type="button" class="loginBut">
        注册
      </button>
    </div>
  </div>
  </body>
</template>

<script>
  export default {
    name: "AdminRegister",
    data() {
      return {
        account: "",
        password: "",
        name: "",
        phone: "",
        identifyingCode: "",
        identifyingCodeServer: '',
        regionalCode: ""
      }
    },
    methods: {
      register: function (event) {
        if (this.account == null || this.account == '') {
          alert("账号为空，请填写账号");
        } else if (this.password == null || this.password == '') {
          alert("密码为空，请填写密码");
        } else if (this.name == null || this.name == '') {
          alert("姓名为空，请填写姓名");
        } else if (this.phone == null || this.phone == '') {
          alert("电话号码为空，请填写电话号码");
        } else if (this.identifyingCode == null || this.identifyingCode == '') {
          alert("验证码为空，请填写验证码");
        } else if (this.identifyingCode != this.identifyingCodeServer) {
          alert("验证码错误，请重新填写");
        } else if (this.regionalCode == null || this.regionalCode == '') {
          alert("负者区域为空，请填写负者区域名称");
        } else {
          //post传递参数
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/register",
              {
                account: this.account,
                password: this.password,
                name: this.name,
                phone: this.phone,
                regionalCode: this.regionalCode
              },
              {
                emulateJSON: true
              }
            )
            .then(function (res) {
              var stat = res.bodyText.split(",")[0];
              var adminName = res.bodyText.split(",")[1];
              if (stat == "该账号已存在") {
                alert("该账号已存在,请重新注册");
              }
              if (stat == "注册失败") {
                alert("注册失败，请重试");
              }
              if (stat == "注册成功") {
                //跳转到管理员功能界面
                this.$router.push({
                  path: '/Admin',
                  query: {
                    name: adminName,
                    account: this.account
                  }
                })
              }
            });
        }
      },
      identify: function (event) {
        if (this.phone == null || this.phone == '') {
          alert("电话号码为空，请填写电话号码");
        } else {
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/verification",
              {
                phone: this.phone,
              },
              {
                emulateJSON: true
              }
            )
            .then(function (res) {
              this.identifyingCodeServer = res.bodyText;
            });
        }
      }
    }
  }
</script>

<style scoped>
  body {
    text-align: center;
    height: 100%;
  }

  .sap_tabs {
    background-color: #ffffff4D
  }

  .bgImg {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
  }


  .bidTitle {
    color: #e6e6e6;
    font-size: 34px;
    font-weight: 600;
  }

  .logCon {
    color: #FFFFFF;
    margin-top: 40px;
  }

  .line {

  }

  body #content {
    width: 50%;
    position: fixed;
    background: #0f1a1494;
    left: 25%;
    padding: 5% 1%;
    margin-top: 1%;
    border-radius: 5px;
  }

  body .loginBut {
    background: #2d8c5fa6;
    border: none;
    padding: 12px 0px;
    color: #edefee;
    border-radius: 2px;
    width: 130px;
    margin-left: 30px;
    margin-top: 5px;
  }

  .identifyBut {
    background: #2d8c5fa6;
    border: none;
    padding: 12px 0px;
    color: #edefee;
    border-radius: 2px;
    width: 80px;
    margin-left: 5px;
    margin-top: 5px;
  }

  body .bt_input {
    border-radius: 2px;
    border: none;
    padding: 11px 5px;
    width: 330px;
    margin-right: 20px;
    color: #333;
    margin-left: 5px;
    margin-bottom: 18px;
    background: #ffffffd9;
  }

  body .logCon span {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
  }
</style>
