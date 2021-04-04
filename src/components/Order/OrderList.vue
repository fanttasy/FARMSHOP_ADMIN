<!-- OrderList -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="hover" v-loading = "loading">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border stripe>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="订单编号" prop="order_number" align="center"></el-table-column>
        <el-table-column label="订单价格" prop="order_price" align="center" width="100px"></el-table-column>
        <el-table-column label="是否付款" prop="order_pay" align="center" width="100px">
          <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.order_pady === '1'">已付款</el-tag>
              <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send" align="center" width="100px"></el-table-column>
        <el-table-column label="下单时间" prop="create_time" align="center">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteOrder(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      orderList: []
    };
  },

  created() {
    setTimeout(() => {
      this.loading = false,
      this.orderList = {"data":{"total":27,"pagenum":"1","goods":[{"order_id":67,"user_id":1,"order_number":"itcast-g7kmck71vjaujfgoi","order_price":20,"order_pay":"0","is_send":"是","trade_no":"","order_fapiao_title":"个人","order_fapiao_company":"","order_fapiao_content":"","consignee_addr":"","pay_status":"0","create_time":1617519088,"update_time":1617519088},{"order_id":68,"user_id":1,"order_number":"itcast-g7kmck725jaujgdts","order_price":20,"order_pay":"0","is_send":"是","trade_no":"","order_fapiao_title":"个人","order_fapiao_company":"","order_fapiao_content":"","consignee_addr":"","pay_status":"0","create_time":1617519086,"update_time":1617519086},{"order_id":66,"user_id":1,"order_number":"itcast-g7kmck71jjaujer6a","order_price":20,"order_pay":"0","is_send":"否","trade_no":"","order_fapiao_title":"个人","order_fapiao_company":"","order_fapiao_content":"","consignee_addr":"","pay_status":"0","create_time":1512533527,"update_time":1512533527},{"order_id":65,"user_id":1,"order_number":"itcast-g7kmck6rwjauin92y","order_price":20,"order_pay":"0","is_send":"否","trade_no":"","order_fapiao_title":"个人","order_fapiao_company":"","order_fapiao_content":"","consignee_addr":"","pay_status":"0","create_time":1512532244,"update_time":1512532244},{"order_id":64,"user_id":1,"order_number":"itcast-g7kmck6rmjauimx8v","order_price":20,"order_pay":"0","is_send":"否","trade_no":"","order_fapiao_title":"个人","order_fapiao_company":"","order_fapiao_content":"","consignee_addr":"","pay_status":"0","create_time":1512532229,"update_time":1512532229}]},"meta":{"msg":"获取成功","status":200}}.data.goods
    }, 500);
  },
  filters: {
    dateFormat: function(val) {
      const dt = new Date(val)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    deleteOrder(row) {
      this.$confirm('确认删除此订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.orderList = this.orderList.filter(item => {
          return item.order_number !== row.order_number
        })
        this.reloadPage()
        this.$message({type: 'success',message: '删除成功!'});
      }).catch(() => {
        this.$message({type: 'info',message: '已取消删除'});          
      });
    },
    reloadPage() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500);
    }
  }
}

</script>
<style lang='css' scoped>
</style>