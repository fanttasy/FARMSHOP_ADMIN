<!-- Report -->
<template>
  <div>
    <el-row :gutter="20">
      <data-chart />
    </el-row>
  </div>
</template>

<script>
import DataChart from '../Home/DataChart.vue';
export default {
  data () {
    return {
    };
  },

  components: {DataChart},

  computed: {},

  mounted() {},

  methods: {}
}

</script>
<style lang='css' scoped>
</style>