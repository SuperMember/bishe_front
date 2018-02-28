<template>
  <el-cascader
    :options="options"
    v-model="CurrentValue"
    @change="handleSelectedChange">
  </el-cascader>
</template>

<script>
export default {
  created() {
  },
  data() {
    return {
      options: [{
        value: '广东省',
        label: '广东省'
      },
      {
        value: '广西省',
        label: '广西省'
      }, {
        value: '北京市',
        label: '北京市'
      }, {
        value: '天津市',
        label: '天津市'
      }, {
        value: '上海市',
        label: '上海市'
      }],
      CurrentValue: this.selectedCurrentValue
    }
  },
  props: {
    selectedCurrentValue: null
  },
  watch: {
  },
  methods: {
    handleSelectedChange: function() {
      this.$emit('seleted', this.selectedCurrentValue)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
