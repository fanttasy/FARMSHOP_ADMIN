import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: '/home/mainpage',
    children:[
      { path: '/home/mainpage',
        name: 'MainPage',
        component: () => import('../components/Home/MainPage.vue')
      },
      {
        path: '/home/usermanagement',
        name: 'UserManagement',
        component: () => import('../components/User/UserManagement.vue'),
      },
      {
        path: '/home/userrights',
        name: 'UserRights',
        component: () => import('../components/Power/Rights.vue'),
      },
      {
        path: '/home/userroles',
        name: 'UserRoles',
        component: () => import('../components/Power/Roles.vue'),
      }
    ]   
  },
]

const router = new VueRouter({
  routes
})

export default router
