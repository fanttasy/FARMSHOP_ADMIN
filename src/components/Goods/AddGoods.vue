<!-- addgoods -->
<template>
  <div>
    <el-breadcrumb separator="/" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/mainPage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card" shadow="hover" v-loading = "loading">
      <el-steps  :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="GoodsForm" ref="GoodsForm" :rules="GoodsFormRules" label-width="100px" label-position="top" class="demo-ruleForm">
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeTabLeave" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name"> 
              <el-input v-model="GoodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price"> 
              <el-input v-model="GoodsForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight"> 
              <el-input v-model="GoodsForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number"> 
              <el-input v-model="GoodsForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat"> 
              <el-cascader
                :options="categoryList"
                :props="categoryProps"
                v-model="GoodsForm.goods_cat"
                expand-trigger="hover"
                @change="handleChange"
                clearable>
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in activePropsData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox v-for="(target, index) in item.attr_vals" :key="index" :label="target"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in activeSetData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="http://timemeetyou.com:8889/api/private/v1/upload0"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <!-- <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <el-form-item label="商品内容">
              <el-input type="textarea" placeholder="请输入内容" v-model="GoodsForm.goods_introduce" :autosize="{ minRows: 3, maxRows: 4}">
              </el-input>
              <el-button type="primary" class="add-goods" @click="addGoods">添加商品</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '0',
      loading: true,
      GoodsForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        goods_introduce: ''
      },
      GoodsFormRules: {
        goods_name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'}
        ],
        goods_price: [
          {required: true, message: '请输入商品价格', trigger: 'blur'}
        ],
        goods_weight: [
          {required: true, message: '请输入商品重量', trigger: 'blur'}
        ],
        goods_number: [
          {required: true, message: '请输入商品数量', trigger: 'blur'}
        ],
        goods_cat: [
          {required: true, message: '请选择商品分类', trigger: 'blur'}
        ]
      },
      categoryList: [],
      categoryProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      activePropsData: [],
      activeSetData: [],
    };
  },
  
  created() {
    setTimeout(() => {
      this.loading = false,
      this.categoryList = {"data":[{"cat_id":954,"cat_name":"无敌","cat_pid":0,"cat_level":0,"cat_deleted":false,"children":[{"cat_id":956,"cat_name":"汽车整车","cat_pid":954,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":972,"cat_name":"平安车管家","cat_pid":956,"cat_level":2,"cat_deleted":false},{"cat_id":1768,"cat_name":"test","cat_pid":956,"cat_level":2,"cat_deleted":false},{"cat_id":1769,"cat_name":"tt","cat_pid":956,"cat_level":2,"cat_deleted":false}]},{"cat_id":958,"cat_name":"养护配件","cat_pid":954,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":974,"cat_name":"燃油添加剂","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":979,"cat_name":"电瓶","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":980,"cat_name":"雨刷","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":981,"cat_name":"滤清器","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":982,"cat_name":"刹车片","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":983,"cat_name":"轮胎","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":985,"cat_name":"火花塞","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":986,"cat_name":"胎压监测","cat_pid":958,"cat_level":2,"cat_deleted":false},{"cat_id":987,"cat_name":"手机支架","cat_pid":958,"cat_level":2,"cat_deleted":false}]},{"cat_id":975,"cat_name":"清洁美容","cat_pid":954,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":989,"cat_name":"玻璃水","cat_pid":975,"cat_level":2,"cat_deleted":false},{"cat_id":990,"cat_name":"漆面修复","cat_pid":975,"cat_level":2,"cat_deleted":false},{"cat_id":991,"cat_name":"车蜡","cat_pid":975,"cat_level":2,"cat_deleted":false},{"cat_id":992,"cat_name":"内饰清洁","cat_pid":975,"cat_level":2,"cat_deleted":false},{"cat_id":993,"cat_name":"清洁工具","cat_pid":975,"cat_level":2,"cat_deleted":false}]},{"cat_id":977,"cat_name":"汽车电子","cat_pid":954,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":995,"cat_name":"电子狗","cat_pid":977,"cat_level":2,"cat_deleted":false},{"cat_id":996,"cat_name":"车载冰箱","cat_pid":977,"cat_level":2,"cat_deleted":false},{"cat_id":997,"cat_name":"车载电源","cat_pid":977,"cat_level":2,"cat_deleted":false},{"cat_id":998,"cat_name":"车载空气净化器","cat_pid":977,"cat_level":2,"cat_deleted":false}]},{"cat_id":984,"cat_name":"汽车装饰","cat_pid":954,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1002,"cat_name":"挂饰/摆饰","cat_pid":984,"cat_level":2,"cat_deleted":false},{"cat_id":1003,"cat_name":"汽车脚垫","cat_pid":984,"cat_level":2,"cat_deleted":false},{"cat_id":1005,"cat_name":"抱枕/腰靠","cat_pid":984,"cat_level":2,"cat_deleted":false},{"cat_id":1006,"cat_name":"安全座椅","cat_pid":984,"cat_level":2,"cat_deleted":false},{"cat_id":1007,"cat_name":"汽车坐垫","cat_pid":984,"cat_level":2,"cat_deleted":false}]}]},{"cat_id":1100,"cat_name":"美妆洗护","cat_pid":0,"cat_level":0,"cat_deleted":false,"children":[{"cat_id":1103,"cat_name":"面部护理","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1113,"cat_name":"乳液","cat_pid":1103,"cat_level":2,"cat_deleted":false},{"cat_id":1114,"cat_name":"面霜","cat_pid":1103,"cat_level":2,"cat_deleted":false},{"cat_id":1115,"cat_name":"防晒隔离","cat_pid":1103,"cat_level":2,"cat_deleted":false},{"cat_id":1116,"cat_name":"卸妆","cat_pid":1103,"cat_level":2,"cat_deleted":false},{"cat_id":1117,"cat_name":"唇部护理","cat_pid":1103,"cat_level":2,"cat_deleted":false},{"cat_id":1118,"cat_name":"爽肤水","cat_pid":1103,"cat_level":2,"cat_deleted":false},{"cat_id":1119,"cat_name":"精华","cat_pid":1103,"cat_level":2,"cat_deleted":false}]},{"cat_id":1109,"cat_name":"美发护发","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1121,"cat_name":"护发素","cat_pid":1109,"cat_level":2,"cat_deleted":false},{"cat_id":1122,"cat_name":"洗护套装","cat_pid":1109,"cat_level":2,"cat_deleted":false},{"cat_id":1123,"cat_name":"染烫造型","cat_pid":1109,"cat_level":2,"cat_deleted":false},{"cat_id":1124,"cat_name":"营养水","cat_pid":1109,"cat_level":2,"cat_deleted":false},{"cat_id":1125,"cat_name":"美发工具","cat_pid":1109,"cat_level":2,"cat_deleted":false},{"cat_id":1767,"cat_name":"asd ","cat_pid":1109,"cat_level":2,"cat_deleted":false}]},{"cat_id":1111,"cat_name":"身体护理","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1127,"cat_name":"颈霜","cat_pid":1111,"cat_level":2,"cat_deleted":false},{"cat_id":1128,"cat_name":"手霜","cat_pid":1111,"cat_level":2,"cat_deleted":false},{"cat_id":1129,"cat_name":"护足霜","cat_pid":1111,"cat_level":2,"cat_deleted":false},{"cat_id":1130,"cat_name":"丰胸美乳","cat_pid":1111,"cat_level":2,"cat_deleted":false},{"cat_id":1131,"cat_name":"按摩膏","cat_pid":1111,"cat_level":2,"cat_deleted":false},{"cat_id":1134,"cat_name":"润体霜","cat_pid":1111,"cat_level":2,"cat_deleted":false},{"cat_id":1136,"cat_name":"润体乳","cat_pid":1111,"cat_level":2,"cat_deleted":false},{"cat_id":1137,"cat_name":"脱毛","cat_pid":1111,"cat_level":2,"cat_deleted":false}]},{"cat_id":1132,"cat_name":"口腔护理","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1140,"cat_name":"牙刷","cat_pid":1132,"cat_level":2,"cat_deleted":false},{"cat_id":1141,"cat_name":"漱口水","cat_pid":1132,"cat_level":2,"cat_deleted":false},{"cat_id":1142,"cat_name":"牙线","cat_pid":1132,"cat_level":2,"cat_deleted":false},{"cat_id":1143,"cat_name":"口腔套装","cat_pid":1132,"cat_level":2,"cat_deleted":false}]},{"cat_id":1133,"cat_name":"男士护理","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1145,"cat_name":"男士香水","cat_pid":1133,"cat_level":2,"cat_deleted":false},{"cat_id":1146,"cat_name":"男士套装","cat_pid":1133,"cat_level":2,"cat_deleted":false}]},{"cat_id":1135,"cat_name":"女性护理","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1148,"cat_name":"护垫","cat_pid":1135,"cat_level":2,"cat_deleted":false},{"cat_id":1149,"cat_name":"私密护理","cat_pid":1135,"cat_level":2,"cat_deleted":false}]},{"cat_id":1138,"cat_name":"香水彩妆","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1152,"cat_name":"美妆套装","cat_pid":1138,"cat_level":2,"cat_deleted":false},{"cat_id":1153,"cat_name":"面部卸妆","cat_pid":1138,"cat_level":2,"cat_deleted":false},{"cat_id":1154,"cat_name":"粉饼","cat_pid":1138,"cat_level":2,"cat_deleted":false},{"cat_id":1155,"cat_name":"粉底遮瑕","cat_pid":1138,"cat_level":2,"cat_deleted":false},{"cat_id":1156,"cat_name":"眉笔","cat_pid":1138,"cat_level":2,"cat_deleted":false},{"cat_id":1158,"cat_name":"睫毛膏","cat_pid":1138,"cat_level":2,"cat_deleted":false},{"cat_id":1159,"cat_name":"眼线","cat_pid":1138,"cat_level":2,"cat_deleted":false},{"cat_id":1161,"cat_name":"眼影","cat_pid":1138,"cat_level":2,"cat_deleted":false}]},{"cat_id":1151,"cat_name":"品牌墙","cat_pid":1100,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1164,"cat_name":"苏菲","cat_pid":1151,"cat_level":2,"cat_deleted":false},{"cat_id":1165,"cat_name":"多芬","cat_pid":1151,"cat_level":2,"cat_deleted":false},{"cat_id":1166,"cat_name":"施华蔻","cat_pid":1151,"cat_level":2,"cat_deleted":false},{"cat_id":1167,"cat_name":"云南白药","cat_pid":1151,"cat_level":2,"cat_deleted":false},{"cat_id":1168,"cat_name":"可莱丝","cat_pid":1151,"cat_level":2,"cat_deleted":false}]},{"cat_id":1752,"cat_name":"啊","cat_pid":1100,"cat_level":1,"cat_deleted":false}]},{"cat_id":1157,"cat_name":"内衣","cat_pid":0,"cat_level":0,"cat_deleted":false,"children":[{"cat_id":1162,"cat_name":"文胸","cat_pid":1157,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1171,"cat_name":"聚拢文胸","cat_pid":1162,"cat_level":2,"cat_deleted":false},{"cat_id":1172,"cat_name":"调整文胸","cat_pid":1162,"cat_level":2,"cat_deleted":false},{"cat_id":1173,"cat_name":"按摩文胸","cat_pid":1162,"cat_level":2,"cat_deleted":false},{"cat_id":1175,"cat_name":"隐形文胸","cat_pid":1162,"cat_level":2,"cat_deleted":false},{"cat_id":1176,"cat_name":"抹胸","cat_pid":1162,"cat_level":2,"cat_deleted":false},{"cat_id":1177,"cat_name":"塑身衣","cat_pid":1162,"cat_level":2,"cat_deleted":false},{"cat_id":1178,"cat_name":"情趣内衣","cat_pid":1162,"cat_level":2,"cat_deleted":false}]},{"cat_id":1169,"cat_name":"睡衣","cat_pid":1157,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1180,"cat_name":"男士睡衣","cat_pid":1169,"cat_level":2,"cat_deleted":false},{"cat_id":1181,"cat_name":"女士睡衣","cat_pid":1169,"cat_level":2,"cat_deleted":false},{"cat_id":1182,"cat_name":"情侣睡衣","cat_pid":1169,"cat_level":2,"cat_deleted":false},{"cat_id":1183,"cat_name":"睡袍","cat_pid":1169,"cat_level":2,"cat_deleted":false},{"cat_id":1184,"cat_name":"真丝睡衣","cat_pid":1169,"cat_level":2,"cat_deleted":false}]},{"cat_id":1174,"cat_name":"内裤","cat_pid":1157,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1186,"cat_name":"男士内裤","cat_pid":1174,"cat_level":2,"cat_deleted":false},{"cat_id":1188,"cat_name":"女士内裤","cat_pid":1174,"cat_level":2,"cat_deleted":false},{"cat_id":1189,"cat_name":"纯棉内裤","cat_pid":1174,"cat_level":2,"cat_deleted":false},{"cat_id":1190,"cat_name":"平角内裤","cat_pid":1174,"cat_level":2,"cat_deleted":false},{"cat_id":1191,"cat_name":"无痕内裤","cat_pid":1174,"cat_level":2,"cat_deleted":false},{"cat_id":1193,"cat_name":"丁字裤","cat_pid":1174,"cat_level":2,"cat_deleted":false},{"cat_id":1194,"cat_name":"三角内裤","cat_pid":1174,"cat_level":2,"cat_deleted":false},{"cat_id":1195,"cat_name":"收腹内裤","cat_pid":1174,"cat_level":2,"cat_deleted":false}]},{"cat_id":1187,"cat_name":"袜子","cat_pid":1157,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1197,"cat_name":"男袜","cat_pid":1187,"cat_level":2,"cat_deleted":false},{"cat_id":1198,"cat_name":"女袜","cat_pid":1187,"cat_level":2,"cat_deleted":false},{"cat_id":1199,"cat_name":"船袜","cat_pid":1187,"cat_level":2,"cat_deleted":false},{"cat_id":1200,"cat_name":"连裤袜","cat_pid":1187,"cat_level":2,"cat_deleted":false},{"cat_id":1201,"cat_name":"棉袜","cat_pid":1187,"cat_level":2,"cat_deleted":false},{"cat_id":1719,"cat_name":"南极人","cat_pid":1187,"cat_level":2,"cat_deleted":false}]},{"cat_id":1192,"cat_name":"保暖内衣","cat_pid":1157,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1204,"cat_name":"基础内衣","cat_pid":1192,"cat_level":2,"cat_deleted":false},{"cat_id":1205,"cat_name":"男士保暖","cat_pid":1192,"cat_level":2,"cat_deleted":false},
      {"cat_id":1206,"cat_name":"女士保暖","cat_pid":1192,"cat_level":2,"cat_deleted":false},{"cat_id":1207,"cat_name":"秋衣秋裤","cat_pid":1192,"cat_level":2,"cat_deleted":false},{"cat_id":1209,"cat_name":"加绒保暖","cat_pid":1192,"cat_level":2,"cat_deleted":false}]},{"cat_id":1202,"cat_name":"配饰","cat_pid":1157,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1211,"cat_name":"围巾","cat_pid":1202,"cat_level":2,"cat_deleted":false},{"cat_id":1212,"cat_name":"腰带","cat_pid":1202,"cat_level":2,"cat_deleted":false},{"cat_id":1213,"cat_name":"领带/领结","cat_pid":1202,"cat_level":2,"cat_deleted":false},{"cat_id":1214,"cat_name":"手套","cat_pid":1202,"cat_level":2,"cat_deleted":false},{"cat_id":1215,"cat_name":"眼镜","cat_pid":1202,"cat_level":2,"cat_deleted":false}]},{"cat_id":1208,"cat_name":"品牌墙","cat_pid":1157,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1217,"cat_name":"南极人","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1219,"cat_name":"PLAY","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1220,"cat_name":"恒源祥","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1221,"cat_name":"北极绒","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1222,"cat_name":"俞兆林","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1224,"cat_name":"甜妹子","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1226,"cat_name":"艾塞亚","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1227,"cat_name":"都市丽人","cat_pid":1208,"cat_level":2,"cat_deleted":false},{"cat_id":1718,"cat_name":"都市丽人","cat_pid":1208,"cat_level":2,"cat_deleted":false}]}]},{"cat_id":1218,"cat_name":"童装","cat_pid":0,"cat_level":0,"cat_deleted":false,"children":[{"cat_id":1225,"cat_name":"婴幼玩具","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1232,"cat_name":"积木","cat_pid":1225,"cat_level":2,"cat_deleted":false},{"cat_id":1233,"cat_name":"爬行垫","cat_pid":1225,"cat_level":2,"cat_deleted":false},{"cat_id":1234,"cat_name":"游泳池","cat_pid":1225,"cat_level":2,"cat_deleted":false},{"cat_id":1235,"cat_name":"健身架","cat_pid":1225,"cat_level":2,"cat_deleted":false},{"cat_id":1236,"cat_name":"迷宫/拼图","cat_pid":1225,"cat_level":2,"cat_deleted":false},{"cat_id":1237,"cat_name":"磁力棒/磁贴","cat_pid":1225,"cat_level":2,"cat_deleted":false},{"cat_id":1238,"cat_name":"儿童旅行箱","cat_pid":1225,"cat_level":2,"cat_deleted":false}]},{"cat_id":1228,"cat_name":"户外玩具","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1240,"cat_name":"绳类/球类","cat_pid":1228,"cat_level":2,"cat_deleted":false},{"cat_id":1241,"cat_name":"轮滑/摇马","cat_pid":1228,"cat_level":2,"cat_deleted":false},{"cat_id":1242,"cat_name":"泡泡机","cat_pid":1228,"cat_level":2,"cat_deleted":false},{"cat_id":1243,"cat_name":"戏水玩沙","cat_pid":1228,"cat_level":2,"cat_deleted":false},{"cat_id":1244,"cat_name":"游戏屋/海洋球","cat_pid":1228,"cat_level":2,"cat_deleted":false}]},{"cat_id":1231,"cat_name":"DIY玩具","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1247,"cat_name":"布艺玩具","cat_pid":1231,"cat_level":2,"cat_deleted":false},{"cat_id":1248,"cat_name":"桌面游戏","cat_pid":1231,"cat_level":2,"cat_deleted":false},{"cat_id":1249,"cat_name":"手工彩泥","cat_pid":1231,"cat_level":2,"cat_deleted":false},{"cat_id":1251,"cat_name":"画笔画架","cat_pid":1231,"cat_level":2,"cat_deleted":false},{"cat_id":1252,"cat_name":"过家家玩具","cat_pid":1231,"cat_level":2,"cat_deleted":false}]},{"cat_id":1246,"cat_name":"遥控模型玩具","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1254,"cat_name":"电动玩具","cat_pid":1246,"cat_level":2,"cat_deleted":false},{"cat_id":1255,"cat_name":"仿真模型玩具","cat_pid":1246,"cat_level":2,"cat_deleted":false},{"cat_id":1256,"cat_name":"拼装模型玩具","cat_pid":1246,"cat_level":2,"cat_deleted":false},{"cat_id":1257,"cat_name":"变形类玩具","cat_pid":1246,"cat_level":2,"cat_deleted":false},{"cat_id":1258,"cat_name":"兵器/军事模型","cat_pid":1246,"cat_level":2,"cat_deleted":false}]},{"cat_id":1250,"cat_name":"童装","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1261,"cat_name":"卫衣","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1262,"cat_name":"毛衣/针织衫","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1263,"cat_name":"婴儿爬服","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1264,"cat_name":"T恤/衬衫","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1265,"cat_name":"裤子","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1266,"cat_name":"外套","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1267,"cat_name":"婴童内衣","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1268,"cat_name":"儿童配饰","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1269,"cat_name":"婴儿礼盒","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1270,"cat_name":"裙子","cat_pid":1250,"cat_level":2,"cat_deleted":false},{"cat_id":1271,"cat_name":"亲子装","cat_pid":1250,"cat_level":2,"cat_deleted":false}]},{"cat_id":1259,"cat_name":"童鞋","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1274,"cat_name":"运动鞋","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1275,"cat_name":"靴子/雪地靴","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1276,"cat_name":"皮鞋/公主鞋","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1277,"cat_name":"帆布鞋","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1278,"cat_name":"棉鞋","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1279,"cat_name":"拖鞋","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1280,"cat_name":"雨鞋","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1281,"cat_name":"凉鞋","cat_pid":1259,"cat_level":2,"cat_deleted":false},{"cat_id":1720,"cat_name":"耐克","cat_pid":1259,"cat_level":2,"cat_deleted":false}]},{"cat_id":1273,"cat_name":"宝宝寝居","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1284,"cat_name":"隔尿垫","cat_pid":1273,"cat_level":2,"cat_deleted":false},{"cat_id":1285,"cat_name":"婴儿枕","cat_pid":1273,"cat_level":2,"cat_deleted":false},{"cat_id":1286,"cat_name":"被褥/毛毯","cat_pid":1273,"cat_level":2,"cat_deleted":false},{"cat_id":1287,"cat_name":"浴巾/毛巾","cat_pid":1273,"cat_level":2,"cat_deleted":false},{"cat_id":1288,"cat_name":"床品套装","cat_pid":1273,"cat_level":2,"cat_deleted":false},{"cat_id":1289,"cat_name":"布尿裤","cat_pid":1273,"cat_level":2,"cat_deleted":false},{"cat_id":1290,"cat_name":"床垫","cat_pid":1273,"cat_level":2,"cat_deleted":false},{"cat_id":1291,"cat_name":"凉席/蚊帐","cat_pid":1273,"cat_level":2,"cat_deleted":false}]},{"cat_id":1282,"cat_name":"品牌墙","cat_pid":1218,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1293,"cat_name":"十月妈咪","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1294,"cat_name":"英氏","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1296,"cat_name":"七波辉","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1297,"cat_name":"史努比","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1299,"cat_name":"UOVO","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1300,"cat_name":"良良","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1302,"cat_name":"费雪","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1303,"cat_name":"乐高","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1304,"cat_name":"澳贝","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1305,"cat_name":"迪士尼","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1306,"cat_name":"仙邦宝贝","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1307,"cat_name":"芭比","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1308,"cat_name":"捣蛋鬼","cat_pid":1282,"cat_level":2,"cat_deleted":false},{"cat_id":1309,"cat_name":"风火轮","cat_pid":1282,"cat_level":2,"cat_deleted":false}]}]},{"cat_id":1295,"cat_name":"珠宝","cat_pid":0,"cat_level":0,"cat_deleted":false,"children":[{"cat_id":1301,"cat_name":"黄金珠宝","cat_pid":1295,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1312,"cat_name":"银饰","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1313,"cat_name":"水晶玛瑙","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1314,"cat_name":"投资金","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1316,"cat_name":"钻石","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1317,"cat_name":"木饰","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1318,"cat_name":"珍珠","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1319,"cat_name":"彩宝","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1320,"cat_name":"琥珀","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1321,"cat_name":"投资银","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1322,"cat_name":"翡翠玉石","cat_pid":1301,"cat_level":2,"cat_deleted":false},{"cat_id":1614,"cat_name":"666","cat_pid":1301,"cat_level":2,"cat_deleted":false}]},{"cat_id":1311,"cat_name":"首饰配饰","cat_pid":1295,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1324,"cat_name":"手链","cat_pid":1311,"cat_level":2,"cat_deleted":false},{"cat_id":1325,"cat_name":"手镯","cat_pid":1311,"cat_level":2,"cat_deleted":false},{"cat_id":1326,"cat_name":"吊坠/项链","cat_pid":1311,"cat_level":2,"cat_deleted":false},{"cat_id":1328,"cat_name":"耳饰","cat_pid":1311,"cat_level":2,"cat_deleted":false},{"cat_id":1329,"cat_name":"发饰","cat_pid":1311,"cat_level":2,"cat_deleted":false}]},{"cat_id":1315,"cat_name":"邮币","cat_pid":1295,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1331,"cat_name":"邮票","cat_pid":1315,"cat_level":2,"cat_deleted":false},{"cat_id":1332,"cat_name":"古玩杂项","cat_pid":1315,"cat_level":2,"cat_deleted":false},{"cat_id":1333,"cat_name":"钱币","cat_pid":1315,"cat_level":2,"cat_deleted":false},{"cat_id":1334,"cat_name":"金银币","cat_pid":1315,"cat_level":2,"cat_deleted":false}]},{"cat_id":1327,"cat_name":"品牌墙","cat_pid":1295,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1338,"cat_name":"钻石快线","cat_pid":1327,"cat_level":2,"cat_deleted":false},
      {"cat_id":1339,"cat_name":"六福珠宝","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1340,"cat_name":"菜百首饰","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1341,"cat_name":"金利福","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1342,"cat_name":"中国黄金","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1344,"cat_name":"印象眸","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1345,"cat_name":"千寻海风","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1346,"cat_name":"施华洛世奇","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1347,"cat_name":"老冯记","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1348,"cat_name":"佐卡伊","cat_pid":1327,"cat_level":2,"cat_deleted":false},{"cat_id":1349,"cat_name":"金一","cat_pid":1327,"cat_level":2,"cat_deleted":false}]}]},{"cat_id":1609,"cat_name":"数码用品","cat_pid":0,"cat_level":0,"cat_deleted":false,"children":[{"cat_id":1610,"cat_name":"嗯嗯嗯","cat_pid":1609,"cat_level":1,"cat_deleted":false,"children":[{"cat_id":1611,"cat_name":"哦哦哦","cat_pid":1610,"cat_level":2,"cat_deleted":false}]}]},{"cat_id":1770,"cat_name":"撒","cat_pid":0,"cat_level":0,"cat_deleted":false,"children":[{"cat_id":1771,"cat_name":"asd","cat_pid":1770,"cat_level":1,"cat_deleted":false}]}],"meta":{"msg":"获取成功","status":200}}.data
    }, 500);
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleChange() {
      if(this.GoodsForm.goods_cat.length !== 3) {
        this.GoodsForm.goods_cat = []
        this.$message({type: 'warning',message: '请选择三级分类'});
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      if(oldActiveName === '0' && this.GoodsForm.goods_cat.length !== 3) {
        this.$message({type: 'error',message: '请选择商品分类'});
        return false;
      }
    },
    tabClicked() {
      if(this.activeIndex === '1') {
        let data = [{"attr_id":238,"attr_name":"颜色","cat_id":1274,"attr_sel":"many","attr_write":"list","attr_vals":"樱红/葡萄紫,藏青/亮红,炫蓝/荧光橙黄,古蓝/藏青,26码,29码,28码,30码,31码,27码","delete_time":null}]
        data.forEach(item => { item.attr_vals =  item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')})
        this.activePropsData = data
      } else if (this.activeIndex === '2') {
        this.activeSetData = {"data":[{"attr_id":234,"attr_name":"主体-品牌","cat_id":1274,"attr_sel":"only","attr_write":"manual","attr_vals":"test","delete_time":null},{"attr_id":235,"attr_name":"材质-鞋底材质","cat_id":1274,"attr_sel":"only","attr_write":"manual","attr_vals":"复合底","delete_time":null},{"attr_id":236,"attr_name":"设计-闭合方式","cat_id":1274,"attr_sel":"only","attr_write":"manual","attr_vals":"套筒","delete_time":null},{"attr_id":237,"attr_name":"功能-功能","cat_id":1274,"attr_sel":"only","attr_write":"manual","attr_vals":"保暖","delete_time":null}],"meta":{"msg":"获取成功","status":200}}.data
      }
    },
    handlePictureCardPreview(file) {},
    handleRemove() {},
    addGoods() {
      this.$refs.GoodsForm.validate(valid => {
        if(valid) {
          this.loading = true
          setTimeout(() => {
            this.$message({message: '添加成功', type: 'success', center: true})
            window.sessionStorage.setItem('activePath', '/home/goodslist')
            this.$store.commit('saveMenuStatusVuex', window.sessionStorage.getItem('activePath'))
            this.$router.replace('/home/goodslist')
          }, 1000);
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
  .add-goods {
    margin: 20px 0px;
  }
</style>