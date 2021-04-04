<!-- Login -->
<template>
    <el-row type="flex" class="login_container">
      <el-col :md = "8" :sm = "12" class="login_content">
        <div class="login_form">
          <h1>LOGIN IN</h1>
          <p>Welcome aboard, dear administrator</p>
          <el-form ref="loginForm" :model = "loginForm" :rules = "rulesLoginForm" label-width = "0px" status-icon>
            <el-form-item prop = "username">
              <el-input v-model="loginForm.username" prefix-icon = "el-icon-user-solid" clearable></el-input>
            </el-form-item>
            <el-form-item prop = "password">
              <el-input v-model="loginForm.password" prefix-icon = "el-icon-message-solid" clearable show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" round @click="submitLoginForm('loginForm')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :md = "16" :sm = "12" class="login_image hidden-xs-only"></el-col>
    </el-row>
</template>

<script>
import {getLogin} from '../network/api/api'
import md5 from 'js-md5'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rulesLoginForm: {
        username: [
          { required: true, message: '请输入管理员账号', trigger: ['blur', 'change'] },
        ],
        password: [
          {required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ]
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    submitLoginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          window.sessionStorage.setItem('activePath', '/home/mainpage')
          this.$message({message: '登录成功', type: 'success', center: true})
          this.$router.push('/home')
        } else {
          this.$message({message: '登录失败', type: 'error', center: true})
          return false;
        }
      })
    }
  }
}

</script>
<style lang='css' scoped>
  .login_container {
    height: 100%;
  }
  .login_content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }
  .login_form {
    width: 90%;
    height: 300px;
  }
  .login_form h1 {
    font: 36px bold;
    text-align: center;
    margin: 10px 0px;
  }
  .login_form p {
    text-align: center;
    color: #95aac9;
    margin: 0px 0px 20px 0px;
  }
  .el-button {
    width: 100%;
  }
  .login_image {
    background: url('../assets/img/login_img.jpg') no-repeat center center;
    background-size: cover;
    min-height: 300px;
  }
  @media only screen and (max-width: 768px) {
    .login_content {
    background: url('../assets/img/login_img.jpg') no-repeat center center;
    background-size: cover;
    }
    .login_form h1 {
      color: white;
    }
    .login_form p {
      color: white;
    }
  }
</style>