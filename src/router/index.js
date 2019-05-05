import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import AdminLogin from '../components/AdminLogin'
import AdminRegister from '../components/AdminRegister'
import Admin from '../components/Admin'
import Monitor from '../components/Monitor'
import ModifyPassword from '../components/ModifyPassword'
import ModifyPhone from '../components/ModifyPhone'
import ModifyAccount from '../components/ModifyAccount'
import ModifyAdmin from '../components/ModifyAdmin'
import ViewData from '../components/ViewData'
import AdminLogout from '../components/AdminLogout'


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
        {
          path: '/Admin/ModifyPhone',
          name: 'ModifyPhone',
          component: ModifyPhone,
        },
        {
          path: '/Admin/ModifyAccount',
          name: 'ModifyAccount',
          component: ModifyAccount,
        },
        {
          path: '/Admin/ModifyAdmin',
          name: 'ModifyAdmin',
          component: ModifyAdmin,
        },
        {
          path: '/Admin/ViewData',
          name: 'ViewData',
          component: ViewData,
        },
        {
          path: '/Admin/AdminLogout',
          name: 'AdminLogout',
          component: AdminLogout,
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

