import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
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
      },
      {
        path: '/home/category',
        name: 'Category',
        component: () => import('../components/Goods/Category.vue'),
      },
      {
        path: '/home/goodslist',
        name: 'GoodsList',
        component: () => import('../components/Goods/GoodsList.vue'),
      },
      {
        path: '/home/addgoods',
        name: 'AddGoods',
        component: () => import('../components/Goods/AddGoods.vue'),
      },
      {
        path: '/home/orderlist',
        name: 'OrderList',
        component: () => import('../components/Order/OrderList.vue'),
      },
      {
        path: '/home/report',
        name: 'Report',
        component: () => import('../components/Report/Report.vue'),
      }
    ]   
  },
]

const router = new VueRouter({
  routes
})

export default router
