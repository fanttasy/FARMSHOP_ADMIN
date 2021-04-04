<!-- sideMenu -->
<template>
  <el-menu
    :default-active="this.$store.state.activePath"
    class="el-menu-vertical-demo"
    background-color="#324157"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened
    :collapse = "collapse"
    :collapse-transition = "false"
    router>
    <!-- 一级菜单 -->
    <el-submenu :index="item.id + ''" v-for="item in menuList" :key = "item.id">
      <!-- 一级菜单模板 -->
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.authName}}</span>
      </template>
      <!-- 二级菜单 -->
      <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveMenuStatus(subItem.path)">
        <template slot="title">
          <i :class="subItem.icon"></i>
          <span>{{subItem.authName}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          "id": 101,
          "authName": '系统首页',
          "path": 'home',
          "icon": 'el-icon-s-home',
          "children": [
            {
              "id": 111,
              "authName": '个人信息',
              "path": '/home/mainpage',
              "icon": 'el-icon-s-home',
              "order": 1
            }
          ],
          "order": 1
        },
        {
          "id": 102,
          "authName": "用户管理",
          "path": "user",
          "icon": 'el-icon-user-solid',
          "children": [
              {
                  "id": 112,
                  "authName": "用户列表",
                  "path": "/home/usermanagement",
                  "icon": 'el-icon-user-solid',
                  "children": [],
                  "order": 1
              }
          ],
          "order": 2
        },
        {
          "id": 103,
          "authName": "权限管理",
          "path": "rights",
          "icon": 'el-icon-s-opportunity',
          "children": [
              {
                  "id": 113,
                  "authName": "角色列表",
                  "path": "/home/userroles",
                  "icon": 'el-icon-s-opportunity',
                  "children": [],
                  "order": 1
              },
              {
                  "id": 123,
                  "authName": "权限列表",
                  "path": "/home/userrights",
                  "icon": 'el-icon-s-opportunity',
                  "children": [],
                  "order": 2
              }
          ],
          "order": 3
        },
        {
          "id": 104,
          "authName": "商品管理",
          "path": "goods",
          "icon": 'el-icon-s-goods',
          "children": [
              {
                  "id": 114,
                  "authName": "商品列表",
                  "path": "/home/goodslist",
                  "icon": 'el-icon-s-goods',
                  "children": [],
                  "order": 1
              },
              {
                  "id": 124,
                  "authName": "添加商品",
                  "path": "/home/addgoods",
                  "icon": 'el-icon-s-goods',
                  "children": [],
                  "order": 2
              },
              {
                  "id": 125,
                  "authName": "商品分类",
                  "path": "/home/category",
                  "icon": 'el-icon-s-goods',
                  "children": [],
                  "order": 3
              }
          ],
          "order": 4
        },
        {
          "id": 105,
          "authName": "订单管理",
          "path": "orders",
          "icon": 'el-icon-s-order',
          "children": [
              {
                  "id": 115,
                  "authName": "订单列表",
                  "path": "/home/orderlist",
                  "icon": 'el-icon-s-order',
                  "children": [],
                  "order": 1
              }
          ],
          "order": 5
        },
        {
          "id": 106,
          "authName": "数据统计",
          "path": "reports",
          "icon": 'el-icon-s-data',
          "children": [
              {
                  "id": 116,
                  "authName": "数据报表",
                  "path": "/home/report",
                  "icon": 'el-icon-s-data',
                  "children": [],
                  "order": 1
              }
          ],
          "order": 6
        }
      ],
    };
  },
  created() {
    this.$store.commit('saveMenuStatusVuex', window.sessionStorage.getItem('activePath'))
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    saveMenuStatus(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.$store.commit('saveMenuStatusVuex', activePath)
    }
  },
  props: {
    collapse: Boolean
  }
}

</script>
<style lang='css' scoped>
  .el-menu {
    border-right: none;
  }
</style>