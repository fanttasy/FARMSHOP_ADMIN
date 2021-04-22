<!-- Home -->
<template>
    <el-container class="home-container">
      <!-- Header -->
      <el-header>
        <div class="home-title">
          后台管理系统
        </div>
        <div class="home-icon">
          <el-avatar :src="userIcon"></el-avatar>
          <el-dropdown @command = "logout">
            <span class="el-dropdown-link">
              {{adminInfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command = "logout">退出</el-dropdown-item>
              <el-dropdown-item command = "toGithub">仓库</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- Content -->
      <el-container>
        <!-- sideMenu -->
        <el-aside :width="collapse ? '64px' : '240px'">
          <div class="sideMenuToggle" @click="sidebarToggle">
            <i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>
          <side-menu :collapse = "collapse" />
        </el-aside>
        <!-- rightContent -->
          <el-main :style="collapse ? 'left: 60px;' : 'left: 240px;'">
            <!-- 路由占位 -->
            <router-view></router-view>
          </el-main>
      </el-container>
    </el-container>
</template>

<script>
import {getAdminInfo} from '../network/api/api'
import SideMenu from '../components/public/SideMenu'
export default {
  data () {
    return {
      collapse: false,
      userIcon: require('../assets/img/mayisa.png'),
      adminInfo: {}
    };
  },

  components: {SideMenu},

  created() {
    this.getAdmin() 
  },

  computed: {},

  mounted() {},

  methods: {
    //登出
    logout(command) {
      if(command === 'logout') {
        window.sessionStorage.setItem('activePath', null)
        window.sessionStorage.setItem('token', null)
        this.$router.push('/login')
      } else if(command === 'toGithub') {
        window.open("https://github.com/fanttasy/FARMSHOP_ADMIN")
      } else {
        this.$message({message: 'Unknown Command', type: 'error', center: true})
      }
    },
    sidebarToggle() {
      this.collapse = !this.collapse;
    },
    async getAdmin() {
      const {data: res} = await getAdminInfo();
      if(res.result === 'success') {
        this.adminInfo = res.data[0]
      }
    }
  }
}

</script>
<style lang='css' scoped>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #242f42;
    color: #ffffff;
    padding: 0 20px;
    display: flex;
    position: relative;
  }
  .el-header .home-title {
    flex: auto;
    display: flex;
    align-items: center;
    font-size: 22px;
    user-select: none;
  }
  .el-header .home-icon {
    flex: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .el-avatar {
    margin: 0 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #324157;
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
  }
  .sideMenuToggle {
    background-color: #4a5064;
    color: white;
    font-size: 22px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }
  
  .el-main {
    background-color: #f0f0f0;
    position: absolute;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
  }
</style>