// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,

})
