<template>
  <div>
    <div class="navbar navbar-default" role="navigation">
      <div class="navbar-header">
        <a class="" href="#"><span class="navbar-brand"/><span class="fa fa-paper-plane"/></a></div>
      <div class="navbar-collapse collapse" style="height: 1px;">
        <ul class="nav navbar-nav navbar-right" id="main-menu">
          <li class="dropdown hidden-xs">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <span class="glyphicon glyphicon-user padding-right-small"
                              style="position:relative;top: 3px;"></span> {{name}}
              <i class="fa fa-caret-down"></i>
            </a>

            <ul class="dropdown-menu">
              <!--            <li><a href="AdminLogin.html" tabindex="-1">Sign out</a></li>-->
              <router-link to="/" tag="li" tabindex="-1">&nbsp&nbsp&nbsp&nbspSign out</router-link>
              <router-link to="/" tag="li" tabindex="-1">&nbsp&nbsp&nbsp&nbspLogout</router-link>
              <!--            <li><a href="#" tabindex="-1">Logout</a></li>-->
            </ul>
          </li>
        </ul>

      </div>
    </div>
    <div id="all-content">
      <div class="sidebar-nav">
        <ul>
          <li v-on:click="NavFirst"><a class="nav-header" data-target=".dashboard-menu" data-toggle="collapse" href="#"><i
            class="fa fa-fw fa-dashboard"></i> 修改信息<i class="fa fa-collapse"></i></a></li>
          <li v-show="FirstShow">
            <ul class="dashboard-menu nav nav-list collapse in">
              <!--            <li><a href="#"><span class="fa fa-caret-right"></span>-->
              <router-link tag="li" to="/Admin/ModifyPassword">&nbsp&nbsp&nbsp&nbsp<span
                class="fa fa-caret-right"></span> 修改密码
              </router-link>
              <!--            </a></li>-->
              <!--            <router-link tag="li" to="/Admin/ModifyPassword">&nbsp&nbsp&nbsp&nbsp<span class="fa fa-caret-right"></span> 修改电话号码</router-link>-->
              <!--            <router-link tag="li" to="/Admin/ModifyPassword">&nbsp&nbsp&nbsp&nbsp<span class="fa fa-caret-right"></span> 修改账号</router-link>-->
              <!--            <router-link tag="li" to="/Admin/ModifyPassword">&nbsp&nbsp&nbsp&nbsp<span class="fa fa-caret-right"></span> 更换管理员</router-link>-->

              <li><a href="#"><span class="fa fa-caret-right"></span> 修改电话号码</a></li>
              <li><a href="#"><span class="fa fa-caret-right"></span> 修改账号</a></li>
              <li><a href="#"><span class="fa fa-caret-right"></span> 更换管理员</a></li>
            </ul>
          </li>

          <li v-on:click="NavSecond"><a class="nav-header collapsed" data-target=".legal-menu" data-toggle="collapse"
                                        href="#"><i
            class="fa fa-fw fa-legal"></i> 功能<i class="fa fa-collapse"></i></a></li>
          <li v-show="SecondShow">
            <ul class="legal-menu nav nav-list collapse in">
              <router-link to="/Admin/" tag="li">&nbsp&nbsp&nbsp&nbsp<span class="fa fa-caret-right"></span> 查看实时使用情况
              </router-link>
              <!--            <li><a @click="monitor" href="#"><span class="fa fa-caret-right"></span> 查看实时使用情况</a></li>-->
              <!--            <router-link to="/Admin/" tag="li"><span class="fa fa-caret-right"></span> 查看统计数据</router-link>-->
              <li><a href="#"><span class="fa fa-caret-right"></span> 查看统计数据</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="content">

      <div class="main-content">

        <div class="panel panel-default">
          <a class="panel-heading" data-toggle="collapse" href="#">{{title}}</a>
          <div class="panel-collapse panel-body collapse in" id="page-stats">
            <router-view :key="key"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import $ from 'jquery';
  export default {
    name: "Admin",
    computed: {
      key() {
        return this.$route.path + Math.random();
      }
    },
    data() {
      return {
        title: '实时使用情况',
        account: '',
        password: '',
        name: '',
        SecondShow: false,
        FirstShow: true,
        NavFirstTimes: 0,
        NavSecondTimes: 0,
      }
    },
    methods: {
      NavSecond: function () {
        console.log("hslg");
        if (this.NavSecondTimes == 0) {
          this.SecondShow = true;
          this.NavSecondTimes = 1;
        } else {
          this.SecondShow = false;
          this.NavSecondTimes = 0;
        }
      },
      NavFirst: function () {
        if (this.NavFirstTimes == 0) {
          this.FirstShow = false;
          this.NavFirstTimes = 1;
        } else {
          this.FirstShow = true;
          this.NavFirstTimes = 0;
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../static/lib/bootstrap/css/bootstrap.css';
  @import "../../static/lib/font-awesome/css/font-awesome.css";
  @import "../../static/stylesheets/theme.css";
  @import "../../static/stylesheets/premium.css";

  /*#line-chart {*/
  /*  height: 300px;*/
  /*  width: 800px;*/
  /*  margin: 0px auto;*/
  /*  margin-top: 1em;*/
  /*}*/

  .navbar-default .navbar-brand,
  .navbar-default .navbar-brand:hover {
    color: #fff;
  }
</style>
