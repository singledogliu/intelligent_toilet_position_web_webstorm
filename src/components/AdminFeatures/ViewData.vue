<template>
  <div class="viewData">
    <el-row :gutter="4">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="selectToilet">
            <span>请选择欲查看的厕所:</span>
            <el-select
              v-model="theChooseToiletCode">
              <el-option
                :key="item.toiletCode"
                :label="item.toiletCode"
                :value="item.toiletCode"
                v-for="item in toilet">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="block">
            <span class="demonstration">请选择开始日期</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="startDate"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="block">
            <span class="demonstration">请选择结束日期</span>
            <el-date-picker
              placeholder="选择日期"
              type="date"
              v-model="endDate"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="block">
            <span>请选择查看方式</span><br>
            <el-radio label="year" v-model="radio">按年查看</el-radio>
            <el-radio label="month" v-model="radio">按月查看</el-radio>
            <el-radio label="day" v-model="radio">按日查看</el-radio>
            <el-radio label="all" v-model="radio">查看总数</el-radio>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-radio label="times" v-model="timesOrTime">查看次数</el-radio>
          <el-radio label="time" v-model="timesOrTime">查看时长</el-radio>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-button @click="getInfo">查看</el-button>
        </div>
      </el-col>
    </el-row>
    <div id="displayECharts">

    </div>
  </div>
</template>

<script>
  export default {
    name: "ViewData",
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        startDate: '',
        endDate: '',
        Account: sessionStorage.getItem("account"),
        toilet: [],
        theChooseToiletCode: '',
        regionalName: '',
        radio: "month",
        count: [],
        timesOrTime: "times"
      };
    },

    created: async function () {
      await this.getToiletInfo();
    },

    methods: {
      async getInfo() {
        var theAction = "between";
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        const echarts = require('echarts');
        const myChart = echarts.init(document.getElementById('displayECharts'));
        var startYear = parseInt(this.startDate.toString().split("-")[0]);
        var startMonth = parseInt(this.startDate.toString().split("-")[1]);
        // var startDay = parseInt(this.startDate.toString().split("-")[2]);
        var endYear = parseInt(this.endDate.toString().split("-")[0]);
        var endMonth = parseInt(this.endDate.toString().split("-")[1]);
        // var endDay = parseInt(this.endDate.toString().split("-")[2]);
        // var localStartDate = this.startDate;
        // var localEndDate = this.endDate;
        var Xdata = [];
        var YdataMen = [];
        var YdataWomen = [];
        var Xname = "日";
        var Yname = "次数"

        if (this.startDate === '' || this.startDate == null) {
          alert("请选择开始时间");
        } else if (this.endDate === '') {
          alert("请选择结束时间");
        } else if (this.endDate !== '' && endDate.getTime() < startDate.getTime()) {
          alert("开始时间大于结束时间，请重新选择");
        } else {
          if (this.radio === "year" && startYear === endYear) {
            theAction = "like";
          }
          if (this.radio === "month") {
            if (startYear === endYear) {
              if (startMonth === endMonth) {
                theAction = "like";
              }
            }
          }
          if (this.radio === "day") {
            if (startDate.getTime() === endDate.getTime()) {
              theAction = "like";
            }
          }
          if (this.radio === "all") {
            if (startDate.getTime() === endDate.getTime()) {
              theAction = "like";
            }
          }
          if (this.radio === "year" && theAction === "like") {
            Xname = "月份";
          }
          if (this.radio === "month" && theAction === "like") {
            Xname = "日"
          }
          if (this.radio === "day" && theAction === "like") {
            Xname = "小时"
          }
          if (this.radio === "year" && theAction === "between") {
            Xname = "年"
          }
          if (this.radio === "month" && theAction === "between") {
            Xname = "月"
          }
          if (this.radio === "day" && theAction === "between") {
            Xname = "天"
          }
          if (this.radio === "all") {
            Xname = "时间段"
          }
          if (this.timesOrTime === "time") {
            Yname = "时长/分钟";
          }
          this.$http
            .post(
              "http://127.0.0.1:8080/Admin/getToiletStatistics",
              {
                regionalName: this.regionalName,
                toiletCode: this.theChooseToiletCode,
                startDate: this.startDate.toString(),
                endDate: this.endDate.toString(),
                action: theAction,
                unit: this.radio,
                timesOrTime: this.timesOrTime,
              },
              {
                emulateJSON: true,
                // async: false
              }
            )
            .then(function (res) {
              if (res.data == null) {
                alert("数据请求失败");
              } else {
                // console.log(res.data);
                if (this.radio === "all") {
                  Xdata.push(this.startDate + '~' + this.endDate);
                  if (this.timesOrTime === "times") {
                    YdataMen.push(res.data[0]);
                    YdataWomen.push(res.data[1]);
                  } else {
                    YdataMen.push(res.data[0] / 1000 / 60);
                    YdataWomen.push(res.data[1] / 1000 / 60);
                  }
                } else {
                  for (var i = 0; i < res.data.length; i++) {
                    if (theAction === "like") {
                      Xdata.push(i + 1);
                    } else {
                      if (Xname === "年") {
                        Xdata.push(startYear + i);
                      }
                      if (Xname === "月") {
                        Xdata.push(startYear + "-" + startMonth);
                        startMonth += 1;
                        if (startMonth > 12) {
                          startMonth = 1;
                          startYear += 1;
                        }
                      }
                    }
                    if (this.timesOrTime === "times") {
                      YdataMen.push(res.data[i][0]);
                      YdataWomen.push(res.data[i][1]);
                    } else {
                      YdataMen.push(res.data[i][0] / 1000 / 60);
                      YdataWomen.push(res.data[i][1] / 1000 / 60);
                    }
                  }
                }
              }
              myChart.setOption({
                title: {
                  text: '厕位使用数据',
                },
                tooltip: {},
                legend: {
                  show: true,
                  data: ['男', '女'],
                  bottom: 0,
                  top: 5,
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: {
                  type: 'category',
                  name: Xname,
                  data: Xdata
                },
                yAxis: {
                  name: Yname,
                  type: 'value',
                  boundaryGap: [0, 0.01]
                },
                series: [{
                  name: '男',
                  type: 'bar',
                  // stack:'次',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      color: 'blueviolet'
                    }
                  },
                  data: YdataMen
                }, {
                  name: '女',
                  type: 'bar',
                  // stack:'次',
                  barWidth: 10,
                  itemStyle: {
                    normal: {
                      color: 'pink'
                    }
                  },
                  data: YdataWomen
                }
                ]
              });
            });
        }
      },
      // async getCountInfo(action,startDate,endDate){
      //   this.$http
      //     .post(
      //       "http://127.0.0.1:8080/Admin/getToiletStatistics",
      //       {
      //         regionalName: this.regionalName,
      //         toiletCode:this.theChooseToiletCode,
      //         startDate:startDate,
      //         endDate:endDate,
      //         action:action,
      //       },
      //       {
      //         emulateJSON: true,
      //         // async: false
      //       }
      //     )
      //     .then(function (res) {
      //       if (res.data == null) {
      //         alert("数据请求失败");
      //       } else {
      //         this.count =  res.data;
      //         return res.data;
      //       }
      //     });
      // },

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
            if (res.data != null) {
              this.toilet = res.data;
              this.toilet.push({toiletCode: "整个区域"});
              this.regionalName = this.toilet[0].regionalName;
              this.theChooseToiletCode = this.toilet[0].toiletCode;
            } else {
              alert("数据请求失败");
            }
          });
      },

    }
  }
</script>

<style scoped>
  #displayECharts {
    width: 1000px;
    height: 500px;
    /*color: p;*/
  }
</style>
