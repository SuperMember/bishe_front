<template>
  <div style="margin:10px;">
    <div style="margin-bottom:10px;">
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table
        :data="transTableData"
        border fit highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="ID"
          label="序号"
          min-width="100">
          <template slot-scope="scope">
              <el-tag >{{scope.row.ID}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="评论内容"
          width="100"
          >
          <template slot-scope="scope">
            <el-dialog title="评论内容" :visible.sync="dialogTableVisible" width="300px">
              <div v-html="scope.row.CONTENT"></div>
              <br/>
              <div>
                <img height="100px" v-if="scope.row.URL!=null" :src="scope.row.URL"/>
              </div>
            </el-dialog>
            <el-button @click="handleContentMore()">详情</el-button>
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
          label="点赞数量"
          width="100"
          align="center">
          <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.COUNT}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100"
          align="center">
          <template slot-scope="scope">
              <el-tag :type="scope.row.STATUE | statueFilter">{{scope.row.STATUE}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="评论时间"
          width="200"
          align="center">
          <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.CREATED}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="230">
          <template slot-scope="scope">
            <el-dialog title="回复" :visible.sync="dialogReplyVisible">
                <el-form ref="reply" :model="form" label-width="80px">
                    <el-form-item label="回复内容">
                      <el-input type="textarea" v-model="reply.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="添加图片">
                       <el-button type="primary" icon="upload"  @click="imagecropperShow=true" size="" class="edit">图片
                       </el-button>
                    </el-form-item>
                     <el-form-item>
                      <el-button @click="dialogReplyVisible=false">取消</el-button>
                      <el-button type="primary" @click="onSubmit">回复</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog title="举报" :visible.sync="dialogReportVisible">
                <el-form ref="reply" :model="form" label-width="80px">
                    <el-form-item label="举报内容">
                      <el-radio-group v-model="radio" @change="radioChange">
                        <el-radio label="0">色情</el-radio>
                        <el-radio label="1">无端谩骂</el-radio>
                        <el-radio label="2">反动</el-radio>
                        <el-radio label="3">不正当言论</el-radio>
                        <el-radio label="4">其他</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="其他">
                        <el-input type="textarea" :disabled="disabledOther"></el-input>
                    </el-form-item>
                     <el-form-item>
                      <el-button @click="dialogReportVisible=false">取消</el-button>
                      <el-button type="primary" @click="handleReport">举报</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
             <el-button v-if="scope.row.STATUE==='正常'" size="mini" type="danger" @click="handleDelete(scope.row)">举报</el-button>
             <el-button type="primary" size="mini" @click="handleShow(scope.row)" >查看</el-button>
             <el-button type="success" size="mini" @click="handleReply(scope.row)">回复</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-dialog title="内容详情" :visible.sync="dialogMoreVisible" @open="open">
          <el-form ref="form" :model="transFormData" label-width="80px">
            <el-form-item label="大标题">
              <el-input v-model="transFormData.TITLE" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="小标题">
              <el-input v-model="transFormData.STITLE" disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="正文内容">
              <el-input type="textarea" v-model="transFormData.CONTENT" disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="文章类型">
              <el-tag type="success">{{transFormData.TYPE}}</el-tag>
            </el-form-item>
            <el-form-item label="文章状态">
              <el-tag>{{transFormData.STATUE}}</el-tag>
            </el-form-item>
            <el-form-item label="发布时间">
              <el-tag type="danger">{{transFormData.CREATED}}</el-tag>
            </el-form-item>
          </el-form>
        </el-dialog>
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
import { getArticleById } from '@/api/article'
import { report } from '@/api/report'
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
      imagecropperKey: 0,
      dialogMoreVisible: false,
      form: {},
      currentId: null,
      dialogReportVisible: false,
      radio: '0',
      disabledOther: false
    }
  },
  filters: {
    statueFilter(statue) {
      const statusMap = {
        '正常': 'success',
        '已删除': 'danger'
      }
      return statusMap[statue]
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
    },
    transTableData() {
      var data = this.tableData
      data.forEach(function(item, i) {
        if (item.STATUE === 0) {
          data[i].STATUE = '正常'
        } else {
          data[i].TYPE = '已删除'
        }
      }, this)
      return data
    },
    transFormData() {
      var data = this.form
      var type = data.TYPE
      var statue = data.STATUE
      if (type === 0) {
        data.TYPE = '原创'
      } else {
        data.TYPE = '视频'
      }
      if (statue === 0) {
        data.STATUE = '保存'
      } else if (statue === 1) {
        data.STATUE = '审核中'
      } else if (statue === 2) {
        data.STATUE = '未通过'
      } else {
        data.STATUE = '审核通过'
      }
      return data
    }
  },
  components: { getAllCommentsByUserId, pagination, getUserById, ImageCropper, PanThumb, getArticleById, report },
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
    open() {
      // 加载文章详情
      getArticleById(this.currentId).then(response => {
        if (response.code === 20000) {
          this.form = response.data
        }
      })
    },
    handleCurrentChange(row) {
      this.getComment(row)
    },
    handleShow(row) {
      // 查看详情
      this.dialogMoreVisible = true
      this.currentId = row.BELONG_ID
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
    handleDelete(row) {
      // 举报评论
      this.dialogReportVisible = true
      this.report = row
    },
    handleReport() {
      this.$confirm('是否举报该评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        report().then(response => {
          if (response === 20000) {
            this.$message({
              type: 'info',
              message: '举报成功'
            })
            this.dialogReportVisible = false
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消举报'
        })
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
    },
    // 图片上传结束

    radioChange(index) {
      if (index === 4) {
        this.disabledOther = true
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.edit{
  float: left;
}

</style>

