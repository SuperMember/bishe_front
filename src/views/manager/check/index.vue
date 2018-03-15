<template>
  <div>
    <label class="type" >文章类型:</label>
    <el-radio-group v-model="type" @change="handlerTypeChange(type)">
      <el-radio-button label="4">全部</el-radio-button>
      <el-radio-button label="1">待审核</el-radio-button>
      <el-radio-button label="2">未通过</el-radio-button>
      <el-radio-button label="3">审核通过</el-radio-button>
    </el-radio-group>
    <div style="margin:10px;">
      <el-table
          :loading="loading"
          :data="transArticle"
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
            label="用户ID"
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
              <el-button v-popover:popover @click="handleHover(scope.row.USERID)">{{scope.row.USERID}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="TITLE"
            label="正标题"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            prop="STITLE"
            label="副标题"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            label="内容"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-dialog title="内容详情" :visible.sync="dialogTableVisible" width="1000px">
                <div v-html="content" v-if="contentType==='原创'"></div>
                <div v-else>
                  <video-player  class="video-player-box" 
                      ref="videoPlayer"
                      :options="playerOptions"
                      :playsinline="true">
                  </video-player>
                </div>
              </el-dialog>
              <el-button @click="handleContentMore(scope.row)">查看内容</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="150"
            align="center">
            <template slot-scope="scope"> 
                  <el-select v-model="scope.row.STATUE" :disabled="scope.row.STATUE===3?true:false" placeholder="请选择" @change="handlerSelectChange(scope.row)">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            width="100"
            align="center">
             <template slot-scope="scope">
              <el-tag :type="scope.row.TYPE | typeFilter">{{scope.row.TYPE}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.CREATED}}</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看内容</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <pagination  v-on:handleChange="handleCurrentChange" :count="count"></pagination>
    </div>
    
  </div>
</template>

<script>
import { getArticleByStatue, setArticleStatue } from '@/api/article'
import pagination from '../../../components/pagination'
import { getUserById } from '@/api/user'
import VueVideoPlayer from 'vue-video-player'
export default {
  data() {
    return {
      type: '4',
      articles: [],
      count: 0,
      page: 1,
      loading: true,
      contentType: '',
      content: '',
      userData: {},
      dialogTableVisible: false,
      options: [
        {
          value: 1,
          label: '审核中'
        },
        {
          value: 2,
          label: '未通过'
        },
        {
          value: 3,
          label: '审核通过'
        }
      ],
      playerOptions: {
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }]
      }
    }
  },
  created() {
    this.getArticles(this.type, this.page)
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    transArticle() {
      var data = this.articles
      data.forEach(function(item, i) {
        if (item.TYPE === 0) {
          item.TYPE = '原创'
        } else {
          item.TYPE = '视频'
        }
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
  filters: {
    typeFilter(type) {
      const statusMap = {
        '原创': 'success',
        '视频': 'info'
      }
      return statusMap[type]
    }
  },
  components: { getArticleByStatue, pagination, setArticleStatue, getUserById, VueVideoPlayer },
  methods: {
    getArticles(statue, page) {
      getArticleByStatue(statue, page).then(response => {
        if (response.code === 20000) {
          this.articles = response.data.data
          this.count = response.data.count
          this.loading = false
          this.$message({
            type: 'success',
            message: '获取成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '获取失败,请重试!'
          })
        }
      })
    },
    handlerTypeChange(type) {
      this.type = type
      this.getArticles(type, 1)
    },
    handleCurrentChange(row) {
      this.page = row
      this.getArticles(this.type, row)
    },
    handlerSelectChange(row) {
      this.$confirm('是否修改该文章状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setArticleStatue(row.ID, row.STATUE).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.getArticles(this.type, this.page)
          } else {
            this.$message({
              type: 'info',
              message: '修改失败,请重试'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },
    handleHover(id) {
      getUserById(id).then(response => {
        this.userData = response.data
      })
    },
    handleContentMore(row) {
      // 查看内容
      this.dialogTableVisible = true
      this.contentType = row.TYPE
      if (row.TYPE === '原创') {
        // 文章
        this.content = row.CONTENT
      } else {
        // 视频
        this.playerOptions.sources[0].src = row.CONTENT
      }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.type{
  margin-left:10px; 
}
.el-radio-group{
  margin: 10px;
}
</style>

