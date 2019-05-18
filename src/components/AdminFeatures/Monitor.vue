<template>
  <div class="hello">
    <div class="selectToilet">
      <span style="color: #4a6bae">请选择欲查看的厕所:</span>
      <el-select @change="changeToiletCode" v-model="theChoose">
        <el-option :key="toiletCode.toiletCode"
                   :label="toiletCode.toiletCode"
                   :value="toiletCode.toiletCode"
                   v-for="toiletCode in toilet"></el-option>
      </el-select>
    </div>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="men">
            <div class="sexTitle"><span>男</span></div>
            <button v-for="(man,index) in men">
              <img :src="man.imgUrl" class="toiletImg"><br>
              <span class="toieltPositionTitle">{{man.toiletPositionCode}}</span><br>
              <span class="toieltPositionTitle">{{man.startTime}}</span>
            </button>
          </div>
        </div>
      </el-col>
      <div class="grid-content bg-purple">

      </div>
      <el-col :span="12">
        <div class="women">
          <div class="sexTitle"><span>女</span></div>
          <button v-for="(woman,index) in women">
            <img :src="woman.imgUrl" class="toiletImg"><br>
            <span class="toieltPositionTitle">{{woman.toiletPositionCode}}</span><br>
            <span class="toieltPositionTitle">{{woman.startTime}}</span>
          </button>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  // import $ from 'jquery'
  export default {
    name: 'Monitor',
    data() {
      return {
        Account: sessionStorage.getItem("account"),
        regionalName: sessionStorage.getItem("regionalName"),
        toiletCode: '',
        men: [],
        women: [],
        toilet: [],
        theChoose: '',
        isOk: false,

      }
    },
    created: async function () {
      await this.getToiletInfo();
    },
    methods: {
      formatDate(now) {
        var myDate = new Date(now);
        var year = myDate.getFullYear(),
          month = myDate.getMonth() + 1,
          date = myDate.getDate(),
          hour = myDate.getHours(),
          minute = myDate.getMinutes(),
          second = myDate.getSeconds();
        return year + "/" + month + "/" + date + " " + hour + ":" + minute;
      },
      //实时消息接收
      GoEasy() {
        var women = this.women;
        var men = this.men;
        var theChoose = this.theChoose;
        var regionalName = this.regionalName;
        const goEasy = new GoEasy({
          appkey: 'BS-d8ce157d507c42f58dd9e98118e22c67'
        });
        goEasy.subscribe({
          channel: 'message',
          onMessage: function (message) {
            const useInfo = eval('(' + message.content + ')');
            if (useInfo.regionalName == regionalName && useInfo.toiletCode == theChoose) {
              if (useInfo.gender == '女') {
                for (var i = 0; i < women.length; i++) {
                  if (women[i].toiletPositionCode == useInfo.toiletPositionCode) {
                    if (useInfo.action == 'start') {
                      women[i].imgUrl = '../../static/img/women-occupy.png';
                      women[i].startTime = useInfo.startTime;
                    } else {
                      women[i].imgUrl = '../../static/img/women-nobody.png';
                      women[i].endTime = useInfo.endTime;
                    }
                  }
                }
              } else {
                for (var j = 0; j < men.length; j++) {
                  if (men[j].toiletPositionCode == useInfo.toiletPositionCode) {
                    if (useInfo.action == 'start') {
                      men[j].imgUrl = '../../static/img/men-occupy.png';
                      men[j].startTime = useInfo.startTime;
                    } else {
                      men[j].imgUrl = '../../static/img/men-nobody.png';
                      men[j].endTime = useInfo.endTime;
                    }
                  }
                }
              }
            }
          },
        });
      },

      //获取相应厕所的厕位信息
      getToiletPositionInfo: async function () {
        this.$http
          .post(
            "http://127.0.0.1:8080/Admin/getToiletPositionInfo",
            {
              regionalName: this.regionalName,
              toiletCode: this.theChoose,
            },
            {
              emulateJSON: true,
              async: false
            }
          )
          .then(function (res) {
            if (res.data == null) {
              alert("数据请求失败");
            } else {
              var data = null;
              for (var i = 0; i < res.data.length; i++) {

                if (res.data[i].gender == '女') {
                  data = {
                    gender: res.data[i].gender,
                    toiletPositionCode: res.data[i].toiletPositionCode,
                    imgUrl: "../../static/img/women-nobody.png",
                    startTime: '',
                    endTime: '',
                  }
                  this.women.push(data);
                } else {
                  data = {
                    gender: res.data[i].gender,
                    toiletPositionCode: res.data[i].toiletPositionCode,
                    imgUrl: "../../static/img/men-nobody.png",
                    startTime: '',
                    endTime: '',
                  }
                  this.men.push(data);
                }
              }
            }
          });
        this.GoEasy();
      },
      //获取厕所信息
      getToiletInfo() {
        this.$http
          .post(
            "http://127.0.0.1:8080/Admin/getToiletInfo",
            {
              adminAccount: this.Account,
            },
            {
              emulateJSON: true,
              async: false
            }
          )
          .then(function (res) {
            if (res.data == null) {
              alert("数据请求失败");
            } else {
              this.toilet = res.data;
              // this.regionalName = this.toilet[0].regionalName;
              this.theChoose = this.toilet[0].toiletCode;
              this.getToiletPositionInfo();
              this.getCurrentToiletPositionUseInfo(this.theChoose);
            }
          });
      },
      //获取指定厕所当前的占用情况
      getCurrentToiletPositionUseInfo(toiletCode) {
        // this.getToiletInfo();
        this.$http
          .post(
            "http://127.0.0.1:8080/Admin/getCurrentUseInfo",
            {
              regionalName: this.regionalName,
              toiletCode: toiletCode,
            },
            {
              emulateJSON: true,
              async: false
            }
          )
          .then(function (res) {
            if (res.data == null) {
              alert("数据请求失败");
            } else {
              // console.log(res.data);
              for (var i = 0; i < res.data.length; i++) {
                if (res.data[i].gender == '男') {
                  for (var j = 0; j < this.men.length; j++) {
                    if (this.men[j].toiletPositionCode == res.data[i].toiletPositionCode) {
                      this.men[j].startTime = this.formatDate(res.data[i].startTime);
                      this.men[j].endTime = this.formatDate(res.data[i].endTime);
                      //结束时间为空表示正在使用中
                      if (res.data[i].endTime == '' || res.data[i].endTime == null) {
                        this.men[j].imgUrl = "../../static/img/men-occupy.png";
                      }
                    }
                  }
                } else {
                  for (var k = 0; k < this.women.length; k++) {
                    if (this.women[k].toiletPositionCode == res.data[i].toiletPositionCode) {
                      this.women[k].startTime = this.formatDate(res.data[i].startTime);
                      this.women[k].endTime = res.data[i].endTime;
                      //结束时间为空表示正在使用中
                      if (res.data[i].endTime == '' || res.data[i].endTime == null) {
                        this.women[k].imgUrl = "../../static/img/men-occupy.png";
                      }
                    }
                  }
                }
              }
            }
          });
      },

      //当厕所信息改变时执行
      changeToiletCode: async function () {
        this.men = [];
        this.women = [];
        await this.getToiletPositionInfo();
        this.getCurrentToiletPositionUseInfo(this.theChoose);
      }

    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.men {*/
  /*  width: 48%;*/
  /*  margin-right: 1%;*/
  /*  border: 1px solid black;*/
  /*  top: 5%;*/
  /*}*/

  /*.women {*/
  /*  position: absolute;*/
  /*  width: 48%;*/
  /*  margin-left: 1%;*/
  /*  border: 1px solid black;*/
  /*  right: 3%;*/
  /*  top: 11.5%;*/
  /*}*/
  .toieltPositionTitle {
    text-align: center;
  }

  .sexTitle {
    background: #2d8c5fa6;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-bottom: 5px;
    font-size: xx-large;
    border-bottom: 1px solid black;
    text-align: center;
  }

  .toiletImg {
    width: 66px;
    height: 66px;
    margin-right: 1px;
  }

  .hello {
    display: inline;
    width: auto;
    height: auto;
    margin-top: 5%;
  }

  button {
    margin-bottom: 2px;
  }
</style>
