<template>
  <div class="block">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
  </div>
</template>

<script>

export default {
  data() {
    return {
      currentPage: 1
    }
  },
  props: {
    count: null
  },
  components: { },
  computed: {
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.$emit('handleChange', val)
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.block{
  float: right;
}
</style>
