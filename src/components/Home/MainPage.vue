<!-- MainPage -->
<template>
  <div v-loading = "loading">
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <base-info :adminInfo = "adminInfo"/>
      <el-col :span="16">
        <!-- 商品信息 -->
        <el-row :gutter="20">
          <item-info backgroundColor = "#2d8cf0" icon = "el-icon-user" title="用户数量" :nums = "userTotal" />
          <item-info backgroundColor = "#f25e43" icon = "el-icon-goods" title="商品数量" :nums = "goodsTotal" />
          <item-info backgroundColor = "#67c23a" icon = "el-icon-sell" title="售出数量" :nums = "saleGoodsTotal" />
        </el-row>
        <!-- 待办事项 -->
        <todo />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <data-chart />
    </el-row>
  </div>
</template>

<script>
import {getAdminInfo, getUserTotal, getGoodsTotal, getSaleGoodsTotal} from '../../network/api/api'
import BaseInfo from './BaseInfo.vue';
import DataChart from './DataChart.vue';
import ItemInfo from './ItemInfo.vue';
import Todo from './Todo.vue';
export default {
  data () {
    return {
      loading: true,
      adminInfo: {},
      userTotal: '0',
      goodsTotal: '0',
      saleGoodsTotal: '0'
    };
  },

  components: {ItemInfo, Todo, BaseInfo, DataChart},

  created() {
    this.init()
  },
  computed: {},

  mounted() {},

  methods: {
    async getAdmin() {
      const {data: res} = await getAdminInfo();
      if(res.result === 'success') {
        this.adminInfo = res.data[0]
      }
    },
    async getUserNums() {
      const {data: res} = await getUserTotal();
      this.userTotal = res.data.userTotal
    },
    async getGoodsNums() {
      const {data: res} = await getGoodsTotal();
      this.goodsTotal = res.data.goodsTotal
    },
    async getSaleGoodsNums() {
      const {data: res} = await getSaleGoodsTotal();
      this.saleGoodsTotal = res.data.saleTotal
    },
    async init() {
      await this.getAdmin()
      await this.getUserNums()
      await this.getGoodsNums()
      await this.getSaleGoodsNums()
      this.loading = false
    }
  }
}

</script>
<style lang='css' scoped>

</style>