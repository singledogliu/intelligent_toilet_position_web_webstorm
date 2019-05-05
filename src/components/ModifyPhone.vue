<template>
  <div class="logCon">
    <div class="line">
      <span>电话: &nbsp&nbsp&nbsp</span>
      <input class="bt_input" placeholder="请输入电话号码" type="text" v-model="NewPhone">
    </div>
    <div class="line">
      <span>验证码:</span>
      <input class="bt_input" placeholder="请输入验证码" type="text" v-model="identifyingCode">
      <button class="identifyBut" type="button" v-on:click="identify">获取验证码</button>
    </div>
    <div class="line">
      <span>密码:&nbsp&nbsp&nbsp</span>
      <input class="bt_input" placeholder="请输入密码" type="password" v-model="Password">
    </div>
    <button @click="Submit" class="loginBut" type="button">提交</button>
  </div>
</template>

<script>
  export default {
    name: "ModifyPhone",
    data() {
      return {
        Account: sessionStorage.getItem("account"),
        NewPhone: "",
        Password: "",
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
        if (this.NewPhone == null || this.NewPhone == '') {
          alert("新号码为空，请填写新号码");
        } else if (this.identifyingCode == null || this.identifyingCode == '') {
          alert("验证码为空，请填写验证码");
        } else if (this.identifyingCode != this.identifyingCodeServer) {
          alert("验证码错误，请重填");
          this.identifyingCode = '';
        } else if ((this.identifyingTimeEnd - this.identifyingTimeStart > 300000)) {
          alert("验证码已过期，请重新获取");
          this.identifyingCode = '';
        } else if (this.Password == null || this.Password == '') {
          alert("密码为空，请填写密码");
        } else {
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/modifyInformation",
              {
                adminAccount: this.Account,
                oldPassword: this.Password,
                phone: this.NewPhone,
                action: "修改电话"
              },
              {
                emulateJSON: true
              }
            )
            .then(function (res) {
              if (res.data == 0) {
                alert("修改失败,请重试");
              } else if (res.data == 2) {
                alert("密码错误，请重试");
                this.Password = '';
              } else {
                alert("修改成功");
              }
            });
        }
      },
      identify: function () {
        if (this.NewPhone == null || this.NewPhone == '') {
          alert("电话号码为空，请填写电话号码");
        } else {
          //获取验证码的时间
          this.identifyingTimeStart = new Date().getTime();
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/verification",
              {
                phone: this.NewPhone,
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
    width: 80%;
    margin-left: 25%;
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

  .loginBut {
    background: #2d8c5fa6;
    border: none;
    padding: 12px 0px;
    color: #edefee;
    border-radius: 2px;
    width: 10%;
    margin-left: 25%;
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

  .logCon span {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
  }
</style>
