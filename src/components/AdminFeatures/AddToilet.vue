<template>
  <div>
    <div class="table">
      <table>
        <thead>
        <tr>
          <th>厕所代号（名称）</th>
          <th>男性厕位个数</th>
          <th>女性厕位个数</th>
          <th>负责人名称</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="n in total">
          <th>
            <input v-model="inputData[n - 1].toiletCode">
          </th>
          <th>
            <input v-model="inputData[n - 1].menToiletPositionCounter">
          </th>
          <th>
            <input v-model="inputData[n - 1].womenToiletPositionCounter">
          </th>
          <th>
            <input v-model="inputData[n - 1].responsibleName">
          </th>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="active-button">
      <button @click="add" class="uploadButton">添加一行</button>
      <button @click="sub" class="uploadButton">删除一行</button>
      <button @click="uploadData" class="uploadButton">提交</button>
    </div>
  </div>
</template>

<script>

  export default {
    name: "AddToilet",
    data() {
      return {
        Account: sessionStorage.getItem("account"),
        total: 1,
        isOk: true,
        inputData: [
          {toiletCode: '', menToiletPositionCounter: '', womenToiletPositionCounter: '', responsibleName: ''}
        ],
      };
    },
    methods: {
      //增加一行
      add() {
        this.total++;
        const inputData = {
          toiletCode: '',
          menToiletPositionCounter: '',
          womenToiletPositionCounter: '',
          responsibleName: ''
        };
        this.inputData.push(inputData);
      },
      //减少一行
      sub() {
        if (this.total == 1) {
          alert("至少保留一行");
        } else {
          this.total--;
          this.inputData.splice(this.total, 1);
        }
      },
      //上传数据
      uploadData() {
        var resultNum = 0;
        this.inputData.forEach(function (item) {
            if (item.toiletCode == '' || item.menToiletPositionCounter == '' || item.womenToiletPositionCounter == '' || item.responsibleName == '') {
              alert("有输入框为空，请确保输入所有数据");
              this.isOk = false;
            } else {
              resultNum += (parseInt(item.menToiletPositionCounter) + parseInt(item.womenToiletPositionCounter));
            }
          }
        );
        if (this.isOk == true) {
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/AddToiletInfo",
              {
                toiletInfo: JSON.stringify(this.inputData),
                adminAccount: this.Account,
              },
              {
                emulateJSON: true
              }
            )
            .then(function (res) {
              if (res.data == (this.inputData.length + resultNum)) {
                alert("修改成功");
                this.total = 1;
                this.inputData[0] = {
                  toiletCode: '',
                  menToiletPositionCounter: '',
                  womenToiletPositionCounter: '',
                  responsibleName: ''
                }
              } else {
                alert("有信息添加失败");
              }
            });
        }
      }

    },


  }
</script>

<style scoped>
  table {
    border: 1px;
    height: auto;
  }

  .table {
    width: auto;
    height: auto;
  }

  /*.active-button{*/
  /*  position: relative;*/
  /*  top: auto;*/
  /*  !*margin-left: 2%;*!*/
  /*  !*top: 8%;*!*/
  /*  !*right: 10%;*!*/
  /*}*/
  .uploadButton {
    position: relative;
    background: #2d8c5fa6;
    border: none;
    padding: 12px 0px;
    color: #edefee;
    border-radius: 2px;
    width: 130px;
    /*left: 200px;*/
    margin-left: 20px;
    margin-top: 5px;
  }
</style>
