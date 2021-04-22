<!-- baseInfo -->
<template>
  <el-col :span="8">
    <!-- 基本信息 -->
    <el-card class="box-card" shadow="hover">
      <div class="admin-info">
        <div class="admin-avator">
          <el-avatar :size="120" fit="fill"  :src="userIcon"></el-avatar>
        </div>
        <div class="admin-name">
          <div class="admin-name-one">{{adminInfo.username}}</div>
          <p class="admin-name-two">超级管理员</p>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="admin-date">注册时间：{{adminInfo.createTime | formatDate('-')}}</div>
      <div class="admin-address">登录地点：重庆</div>
    </el-card>
    <!-- 语言详情 -->
    <el-card class="box-card" shadow="hover">
      <div slot="header">
        <span>语言情况</span>
      </div>
      Vue
      <el-progress :percentage="72" color="skyblue"></el-progress>
      JavaScript
      <el-progress :percentage="22" color="#f1e05a"></el-progress>
      CSS
      <el-progress :percentage="12" color="#f56c6c"></el-progress>
      HTML
      <el-progress :percentage="7" color="#42b983"></el-progress>
      PHP
      <el-progress :percentage="64" color="#ffc0cb"></el-progress>
    </el-card>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
      userIcon: require('../../assets/img/mayisa.png')
    };
  },
  props: {
    adminInfo: Object
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='css' scoped>
.el-card {
  margin: 0px 0px 20px 0px;
}
.admin-info {
  display: flex;
  align-items: center;
}
.admin-name {
  padding: 0px 0px 0px 50px;
}
.admin-name-one {
  font-size: 30px;
  color: #222;
}
.admin-name-two {
  font-size: 14px;
  color: #999;
  padding: 5px 0px;
}
.admin-date {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.admin-address {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
</style>