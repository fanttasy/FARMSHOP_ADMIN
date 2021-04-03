<!-- Home -->
<template>
    <el-container class="home-container">
      <!-- Header -->
      <el-header>
        <div class="home-title">
          后台管理系统
        </div>
        <div class="home-icon">
          <el-avatar src="https://img0.baidu.com/it/u=2626330186,528047753&fm=26&fmt=auto&gp=0.jpg"></el-avatar>
          <el-dropdown @command = "logout">
            <span class="el-dropdown-link">
              admin<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command = "logout">退出</el-dropdown-item>
              <el-dropdown-item command = "test">测试</el-dropdown-item>
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
import SideMenu from '../components/public/SideMenu'
export default {
  data () {
    return {
      collapse: false
    };
  },

  components: {SideMenu},

  computed: {},

  mounted() {},

  methods: {
    //登出
    logout(command) {
      if(command === 'logout') {
        window.sessionStorage.setItem('activePath', null)
        this.$router.push('/login')
      } else {
        this.$message({message: 'Unknown Command', type: 'error', center: true})
      }
    },
    sidebarToggle() {
      this.collapse = !this.collapse;
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