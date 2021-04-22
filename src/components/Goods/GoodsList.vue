<!-- Goods -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="hover" v-loading = "loading">
      <el-row>
        <el-col>
          <el-button type="primary"  @click="linkToAddGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="商品编号" prop="goodsSn" align="center" width="100"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName" align="center" width="180" show-overflow-tooltip=""></el-table-column>
        <el-table-column label="商品价格（元）" prop="goodsPrice" align="center" width="120"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" align="center" width="120">
          <template slot-scope="scope">
            {{scope.row.saleTime | formatDate}}
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" align="center" width="120">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.isRecom" 
              :active-value="'1'" 
              :inactive-value="'0'"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeGoodsRecom(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="是否上架" align="center" width="120">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.isSale" 
              :active-value="'1'" 
              :inactive-value="'0'"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeGoodsSale(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="240px">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoodsItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total = "goodsTotal"
        @current-change="handleCurrentChange"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import {getAllGoods, updateGoodsRecom, updateGoodsSale, deleteGoods} from '../../network/api/api'
export default {
  data () {
    return {
      loading: true,
      goodsList: [],
      goodsTotal: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 5,
      }
    };
  },

  created() {
    this.getGoods()
  },
  components: {},

  computed: {},

  mounted() {},


  methods: {
    linkToAddGoods() {
      window.sessionStorage.setItem('activePath', '/home/addgoods')
      this.$store.commit('saveMenuStatusVuex', window.sessionStorage.getItem('activePath'))
      this.$router.replace('/home/addgoods')
    },
    async getGoods() {
      const params = 'ajax='+encodeURIComponent(JSON.stringify(this.queryParams));
      const {data} = await getAllGoods(params);
      if(data.result === 'success') {
        this.loading = false;
        this.goodsList = data.data;
        this.goodsTotal = data.total;
      } else {
        this.goodsList = []
        this.goodsTotal = 0
        this.loading = false;
      }
    },
    handleCurrentChange(newPage) {
      this.queryParams.pageNum = newPage;
      this.getGoods();
    },
    async changeGoodsRecom(row) {
      const params = 'ajax='+encodeURIComponent(JSON.stringify(row));
      const {data: res} = await updateGoodsRecom(params);
      if(res.result === 'success') {
        this.$message({type: 'success',message: res.msg, center: true});
      } else {
        this.$message({type: 'error',message: res.msg, center: true});
      }
    },
    async changeGoodsSale(row) {
      const params = 'ajax='+encodeURIComponent(JSON.stringify(row));
      const {data: res} = await updateGoodsSale(params);
      if(res.result === 'success') {
        this.$message({type: 'success',message: res.msg, center: true});
      } else {
        this.$message({type: 'error',message: res.msg, center: true});
      }
    },
    async deleteGoodsItem(row) {
      const confirmResult = await this.$confirm('确认删除此商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(error => error);

      if(confirmResult === 'confirm') {
        const params = 'ajax='+encodeURIComponent(JSON.stringify(row));
        const {data: res} = await deleteGoods(params)
        if(res.result === 'success') {
          await this.getGoods();
          this.$message({message: res.msg, type: 'success', center: true});
        } else {
          this.$message({message: res.msg, type: 'error', center: true});
        }
      } else {
        this.$message({message: '已取消删除', type: 'info', center: true});
      }

    },
  }
}

</script>
<style lang='css' scoped>
  .el-pagination {
    display: flex;
    justify-content: center;
  }
</style>