import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import AdminLogin from '../components/AdminLogin'
import AdminRegister from '../components/AdminRegister'
import Admin from '../components/Admin'
import Monitor from '../components/Monitor'
import ModifyPassword from '../components/ModifyPassword'


Vue.use(Router)
Vue.use(VueResource)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/AdminLogin'
    },
    {
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/AdminRegister',
      name: 'AdminRegister',
      component: AdminRegister
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/',
          redirect: '/Admin/Monitor'
        },
        {
          path: '/Admin/Monitor',
          name: 'Monitor',
          component: Monitor,
        },
        {
          path: '/Admin/ModifyPassword',
          name: 'ModifyPassword',
          component: ModifyPassword,
        },

      ]
    },
  ],
  mode: "history",
});

// router.beforeEach((to, from, next) => {
//   const nextRoute = ['Monitor','ModifyPassword'];
//   next();
//
// });

export default router;

