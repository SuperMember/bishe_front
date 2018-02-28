<template>
  <div class="app-container">
    <!-- <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.display_time}}</span>
        </template>
      </el-table-column>
    </el-table> -->
     <el-table
     v-loading.body="listLoading" element-loading-text="Loading"
    :data="tableData"
    style="width: 100%"
    height="300">
    <el-table-column
      prop="id"
      label="ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="120">
    </el-table-column>
    <el-table-column
      width="200">
      <template slot-scope="scope">
        <el-dialog title="详情" :visible.sync="dialogVisible" :modal="false" :modal-append-to-body="false" @open="open">
        <el-form :model="form">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="form.id" :disabled="true" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="省份" :label-width="formLabelWidth">
             <cascader :selectedCurrentValue="selectedCurrentValue"></cascader>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮编" :label-width="formLabelWidth">
            <el-input v-model="form.zip" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio-group v-model="form.sex">
              <el-radio  label='男'>男</el-radio>
              <el-radio  label='女'>女</el-radio>
              <!-- <el-radio-button label="男"></el-radio-button>
              <el-radio-button label="女"></el-radio-button> -->
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button> 
          <el-button type="primary"  @click="handleSave()">确 定</el-button>
        </div>
      </el-dialog>
      <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit"></el-button>
      <el-button @click="handleDelete(scope.row)" type="primary" icon="el-icon-delete"></el-button>
        <!-- <el-button  type="text" size="small">修改</el-button>
        <el-button  type="text" size="small">删除</el-button> -->
      </template>
    </el-table-column>
    
  </el-table> 
  </div>
</template>

<script>
import cascader from '../../components/Cascader'
import { deleteOne, updateOne } from '@/api/table'
export default {
  data() {
    return {
      currentData: null,
      dialogVisible: false,
      form: {},
      formLabelWidth: '120px',
      options: [
        {
          value: '广东省',
          label: '广东省'
        },
        {
          value: '广西省',
          label: '广西省'
        },
        {
          value: '北京市',
          label: '北京市'
        },
        {
          value: '天津市',
          label: '天津市'
        },
        {
          value: '上海市',
          label: '上海市'
        }
      ],
      selectedCurrentValue: []
    }
  },
  components: {
    deleteOne,
    updateOne,
    cascader
  },
  props: {
    tableData: null,
    listLoading: true
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    // this.selectedCurrentValue.push()
  },
  methods: {
    handleClick(row) {
      this.form = row
      this.dialogVisible = true
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确定要删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOne(row.id)
            .then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            })
            .catch(() => {
              this.$message({
                type: 'fail',
                message: '删除异常,请重试!'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 保存
    handleSave() {
      this.$confirm('确定要进行修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 修改
        // 设置省份
        this.form.province = this.selectedCurrentValue
        updateOne(this.form)
          .then(response => {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.dialogVisible = false
            // 通知父组件刷新页面
            this.$emit('refresh', 'refresh')
          })
          .catch(() => {
            this.$message({
              type: 'fail',
              message: '修改失败,请重试!'
            })
          })
      })
    },
    handleSelectedChange: function(value) {
      // 下拉框
      console.log(value)
    },
    open: function() {
      // 监听对话框打开
      this.selectedCurrentValue.push(this.form.province)
    }
  }
}
</script>
