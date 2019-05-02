<template>

  <div id="content">
<!--    <img class="bgImg" src="../img/bgImg.jpg"/>-->
    <div class="bidTitle">厕位管理系统登录</div>
    <div class="logCon">
      <div class="line">
        <span>账号:</span>
        <input class="bt_input" placeholder="账号" type="text" v-model="account"/>
      </div>
      <div class="line">
        <span>密码:</span>
        <input class="bt_input" placeholder="密码" type="text" v-model="password"/>
      </div>
      <button class="loginBut" type="button" v-on:click="login">登录</button>
      <button class="loginBut" type="button" v-on:click="register">
        注册
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name:"HelloWorld",
    el: "#content",
    data() {
      return {
        account: '',
        password: '',
      }
      methods: {
        function login(event) {
          if (this.account == null || this.account == '') {
            alert("账号为空，请填写账号");
          } else if (this.password == null || this.password == '') {
            alert("密码为空，请填写密码");
          } else {
            //post传递参数
            this.$http
              .post(
                'http://127.0.0.1:8080/Admin/login',
                {
                  account: this.account,
                  password: this.password
                },
                {
                  emulateJSON: true
                }
              )
              .then(function (res) {
                // console.log("wo shou dao fan hui le");
                var stat = res.bodyText.split(",")[0];
                var adminName = res.bodyText.split(",")[1];
                if (stat == "登录成功") {
                  sessionStorage.setItem('account', this.account);
                  //跳转到管理员功能界面
                  window.location.href = "Admin.html?name=" + adminName;
                }
              });
          }
        }
        function register() {
          //跳转到注册页面
          // localStorage.setItem("account", account);
          window.location.href = "AdminRegister.html";
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    text-align: center;
    height: 100%;
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
    width: 42%;
    position: fixed;
    background: #0f1a1494;
    left: 29%;
    padding: 5% 1%;
    margin-top: 12%;
    border-radius: 5px;
  }

  body .logingBut {
    background: #2d8c5fa6;
    border: none;
    padding: 12px 0px;
    color: #edefee;
    border-radius: 2px;
    width: 330px;
    margin-left: 30px;
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
