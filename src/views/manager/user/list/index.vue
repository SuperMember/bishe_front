<template>
  <div>
     <el-radio-group v-model="statue" @change="handlerRadioChange(statue)">
      <el-radio-button label="2">全部</el-radio-button>
      <el-radio-button label="0">正常</el-radio-button>
      <el-radio-button label="1">小黑屋</el-radio-button>
    </el-radio-group>
    <el-table
        border
        :loading="loading"
        :data="transUserData"
        style="width: 100%">
        <el-table-column
          label="ID"
          width="120">
            <template slot-scope="scope">
              <el-tag >{{scope.row.ID}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="头像"
          width="100"
          align="center">
          <template slot-scope="scope">
            <img style="width:50px;height:50px;" :src="scope.row.IMG"/>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="150"
          align="center">
          <template slot-scope="scope">
              <el-tag type="info">{{scope.row.USERNAME}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          prop="SEX"
          label="性别"
          width="100"
          align="center">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.SEX" style="width:30px;height:30px;"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
          align="center">
          <template slot-scope="scope"> 
            <el-select v-model="scope.row.STATUE" placeholder="请选择" @change="handlerSelectChange(scope.row)">
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
          label="等级"
          width="100"
          align="center">
           <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.DEGREE}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="注册号码"
          width="150">
           <template slot-scope="scope">
              <el-tag type="warning">{{scope.row.PHONE}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          prop="PASSWORD"
          label="密码"
          width="200"
          align="center">
        </el-table-column>
        <el-table-column
          label="积分"
          width="100"
          align="center">
          <template slot-scope="scope">
              <el-tag type="info">{{scope.row.POINTS}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          width="150"
          align="center">
          <template slot-scope="scope">
              <el-tag type="danger">{{scope.row.CREATED}}</el-tag>
            </template>
        </el-table-column>
      </el-table>
      <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
  </div>
  
</template>

<script>
import { getUser, setUserStatue } from '@/api/user'
import { parseTime } from '@/utils/index'
import pagination from '../../../../components/pagination'
import SvgIcon from '../../../../components/SvgIcon'
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1,
      statue: '2',
      loading: true,
      currentStatue: false,
      options: [
        {
          value: false,
          label: '正常'
        },
        {
          value: true,
          label: '小黑屋'
        }]
    }
  },
  computed: {
    // 获取数据 将有效标志的0和1转化
    transUserData() {
      var data = this.tableData
      data.forEach(function(item, i) {
        var sex = item['SEX'] === 0 ? 'icon_man' : 'icon_woman'
        data[i]['SEX'] = sex
        var created = item['CREATED']
        data[i]['CREATED'] = parseTime(created, '{y}-{m}-{d} {h}:{i}')
      }, this)
      return data
    }
  },
  components: { getUser, setUserStatue, pagination, SvgIcon, parseTime },
  created() {
    this.getUserDate(this.statue, 1)
  },
  methods: {
    getUserDate(statue, page) {
      getUser(statue, page).then(response => {
        this.tableData = response.data.data
        this.count = response.data.count
        this.loading = false
      })
    },
    handleCurrentChange(page) {
      this.page = page
      this.getUserDate(this.statue, page)
    },
    handlerRadioChange(radio) {
      this.statue = radio
      this.loading = true
      this.getUserDate(radio, 1)
    },
    handlerSelectChange(row) {
      this.currentStatue = row.STATUE
      this.$confirm('是否修改该用户状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setUserStatue(row.ID, row.STATUE).then(response => {
          if (response.code === 20000) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.getUserDate(this.statue, this.page)
          } else {
            this.$message({
              type: 'success',
              message: '修改失败,请重试!'
            })
          }
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '修改失败,请重试!'
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
</style>

