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
          <el-button type="primary" @click="linkToAddGoods">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name" align="center"></el-table-column>
        <el-table-column label="商品价格（元）" prop="goods_price" align="center" width="70px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" align="center" width="70px"></el-table-column>
        <el-table-column label="创建时间" prop="add_time" align="center" width="240px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="240px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scope.row)">删除</el-button>
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
      goodsList: []
    };
  },

  created() {
    setTimeout(() => {
      this.goodsList = {"data":{"total":803,"pagenum":"1","goods":[{"goods_id":1185,"cat_id":null,"goods_name":"李宁新疆棉花夹克的撒旦阿达萨达萨达","goods_price":220,"goods_number":2200,"goods_weight":22,"goods_state":null,"add_time":1617499366,"upd_time":1617499366,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null},{"goods_id":1184,"cat_id":null,"goods_name":"李宁新疆棉花夹克的撒旦","goods_price":220,"goods_number":2200,"goods_weight":22,"goods_state":null,"add_time":1617499349,"upd_time":1617499349,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null},{"goods_id":1183,"cat_id":null,"goods_name":"李宁新疆棉花夹克1111231231231231231231","goods_price":220,"goods_number":2200,"goods_weight":22,"goods_state":null,"add_time":1617499335,"upd_time":1617499335,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null},
      {"goods_id":1193,"cat_id":null,"goods_name":"adasdadasdasdasdadasdasdasdad","goods_price":1,"goods_number":1,"goods_weight":1,"goods_state":null,"add_time":1617499619,"upd_time":1617499619,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null},{"goods_id":1191,"cat_id":null,"goods_name":"耐克HM大甩卖1块钱双的内衣内裤原为袜子赶紧来买啊啊啊啊啊啊啊","goods_price":1,"goods_number":1,"goods_weight":1,"goods_state":null,"add_time":1617499589,"upd_time":1617499589,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null},{"goods_id":1190,"cat_id":null,"goods_name":"HM二手袜子2元一双低价处理啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊","goods_price":2,"goods_number":100000,"goods_weight":1,"goods_state":null,"add_time":1617499525,"upd_time":1617499525,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null},{"goods_id":1189,"cat_id":null,"goods_name":"HM二手袜子2元一双低价处理","goods_price":2,"goods_number":100000,"goods_weight":1,"goods_state":null,"add_time":1617499514,"upd_time":1617499514,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null},{"goods_id":1188,"cat_id":null,"goods_name":"HM二手袜子2元一双","goods_price":2,"goods_number":100000,"goods_weight":1,"goods_state":null,"add_time":1617499498,"upd_time":1617499498,"hot_mumber":0,"is_promote":false,"cat_one_id":null,"cat_two_id":null,"cat_three_id":null}]},"meta":{"msg":"获取成功","status":200}}.data.goods
      this.loading = false
    }, 500);
  },
  components: {},

  computed: {},

  mounted() {},

  filters:{
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

  methods: {
    linkToAddGoods() {
      window.sessionStorage.setItem('activePath', '/home/addgoods')
      this.$store.commit('saveMenuStatusVuex', window.sessionStorage.getItem('activePath'))
      this.$router.replace('/home/addgoods')
    },
    deleteGoods(row) {
      this.$confirm('确认删除此商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.goodsList = this.goodsList.filter(element => {
          return element.goods_id !== row.goods_id
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