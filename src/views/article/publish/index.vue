<template>
  <div>
      <div>
        <label class="type" >文章类型:</label>
        <el-radio-group v-model="type" @change="handlerTypeChange(type)">
          <el-radio-button label="0">原创</el-radio-button>
          <el-radio-button label="1">视频</el-radio-button>
        </el-radio-group>
        <el-form ref="formData" :model="form" label-width="80px" >
          <el-form-item label="大标题" prop="bigtitle">
            <el-input v-model="form.bigtitle" placeholder="请输入大标题" ></el-input>
          </el-form-item>
          <el-form-item label="小标题" prop="smalltitle">
            <el-input v-model="form.smalltitle" placeholder="请输入小标题"></el-input>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <tinymce :height="200" v-model="form.content"></tinymce>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">发表</el-button>
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button  @click="onCancel('formData')">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import Tinymce from '../../../components/Tinymce'
export default {
  data() {
    return {
      type: 0,
      form: {}
    }
  },
  components: {
    Tinymce
  },

  created() {
  },
  methods: {

    onSubmit: function(flag) {
      this.upData(flag)
    },
    // 清空内容
    onCancel: function(refName) {
      this.$refs[refName].resetFields()
    },
    onSave: function(flag) {
    // 保存数据
      this.upData(flag)
    },
    upData(flag) {
      // 提交数据
      // 不同的flag区分不同的操作
      var type = flag === 0 ? '发表' : '保存'
      this.$confirm('确定要' + type + '该文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.form)
        this.$message({
          type: 'success',
          message: type + '成功!'
        })
        // 跳转到审核页面
        this.$router.push({ path: '/article/audit' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: type + '失败,请稍后重试'
        })
      })
    }
  }
}
</script>
<<style scoped>

.el-input{
  width:300px;
  margin:5px;
}
.type{
  margin-left:10px;
}
.el-radio-group{
  margin:10px;
}
</style>

