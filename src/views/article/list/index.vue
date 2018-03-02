<template>
  <div>
    <label class="type" >文章类型:</label>
        <el-radio-group v-model="type" @change="handlerTypeChange(type)">
          <el-radio-button label="0">保存</el-radio-button>
          <el-radio-button label="1">审核中</el-radio-button>
          <el-radio-button label="2">未通过</el-radio-button>
          <el-radio-button label="3">审核通过</el-radio-button>
        </el-radio-group>
    <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        fixed
        prop="ID"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="CONTENT"
        label="内容"
        width="200">
      </el-table-column>
      <el-table-column
        prop="TITLE"
        label="文章标题"
        width="200">
      </el-table-column>
      <el-table-column
        prop="STITLE"
        label="副标题"
        width="200">
      </el-table-column>
      <el-table-column
        prop="STATUE"
        label="状态"
        width="200">
      </el-table-column>
      <el-table-column
        prop="TYPE"
        label="类型"
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
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      type: '0'
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
.el-radio-group{
  margin: 10px;
}
.type{
  margin-left:10px;
}
</style>

