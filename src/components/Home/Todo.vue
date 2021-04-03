<!-- todo -->
<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>TODO</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="addTodoDialog">添加</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="todoList"
      style="width: 100%"
      :show-header="false"
      size="small"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="info">
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            width = "100"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="TODO"
      :visible.sync="todoDialogVisible"
      width="40%"
      :close-on-click-modal = "false"
      @closed = "addDialogClosed"
      >
      <el-form ref="addTodoForm" :model="addTodoForm" :rules="addTodoRules" label-width="0px" class="demo-ruleForm">
          <el-form-item prop="info">
            <el-input type="textarea" v-model="addTodoForm.info"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="todoDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTodo">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      todoDialogVisible: false,
      todoTableChecked: [],
      todoList: [],
      addTodoForm: {
        info: ''
      },
      addTodoRules: {
        info: [
          {required: true, message: '请输入待办事项', trigger: ['blur', 'change']}
        ]
      }
    };
  },

  components: {},

  computed: {},

  mounted() {},

  created() {
    setTimeout(() => {
      this.todoList = [
        {info: '今天要修复100个bug'},
        {info: '今天要修复100个bug'},
        {info: '今天要修复100个bug'},
        {info: '今天要修复100个bug'},
        {info: '今天要修复100个bug'},
        {info: '今天要修复100个bug'},
        {info: '今天要修复1000个bug'},
      ]
      this.loading = false
    }, 500);
  },

  methods: {
    addTodoDialog() {
      this.todoDialogVisible = true
    },
    addDialogClosed() {
      this.$refs.addTodoForm.resetFields()
    },
    addTodo() {
      this.$refs.addTodoForm.validate(valid => {
        if(valid) {
          let newTodoForm = JSON.parse(JSON.stringify(this.addTodoForm))
          this.todoList.splice(0, 0, newTodoForm)
          this.todoDialogVisible = false
          this.$message({message: '添加成功', type: 'success', center: true})
        } else {
          return false;
        }
      })
    },
    handleDelete(index, row) {
      this.todoList.splice(index, 1);
    },
    handleSelectionChange(val) {
      this.todoTableChecked = val
    },
  }
}

</script>
<style lang='css' scoped>
  .el-card {
    margin: 0px 0px 20px 0px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>