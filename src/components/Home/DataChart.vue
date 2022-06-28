<!-- DataChart -->
<template>
  <el-col :span="24">
    <el-row :gutter="20">
      <el-col :span = "12">
        <el-card class="box-card" shadow = "hover" v-loading = "loading">
          <div class="dataChart_test1" style="width: 600px;height:400px;">
          </div>
        </el-card>
      </el-col>
      <el-col :span = "12">
        <el-card class="box-card" shadow = "hover" v-loading = "loading">
          <div class="dataChart_test2" style="width: 600px;height:400px;">
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import * as echarts from 'echarts'
import { getReports } from '../../network/api/api.js'
export default {
  data () {
    return {
        loading: true
    };
  },

  components: {},

  computed: {},

  mounted() {
    let domTest1 = document.querySelector('.dataChart_test1')
    let myChartTest1 = echarts.init(domTest1);
    let domTest2 = document.querySelector('.dataChart_test2')
    let myChartTest2 = echarts.init(domTest2);
    let data = {
    "data": {
        "legend": {
            "data": [
                "华东",
                "华南",
                "华北",
                "西部",
                "其他"
            ]
        },
        "yAxis": [
            {
                "type": "value"
            }
        ],
        "xAxis": [
            {
                "data": [
                    "2017-12-27",
                    "2017-12-28",
                    "2017-12-29",
                    "2017-12-30",
                    "2017-12-31",
                    "2018-1-1"
                ],
                "boundaryGap": false
            }
        ],
        "series": [
            {
                "name": "华东",
                "type": "line",
                "stack": "总量",
                "areaStyle": {
                    "normal": {}
                },
                "data": [
                    2999,
                    3111,
                    4100,
                    3565,
                    3528,
                    6000
                ]
            },
            {
                "name": "华南",
                "type": "line",
                "stack": "总量",
                "areaStyle": {
                    "normal": {}
                },
                "data": [
                    5090,
                    2500,
                    3400,
                    6000,
                    6400,
                    7800
                ]
            },
            {
                "name": "华北",
                "type": "line",
                "stack": "总量",
                "areaStyle": {
                    "normal": {}
                },
                "data": [
                    6888,
                    4000,
                    8010,
                    12321,
                    13928,
                    12984
                ]
            },
            {
                "name": "西部",
                "type": "line",
                "stack": "总量",
                "areaStyle": {
                    "normal": {}
                },
                "data": [
                    9991,
                    4130,
                    7777,
                    12903,
                    13098,
                    14028
                ]
            },
            {
                "name": "其他",
                "type": "line",
                "stack": "总量",
                "areaStyle": {
                    "normal": {}
                },
                "data": [
                    15212,
                    5800,
                    10241,
                    14821,
                    15982,
                    14091
                ]
            }
        ],
        "title": {
            "text": "用户来源"
        },
        "tooltip": {
            "trigger": "axis",
            "axisPointer": {
                "type": "cross",
                "label": {
                    "backgroundColor": "#E9EEF3"
                }
            }
        },
        "grid": {
            "left": "3%",
            "right": "4%",
            "bottom": "3%",
            "containLabel": true
        }
    },
    "meta": {
        "msg": "获取报表成功",
        "status": 200
    }
}
    let option = {
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
    setTimeout(() => {
        myChartTest1.setOption(option)
        myChartTest2.setOption(data.data)
        this.loading = false
    }, 500);
  },

  methods: {}
}

</script>
<style lang='css' scoped>
</style>