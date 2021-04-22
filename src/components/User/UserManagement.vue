<!-- UserManagement -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item>
          <el-input placeholder="请输入搜索内容" prefix-icon="el-icon-search" clearable></el-input>
        </el-form-item>
        <el-form-item><el-button type="primary">搜索</el-button></el-form-item>
      </el-form>
      <el-table 
        :data = "userList"
        ref="userList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        v-loading = "loading"
        >
        <el-table-column type="index" width="55" label="#" align="center"></el-table-column>
        <el-table-column prop = "username" label="账号名称" width="180" align="center"></el-table-column>
        <el-table-column prop = "register_date" label="注册时间" width="180" align="center"></el-table-column>
        <el-table-column prop = "address" label="地址" width="180" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop = "phone" label="手机号码" width="180" align="center"></el-table-column>
        <el-table-column label="账号状态" width="180" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === '1'">正常</el-tag>
            <el-tag type="danger" v-else-if="scope.row.status === '0'">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" v-if="scope.row.status === '1'" @click="lockAccount(scope.row)">禁用</el-button>
            <el-button size="mini" type="success" v-else-if="scope.row.status === '0'" @click="unlockAccount(scope.row)">解禁</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
        background
        layout="prev, pager, next"
        :total = "userTotal"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {getUserList, lockAccountUser, unlockAccountUser} from '../../network/api/api'
import _ from 'lodash'
export default {
  data () {
    return {
      userList: [],
      userTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      loading: true,
      adminTableChecked: [],
    };
  },

  components: {},
  
  created() {
    this.getList()
  },

  computed: {},

  mounted() {
    this.unlockAccount= _.debounce(this.unlockAccount, 1000, {
      leading: true,
      trailing: false
    })
    this.lockAccount= _.debounce(this.lockAccount, 1000, {
      leading: true,
      trailing: false
    })
  },

  methods: {
    async getList() {
      const params = 'ajax=' + encodeURIComponent(JSON.stringify(this.queryParams));
      const {data: res} = await getUserList(params);
      if(res.result === 'success') {
        this.userList = res.data
        this.userTotal = res.total
        this.loading = false
      } else {
        this.userList = []
        this.userTotal = 0
        this.loading = false
      }
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNum = newPage;
      this.getList();
    },
    async lockAccount(row) {
      const params = 'ajax=' + encodeURIComponent(JSON.stringify(row));
      const {data: res} = await lockAccountUser(params)
      if(res.result === 'success') {
        this.getList(); 
        this.$message({message: res.msg, type: 'success', center: true})
      } else if(res.result === 'failed') {
        this.$message({message: res.msg, type: 'error', center: true})
      } else {
        this.$message({message: '未知错误，请点击重试！', type: 'error', center: true})
      }
    },
    async unlockAccount(row) {
      const params = 'ajax=' + encodeURIComponent(JSON.stringify(row));
      const {data: res} = await unlockAccountUser(params)
      if(res.result === 'success') {
        this.getList(); 
        this.$message({message: res.msg, type: 'success', center: true})
      } else if(res.result === 'failed') {
        this.$message({message: res.msg, type: 'error', center: true})
      } else {
        this.$message({message: '未知错误，请点击重试！', type: 'error', center: true})
      }
    }
  }
}

</script>
<style lang='css' scoped>
  .el-pagination{
    text-align: center;
  }
</style>