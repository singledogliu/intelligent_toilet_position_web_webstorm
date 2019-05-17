<template>
  <div class="logCon">
    <div class="line">
      <span>检测时间:</span>
      <input class="bt_input" placeholder="单位为分钟" type="text" v-model="NewAccount">
    </div>
    <button @click="Submit" class="loginBut" type="button">提交</button>
  </div>
</template>

<script>
  export default {
    name: "AddToiletPosition",
    data() {
      return {
        Account: sessionStorage.getItem("account"),
        NewAccount: "",
        Password: "",
      };
    },
    methods: {
      Submit() {

      },
    },
  }
</script>

<style scoped>
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

  .logCon {
    margin-top: 40px;
    width: 50%;
    margin-left: 25%;
    border: 1px;
  }
</style>
