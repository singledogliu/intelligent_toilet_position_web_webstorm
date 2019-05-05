<template>
  <div>
    <div class="navbar navbar-default" role="navigation">
      <div class="navbar-header">
        <a class="" href="#"><span class="navbar-brand"/></a></div>
      <div class="navbar-collapse collapse" style="height: 1px;">
        <ul class="nav navbar-nav navbar-right" id="main-menu">
          <li class="dropdown hidden-xs" v-on:click="AdminMenu">
            <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <span class="glyphicon glyphicon-user padding-right-small"
                              style="position:relative;top: 3px;"></span> {{name}}
              <i class="fa fa-caret-down"></i>
            </a>

            <ul class="adminMenu" v-show="AdminActionShow" @mouseleave="hidden">
              <router-link tag="li" to="/" @click.native="AdminSignOut">&nbspSign out</router-link>
              <router-link tabindex="-1" tag="li" to="/Admin/AdminLogout" @click.native="AdminLogout">&nbspLogout
              </router-link>
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
              <router-link tag="li" to="/Admin/ModifyPassword" @click.native="ModifyPassword">&nbsp&nbsp&nbsp&nbsp<span
                class="fa fa-caret-right"></span> 修改密码
              </router-link>
              <router-link tag="li" to="/Admin/ModifyPhone" @click.native="ModifyPhone">&nbsp&nbsp&nbsp&nbsp<span
                class="fa fa-caret-right"></span> 修改电话号码
              </router-link>
              <router-link tag="li" to="/Admin/ModifyAccount" @click.native="ModifyAccount">&nbsp&nbsp&nbsp&nbsp<span
                class="fa fa-caret-right"></span> 修改账号
              </router-link>
              <router-link tag="li" to="/Admin/ModifyAdmin" @click.native="ModifyAdmin">&nbsp&nbsp&nbsp&nbsp<span
                class="fa fa-caret-right"></span> 更换管理员
              </router-link>
            </ul>
          </li>

          <li v-on:click="NavSecond"><a class="nav-header collapsed" data-target=".legal-menu" data-toggle="collapse"
                                        href="#"><i
            class="fa fa-fw fa-legal"></i> 功能<i class="fa fa-collapse"></i></a></li>
          <li v-show="SecondShow">
            <ul class="legal-menu nav nav-list collapse in">
              <router-link tag="li" to="/Admin/" @click.native="Monitor">&nbsp&nbsp&nbsp&nbsp<span
                class="fa fa-caret-right"></span> 查看实时使用情况
              </router-link>
              <router-link tag="li" to="/Admin/ViewData" @click.native="ViewData ">&nbsp&nbsp&nbsp&nbsp<span
                class="fa fa-caret-right"></span> 查看统计数据
              </router-link>
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
        name: sessionStorage.getItem("name"),
        SecondShow: false,
        FirstShow: true,
        AdminActionShow: false,
        NavFirstTimes: 0,
        NavSecondTimes: 0,
        AdminActionShowTimes: 0,
      }
    },
    methods: {
      //点击显、隐二级导航
      NavSecond: function () {
        if (this.NavSecondTimes == 0) {
          this.SecondShow = true;
          this.NavSecondTimes = 1;
        } else {
          this.SecondShow = false;
          this.NavSecondTimes = 0;
        }
      },
      //点击显、隐二级导航
      NavFirst: function () {
        if (this.NavFirstTimes == 0) {
          this.FirstShow = false;
          this.NavFirstTimes = 1;
        } else {
          this.FirstShow = true;
          this.NavFirstTimes = 0;
        }
      },
      //点击显、隐二级导航
      AdminMenu: function () {
        if (this.AdminActionShowTimes == 0) {
          this.AdminActionShow = false;
          this.AdminActionShowTimes = 1;
        } else {
          this.AdminActionShow = true;
          this.AdminActionShowTimes = 0;
        }
      },
      //修改标题
      ModifyPassword: function () {
        this.title = "修改密码";
      },
      //修改标题
      Monitor: function () {
        this.title = "实时使用情况";
      },
      //修改标题
      ModifyPhone: function () {
        this.title = "修改电话号码"
      },
      //修改标题
      ModifyAccount: function () {
        this.title = "修改账号"
      },
      //修改标题
      ModifyAdmin: function () {
        this.title = "更换管理员"
      },
      //修改标题
      ViewData: function () {
        this.title = "统计数据"
      },
      //修改标题
      AdminLogout: function () {
        this.title = "账号注销"
      },
      //退出
      AdminSignOut: function () {
        sessionStorage.clear();
        // this.title = "统计数据"
      },
      //鼠标移开时隐藏
      hidden: function () {
        this.AdminActionShow = false;
        this.AdminActionShowTimes = 1;
      },
    }
  }
</script>

<style scoped>
  @import '../../static/lib/bootstrap/css/bootstrap.css';
  @import "../../static/lib/font-awesome/css/font-awesome.css";
  @import "../../static/stylesheets/theme.css";
  @import "../../static/stylesheets/premium.css";

  .navbar {
    background: #4d5b76;
    background: -webkit-gradient(linear, left bottom, left top, color-stop(0, #4d5b76), color-stop(1, #6f80a1));
    background: -ms-linear-gradient(bottom, #4d5b76, #6f80a1);
    /*background: -moz-linear-gradient(center bottom, #4d5b76 0%, #6f80a1 100%);*/
    background: -o-linear-gradient(bottom, #4d5b76, #6f80a1);
    filter: progid:dximagetransform.microsoft.gradient(startColorStr='#e3e3e3', EndColorStr='#ffffff');
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='#6f80a1',EndColorStr='#4d5b76')";
  }

  /*.navbar-brand{*/
  /*  padding: 15px 15px 15px 15px;*/
  /*}*/
  .adminMenu {
    background: whitesmoke;
    position: absolute;
    width: 165px;
    right: 0px;
    display: inline;
    list-style: none;
    padding-left: 0;
  }

  .adminMenu li {
    padding-left: 5px;
    padding-top: 5px;
  }

  .adminMenu li:hover {
    background: grey;
  }

  .adminMenu
  .nav-list li:hover {
    background: dodgerblue;
  }

</style>
