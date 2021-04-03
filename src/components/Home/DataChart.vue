<!-- DataChart -->
<template>
  <el-col :span="24">
    <el-row :gutter="20">
      <el-col :span = "12">
        <el-card class="box-card" shadow = "hover">
          <div class="dataChart_test1" style="width: 600px;height:400px;">
          </div>
        </el-card>
      </el-col>
      <el-col :span = "12">
        <el-card class="box-card" shadow = "hover">
          <div class="dataChart_test2" style="width: 600px;height:400px;">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {
    let domTest1 = document.querySelector('.dataChart_test1')
    var myChartTest1 = echarts.init(domTest1);
    let domTest2 = document.querySelector('.dataChart_test2')
    var myChartTest2 = echarts.init(domTest2);
    var option = {
        title: {
            text: '销售情况'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    myChartTest1.setOption(option)
    myChartTest2.setOption(option)
  },

  methods: {}
}

</script>
<style lang='css' scoped>
</style>