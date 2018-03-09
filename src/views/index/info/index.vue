<template>
  <div class="components-container" >
    
    <div class="profile">
      <pan-thumb :image="image" style="align:center"></pan-thumb>

      <el-button type="primary" icon="upload"  @click="imagecropperShow=true" size="" class="edit">修改头像
      </el-button>
      </div>

      <image-cropper :width="300" :height="300" url="http://localhost:9090/file/profile" 
        @close='close'
        @crop-upload-success="cropSuccess"
        @crop-success="crop"
        :key="imagecropperKey" v-show="imagecropperShow" img-format="jpg"></image-cropper>

        <el-card :body-style="{ padding: '0px' }">
          <div class="bottom" >
            <el-row :gutter="50">
              <el-col :span="24">
                <div class="grid-content">
                    <svg-icon icon-class="icon_user" class="icon"></svg-icon>
                    <span>{{form.username}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content">
                    <svg-icon icon-class="icon_sex" class="icon"></svg-icon>
                    <svg-icon icon-class="icon_man" v-if="form.sex===0"></svg-icon>
                    <svg-icon icon-class="icon_woman" v-if="form.sex===1"></svg-icon>
                </div>
              </el-col>
              
            </el-row>
            <el-row :gutter="400">
              <el-col :span="24">
                <div class="grid-content">
                    <svg-icon icon-class="icon_role" class="icon"></svg-icon>
                    <span>{{roles[0].authority}}</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="grid-content">
                    <svg-icon icon-class="icon_created" class="icon"></svg-icon>
                    <span>{{form.created}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="400">
                <el-col :span="24">
                  <div class="grid-content">
                    <el-popover
                      ref="popover"
                      placement="top"
                      width="300"
                      v-model="visible">
                      <p>修改号码</p>
                      <div style="margin:10px;">
                        <el-form :model="phoneForm" :rules="rules" ref="ruleForm">
                            <el-form-item prop="phone">
                              <el-input v-model="phoneForm.phone" placeholder="请输入手机号码"></el-input>                            
                            </el-form-item>
                            <el-form-item prop="code">
                              <div style="margin-bottom:20px;">
                                <el-input v-model="phoneForm.code" placeholder="请输入验证码" style="width:130px;float:left;margin-top:10px;"></el-input>
                                <el-button :disabled="disabled" @click="getCode('ruleForm')" style="float:right;margin-top:10px;">获取验证码</el-button>
                              </div>
                            </el-form-item>
                        </el-form>
                      </div>
                      <div style="text-align: right; margin: 0;margin-top:10px;">
                        <el-button size="mini" type="text" @click="cancle">取消</el-button>
                        <el-button type="primary" size="mini" @click="comfirm('ruleForm')">确定</el-button>
                      </div>
                    </el-popover>
                    <svg-icon icon-class="icon_phone" class="icon"></svg-icon>
                      <span>{{form.phone}}</span>
                      <el-button v-popover:popover >修改</el-button>
                  </div>
                </el-col>
            </el-row>
            
            <!-- <el-form ref="form" :model="form" label-width="80px" >
                    <el-form-item label="用户名">
                      
                    </el-form-item>
                    <el-form-item label="性别">
                      
                    </el-form-item>
                    <el-form-item label="角色">
                      <span>{{roles[0].authority}}</span>
                    </el-form-item>
                    <el-form-item label="注册号码">
                      <svg-icon icon-class="icon_phone"></svg-icon>
                    </el-form-item>
                    <el-form-item label="创建时间">
                      <span>{{form.created}}</span>
                    </el-form-item>
                     <el-form-item>
                      <el-button type="primary" @click="onSubmit">修改</el-button>
                      <el-button>取消</el-button>
                    </el-form-item> 
            </el-form> -->
          </div>
        </el-card>
        
  </div>
  
</template>

<script>
import SvgIcon from '../../../components/SvgIcon'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import { mapGetters } from 'vuex'
import { editPhone, checkCode } from '@/api/user'
export default {
  name: 'avatarUpload-demo',
  components: { ImageCropper, PanThumb, SvgIcon, editPhone, checkCode },
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不能为空'))
      }
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(value))) {
        return callback(new Error('手机号码格式不对'))
      } else {
        return callback()
      }
    }
    return {
      createdImgUrl: null,
      imagecropperShow: false,
      imagecropperKey: 0,
      image: '',
      form: {},
      visible: false,
      phoneForm: {},
      disabled: false,
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        code: [
          { min: 4, max: 6, message: '验证码格式不对', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['info', 'roles'])
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
      this.$store
        .dispatch('EditProfile', resData.files.avatar)
        .then(response => {
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
    },
    getCode(formName) {
      // 提交手机号码
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editPhone(this.phoneForm.phone).then(response => {
            console.log(response)
            if (response.code === 50000) {
              this.$message({
                type: 'info',
                message: '号码已经被占用!'
              })
              this.disabled = true
            }
          })
        } else {
          return false
        }
      })
    },
    comfirm(formName) {
      // 保存号码
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checkCode(this.phone, this.code).then(response => {
            // 验证是否成功
            if (response.code === 50000) {
              this.$message({
                type: 'info',
                message: '验证码错误!'
              })
            } else {
              // 保存操作
            }
          })
        } else {
          return false
        }
      })
    },
    cancle() {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.el-card {
  /* background-color:aliceblue; */
  margin-top: 10px;
  margin-left: 30%;
  margin-right: 30%;
  margin-bottom: 10px;
  /* background-color:#00fff2; */
  box-shadow: 2px 2px 20px #c2bbbb;
}
.avatar {
  clear: both;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-top: 50%;
}
.components-container {
  background: url("https://desk-fd.zol-img.com.cn/t_s960x600c5/g5/M00/0D/02/ChMkJldCnXSIEEPmAAVMUkOSZCEAARyUAAyowsABUxq935.jpg")
    no-repeat center;
}
.bottom {
  float: left;
}
.edit {
  margin-top: 50px;
}
.profile {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.grid-content {
  margin: 20px;
}
.svg-icon {
  width: 30px;
  height: 30px;
}
.icon {
  margin-right: 50px;
  margin-left: 50px;
}
</style>

