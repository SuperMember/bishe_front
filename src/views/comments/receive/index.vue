<template>
  <div style="margin:10px;">
    <el-table
        :data="tableData"
        border fit highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="ID"
          label="序号"
          min-width="100">
        </el-table-column>
        <el-table-column
          label="内容"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-dialog title="内容详情" :visible.sync="dialogTableVisible">
              <div v-html="scope.row.CONTENT"></div>
            </el-dialog>
            <el-button @click="handleContentMore()">查看内容</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="用户ID"
          width="200"
          align="center">
          <template slot-scope="scope">
         <el-popover
          ref="popover"
          placement="right"
          width="400"
          trigger="click">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="userData.IMG"  height="100px" style="margin:10px;float:left;">
            <div style="padding: 14px;">
              <span style="float:left">{{transData.USERNAME}}</span>
              <svg-icon :icon-class="transData.SEX" style="margin-left:10px;" class="svg"></svg-icon>
              <br/>
              <svg-icon icon-class="icon_statue" class="svg"></svg-icon>
              <span>{{userData.STATUE}}</span>
              <br/>
              <svg-icon icon-class="icon_degree" class="svg"></svg-icon>
              <span>{{userData.DEGREE}}</span>
              <br/>
              <svg-icon icon-class="icon_phone" class="svg"></svg-icon>
              <span>{{userData.PHONE}}</span>
              <br/>
              <svg-icon icon-class="icon_points" class="svg"></svg-icon>
              <span>{{userData.POINTS}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ userData.CREATED }}</time>
              </div>
            </div>
          </el-card>
        </el-popover>
        <el-button v-popover:popover @click="handleHover(scope.row.USER_ID)">{{scope.row.USER_ID}}</el-button>
      </template>
        </el-table-column>
        <el-table-column
          prop="COUNT"
          label="点赞数量"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="CREATED"
          label="评论时间"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-dialog title="回复" :visible.sync="dialogReplyVisible">
                <el-form ref="reply" :model="form" label-width="80px">
                    <el-form-item label="回复内容">
                      <el-input type="textarea" v-model="reply.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="添加图片">
                       <el-button type="primary" icon="upload"  @click="imagecropperShow=true" size="" class="edit">修改头像
                       </el-button>
                    </el-form-item>
                     <el-form-item>
                      <el-button @click="dialogReplyVisible=false">取消</el-button>
                      <el-button type="primary" @click="onSubmit">回复</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
             <el-button  size="mini" type="danger" @click="handleReport(scope.row)">举报</el-button>
             <el-button type="primary" size="mini" @click="handleReply(scope.row)">回复</el-button>
          </template>
        </el-table-column>
      </el-table>
       <image-cropper :width="300" :height="300" url="http://localhost:9090/file/profile" 
        @close='close'
        @crop-upload-success="cropSuccess"
        @crop-success="crop"
        :key="imagecropperKey" v-show="imagecropperShow" img-format="jpg"></image-cropper>
      <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
  </div>
</template>

<script>
import { getAllCommentsByUserId } from '@/api/comment'
import pagination from '../../../components/pagination'
import { getUserById } from '@/api/user'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      count: 0,
      userData: {},
      dialogTableVisible: false,
      dialogReplyVisible: false,
      reply: {},
      createdImgUrl: null,
      imagecropperShow: false,
      imagecropperKey: 0
    }
  },
  computed: {
    transData() {
      var data = this.userData
      var sex = data.SEX
      var statue = data.STATUE
      if (sex === 0) { data.SEX = 'icon_man' } else { data.SEX = 'icon_woman' }
      if (statue === false) { data.STATUE = '正常' } else { data.STATUE = '小黑屋' }
      return data
    }
  },
  components: { getAllCommentsByUserId, pagination, getUserById, ImageCropper, PanThumb },
  created() {
    this.getComment(this.page)
  },
  methods: {
    getComment(page) {
      getAllCommentsByUserId(page).then(response => {
        if (response.code === 20000) {
          this.tableData = response.data.data
          this.count = response.data.count
          this.$message({
            type: 'success',
            message: '获取成功'
          })
        }
      })
    },
    handleCurrentChange(row) {
      this.getComment(row)
    },
    handleReport(row) {
      // 举报
    },
    handleReply(row) {
      // 打开回复对话框
      this.dialogReplyVisible = true
    },
    onSubmit() {
      // 回复内容
    },
    handleContentMore(content) {
      // 查看更多内容
      this.dialogTableVisible = true
    },
    handleHover(id) {
      getUserById(id).then(response => {
        this.userData = response.data
      })
    },
    // 图片上传
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
    }
    // 图片上传结束
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}

</style>

