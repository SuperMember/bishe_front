<template>
  <el-table
    :data="articles"
    style="width: 100%" height="300">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="200">
    </el-table-column>
    <el-table-column
      prop="title"
      label="文章标题"
      width="200">
    </el-table-column>
    <el-table-column
      prop="statue"
      label="状态"
      width="200">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      articles: [{
        'date': '2017/10/10',
        'title': '论如何与sb交流',
        'statue': '未通过'
      }]
    }
  },
  methods: {
    handleDelete: function() {
      // 删除
    },
    handleClick: function() {
      // 查看
    }
  }
}
</script>

<style scoped>

</style>

