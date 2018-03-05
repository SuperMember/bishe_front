<template>
  <div class="components-container">

    <pan-thumb :image="image"></pan-thumb>

    <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">修改头像
    </el-button>

    <image-cropper :width="300" :height="300" url="http://localhost:9090/file/profile" 
      @close='close'
      @crop-upload-success="cropSuccess"
      @crop-success="crop"
      :key="imagecropperKey" v-show="imagecropperShow" img-format="jpg"></image-cropper>
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
      image: ''
    }
  },
  computed: {
    ...mapGetters([
      'info'
    ])
  },
  created() {
    this.image = this.$store.state.user['info'].img
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

