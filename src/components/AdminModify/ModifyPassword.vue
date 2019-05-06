<template>
  <div class="logCon">
    <div class="line">
      <span>新密码:</span>
      <input v-model="NewPassword" class="bt_input" type="password" placeholder="请输入新密码">
    </div>
    <div class="line">
      <span>旧密码:</span>
      <input v-model="OldPassword" class="bt_input" type="password" placeholder="请输入旧密码">
    </div>
    <button @click="Submit" type="button" class="loginBut">提交</button>
  </div>
</template>

<script>
  export default {
    name: "ModifyPassword",
    data() {
      return {
        Account: sessionStorage.getItem("account"),
        NewPassword: "",
        OldPassword: ""
      };
    },
    methods: {
      Submit: function () {
        if (this.NewPassword == null || this.NewPassword == '') {
          alert("新密码为空，请填写新密码");
        } else if (this.OldPassword == null || this.OldPassword == '') {
          alert("原密码为空，请填写原密码");
        } else {
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/modifyInformation",
              {
                password: this.NewPassword,
                oldPassword: this.OldPassword,
                adminAccount: this.Account,
                action: "修改密码"
              },
              {
                emulateJSON: true
              }
            )
            .then(function (res) {
              console.log(res);
              if (res.body == 0) {
                alert("修改失败,请重试");
              } else if (res.data == 2) {
                alert("原密码错误，请重试");
                this.oldPassword = '';
              } else {
                alert("修改成功");
                // const dialog = window.confirm("修改成功，请重新登录");
                // if (dialog == true || dialog == false) {
                //   this.$router.push("/");
                // }
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
