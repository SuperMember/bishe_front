<template>
  <div style="margin:10px;">
    <el-table
    :data="transTableData"
    border fit
    style="width: 100%">
    <el-table-column
      label="ID"
      min-width="150">
      <template slot-scope="scope">
        <el-tag >{{scope.row.ID}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="回复内容"
      align="center"
      width="120">
      <template slot-scope="scope" >
        <el-dialog title="详情" :visible.sync="dialogMoreVisible">
          <div v-html="content"></div>
        </el-dialog>
        <el-button type="primary" size="mini" @click="handleMore(scope.row)" >内容详情</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="COMMENT_ID"
      label="评论"
      width="120">
      <template slot-scope="scope" >
        <el-dialog title="评论详情" :visible.sync="dialogCommentVisible">
           <el-form ref="commentData" :model="transFormData" label-width="80px">
              <el-form-item label="内容">
                <el-input disabled v-model="transFormData.CONTENT"></el-input>
              </el-form-item>
              <el-form-item label="图片">
                <img v-if="transFormData.URL!=null && transFormData.URL!=''" :src="transFormData.URL" width="100px" height="100px"/>
              </el-form-item>
              <el-form-item label="点赞数量">
                <el-tag type="danger">{{transFormData.COUNT}}</el-tag>
              </el-form-item>
              <el-form-item label="类型">
                <el-tag type="danger">{{transFormData.TYPE}}</el-tag>
              </el-form-item>
              <el-form-item label="状态">
                <el-tag type="danger">{{transFormData.STATUE}}</el-tag>
              </el-form-item>
              <el-form-item label="时间">
                <el-tag type="danger">{{transFormData.CREATED}}</el-tag>
              </el-form-item>
          </el-form>
        </el-dialog>
        <el-button type="primary" size="mini" @click="handleComment(scope.row)" >评论详情</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      prop="TOUSER_ID"
      label="被回复用户ID"
      width="120">
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
        <el-button type="success" size="mini" v-popover:popover @click="handleHover(scope.row.TOUSER_ID)">{{scope.row.TOUSER_ID}}</el-button>
      </template>
    </el-table-column>
    <el-table-column
      label="图片"
      align="center"
      width="100">
      <template slot-scope="scope">
          <img width="50px" height="50px" v-if="scope.row.URL!=null" :src="scope.row.URL"/>
      </template>
    </el-table-column>
    <el-table-column
      label="点赞数"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-tag>{{scope.row.COUNT}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      align="center"
      width="140">
      <template slot-scope="scope">
        <el-tag type="danger">{{scope.row.CREATED}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button type="danger" size="mini" @click="handleDelete(scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
   <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
  </div>
</template>

<script>
import { getReplyByUserId, getCommentById, deleteReply } from '@/api/comment'
import pagination from '../../../components/pagination'
import { getUserById } from '@/api/user'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1,
      dialogMoreVisible: false,
      dialogCommentVisible: false,
      content: '',
      userData: {},
      commentData: {}
    }
  },
  components: { getReplyByUserId, pagination, getUserById, getCommentById, parseTime, deleteReply },
  created() { this.getReplys(this.page) },
  computed: {
    transTableData() {
      var data = this.tableData
      data.forEach(function(item, i) {
        var created = item['CREATED']
        data[i]['CREATED'] = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      }, this)
      return data
    },
    transData() {
      var data = this.userData
      var sex = data.SEX
      var statue = data.STATUE
      if (sex === 0) { data.SEX = 'icon_man' } else { data.SEX = 'icon_woman' }
      if (statue === false) { data.STATUE = '正常' } else { data.STATUE = '小黑屋' }
      var created = data.CREATED
      data.CREATED = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      return data
    },
    transFormData() {
      var data = this.commentData
      var type = data.type
      var statue = data.STATUE
      if (type === 0) {
        data.TYPE = '帖子'
      } else if (type === 1) {
        data.TYPE = '新闻'
      } else {
        data.TYPE = '文章'
      }
      if (statue === 0) {
        data.STATUE = '正常'
      } else {
        data.STATUE = '已删除'
      }

      var created = data.CREATED
      data.CREATED = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      return data
    }
  },
  filters: {},
  methods: {
    handleCurrentChange(row) {
      this.page = row
      this.getReplys(this.page)
    },
    getReplys(page) {
      getReplyByUserId(page).then(response => {
        if (response.code === 20000) {
          this.tableData = response.data.data
          this.count = response.data.count
        }
      })
    },
    handleMore(row) {
      this.dialogMoreVisible = true
      this.content = row.CONTENT
    },
    handleComment(row) {
      this.dialogCommentVisible = true
      getCommentById(row.COMMENT_ID).then(response => {
        if (response.code === 20000) {
          this.commentData = response.data
        }
      })
    },
    handleHover(id) {
      getUserById(id).then(response => {
        this.userData = response.data
      })
    },
    handleDelete(row) {
      // 删除评论
      this.$confirm('确定要删除该评论吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteReply(row.ID).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getReplys(this.page)
          } else {
            this.$message({
              type: 'info',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

