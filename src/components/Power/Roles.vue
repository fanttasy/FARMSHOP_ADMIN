<!-- Roles -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card" shadow="hover">
        <el-row>
          <el-col>
            <el-button type="primary">添加角色</el-button>
          </el-col>
        </el-row>
        <!-- Roles列表 -->
        <el-table :data="rolesList" border stripe v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row v-for="(item1, index1) in scope.row.children" :key="item1.id" :class="['verticalmiddle', 'bdbottom', index1 === 0 ? 'bdtop' : '']">
                <el-col :span="5">
                  <el-tag>{{item1.authName}}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row v-for="(item2, index2) in item1.children" :key="item2.id" :class="['verticalmiddle', index2 === 0 ? '' : 'bdtop']">
                    <el-col :span="6">
                      <el-tag type="success">{{item2.authName}}</el-tag>
                      <i class="el-icon-caret-right" v-if="item2.children.length !== 0"></i>
                    </el-col>
                    <el-col :span="18">
                      <el-tag type="warning" v-for="(item3) in item2.children" :key="item3.id" closable @close="removeRoles()">
                        {{item3.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column type="index" label="#" align="center"></el-table-column>
          <el-table-column label="角色名称" align="center" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" align="center" prop="roleDesc"></el-table-column>
          <el-table-column label="操作" align="center">
            <!-- <template slot-scope="scope"> -->
              <el-button icon="el-icon-edit" size="mini">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRightDialog">分配权限</el-button>
            <!-- </template> -->
          </el-table-column>
        </el-table>
        <!-- 分配权限Dialog -->
        <el-dialog
          title="分配权限"
          :visible.sync="rightDialogVisible"
          width="50%"
          :close-on-click-modal="false">
          <el-tree
            :data="rightRolesList"
            :props="treeProps"
            show-checkbox
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="defaultKeys">

          </el-tree>
          <span slot="footer" class="dialog-footrightDialogVisibleer">
            <el-button @click="rightDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="rightDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      rolesList: [],
      rightDialogVisible: false,
      rightRolesList: [],
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      defaultKeys: []
    };
  },
  created() {
    this.getRolesList()
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    getRolesList() {
      this.loading = true
      setTimeout(() => {
      this.rolesList = [
    {
        "id": 18202,
        "roleName": "超级管理员",
        "roleDesc": "超级管理员",
        "children": [
            {
                "id": 101,
                "authName": "商品管理",
                "path": "goods",
                "children": [
                    {
                        "id": 104,
                        "authName": "商品列表",
                        "path": "goods",
                        "children": [
                            {
                                "id": 151,
                                "authName": "更新商品属性",
                                "path": "goods"
                            },
                            {
                                "id": 152,
                                "authName": "更新商品状态",
                                "path": "goods"
                            },
                            {
                                "id": 153,
                                "authName": "获取商品详情",
                                "path": "goods"
                            }
                        ]
                    },
                    {
                        "id": 115,
                        "authName": "分类参数",
                        "path": "params",
                        "children": [
                            {
                                "id": 142,
                                "authName": "获取参数列表",
                                "path": "categories"
                            },
                            {
                                "id": 143,
                                "authName": "创建商品参数",
                                "path": "categories"
                            },
                            {
                                "id": 144,
                                "authName": "删除商品参数",
                                "path": "categories"
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "authName": "商品分类",
                        "path": "categories",
                        "children": [
                            {
                                "id": 122,
                                "authName": "添加分类",
                                "path": "categories"
                            },
                            {
                                "id": 123,
                                "authName": "删除分类",
                                "path": "categories"
                            },
                            {
                                "id": 149,
                                "authName": "获取分类详情",
                                "path": "categories"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 102,
                "authName": "订单管理",
                "path": "orders",
                "children": [
                    {
                        "id": 107,
                        "authName": "订单列表",
                        "path": "orders",
                        "children": [
                            {
                                "id": 109,
                                "authName": "添加订单",
                                "path": "orders"
                            },
                            {
                                "id": 154,
                                "authName": "订单更新",
                                "path": "orders"
                            },
                            {
                                "id": 155,
                                "authName": "获取订单详情",
                                "path": "orders"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 103,
                "authName": "权限管理",
                "path": "rights",
                "children": [
                    {
                        "id": 111,
                        "authName": "角色列表",
                        "path": "roles",
                        "children": [
                            {
                                "id": 129,
                                "authName": "添加角色",
                                "path": "roles"
                            },
                            {
                                "id": 130,
                                "authName": "删除角色",
                                "path": "roles"
                            },
                            {
                                "id": 134,
                                "authName": "角色授权",
                                "path": "roles"
                            },
                            {
                                "id": 135,
                                "authName": "取消角色授权",
                                "path": "roles"
                            },
                            {
                                "id": 138,
                                "authName": "获取角色列表",
                                "path": "roles"
                            },
                            {
                                "id": 139,
                                "authName": "获取角色详情",
                                "path": "roles"
                            },
                            {
                                "id": 140,
                                "authName": "更新角色信息",
                                "path": "roles"
                            },
                            {
                                "id": 141,
                                "authName": "更新角色权限",
                                "path": "roles"
                            }
                        ]
                    },
                    {
                        "id": 112,
                        "authName": "权限列表",
                        "path": "rights",
                        "children": [
                            {
                                "id": 147,
                                "authName": "查看权限",
                                "path": "rights"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 18209,
        "roleName": "普通管理员",
        "roleDesc": "普通管理员",
        "children": [
            {
                "id": 101,
                "authName": "商品管理",
                "path": "goods",
                "children": [
                    {
                        "id": 115,
                        "authName": "分类参数",
                        "path": "params",
                        "children": []
                    }
                ]
            },
            {
                "id": 103,
                "authName": "权限管理",
                "path": "rights",
                "children": [
                    {
                        "id": 112,
                        "authName": "权限列表",
                        "path": "rights",
                        "children": []
                    }
                ]
            }
        ]
    },
    {
        "id": 18210,
        "roleName": "店长",
        "roleDesc": "店长",
        "children": [
            {
                "id": 101,
                "authName": "商品管理",
                "path": "goods",
                "children": [
                    {
                        "id": 104,
                        "authName": "商品列表",
                        "path": "goods",
                        "children": [
                            {
                                "id": 105,
                                "authName": "添加商品",
                                "path": "goods"
                            },
                            {
                                "id": 116,
                                "authName": "商品修改",
                                "path": "goods"
                            },
                            {
                                "id": 117,
                                "authName": "商品删除",
                                "path": "goods"
                            },
                            {
                                "id": 150,
                                "authName": "更新商品图片",
                                "path": "goods"
                            },
                            {
                                "id": 151,
                                "authName": "更新商品属性",
                                "path": "goods"
                            },
                            {
                                "id": 152,
                                "authName": "更新商品状态",
                                "path": "goods"
                            },
                            {
                                "id": 153,
                                "authName": "获取商品详情",
                                "path": "goods"
                            }
                        ]
                    },
                    {
                        "id": 115,
                        "authName": "分类参数",
                        "path": "params",
                        "children": [
                            {
                                "id": 142,
                                "authName": "获取参数列表",
                                "path": "categories"
                            },
                            {
                                "id": 143,
                                "authName": "创建商品参数",
                                "path": "categories"
                            },
                            {
                                "id": 144,
                                "authName": "删除商品参数",
                                "path": "categories"
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "authName": "商品分类",
                        "path": "categories",
                        "children": [
                            {
                                "id": 122,
                                "authName": "添加分类",
                                "path": "categories"
                            },
                            {
                                "id": 123,
                                "authName": "删除分类",
                                "path": "categories"
                            },
                            {
                                "id": 149,
                                "authName": "获取分类详情",
                                "path": "categories"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 18211,
        "roleName": "test",
        "roleDesc": "test",
        "children": [
            {
                "id": 102,
                "authName": "订单管理",
                "path": "orders",
                "children": [
                    {
                        "id": 107,
                        "authName": "订单列表",
                        "path": "orders",
                        "children": [
                            {
                                "id": 109,
                                "authName": "添加订单",
                                "path": "orders"
                            },
                            {
                                "id": 154,
                                "authName": "订单更新",
                                "path": "orders"
                            },
                            {
                                "id": 155,
                                "authName": "获取订单详情",
                                "path": "orders"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 103,
                "authName": "权限管理",
                "path": "rights",
                "children": [
                    {
                        "id": 111,
                        "authName": "角色列表",
                        "path": "roles",
                        "children": [
                            {
                                "id": 129,
                                "authName": "添加角色",
                                "path": "roles"
                            },
                            {
                                "id": 130,
                                "authName": "删除角色",
                                "path": "roles"
                            },
                            {
                                "id": 134,
                                "authName": "角色授权",
                                "path": "roles"
                            },
                            {
                                "id": 135,
                                "authName": "取消角色授权",
                                "path": "roles"
                            },
                            {
                                "id": 138,
                                "authName": "获取角色列表",
                                "path": "roles"
                            },
                            {
                                "id": 139,
                                "authName": "获取角色详情",
                                "path": "roles"
                            },
                            {
                                "id": 140,
                                "authName": "更新角色信息",
                                "path": "roles"
                            },
                            {
                                "id": 141,
                                "authName": "更新角色权限",
                                "path": "roles"
                            }
                        ]
                    },
                    {
                        "id": 112,
                        "authName": "权限列表",
                        "path": "rights",
                        "children": [
                            {
                                "id": 147,
                                "authName": "查看权限",
                                "path": "rights"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 18212,
        "roleName": "2020520",
        "roleDesc": "2020520",
        "children": []
    },
    {
        "id": 18215,
        "roleName": "fanttasy",
        "roleDesc": "fanttasy",
        "children": [
            {
                "id": 101,
                "authName": "商品管理",
                "path": "goods",
                "children": [
                    {
                        "id": 104,
                        "authName": "商品列表",
                        "path": "goods",
                        "children": [
                            {
                                "id": 150,
                                "authName": "更新商品图片",
                                "path": "goods"
                            },
                            {
                                "id": 151,
                                "authName": "更新商品属性",
                                "path": "goods"
                            },
                            {
                                "id": 153,
                                "authName": "获取商品详情",
                                "path": "goods"
                            }
                        ]
                    },
                    {
                        "id": 115,
                        "authName": "分类参数",
                        "path": "params",
                        "children": [
                            {
                                "id": 143,
                                "authName": "创建商品参数",
                                "path": "categories"
                            },
                            {
                                "id": 144,
                                "authName": "删除商品参数",
                                "path": "categories"
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "authName": "商品分类",
                        "path": "categories",
                        "children": [
                            {
                                "id": 122,
                                "authName": "添加分类",
                                "path": "categories"
                            },
                            {
                                "id": 123,
                                "authName": "删除分类",
                                "path": "categories"
                            },
                            {
                                "id": 149,
                                "authName": "获取分类详情",
                                "path": "categories"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 102,
                "authName": "订单管理",
                "path": "orders",
                "children": [
                    {
                        "id": 107,
                        "authName": "订单列表",
                        "path": "orders",
                        "children": [
                            {
                                "id": 109,
                                "authName": "添加订单",
                                "path": "orders"
                            },
                            {
                                "id": 154,
                                "authName": "订单更新",
                                "path": "orders"
                            },
                            {
                                "id": 155,
                                "authName": "获取订单详情",
                                "path": "orders"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 103,
                "authName": "权限管理",
                "path": "rights",
                "children": [
                    {
                        "id": 111,
                        "authName": "角色列表",
                        "path": "roles",
                        "children": [
                            {
                                "id": 129,
                                "authName": "添加角色",
                                "path": "roles"
                            },
                            {
                                "id": 130,
                                "authName": "删除角色",
                                "path": "roles"
                            },
                            {
                                "id": 134,
                                "authName": "角色授权",
                                "path": "roles"
                            },
                            {
                                "id": 135,
                                "authName": "取消角色授权",
                                "path": "roles"
                            },
                            {
                                "id": 138,
                                "authName": "获取角色列表",
                                "path": "roles"
                            },
                            {
                                "id": 139,
                                "authName": "获取角色详情",
                                "path": "roles"
                            },
                            {
                                "id": 140,
                                "authName": "更新角色信息",
                                "path": "roles"
                            },
                            {
                                "id": 141,
                                "authName": "更新角色权限",
                                "path": "roles"
                            }
                        ]
                    },
                    {
                        "id": 112,
                        "authName": "权限列表",
                        "path": "rights",
                        "children": [
                            {
                                "id": 147,
                                "authName": "查看权限",
                                "path": "rights"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 145,
                "authName": "数据统计",
                "path": "reports",
                "children": [
                    {
                        "id": 146,
                        "authName": "数据报表",
                        "path": "reports",
                        "children": [
                            {
                                "id": 148,
                                "authName": "查看数据",
                                "path": "reports"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 18219,
        "roleName": "fighting",
        "roleDesc": "fighting",
        "children": []
    },
    {
        "id": 18221,
        "roleName": "normal",
        "roleDesc": "normal user",
        "children": []
    },
    {
        "id": 18231,
        "roleName": "普通用户",
        "roleDesc": "普通用户",
        "children": []
    }
        ]
        this.loading = false
      }, 500);
    },
    async removeRoles() {
      const confirmResult = await this.$confirm('确定删除此权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if(confirmResult !== 'confirm') {
        return this.$message.info('取消删除')
      }
      this.getRolesList()
      return this.$message({message: '删除成功', type: 'success'})
    },
    setRightDialog() {
      this.rightRolesList = [
        {
            "id": 101,
            "authName": "商品管理",
            "path": "goods",
            "pid": 0,
            "children": [
                {
                    "id": 104,
                    "authName": "商品列表",
                    "path": "goods",
                    "pid": 101,
                    "children": [
                        {
                            "id": 105,
                            "authName": "添加商品",
                            "path": "goods",
                            "pid": "104,101"
                        },
                        {
                            "id": 116,
                            "authName": "商品修改",
                            "path": "goods",
                            "pid": "104,101"
                        },
                        {
                            "id": 117,
                            "authName": "商品删除",
                            "path": "goods",
                            "pid": "104,101"
                        },
                        {
                            "id": 150,
                            "authName": "更新商品图片",
                            "path": "goods",
                            "pid": "104,101"
                        },
                        {
                            "id": 151,
                            "authName": "更新商品属性",
                            "path": "goods",
                            "pid": "104,101"
                        },
                        {
                            "id": 152,
                            "authName": "更新商品状态",
                            "path": "goods",
                            "pid": "104,101"
                        },
                        {
                            "id": 153,
                            "authName": "获取商品详情",
                            "path": "goods",
                            "pid": "104,101"
                        }
                    ]
                },
                {
                    "id": 115,
                    "authName": "分类参数",
                    "path": "params",
                    "pid": 101,
                    "children": [
                        {
                            "id": 142,
                            "authName": "获取参数列表",
                            "path": "categories",
                            "pid": "115,101"
                        },
                        {
                            "id": 143,
                            "authName": "创建商品参数",
                            "path": "categories",
                            "pid": "115,101"
                        },
                        {
                            "id": 144,
                            "authName": "删除商品参数",
                            "path": "categories",
                            "pid": "115,101"
                        }
                    ]
                },
                {
                    "id": 121,
                    "authName": "商品分类",
                    "path": "categories",
                    "pid": 101,
                    "children": [
                        {
                            "id": 122,
                            "authName": "添加分类",
                            "path": "categories",
                            "pid": "121,101"
                        },
                        {
                            "id": 123,
                            "authName": "删除分类",
                            "path": "categories",
                            "pid": "121,101"
                        },
                        {
                            "id": 149,
                            "authName": "获取分类详情",
                            "path": "categories",
                            "pid": "121,101"
                        }
                    ]
                }
            ]
        },
        {
            "id": 102,
            "authName": "订单管理",
            "path": "orders",
            "pid": 0,
            "children": [
                {
                    "id": 107,
                    "authName": "订单列表",
                    "path": "orders",
                    "pid": 102,
                    "children": [
                        {
                            "id": 109,
                            "authName": "添加订单",
                            "path": "orders",
                            "pid": "107,102"
                        },
                        {
                            "id": 154,
                            "authName": "订单更新",
                            "path": "orders",
                            "pid": "107,102"
                        },
                        {
                            "id": 155,
                            "authName": "获取订单详情",
                            "path": "orders",
                            "pid": "107,102"
                        }
                    ]
                }
            ]
        },
        {
            "id": 103,
            "authName": "权限管理",
            "path": "rights",
            "pid": 0,
            "children": [
                {
                    "id": 111,
                    "authName": "角色列表",
                    "path": "roles",
                    "pid": 103,
                    "children": [
                        {
                            "id": 129,
                            "authName": "添加角色",
                            "path": "roles",
                            "pid": "111,103"
                        },
                        {
                            "id": 130,
                            "authName": "删除角色",
                            "path": "roles",
                            "pid": "111,103"
                        },
                        {
                            "id": 134,
                            "authName": "角色授权",
                            "path": "roles",
                            "pid": "111,103"
                        },
                        {
                            "id": 135,
                            "authName": "取消角色授权",
                            "path": "roles",
                            "pid": "111,103"
                        },
                        {
                            "id": 138,
                            "authName": "获取角色列表",
                            "path": "roles",
                            "pid": "111,103"
                        },
                        {
                            "id": 139,
                            "authName": "获取角色详情",
                            "path": "roles",
                            "pid": "111,103"
                        },
                        {
                            "id": 140,
                            "authName": "更新角色信息",
                            "path": "roles",
                            "pid": "111,103"
                        },
                        {
                            "id": 141,
                            "authName": "更新角色权限",
                            "path": "roles",
                            "pid": "111,103"
                        }
                    ]
                },
                {
                    "id": 112,
                    "authName": "权限列表",
                    "path": "rights",
                    "pid": 103,
                    "children": [
                        {
                            "id": 147,
                            "authName": "查看权限",
                            "path": "rights",
                            "pid": "112,103"
                        }
                    ]
                }
            ]
        },
        {
            "id": 125,
            "authName": "用户管理",
            "path": "users",
            "pid": 0,
            "children": [
                {
                    "id": 110,
                    "authName": "用户列表",
                    "path": "users",
                    "pid": 125,
                    "children": [
                        {
                            "id": 131,
                            "authName": "添加用户",
                            "path": "users",
                            "pid": "110,125"
                        },
                        {
                            "id": 132,
                            "authName": "删除用户",
                            "path": "users",
                            "pid": "110,125"
                        },
                        {
                            "id": 133,
                            "authName": "更新用户",
                            "path": "users",
                            "pid": "110,125"
                        },
                        {
                            "id": 136,
                            "authName": "获取用户详情",
                            "path": "users",
                            "pid": "110,125"
                        },
                        {
                            "id": 137,
                            "authName": "分配用户角色",
                            "path": "users",
                            "pid": "110,125"
                        },
                        {
                            "id": 159,
                            "authName": "设置管理状态",
                            "path": "users",
                            "pid": "110,125"
                        }
                    ]
                }
            ]
        },
        {
            "id": 145,
            "authName": "数据统计",
            "path": "reports",
            "pid": 0,
            "children": [
                {
                    "id": 146,
                    "authName": "数据报表",
                    "path": "reports",
                    "pid": 145,
                    "children": [
                        {
                            "id": 148,
                            "authName": "查看数据",
                            "path": "reports",
                            "pid": "146,145"
                        }
                    ]
                }
            ]
        }
    ]
      this.defaultKeys = [151, 152, 153, 142, 143, 144, 122, 123, 149, 109, 154, 155, 129, 130, 134, 135, 138, 139, 140, 141, 147]
      this.rightDialogVisible = true
    },
  }
}

</script>
<style lang='css' scoped>
  .el-tag{
    margin: 10px 10px;
  }
  .bdtop {
    border-top: 1px solid #eee;
  }
  .bdbottom {
    border-bottom: 1px solid #eee;
  }
  .verticalmiddle {
    display: flex;
    align-items: center;
  }
</style>