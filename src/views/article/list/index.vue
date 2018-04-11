<template>
  <div>
    <label class="type" >文章类型:</label>
        <el-radio-group v-model="type" @change="handlerTypeChange(type)">
          <el-radio-button label="0">原创</el-radio-button>
          <el-radio-button label="1">视频</el-radio-button>
        </el-radio-group>
        <br/>
    <label class="type" >文章状态:</label>
        <el-radio-group v-model="statue" @change="handlerStatueChange(statue)">
          <el-radio-button label="4">全部</el-radio-button>
          <el-radio-button label="0">保存</el-radio-button>
          <el-radio-button label="1">审核中</el-radio-button>
          <el-radio-button label="2">未通过</el-radio-button>
          <el-radio-button label="3">审核通过</el-radio-button>
        </el-radio-group>
    <el-table
      border fit
      :data="transData"
      style="width: 100%"
      v-loading="listLoading">
      <el-table-column
        prop="ID"
        label="ID"
        width="200">
      </el-table-column>
      <el-table-column
        label="内容"
        width="200"
        align="center">
        <template slot-scope="scope">
              <el-dialog title="内容详情" :visible.sync="dialogTableVisible" append-to-body width="1000px">
                <div v-html="content" v-if="type==='0'"></div>
                <div v-else>
                  <video-player  class="video-player-box"
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true"
                      >
                      </video-player>
                </div>
              </el-dialog>
              <el-button @click="handleContentMore(scope.row)">查看内容</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="TITLE"
        label="文章标题"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        prop="STITLE"
        label="副标题"
        width="200"
        align="center">
      </el-table-column>
      <el-table-column
        label="状态"
        width="200"
        align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.STATUE | statueFilter">{{scope.row.STATUE}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="类型"
        width="200">
        <template slot-scope="scope">
          <el-tag :type="scope.row.TYPE | typeFilter">{{scope.row.TYPE}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        width="140">
        <template slot-scope="scope">
          <el-tag type="danger">{{scope.row.CREATED}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="250"
        align="center">
        <template slot-scope="scope">
           <el-dialog title="编辑" :visible.sync="dialogUpdateVisible" append-to-body width="1000px" @close="close">
              <el-form ref="form" :model="form" label-width="80px" :rules="rules">
              <el-form-item label="正标题" prop="TITLE">
                <el-input v-model="form.TITLE"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="STITLE">
                <el-input v-model="form.STITLE"></el-input>
              </el-form-item>
              <el-form-item label="正文内容" prop="CONTENT">
                <!-- <el-input type="textarea" v-model="form.CONTENT"></el-input> -->
                <div>
                  <tinymce  v-model="form.CONTENT"></tinymce>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button @click="cancelUpdate">取消</el-button>
                <el-button type="primary" @click="onSubmit(scope.row)">修改</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
          <el-button type="primary" v-if="scope.row.STATUE!=='审核通过'" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.STATUE==='保存'" size="mini" type="success" @click="handleModifyStatus(scope.row)">发布
          </el-button>
          <el-button  size="mini" type="danger" @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
  </div>
  
</template>

<script>
import VueVideoPlayer from 'vue-video-player'
import Tinymce from '../../../components/Tinymce'
import {
  getArticleByStatueSelf,
  deleteArticle,
  setArticleStatue,
  updateArticle
} from '@/api/article'
import pagination from '../../../components/pagination'
import { parseTime } from '@/utils/index'
export default {
  data() {
    return {
      articles: [],
      type: '0',
      page: 1,
      statue: '4',
      count: 0,
      dialogTableVisible: false,
      dialogUpdateVisible: false,
      content: '',
      form: {},
      listLoading: true,
      rules: {
        TITLE: [{ required: true, message: '请输入正标题', trigger: 'blur' }],
        STITLE: [{ required: true, message: '请输入大标题', trigger: 'blur' }]
      },
      playerOptions: {
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'video/mp4',
            src: ''
          }
        ]
      }
    }
  },
  filters: {
    typeFilter(type) {
      const statusMap = {
        原创: 'success',
        视频: 'info'
      }
      return statusMap[type]
    },
    statueFilter(statue) {
      const statusMap = {
        保存: 'info',
        审核中: 'warning',
        未通过: 'danger',
        审核通过: 'success'
      }
      return statusMap[statue]
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    transData() {
      var data = this.articles
      data.forEach(function(item, i) {
        var type = item['TYPE']
        if (type === 0) {
          data[i]['TYPE'] = '原创'
        } else {
          data[i]['TYPE'] = '视频'
        }
        var statue = item['STATUE']
        if (statue === 0) {
          data[i]['STATUE'] = '保存'
        } else if (statue === 1) {
          data[i]['STATUE'] = '审核中'
        } else if (statue === 2) {
          data[i]['STATUE'] = '未通过'
        } else {
          data[i]['STATUE'] = '审核通过'
        }

        var created = item['CREATED']
        data[i]['CREATED'] = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      }, this)
      return data
    }
  },
  created() {
    this.getArticle(this.statue, this.page, this.type)
  },
  components: {
    VueVideoPlayer,
    getArticleByStatueSelf,
    pagination,
    deleteArticle,
    setArticleStatue,
    updateArticle,
    parseTime,
    Tinymce
  },
  methods: {
    getArticle(statue, page, type) {
      this.listLoading = true
      getArticleByStatueSelf(statue, page, type).then(response => {
        if (response.code === 20000) {
          this.articles = response.data.data
          this.count = response.data.count
          this.$message({
            type: 'success',
            message: '获取成功'
          })
        } else {
          this.$message({
            type: 'info',
            message: '获取失败,请重试!'
          })
        }
        this.listLoading = false
      })
    },
    handleDelete: function(row) {
      // 删除文章
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除评论
          deleteArticle(row.ID + ',').then(response => {
            if (response.code === 20000) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getArticle(this.statue, this.page, this.type)
            } else {
              this.$message({
                type: 'info',
                message: '删除失败,请重试'
              })
            }
          })
        })
        .catch(() => {
          // 取消
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    handleClick: function() {
      // 查看
    },
    handleCurrentChange(page) {
      this.page = page
      this.getArticle(this.statue, page, this.type)
    },
    handlerTypeChange(type) {
      this.type = type
      this.getArticle(this.statue, this.page, this.type)
    },
    handlerStatueChange(statue) {
      this.statue = statue
      this.getArticle(statue, this.page, this.type)
    },
    handleContentMore(row) {
      this.dialogTableVisible = true
      if (this.type === '0') {
        // 文章
        this.content = row.CONTENT
      } else {
        // 视频
        this.playerOptions.sources[0].src = row.CONTENT
      }
    },
    handleUpdate(row) {
      this.dialogUpdateVisible = true
      this.form.CONTENT = row.CONTENT
      this.form.TITLE = row.TITLE
      this.form.STITLE = row.STITLE
    },
    cancelUpdate() {
      // 取消修改
      this.dialogUpdateVisible = false
      // this.$refs['form'].clearValidate()
    },
    onSubmit(row) {
      // 提交修改
      this.$refs['form'].validate(valid => {
        if (valid) {
          updateArticle(this.form, row.ID).then(response => {
            if (response.code === 20000) {
              this.$message({
                type: 'info',
                message: '修改成功'
              })
              this.dialogUpdateVisible = false
              this.getArticle(this.statue, this.page, this.type)
            }
          })
        } else {
          return false
        }
      })
    },
    handleModifyStatus(row) {
      // 修改文章状态
      // 发布(将保存状态转成审核中)
      this.$confirm('是否发布?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 修改
          setArticleStatue(row.ID, 1).then(response => {
            if (response.code === 20000) {
              // 修改成功
              this.dialogUpdateVisible = false
              this.getArticle(this.statue, this.page, this.type)
            }
          })
        })
        .catch(() => {
          // 取消
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
    },
    close() {
      // this.$refs['form'].clearValidate()
    }
  }
}
</script>

<style scoped>
.el-radio-group {
  margin: 10px;
}
.type {
  margin-left: 10px;
}
.el-table {
  margin: 5px;
}
</style>

