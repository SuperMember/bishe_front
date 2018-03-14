<template>
<div style="margin:10px;">
  <label>举报类型:</label>
    <el-radio-group v-model="radio" @change="radioChange">
          <el-radio-button label="3">全部</el-radio-button>
          <el-radio-button label="0">评论</el-radio-button>
          <el-radio-button label="1">文章</el-radio-button>
          <el-radio-button label="2">图片</el-radio-button>
    </el-radio-group>
  <br/>
  <div style="margin-top:10px;">
    <label>举报结果:</label>
      <el-radio-group v-model="result" @change="resultChange">
            <el-radio-button label="3">全部</el-radio-button>
            <el-radio-button label="0">处理中</el-radio-button>
            <el-radio-button label="1">举报成功</el-radio-button>
            <el-radio-button label="2">举报失败</el-radio-button>
      </el-radio-group>
  </div>
<el-table
    stripe
    :data="transTableData"
    border fit
    style="width: 100%;margin-top:10px;">
    <el-table-column
      label="序号"
      min-width="150">
      <template slot-scope="scope">
        <el-tag>{{scope.row.ID}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="CONTENT"
      label="举报内容"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      label="举报人"
      width="120"
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
      label="被举报人"
      width="120"
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
              <el-button v-popover:popover @click="handleHover(scope.row.RUSER_ID)">{{scope.row.RUSER_ID}}</el-button>
            </template>
    </el-table-column>
    <el-table-column
      prop="URL"
      label="图片url"
      width="150">
    </el-table-column>
    <el-table-column
      prop="TYPE"
      label="类型"
      width="130"
      align="center">
        <template slot-scope="scope">
              <el-tag :type="scope.row.TYPE | typeFilter">{{scope.row.TYPE}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      label="举报时间"
      width="140"
      align="center">
        <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.CREATED}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      label="举报状态"
      width="130"
      align="center">
        <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.RESULT}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="180">
      <template slot-scope="scope">
        <el-dialog title="审核" :visible.sync="dialogCheckVisible" >
          <div>
              <el-form ref="checkForm" :model="checkForm" label-width="80px">
                  <el-form-item label="结果">
                    <el-radio-group v-model="checkForm.result">
                          <el-radio label="1">举报成功</el-radio>
                          <el-radio label="2">举报失败</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="success" size="mini" @click="dialogCheckVisible=false">取消</el-button>
                    <el-button type="primary" size="mini" @click="handleCheckSuccess(scope.row)">确定</el-button>
                  </el-form-item>
              </el-form>
          </div>
        </el-dialog>
        <el-button type="primary" v-if="scope.row.RESULT==='处理中'" size="mini" @click="handleCheck(scope.row)">审批</el-button>
        <el-button type="success" size="mini" @click="handleMore(scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  
  <el-dialog title="文章详情" :visible.sync="dialogMoreArticleVisible">
          <el-form ref="articleForm" :model="transFormData" label-width="80px">
            <el-form-item label="大标题">
              <el-input v-model="transFormData.TITLE" disabled></el-input>
            </el-form-item>
            <el-form-item label="小标题">
              <el-input v-model="transFormData.STITLE" disabled></el-input>
            </el-form-item>
            <el-form-item label="正文内容">
              <el-input type="textarea" v-model="transFormData.CONTENT" disabled></el-input>
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
  <el-dialog title="评论详情" :visible.sync="dialogMoreCommentVisible">
          <el-form ref="commentForm" :model="transComment" label-width="80px">
                <el-form-item label="内容">
                  <el-input v-model="transComment.CONTENT" disabled></el-input>
                </el-form-item>
                <el-form-item label="评论状态">
                  <el-tag type="warning">{{transComment.STATUE}}</el-tag>
                </el-form-item>
                <el-form-item label="图片" v-if="transComment.URL!=null">
                  <img v-if="transComment.URL!=null" :src="transComment.URL" style="height:100px;"/>
                </el-form-item>
                <el-form-item label="类型">
                  <el-tag type="success">{{transComment.TYPE}}</el-tag>
                </el-form-item>
                <el-form-item label="点赞数量">
                  <el-tag>{{transComment.COUNT}}</el-tag>
                </el-form-item>
                <el-form-item label="发布时间">
                  <el-tag type="danger">{{transComment.CREATED}}</el-tag>
                </el-form-item>
          </el-form>
  </el-dialog>
  <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
</div>
  
</template>

<script>
import pagination from '../../../components/pagination'
import { getReport, getReportByType, setReportStatue } from '@/api/report'
import { getUserById } from '@/api/user'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      radio: '3',
      page: 1,
      type: '3',
      userData: {},
      dialogMoreCommentVisible: false,
      dialogMoreArticleVisible: false,
      dialogCheckVisible: false,
      commentForm: {},
      articleForm: {},
      checkForm: {
        result: '1'
      },
      result: '3'
    }
  },
  computed: {
    transComment() {
      var data = this.commentForm
      var statue = data.STATUE
      var type = data.TYPE
      if (statue === 0) {
        data.STATUE = '正常'
      } else {
        data.STATUE = '已删除'
      }
      if (type === 0) {
        data.TYPE = '帖子'
      } else if (type === 1) {
        data.TYPE = '新闻'
      } else {
        data.TYPE = '文章'
      }
      var created = data.CREATED
      data.CREATED = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      return data
    },
    transFormData() {
      var data = this.articleForm
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
      var created = data.CREATED
      data.CREATED = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      return data
    },
    transTableData() {
      var data = this.tableData
      data.forEach(function(item, i) {
        if (item.TYPE === 0) {
          data[i].TYPE = '评论'
        } else if (item.TYPE === 1) {
          data[i].TYPE = '文章'
        } else {
          data[i].TYPE = '图片'
        }

        if (item.CONTENT === '0') {
          data[i].CONTENT = '色情'
        } else if (item.CONTENT === '1') {
          data[i].CONTENT = '无端谩骂'
        } else if (item.CONTENT === '2') {
          data[i].CONTENT = '反动'
        } else {
          data[i].CONTENT = '不正当言论'
        }

        if (item.RESULT === 0) {
          data[i].RESULT = '处理中'
        } else if (item.RESULT === 1) {
          data[i].RESULT = '举报成功'
        } else {
          data[i].RESULT = '举报失败'
        }

        var created = item.CREATED
        data[i].CREATED = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      }, this)
      return data
    },
    transData() {
      var data = this.userData
      var sex = data.SEX
      var statue = data.STATUE
      if (sex === 0) { data.SEX = 'icon_man' } else { data.SEX = 'icon_woman' }
      if (statue === false) { data.STATUE = '正常' } else { data.STATUE = '小黑屋' }
      return data
    }
  },
  components: { pagination, getReport, getUserById, getReportByType, setReportStatue, parseTime },
  created() {
    this.getReports(this.page, this.type, this.result)
  },
  filters: {
    typeFilter(type) {
      const statusMap = {
        '评论': 'success',
        '文章': 'danger',
        '图片': 'info'
      }
      return statusMap[type]
    }
  },
  methods: {
    getReports(page, type, result) {
      getReport(page, type, result).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'info',
            message: '获取成功!'
          })
          this.tableData = response.data.data
          this.count = response.data.count
        } else {
          this.$message({
            type: 'info',
            message: '获取失败!请重试'
          })
        }
      })
    },
    handleCurrentChange(page) {
      this.page = page
      this.getReports(page, this.type, this.result)
    },
    radioChange(type) {
      this.type = type
      this.getReports(this.page, this.type, this.result)
    },
    handleHover(id) {
      getUserById(id).then(response => {
        this.userData = response.data
      })
    },
    handleMore(row) {
      if (row.TYPE === '评论') {
        this.dialogMoreCommentVisible = true
      } else {
        this.dialogMoreArticleVisible = true
      }
      // 加载数据
      var type = ''
      if (row.TYPE === '评论') {
        type = '0'
      } else if (row.TYPE === '文章') {
        type = '1'
      } else {
        type = '2'
      }
      getReportByType(type, row.BELONG_ID).then(response => {
        if (response.code === 20000) {
          if (type === '0') {
            this.commentForm = response.data
          } else {
            this.articleForm = response.data
          }
        }
      })
    },
    handleCheck(row) {
      // 审批
      this.dialogCheckVisible = true
    },
    handleCheckSuccess(row) {
      // 审核确定
      var type = 0
      if (row.TYPE === '评论') {
        type = 0
      } else if (row.TYPE === '文章') {
        type = 1
      } else {
        type = 2
      }
      setReportStatue(parseInt(this.checkForm.result), type, row.ID, row.BELONG_ID, row.RUSER_ID).then(response => {
        if (response.code === 20000) {
          this.$message({
            type: 'success',
            message: '审核成功'
          })
          this.getReports(this.page, this.type)
        } else {
          this.$message({
            type: 'info',
            message: '审核失败'
          })
        }
        this.dialogCheckVisible = false
      })
    },
    resultChange(result) {
      this.result = result
      this.getReports(this.page, this.type, this.result)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

