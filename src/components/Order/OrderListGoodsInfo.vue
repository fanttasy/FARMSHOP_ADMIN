<!-- OrderGoodsInfo -->
<template>
  <div class="order-item-goods">
    <el-table ref="orderGoodsItemTable" :data="orderGoodsItem" tooltip-effect="dark" border :cell-style="rowStyle">
      <el-table-column width="120" label="商品图片" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.goodsImg" fit="contain"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goodsSn" label="商品编号" width="180" align="center"></el-table-column>
      <el-table-column prop="goodsName" label="商品名称" width="180" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="商品单价" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.goodsPrice + '元'}}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="商品数量" width="100" align="center"></el-table-column>
      <el-table-column label="小计" align="center">
        <template slot-scope="scope">
          {{scope.row.quantity * scope.row.goodsPrice + '元'}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    orderGoodsItem: Array
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    rowStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex==5){
        return 'color: #ff6700';
      }
    }
  }
}

</script>
<style lang='css' scoped>
  .el-image {
      width: 70px;
      height: 70px;
    }
</style>