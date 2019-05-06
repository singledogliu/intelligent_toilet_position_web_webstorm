<template>
  <div class="logCon">
    <div class="line"><span>账号:&nbsp&nbsp&nbsp&nbsp</span><input class="bt_input" placeholder="账号，若不修改，请填写原账号"
                                                                 type="text"
                                                                 v-model="account"/></div>
    <div class="line"><span>姓名:&nbsp&nbsp&nbsp&nbsp</span><input class="bt_input" placeholder="姓名" type="text"
                                                                 v-model="name"/></div>
    <div class="line"><span>电话:&nbsp&nbsp&nbsp&nbsp</span><input class="bt_input" placeholder="电话号码" type="text"
                                                                 v-model="phone"/></div>
    <div class="line">
      <span>验证码:</span>
      <input class="bt_input" placeholder="请输入验证码" type="text" v-model="identifyingCode">
      <button class="identifyBut" type="button" v-on:click="identify">获取验证码</button>
    </div>
    <div class="line"><span>新密码: </span><input class="bt_input" placeholder="新密码" type="password"
                                               v-model="NewPassword"/>
    </div>
    <div class="line"><span>旧密码: </span><input class="bt_input" placeholder="当前密码" type="password"
                                               v-model="OldPassword"/></div>
    <button @click="Submit" class="loginBut" type="button">提交</button>
  </div>
</template>

<script>
  export default {
    name: "ModifyAdmin",
    data() {
      return {
        Account: sessionStorage.getItem("account"),
        account: '',
        name: "",
        phone: '',
        NewPassword: '',
        OldPassword: '',
        identifyingCode: '',
        identifyingCodeServer: '',
        identifyingTimeStart: '',
        identifyingTimeEnd: '',
      };
    },
    methods: {
      Submit: function () {
        //点击提交的时间
        this.identifyingTimeEnd = new Date().getTime();
        if (this.account == null || this.account == '') {
          alert("账号为空，请填写账号");
        } else if (this.name == null || this.name == '') {
          alert("姓名为空，请填写姓名");
        } else if (this.phone == null || this.phone == '') {
          alert("电话号码为空，请填写电话号码");
        } else if (this.identifyingCode == null || this.identifyingCode == '') {
          alert("验证码为空，请填写验证码");
        } else if (this.identifyingCode != this.identifyingCodeServer) {
          alert("验证码错误，请重填");
          this.identifyingCode = '';
        } else if ((this.identifyingTimeEnd - this.identifyingTimeStart > 300000)) {
          alert("验证码已过期，请重新获取");
          this.identifyingCode = '';
        } else if (this.NewPassword == null || this.NewPassword == '') {
          alert("新密码为空，请填写新密码");
        } else if (this.OldPassword != this.OldPassword) {
          alert("原密码为空，请填写原密码");
        } else {
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/modifyInformation",
              {
                account: this.account,
                password: this.NewPassword,
                oldPassword: this.OldPassword,
                phone: this.phone,
                name: this.name,
                adminAccount: this.Account,
                action: "修改全部"
              },
              {
                emulateJSON: true
              }
            )
            .then(function (res) {
              if (res.data == 0) {
                alert("修改失败,请重试");
              } else if (res.data == 2) {
                alert("原密码错误，请重试");
                this.OldPassword = '';
              } else {
                alert("修改成功");
                if (this.Account != this.NewAccount) {
                  sessionStorage.setItem("account", this.NewAccount);
                }
                sessionStorage.setItem("name", this.name);
              }
            });
        }
      },
      identify: function () {
        if (this.phone == null || this.phone == '') {
          alert("电话号码为空，请填写电话号码");
        } else {
          //获取验证码的时间
          this.identifyingTimeStart = new Date().getTime();
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
              this.identifyingCodeServer = res.data;
            });
        }
      },
    }
  }
</script>

<style scoped>
  .logCon {
    margin-top: 40px;
    width: 60%;
    margin-left: 20%;
    border: 1px;
  }

  .line {
    margin-top: 2%;
  }

  .bt_input {
    border-radius: 2px;
    /* border: none; */
    padding: 11px 5px;
    width: 330px;
    margin-right: 20px;
    color: #333;
    margin-left: 5px;
    margin-bottom: 18px;
    /* background: #ffffffd9; */
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

  .loginBut {
    background: #2d8c5fa6;
    border: none;
    padding: 12px 0px;
    color: #edefee;
    border-radius: 2px;
    width: 130px;
    margin-left: 130px;
    margin-top: 5px;
  }

  .logCon span {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
  }
</style>
