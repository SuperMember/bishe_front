<template>
  <div>
     <el-radio-group v-model="statue" @change="handlerRadioChange(statue)">
      <el-radio-button label="2">全部</el-radio-button>
      <el-radio-button label="0">正常</el-radio-button>
      <el-radio-button label="1">小黑屋</el-radio-button>
    </el-radio-group>
    <el-table
        :loading="loading"
        :data="transUserData"
        style="width: 100%">
        <el-table-column
          label="ID"
          width="120"
          prop="ID">
        </el-table-column>
        <el-table-column
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img style="width:50px;height:50px;" :src="scope.row.IMG"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="USERNAME"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="SEX"
          label="性别"
          width="100">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.SEX" style="width:30px;height:30px;"></svg-icon>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120">
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
          prop="DEGREE"
          label="等级"
          width="100">
        </el-table-column>
        <el-table-column
          prop="PHONE"
          label="注册号码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="PASSWORD"
          label="密码"
          width="200">
        </el-table-column>
        <el-table-column
          prop="POINTS"
          label="积分"
          width="100">
        </el-table-column>
        <el-table-column
          prop="CREATED"
          label="创建时间"
          width="150">
        </el-table-column>
      </el-table>
      <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
  </div>
  
</template>

<script>
import { getUser, setUserStatue } from '@/api/user'
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
      }, this)
      return data
    }
  },
  components: { getUser, setUserStatue, pagination, SvgIcon },
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

