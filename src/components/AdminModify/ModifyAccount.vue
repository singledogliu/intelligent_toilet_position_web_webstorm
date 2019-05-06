<template>
  <div class="logCon">
    <div class="line">
      <span>账号:</span>
      <input class="bt_input" placeholder="请输入新账号" type="text" v-model="NewAccount">
    </div>
    <div class="line">
      <span>密码:</span>
      <input class="bt_input" placeholder="请输入密码" type="password" v-model="Password">
    </div>
    <button @click="Submit" class="loginBut" type="button">提交</button>
  </div>
</template>

<script>
  export default {
    name: "ModifyAccount",
    data() {
      return {
        Account: sessionStorage.getItem("account"),
        NewAccount: "",
        Password: "",
      };
    },
    methods: {
      Submit: function () {
        if (this.NewAccount == null || this.NewAccount == '') {
          alert("新账号为空，请填写新账号");
        } else if (this.Password == null || this.Password == '') {
          alert("密码为空，请填写密码");
        } else {
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/modifyInformation",
              {
                adminAccount: this.Account,
                account: this.NewAccount,
                oldPassword: this.Password,
                action: "修改账号"
              },
              {
                emulateJSON: true
              }
            )
            .then(function (res) {
              if (res.data == 0) {
                alert("修改失败,请重试");
              } else if (res.data == 2) {
                alert("密码错误，请重填");
                this.Password = '';
              } else {
                alert("修改成功");
                sessionStorage.setItem("account", this.NewAccount);
                this.Account = this.NewAccount;
              }
            });
        }
      }
    }
  }
</script>

<style scoped>
  .logCon {
    margin-top: 40px;
    width: 50%;
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
