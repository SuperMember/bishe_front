<template>
  <div>
    <label class="type" >评论类型:</label>
    <el-radio-group v-model="type" @change="handlerTypeChange(type)">
      <el-radio-button label="3">全部</el-radio-button>
      <el-radio-button label="0">帖子</el-radio-button>
      <el-radio-button label="1">新闻</el-radio-button>
      <el-radio-button label="2">作家</el-radio-button>
    </el-radio-group>
    <br/>
    <label class="type" >评论状态:</label>
    <el-radio-group v-model="statue" @change="handlerStatueChange(statue)">
      <el-radio-button label="2">全部</el-radio-button>
      <el-radio-button label="0">正常</el-radio-button>
      <el-radio-button label="1">已删除</el-radio-button>
    </el-radio-group>
    <div style="margin:10px;">
      <el-table
          :data="transUserData"
          border fit
          @expand-change="handlerExpandChange"
          >
          <el-table-column
            type="expand">
            <template >
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
              <!-- <el-table :data="replyData">
                <el-table-column property="ID" label="ID" width="150"></el-table-column>
                <el-table-column property="USER_ID" label="用户ID" width="80"></el-table-column>
                <el-table-column property="CONTENT" label="回复内容"></el-table-column>
                <el-table-column property="COMMENT_ID" label="回复ID" width="80"></el-table-column>
                <el-table-column property="TOUSER_ID" label="被回复ID"  width="100"></el-table-column>
                <el-table-column property="URL" label="图片链接"></el-table-column>
                <el-table-column property="CREATED" label="回复时间" width="150"></el-table-column>
              </el-table> -->
              <el-row>
                <el-col :span="10" v-for="(o) in replyData" :key="o" style="margin-right:10px;margin-bottom:10px;">
                  <el-card :body-style="{ padding: '0px' }">
                    <img :src="o.IMG" class="image">
                    <span class="name">{{o.USERNAME}}</span>
                    <!-- <span class="name">{{o.USERNAME}}</span> -->
                    <span style="float:right;margin-right:15px;margin-top:10px">{{o.COUNT}}</span>
                    <svg-icon icon-class="icon_zan" style="width:20px;height:20px;margin-top:10px;margin-right:10px;float:right"></svg-icon>
                    <div style="padding: 14px;" class="content">
                      <span>{{o.CONTENT}}</span>
                      <br/>
                      <img :src="o.URL"  style="height:100px;" v-if="o.URL!=null"/>
                      <div class="bottom clearfix">
                        <time class="time">{{ o.CREATED }}</time>
                        <el-button type="text" class="button" @click="handleReplyDelete(o.ID)">删除</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <pagination  v-on:handleChange="handleReplyCurrentChange" :count="replyCount"></pagination>
            </template>
          </el-table-column>
          <el-table-column
            prop="ID"
            label="ID"
            min-width="150" 
            >
          </el-table-column>
          <el-table-column
            prop="CONTENT"
            label="内容"
            width="120">
            <template slot-scope="scope">
            <el-dialog title="内容详情" :visible.sync="dialogMoreVisible">
              <div v-html="scope.row.CONTENT"></div>
            </el-dialog>
            <el-button @click="handleContentMore()">查看内容</el-button>
          </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="被评论用户ID"
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
              <el-button v-popover:popover @click="handleHover(scope.row.BELONG_ID)">{{scope.row.BELONG_ID}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="评论用户ID"
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
              <el-button v-popover:popover @click="handleHover(scope.row.USER_ID)">{{scope.row.USER_ID}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="评论类型"
            width="120"
            align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.TYPE | typeFilter">{{scope.row.TYPE}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="图片"
            width="100">
            <template slot-scope="scope">
              <img :src="scope.row.URL" style="width:50px;height:50px;" v-if="scope.row.URL!=''"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="COUNT"
            label="点赞数量"
            width="120"
            align="center">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="80">
            <template slot-scope="scope">
               <el-button  size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    
  <pagination  v-on:handleChange="handleCurrentChange" :count="count"></pagination>
  
  </div>
</template>

<script>
import { getAllComments, deleteComment, getReplyById } from '@/api/comment'
import { getUserById } from '@/api/user'
import pagination from '../../../components/pagination'
import SvgIcon from '../../../components/SvgIcon'
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      type: '3',
      statue: '2',
      dialogTableVisible: false,
      replyData: [],
      replyCount: 0,
      expand: true,
      userData: {},
      dialogMoreVisible: false
    }
  },
  computed: {
    // 获取数据 将有效标志的0和1转化
    transUserData() {
      var data = this.tableData
      data.forEach(function(item, i) {
        var type = item['TYPE']
        if (type === 0) {
          data[i]['TYPE'] = '帖子'
        } else if (type === 1) {
          data[i]['TYPE'] = '新闻'
        } else {
          data[i]['TYPE'] = '作家'
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
        '帖子': 'success',
        '新闻': 'info',
        '作家': 'warning'
      }
      return statusMap[type]
    }
  },
  components: {
    getAllComments, pagination, deleteComment, getReplyById, SvgIcon, getUserById
  },
  created() {
    this.getComments(this.statue, this.type, 1)
  },
  methods: {
    getComments(statue, type, page) {
      getAllComments(statue, type, page).then(response => {
        this.tableData = response.data.data
        this.count = response.data.count
      })
    },
    handleCurrentChange(page) {
      this.getComments(this.statue, this.type, page)
    },
    handleDelete(row) {
      this.$confirm('是否删除该用户的评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除评论
        deleteComment(row.ID, row.USER_ID).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getComments(this.statue, this.type, 1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除失败,请重试!'
          })
        })
      }).catch(() => {
        // 取消
        row.STATUE = !this.currentStatue
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handlerTypeChange(type) {
      // 按照评论类型获取数据
      this.getComments(this.statue, type, 1)
    },
    handlerStatueChange(statue) {
      // 按照评论状态获取数据
      this.getComments(statue, this.type, 1)
    },
    handlerExpandChange(row, expandedRows) {
      // 处理展开事件
      if (this.expand === true) {
        getReplyById(row.ID, 1).then(response => {
          this.replyData = response.data.data
          this.replyCount = response.data.count
        })
      }
      this.expand = !this.expand
    },
    handleReplyDelete(id) {
      // 删除回复
    },
    handleReplyCurrentChange(row) {
      // 回复分页
      getReplyById(row.ID, 1).then(response => {
        this.replyData = response.data.data
        this.replyCount = response.data.count
      })
    },
    handleHover(id) {
      getUserById(id).then(response => {
        this.userData = response.data
      })
    },
    handleContentMore() {
      this.dialogMoreVisible = true
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.el-radio-group{
  margin: 10px;
}

.type{
  margin-left: 10px;
}

.time {
    font-size: 13px;
    color: #999;
    
  }
  
  .content{
    clear: both;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    clear: both;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    margin: 10px;
    width: 50px;
    height: 50px;
    display: block;
    float: left;
  }

  .name{
    margin-top: 15px;
    float: left;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
.svg{
  width: 15px;
  height: 15px;
}

</style>

