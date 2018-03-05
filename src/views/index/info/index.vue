<template>
  <div class="components-container">

    <pan-thumb :image="image" style="align:center"></pan-thumb>

    <el-button type="primary" icon="upload" style="margin-left: 40px;" @click="imagecropperShow=true">修改头像
    </el-button>

    <image-cropper :width="300" :height="300" url="http://localhost:9090/file/profile" 
      @close='close'
      @crop-upload-success="cropSuccess"
      @crop-success="crop"
      :key="imagecropperKey" v-show="imagecropperShow" img-format="jpg"></image-cropper>

      <div class="bottom" style="margin:10px;">
        <el-form ref="form" :model="form" label-width="80px" >
                <el-form-item label="用户名">
                  <span>{{form.username}}</span>
                </el-form-item>
                <el-form-item label="性别">
                  
                </el-form-item>
                <el-form-item label="角色">
                  <span>{{roles[0].authority}}</span>
                </el-form-item>
                <el-form-item label="注册号码">
                  <span>{{form.phone}}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{form.created}}</span>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">修改</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
        </el-form>
      </div>
      
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
export default {
  name: 'avatarUpload-demo',
  components: { ImageCropper, PanThumb },
  data() {
    return {
      createdImgUrl: null,
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      form: {

      }
    }
  },
  computed: {
    ...mapGetters([
      'info',
      'roles'
    ])
  },
  created() {
    this.image = this.$store.state.user['avatar']
    this.form = this.$store.state.user['info']
  },
  methods: {
    cropSuccess(resData) {
      // 上传成功
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = this.createdImgUrl
      // 修改本地头像
      this.$store.dispatch('EditProfile', resData.files.avatar).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          this.$message({
            type: 'info',
            message: '修改失败!'
          })
        }
      })
    },
    close() {
      this.imagecropperShow = false
    },
    crop(createImgUrl, field, ki) {
      // 剪切成功
      this.createdImgUrl = createImgUrl
    }

  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 10px;
  }
 .components-container{
   margin: 10px;
 }
</style>

