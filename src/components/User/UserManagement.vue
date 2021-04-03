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
          <el-button type="danger" @click="batchDel">批量删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入搜索内容"
            prefix-icon="el-icon-search"
            clearable
            >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addAdminAccount">添加用户</el-button>
        </el-form-item>
      </el-form>
      <el-table 
        :data = "adminTableData"
        ref="adminTable"
        tooltip-effect="dark"
        style="width: 100%"
        border
        v-loading = "isLoading"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column type="index" width="55" label="#" align="center">
        </el-table-column>
        <el-table-column prop = "signDate" label="注册日期" width="180" align="center">
        </el-table-column>
        <el-table-column prop = "adminAccount" label="账号" width="180" align="center">
        </el-table-column>
        <el-table-column prop = "adminEmail" label="邮箱" width="180" align="center">
        </el-table-column>
        <el-table-column prop = "adminPhone" label="手机号码" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editAdminAccount(scope.row.adminAccount)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableDataInfo.pageNum"
        :page-sizes="[10, 30, 50, 70]"
        :page-size="tableDataInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="adminTableData.length">
      </el-pagination>
    </el-card>
    <!-- Dialog -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="40%"
      top = "20vh"
      :close-on-click-modal = "false"
      @closed = "addDialogClosed"
      >
      <el-form
        :model="addAdminForm"
        :rules="adminRules"
        ref="addAdminForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="账号名称" prop="adminAccount">
          <el-input v-model="addAdminForm.adminAccount"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adminPassword">
          <el-input v-model="addAdminForm.adminPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="adminEmail">
          <el-input v-model="addAdminForm.adminEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="adminPhone">
          <el-input v-model="addAdminForm.adminPhone"></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmin()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="40%"
      top = "20vh"
      :close-on-click-modal = "false"
      @closed = "editDialogClosed"
      >
      <el-form
        :model="editForm"
        :rules="editRules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="账号名称">
          <el-input v-model="editForm.adminAccount" :disabled = "true"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="adminPassword">
          <el-input v-model="editForm.adminPassword" show-password></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="adminEmail">
          <el-input v-model="editForm.adminEmail"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="adminPhone">
          <el-input v-model="editForm.adminPhone"></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editAdmin()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if(regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的邮箱地址'))
    }
    var checkPhone = (rule, value, callback) => {
      const regEmail = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if(regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入正确的手机号码'))
    }
    var checkAccount = (rule, value, callback) => {
      this.adminTableData.forEach(target => {
        if(target.adminAccount === value) {
          callback(new Error('此账号名已存在'))
        }
      })
      return callback()
    }
    return {
      adminTableData: [],
      tableDataInfo: {
        pageNum: 1,
        pageSize: 2
      },
      isLoading: true,
      adminTableChecked: [],
      addDialogVisible: false,
      addAdminForm: {
        signDate: '',
        adminAccount: '',
        adminPassword: '',
        adminEmail: '',
        adminPhone: ''
      },
      adminRules: {
        adminAccount: [
          {required: true, message: '请输入账号名称', trigger: 'blur'},
          { validator: checkAccount, trigger: 'blur' },
          {min: 5, max: 20, message: '账号长度为 5 到 20 个字符', trigger: 'blur'}
        ],
        adminPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 20, message: '密码长度为 5 到 20 个字符', trigger: 'blur'}
        ],
        adminEmail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          { validator: checkEmail, trigger: 'blur' }
        ],
        adminPhone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          { validator: checkPhone, trigger: 'blur' }
        ],
      },
      editDialogVisible: false,
      editForm: {},
      editRules: {
        adminPassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 5, max: 20, message: '密码长度为 5 到 20 个字符', trigger: 'blur'}
        ],
        adminEmail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          { validator: checkEmail, trigger: 'blur' }
        ],
        adminPhone: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          { validator: checkPhone, trigger: 'blur' }
        ],
      }
    };
  },

  components: {},
  
  created() {
    setTimeout(() => {
      this.adminTableData = [
      {
          signDate: '2020-05-03',
          adminAccount: 'admin1',
          adminPassword: '123456',
          adminEmail: '470618507@qq.com',
          adminPhone: '15922655662'
        }, {
          signDate: '2020-05-02',
          adminAccount: 'admin2',
          adminPassword: '123456',
          adminEmail: '470618507@qq.com',
          adminPhone: '15922655662'
        }, {
          signDate: '2020-05-04',
          adminAccount: 'admin3',
          adminPassword: '123456',
          adminEmail: '470618507@qq.com',
          adminPhone: '15922655662'
        }, {
          signDate: '2020-05-01',
          adminAccount: 'admin4',
          adminPassword: '123456',
          adminEmail: '470618507@qq.com',
          adminPhone: '15922655662'
        }, {
          signDate: '2020-05-08',
          adminAccount: 'admin5',
          adminPassword: '123456',
          adminEmail: '470618507@qq.com',
          adminPhone: '15922655662'
        }, {
          signDate: '2020-05-06',
          adminAccount: 'admin6',
          adminPassword: '123456',
          adminEmail: '470618507@qq.com',
          adminPhone: '15922655662'
        }, {
          signDate: '2020-05-07',
          adminAccount: 'admin7',
          adminPassword: '123456',
          adminEmail: '470618507@qq.com',
          adminPhone: '15922655662'
        }
    ]
      this.isLoading = false
    }, 500);
  },

  computed: {},

  mounted() {},

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.adminTableData.splice(index, 1);
    },
    handleSizeChange(newSize) {
      console.log(newSize);
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
    handleSelectionChange(val) {
      this.adminTableChecked = val
    },
    batchDel() {
      this.adminTableChecked.forEach(target => {
        for(let i = 0; i < this.adminTableData.length; i++) {
          if(this.adminTableData[i].adminAccount === target.adminAccount) {
            this.adminTableData.splice(i, 1)
          }
        }
      });
    },
    addAdminAccount() {
      this.addDialogVisible = true
    },
    addDialogClosed() {
      this.$refs.addAdminForm.resetFields()
    },
    addAdmin() {
      this.$refs.addAdminForm.validate(valid => {
        if(valid) {
          this.addAdminForm.signDate = '2020-05-20'
          let newAddAdminForm = JSON.parse(JSON.stringify(this.addAdminForm))
          this.adminTableData.push(newAddAdminForm)
          this.addDialogVisible = false
          this.$message({message: '添加成功', type: 'success', center: true})
          console.log(this.adminTableData);
        } else {
          return false;
        }
      })
    },
    editAdminAccount(adminAccount) {
      this.editForm = JSON.parse(JSON.stringify(this.adminTableData.filter(elment => elment.adminAccount === adminAccount)[0]))
      this.editDialogVisible = true
    },
    editDialogClosed() {
      this.$refs.editForm.resetFields()
    },
    editAdmin() {
      this.$refs.editForm.validate(valid => {
        if(valid) {
          let editForm = this.adminTableData.filter(elment => elment.adminAccount === this.editForm.adminAccount)[0]
          for(let key in this.editForm) {
            editForm[key] = this.editForm[key]
          }
          this.editDialogVisible = false
          this.$message({message: '修改成功', type: 'success', center: true})
        } else {
          return false
        }
      })
    }
  }
}

</script>
<style lang='css' scoped>
.el-pagination{
  text-align: center;
}
</style>