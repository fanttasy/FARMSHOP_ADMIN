<!-- Iteminfo -->
<template>
  <el-col :span="8">
    <el-card class="box-card" shadow="hover" :body-style = "{padding: '0px'}">
      <div class="item-info">
        <div class="item-info-icon" :style="{background: backgroundColor}">
          <i :class="icon"></i>
        </div>
        <div class="item-info-message">
          <div class="message-num">{{nums}}</div>
          <div class="message-text">{{title}}</div>
        </div>
      </div>    
    </el-card>
  </el-col>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props: {
    icon: String,
    title: String,
    nums: String,
    backgroundColor: String
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='css' scoped>
  .el-card {
    border: none;
    margin: 0px 0px 20px 0px;
  }
  .item-info {
    display: flex;
    height: 100px;
    align-items: center;
  }
  .item-info-icon {
    font-size: 50px;
    height: 100px;
    width: 100px;
    text-align: center;
    line-height: 100px;
    color: white;
  }
  .item-info-message {
    text-align: center;
    flex: 1;
  }
  .message-num {
    color: #2d8cf0;
    font-size: 30px;
    font-weight: 700;
    line-height: 36px;
  }
  .message-text {
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }
</style>