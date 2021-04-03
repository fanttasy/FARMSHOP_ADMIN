<!-- MainPage -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <base-info />
      <el-col :span="16">
        <!-- 商品信息 -->
        <el-row :gutter="20">
          <item-info backgroundColor = "#2d8cf0" icon = "el-icon-user" title="用户数量" nums = "127" />
          <item-info backgroundColor = "#f25e43" icon = "el-icon-goods" title="商品数量" nums = "27" />
          <item-info backgroundColor = "#67c23a" icon = "el-icon-sell" title="售出数量" nums = "12" />
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
import BaseInfo from './BaseInfo.vue';
import DataChart from './DataChart.vue';
import ItemInfo from './ItemInfo.vue';
import Todo from './Todo.vue';
export default {
  data () {
    return {
    };
  },

  components: {ItemInfo, Todo, BaseInfo, DataChart},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='css' scoped>

</style>