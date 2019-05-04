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
    <button @click="SubmitNewPassword" type="button" class="loginBut">提交</button>
  </div>
</template>

<script>
  export default {
    name: "ModifyPassword",
    data() {
      return {
        NewPassword: "",
        OldPassword: ""
      };
    },
    methods: {
      SubmitNewPassword: function () {
        console.log("wo jin lai le");
        this.$http
          .post(
            "http://127.0.0.1:8080/Admin/modifyInformation",
            {
              adminPassword: this.NewPassword,
              password: this.OldPassword,
              action: "修改密码"
            },
            {
              emulateJSON: true
            }
          )
          .then(function (res) {
            if (res.bodyText == 0) {
              alert("修改失败,请重试");
            } else {
              alert("修改成功，请重新登录");
            }
          });
      }
    }
  }
</script>

<style scoped>
  .logCon {
    /* color: #FFFFFF; */
    margin-top: 40px;
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

  .logCon span {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
  }
</style>
