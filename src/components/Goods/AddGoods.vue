<!-- addgoods -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card" shadow="hover" v-loading="loading">
      <el-steps  :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品详情"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="GoodsForm" ref="GoodsForm" :rules="GoodsFormRules" label-width="100px" label-position="top" class="demo-ruleForm">
        <el-tabs tab-position="left" v-model="activeIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goodsName"> 
              <el-input v-model="GoodsForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="goodsDesc"> 
              <el-input v-model="GoodsForm.goodsDesc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice"> 
              <el-input v-model="GoodsForm.goodsPrice"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goodsStock"> 
              <el-input v-model="GoodsForm.goodsStock"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item label = "是否推荐">
              <el-switch v-model="GoodsForm.isRecom" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item label = "是否在售">
              <el-switch v-model="GoodsForm.isSale" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="http://127.0.0.1/farmshop_server/upload/uploadPic.php"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="previewVisible" width="50%" title="图片预览" class="dialog-preview">
              <el-image :src="previewPath" fit="cover">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-dialog>
          </el-tab-pane>
          <el-tab-pane label="商品详情" name="4">
            <el-form-item label="商品详情">
              <quill-editor v-model="GoodsForm.goodsDetail"> </quill-editor>
              <el-button type="primary" class="add-goods" @click="addGoods">添加商品</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {addGoodsInfo} from '../../network/api/api'
export default {
  data () {
    const checkPrice = (rule, value, callback) => {
      const regExp = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/;
      if(value === '') {
        callback(new Error('请输入价格'));
      } else if(regExp.test(value) === false) {
        callback(new Error('请输入正确的价格，并只能保留两位小数'));
      } else {
        callback()
      }
    }
    const checkStock = (rule, value, callback) => {
      const regExp = /^\d+$/;
      if(value === '') {
        callback(new Error('请输入数量'));
      } else if(regExp.test(value) === false) {
        callback(new Error('请输入正确的数量'));
      } else {
        callback()
      }
    }
    return {
      loading: false,
      activeIndex: '0',
      GoodsForm: {
        goodsName: '',
        goodsDesc: '',
        goodsPrice: 0,
        goodsStock: 0,
        isRecom: true,
        isSale: true,
        goodsImg: '',
        goodsDetail: ''
      },
      GoodsFormRules: {
        goodsName: [
          {required: true, message: '请输入商品名称', trigger: 'blur'}
        ],
        goodsDesc: [
          {required: true, message: '请输入商品描述', trigger: 'blur'}
        ],
        goodsPrice: [
          {validator: checkPrice, trigger: ['blur', 'change']}
        ],
        goodsStock: [
          {validator: checkStock, trigger: ['blur', 'change']}
        ],
      },
      previewPath: '',
      previewVisible: false,
    };
  },
  
  created() {

  },


  components: {},

  computed: {},

  mounted() {},

  methods: {
    tabClicked() {
      
    },
    handlePictureCardPreview(file) {
      this.previewPath = file.response.url;
      this.previewVisible = true;
    },
    handleRemove(file, fileList) {
      if(fileList.length) {
        this.GoodsForm.goodsImg = fileList[fileList.length - 1].response.url;
      } else {
        this.GoodsForm.goodsImg = ''
      }
    },
    handleSuccess(response, file, fileList) {
      if(response.result === 'success') {
        this.GoodsForm.goodsImg = response.url;
      } else if(response.result === 'failed') {
        this.$message({message: '上传失败，文件已存在！', type: 'error', center: true})
      }
    },
    addGoods() {
      this.$refs.GoodsForm.validate(async valid => {
        if(valid) {
          if(this.GoodsForm.goodsImg === '') {
            return this.$message({message: '请添加商品图片', type: 'error', center: true})
          }
          const params = 'ajax='+encodeURIComponent(JSON.stringify(this.GoodsForm));
          this.loading = true;
          const {data: res} = await addGoodsInfo(params);
          if(res.result === "success") {
            this.$message({message: '添加成功', type: 'success', center: true});
            this.loading = false;
            window.sessionStorage.setItem('activePath', '/home/goodslist');
            this.$store.commit('saveMenuStatusVuex', window.sessionStorage.getItem('activePath'));
            this.$router.replace('/home/goodslist');
          } else if(res.result === 'failed') {
            return this.$message({message: '添加商品失败', type: 'error', center: true})
          }
        } else {
          return this.$message({message: '请填写完整的商品信息', type: 'error', center: true})
        }
      })
    }
  }
}

</script>
<style lang='css' scoped>
  .el-steps {
    margin: 0 0 20px 0px;
  }
  .el-input {
    width: 50%;
  }
  .el-textarea {
    width: 50%;
  }
  .add-goods {
    margin: 20px 0px;
  }
  .el-image {
    max-width: 300px;
    max-height: 300px;
  }
  .dialog-preview /deep/ .el-dialog__body{
    display: flex;
    justify-content: center;
  }
</style>