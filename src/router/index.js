import Vue from 'vue'
import VueRouter from 'vue-router'
import {checkAdmin} from '../network/api/api'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/404',
    component: () => import('../views/404.vue'),
    meta: {token: false}
  },
  {
    path: '/',
    redirect: '/login',
    meta: {token: false}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {token: false}
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {token: true},
    redirect: '/home/mainpage',
    children:[
      { path: '/home/mainpage',
        name: 'MainPage',
        component: () => import('../components/Home/MainPage.vue'),
        meta: {token: true}
      },
      {
        path: '/home/usermanagement',
        name: 'UserManagement',
        component: () => import('../components/User/UserManagement.vue'),
        meta: {token: true}
      },
      {
        path: '/home/userrights',
        name: 'UserRights',
        component: () => import('../components/Power/Rights.vue'),
        meta: {token: true}
      },
      {
        path: '/home/userroles',
        name: 'UserRoles',
        component: () => import('../components/Power/Roles.vue'),
        meta: {token: true}
      },
      {
        path: '/home/category',
        name: 'Category',
        component: () => import('../components/Goods/Category.vue'),
        meta: {token: true}
      },
      {
        path: '/home/goodslist',
        name: 'GoodsList',
        component: () => import('../components/Goods/GoodsList.vue'),
        meta: {token: true}
      },
      {
        path: '/home/addgoods',
        name: 'AddGoods',
        component: () => import('../components/Goods/AddGoods.vue'),
        meta: {token: true}
      },
      {
        path: '/home/orderlist',
        name: 'OrderList',
        component: () => import('../components/Order/OrderList.vue'),
        meta: {token: true}
      },
      {
        path: '/home/report',
        name: 'Report',
        component: () => import('../components/Report/Report.vue'),
        meta: {token: true}
      }
    ]   
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if(to.meta.token) {
    const {data: res} = await checkAdmin();
    if(res.result === 'success') {
      next()
    } else {
      Vue.prototype.$message({message: res.msg, type: 'error', center: true})
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router
