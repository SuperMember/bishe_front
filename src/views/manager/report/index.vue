<template>
<div style="margin:10px;">
  <label>举报类型:</label>
    <el-radio-group v-model="radio" @change="radioChange">
          <el-radio-button label="3">全部</el-radio-button>
          <el-radio-button label="0">评论</el-radio-button>
          <el-radio-button label="1">文章</el-radio-button>
          <el-radio-button label="2">图片</el-radio-button>
    </el-radio-group>
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
      width="120">
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
      width="200">
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
      width="130"
      align="center">
        <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.CREATED}}</el-tag>
        </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"
      width="100">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" >审批</el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
</div>
  
</template>

<script>
import pagination from '../../../components/pagination'
import { getReport } from '@/api/report'
import { getUserById } from '@/api/user'
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      radio: '3',
      page: 1,
      type: '3',
      userData: {}
    }
  },
  computed: {
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
  components: { pagination, getReport, getUserById },
  created() {
    this.getReports(this.page, this.type)
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
    getReports(page, type) {
      getReport(page, type).then(response => {
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
      this.getReports(page, this.type)
    },
    radioChange(type) {
      this.type = type
      this.getReports(this.page, this.type)
    },
    handleHover(id) {
      getUserById(id).then(response => {
        this.userData = response.data
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

