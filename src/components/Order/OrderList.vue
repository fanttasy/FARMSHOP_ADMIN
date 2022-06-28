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
      <el-table ref="orderListTable" :data="orderList" tooltip-effect="dark" border stripe :cell-style="rowStyle">
        <el-table-column type="expand">
          <template slot-scope="props">
            <order-list-goods-info :orderGoodsItem = "props.row.orderItem" />
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="订单编号" prop="orderSn" align="center" width="120"></el-table-column>
        <el-table-column label="下单时间" prop="createDate" align="center" width="240"></el-table-column>
        <el-table-column label="下单用户" prop="username" align="center" width="120"></el-table-column>
        <el-table-column label="收货地址" prop="address" align="center" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column label="订单总价" align="center" width="120">
          <template slot-scope="scope">
            {{`${scope.row.totalPrice}元`}}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="120"
          :filters="[{ text: '待发货', value: '0' }, { text: '已发货', value: '1' }, {text: '已完成', value: '2'}]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status === '0'">待发货</el-tag>
            <el-tag v-else-if="scope.row.status === '1'">已发货</el-tag>
            <el-tooltip class="item" effect="dark" :content="`完成日期：${scope.row.completeDate}`" placement="top" v-else>
              <el-tag type="success">已完成</el-tag>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-plus" v-if="scope.row.status === '0'" @click="orderDistribution(scope.row)">确认发货</el-button>
            <el-button type="info" size="mini" icon="el-icon-more-outline" v-else-if="scope.row.status === '1'" @click="orderComplete(scope.row)">确认完成</el-button>
            <el-button type="success" size="mini" icon="el-icon-check" v-else-if="scope.row.status === '2'" disabled>订单完成</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total = "orderTotal"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {getOrderList, updateOrderDistribution, updateOrderComplete} from '../../network/api/api.js'
import OrderListGoodsInfo from '../Order/OrderListGoodsInfo'
export default {
  data () {
    return {
      loading: true,
      orderList: [],
      orderTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },

  created() {
    this.getOrder()
  },

  components: {OrderListGoodsInfo},

  computed: {},

  mounted() {},

  methods: {
    filterTag(value, row) {
      return row.status === value;
    },
    rowStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex==6){
        return 'color: #ff6700';
      }
    },
    async getOrder() {
      const params = 'ajax='+encodeURIComponent(JSON.stringify(this.queryParams))
      const {data: res} = await getOrderList(params)
      if(res.result === 'success') {
        this.orderList = res.data
        this.orderTotal = res.total
        this.loading = false
      } else {
        this.orderList = []
        this.orderTotal = 0
        this.loading = false
      }
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNum = newPage;
      this.getOrder();
    },
    async orderDistribution(row) {
      const confirmResult = await this.$confirm('确定商品已经发货？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error => error);
      if(confirmResult === 'confirm') {
        const params = 'ajax='+encodeURIComponent(JSON.stringify(row));
        const {data: res} = await updateOrderDistribution(params);
        if(res.result === 'success') {
          this.getOrder()
          this.$message({message: res.msg, type: 'success', center: true});
        } else {
          this.$message({message: res.msg, type: 'error', center: true});
        }
        
      } else {
        this.$message({message: '已取消', type: 'info', center: true});
      }
    },
    async orderComplete(row) {
      const confirmResult = await this.$confirm('确定商品已经配送完成？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error => error);
      if(confirmResult === 'confirm') {
        const params = 'ajax='+encodeURIComponent(JSON.stringify(row));
        const {data: res} = await updateOrderComplete(params);
        if(res.result === 'success') {
          this.getOrder()
          this.$message({message: res.msg, type: 'success', center: true});
        } else {
          this.$message({message: res.msg, type: 'error', center: true});
        }
        
      } else {
        this.$message({message: '已取消', type: 'info', center: true});
      }
    }
  }
}
</script>
<style lang='css' scoped>
  .el-pagination {
    display: flex;
    justify-content: center;
  }
</style>