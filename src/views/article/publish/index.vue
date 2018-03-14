<template>
  <div>
      <div>
        <label class="type" >文章类型:</label>
        <el-radio-group v-model="type" @change="handlerTypeChange(type)">
          <el-radio-button label="0">原创</el-radio-button>
          <el-radio-button label="1">视频</el-radio-button>
        </el-radio-group>
        <el-form ref="formData" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="标题" prop="bigtitle">
            <el-input v-model="form.bigtitle" placeholder="请输入大标题"></el-input>
          </el-form-item>
          <el-form-item label="要点" prop="smalltitle">
            <el-input v-model="form.smalltitle" placeholder="请输入小标题"></el-input>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <tinymce :height="200" v-model="form.content" v-if="index===1"></tinymce>
            <div v-else>
              <el-radio-group v-model="videoType" @change="handlerVideoChange(videoType)">
                <el-radio label="0">链接</el-radio>
                <el-radio label="1">视频</el-radio>
              </el-radio-group>
              <div>
                <el-input v-model="form.content" v-if="video===0"></el-input>
                <div v-else></div>
              </div>
            </div>
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
import { publish } from '@/api/article'
export default {
  data() {
    return {
      type: 0,
      form: {},
      index: 1,
      videoType: '0',
      video: 0,
      rules: {
        bigtitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        smalltitle: [
          { required: true, message: '请输入要点', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Tinymce, publish
  },

  created() {
  },
  methods: {

    onSubmit: function(flag) {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.upData(1)
        } else {
          return false
        }
      })
    },
    // 清空内容
    onCancel: function(refName) {
      this.$refs[refName].resetFields()
    },
    onSave: function(flag) {
    // 保存数据
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.upData(0)
        } else {
          return false
        }
      })
    },
    upData(flag) {
      // 提交数据
      // 不同的flag区分不同的操作
      var type = flag === 0 ? '保存' : '发表'
      this.$confirm('确定要' + type + '该文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        publish(this.form, this.type, type).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: type + '成功!'
            })
            // 跳转到审核页面
            this.$router.push({ path: '/article/list' })
          } else {
            this.$message({
              type: 'info',
              message: type + '失败!请重试'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消' + type
        })
      })
    },
    handlerTypeChange(type) {
      if (type === '0') {
        this.index = 1
        this.type = 0
      } else {
        this.index = 2
        this.type = 1
      }
    },
    handlerVideoChange(type) {
      if (type === '0') {
        this.video = 0
      } else {
        this.video = 1
      }
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

