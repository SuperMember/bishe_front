<template>
  <!-- <el-table
    :data="tableData3"
    style="width: 100%"
    height="400">
    <el-table-column
      fixed
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
  </el-table> -->
  <div>
    <el-dialog title="添加" :visible.sync="dialogVisible" :modal="false" :modal-append-to-body="false" @close="close">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="省份" :label-width="formLabelWidth" prop="province">
             <cascader :seleted="handleCascaderSeleted" ></cascader>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
            <el-input v-model="form.address" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮编" :label-width="formLabelWidth" prop="zip">
            <el-input v-model="form.zip" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary"  @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
      
    <el-button type="primary" class="add" @click="handerAdd">增加</el-button>
    <t :tableData="tableData" :listLoading="listLoading" v-on:refresh="listenRefresh"></t>
    <pagination v-on:handleChange="handleCurrentChange" :count="count"></pagination>
  </div>
</template>

<script>
import cascader from '../../components/Cascader'
import pagination from '../../components/pagination'
import t from '../table'
import { getTable } from '@/api/data'
import { addOne } from '@/api/table'
export default {
  data() {
    var checkZip = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮编不能为空'))
      } else {
        if (!(/^[0-9]{6}$/.test(value))) {
          callback(new Error('邮编格式不对'))
        } else {
          callback()
        }
      }
    }
    return {
      tableData: [],
      listLoading: true,
      page: 1,
      count: 10,
      formLabelWidth: '120px',
      dialogVisible: false,
      form: {},
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        zip: [
          { validator: checkZip, trigger: 'blur', required: true }
        ]
      }
    }
  },
  watch: {

  },
  components: { pagination, t, cascader, addOne },
  created() {
    this.fetchData(1)
  },
  methods: {
    fetchData(page) {
      this.listLoading = true
      getTable(page).then(response => {
        this.tableData = response.data
        this.listLoading = false
        this.count = parseInt(response.message)
      })
    },
    handleCurrentChange: function(data) {
      this.page = data
      this.fetchData(this.page)
    },
    listenRefresh: function(data) {
      // 刷新页面
      this.fetchData(1)
    },
    handerAdd: function() {
      this.dialogVisible = true
    },
    handleSave: function() {
      // 保存
      addOne(this.$refs['form']).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.dialogVisible = false
        this.fetchData(1)
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '添加失败,请稍后重试'
        })
      })
    },
    handleCascaderSeleted: function(val) {
      console.log(val)
      this.$refs['form'].province = val
    },
    close: function() {
      // 对话框关闭事件
      console.log('close')
      this.$refs['form'].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleSave()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
.add , .demo-form-inline{
  margin: 10px
}
</style>