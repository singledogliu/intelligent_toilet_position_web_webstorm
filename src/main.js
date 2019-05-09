// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import 'jquery'
// import '../static/js/GoEasy'
import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// import { Button, Table,Row } from 'iview';

Vue.use(VueResource)
// Vue.use(iView)
// Vue.component('Button', Button);
// Vue.component('Table', Table);
// Vue.component('Row',Row)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
})
