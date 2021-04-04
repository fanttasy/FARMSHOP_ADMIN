<!-- Category -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="hover" v-loading = "loading">
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <tree-table
        
        :data="categoryList"
        :columns="column"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border>
        <!-- 是否有效插槽 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="!scope.row.cat_deleted"
            style="color:green"
          ></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" v-if="scope.row.cat_level === 1" type="success"
            >二级</el-tag
          >
          <el-tag size="mini" v-if="scope.row.cat_level === 2" type="warning"
            >三级</el-tag
          >
        </template>
        <!-- 操作 -->
        <template slot="opt">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </tree-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      categoryList: [],
      column: [
        {
          label: "分类名称",
          prop: "cat_name"
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
          align: "center"
        },
        {
          label: "排序",
          type: "template",
          template: "order",
          align: "center"
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
          align: "center"
        }
      ]
    };
  },
  
  created() {
    setTimeout(() => {
      this.categoryList = {
    "data": {
        "total": 9,
        "pagenum": 0,
        "pagesize": 5,
        "result": [
            {
                "cat_id": 11991,
                "cat_name": "电视机",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": false,
                "children": [
                    {
                        "cat_id": 11992,
                        "cat_name": "海尔",
                        "cat_pid": 11991,
                        "cat_level": 1,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 12005,
                                "cat_name": "液晶",
                                "cat_pid": 11992,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12006,
                                "cat_name": "液晶",
                                "cat_pid": 11992,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12014,
                                "cat_name": "332",
                                "cat_pid": 11992,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12015,
                                "cat_name": "2112",
                                "cat_pid": 11992,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12016,
                                "cat_name": "42",
                                "cat_pid": 11992,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12017,
                                "cat_name": "浴霸",
                                "cat_pid": 11992,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12018,
                                "cat_name": "小太阳洗衣机",
                                "cat_pid": 11992,
                                "cat_level": 2,
                                "cat_deleted": false
                            }
                        ]
                    }
                ]
            },
            {
                "cat_id": 11998,
                "cat_name": "数码相机",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": false,
                "children": [
                    {
                        "cat_id": 12000,
                        "cat_name": "索尼相机",
                        "cat_pid": 11998,
                        "cat_level": 1,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 12012,
                                "cat_name": "22121",
                                "cat_pid": 12000,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12013,
                                "cat_name": "22121131",
                                "cat_pid": 12000,
                                "cat_level": 2,
                                "cat_deleted": false
                            }
                        ]
                    }
                ]
            },
            {
                "cat_id": 12001,
                "cat_name": "数码产品",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": false,
                "children": [
                    {
                        "cat_id": 12002,
                        "cat_name": "手机",
                        "cat_pid": 12001,
                        "cat_level": 1,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 12003,
                                "cat_name": "苹果",
                                "cat_pid": 12002,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12020,
                                "cat_name": "黑马商城",
                                "cat_pid": 12002,
                                "cat_level": 2,
                                "cat_deleted": false
                            }
                        ]
                    }
                ]
            },
            {
                "cat_id": 12007,
                "cat_name": "111",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": false,
                "children": [
                    {
                        "cat_id": 12008,
                        "cat_name": "222",
                        "cat_pid": 12007,
                        "cat_level": 1,
                        "cat_deleted": false,
                        "children": [
                            {
                                "cat_id": 12009,
                                "cat_name": "898898",
                                "cat_pid": 12008,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12010,
                                "cat_name": "121",
                                "cat_pid": 12008,
                                "cat_level": 2,
                                "cat_deleted": false
                            },
                            {
                                "cat_id": 12011,
                                "cat_name": "11",
                                "cat_pid": 12008,
                                "cat_level": 2,
                                "cat_deleted": false
                            }
                        ]
                    }
                ]
            },
            {
                "cat_id": 12019,
                "cat_name": "黑马",
                "cat_pid": 0,
                "cat_level": 0,
                "cat_deleted": false
            }
        ]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
  }.data.result
      this.loading = false
    }, 500);
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='css' scoped>
  .zk-table {
    margin-top: 20px;
  }
</style>