<template>
  <div class="tradeMark">
    <el-button type="success" plain icon="el-icon-plus" @click="showDialog">添加</el-button>

    <!--
      对话框
      visible.sync：控制对话框显示与隐藏
     -->
    <el-dialog :title="tmFrom.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">

      <!--
        from表单
        model:把表单的数据收集到一个对象上，表单验证也需要这个属性
        Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
       -->
      <el-form ref="ruleFrom" style="width: 80%; margin: auto;" :model="tmFrom" :rules="rules">
        <el-form-item label="品 牌 名 称:" label-width="120px" prop="tmName">
          <el-input v-model.trim="tmFrom.tmName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="品牌LOGO:" label-width="120px" prop="logoUrl">

          <!--
            收集上传图片数据，不是表单元素不能使用v-model
            action：设置图片上传地址
            on-success：可以检测到图片上传成功，当图片上传成功，会执行一次
            before-upload：可以在图片上传之前执行一次
           -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog">取 消</el-button>
        <el-button type="primary" @click="addUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!--
      表格组件
      data：表格组件将来需要展示的数据--------数组类型
     -->
    <el-table style="width: 97%; margin-top: 30px;" stripe border :data="list">
      <el-table-column label="序号" type="index" align="center" width="80px" />
      <el-table-column label="品牌名称" prop="tmName" align="center" />
      <el-table-column label="品牌LOGO" prop="logoUrl" align="center">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="height: 40px;">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--
      分页器
      current-page：当前第几页
      total：数据总数
      page-size：每一页展示多少数据
      page-sizes：设置每一页展示多少数据
      layout：设置分页器布局
      pager-count：按钮的数量，连续按钮数+2
      @current-change="handleCurrentChange"
      -->
    <el-pagination
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
      style="textAlign:center ; margin: 50px auto;"
      background
      @size-change="handleSizeChange"
      @current-change="getData"
    />
  </div>
</template>

<script>

export default {
  name: 'TradeMark',
  data() {
    return {
      page: 1,
      pageSize: 9,
      pageSizes: [9, 13, 17],
      total: 0,
      list: [],
      dialogFormVisible: false,
      // 收集品牌信息
      tmFrom: {
        logoUrl: '',
        tmName: ''
      },
      /*
        表单验证
        required:必须校验字段
        message:提示信息
        trigger:用户触发校验事件函数

        自定义校验规则
        { validator: validatePass, trigger: 'blur' }
      */
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
        ],
        logoUrl: [
          { required: true, message: '请选择品牌LOGO' }
        ]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData(pager = 1) {
      this.page = pager
      const { page, pageSize } = this
      const result = await this.$API.trademark.base(page, pageSize)
      if (result.code === 200) {
        this.total = result.data.total
        this.list = result.data.records
        this.page = result.data.current
        this.pageSize = result.data.size
      }
    },
    handleEdit(row) {
      // row为服务器返回的品牌信息，直接赋值给tmFrom进行展示的话为深拷贝，不用提交就直接能修改，此时应为浅拷贝
      this.tmFrom = { ...row }
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$confirm(`你确定删除${row.tmName}吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const result = await this.$API.trademark.remove(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getData(this.list.length > 1 ? this.page : this.page - 1)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    /* handleCurrentChange(val) {
      this.page = val
      this.getData()
    }, */
    // 图片上传成功，res：上传成功之后返回前端的数据，file：上传成功之后服务器返回前端的数据
    handleAvatarSuccess(res, file) {
      this.tmFrom.logoUrl = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 图片上传检测
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    showDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
      this.tmFrom = { tmName: '', logoUrl: '' }
    },
    addUpdate() {
      this.$refs.ruleFrom.validate(async(success) => {
        if (success) {
          this.dialogFormVisible = false
          const result = await this.$API.trademark.saveUpdate(this.tmFrom)
          if (result.code === 200) {
            this.$message({
              message: this.tmFrom.id ? '修改品牌成功！' : '添加品牌成功！',
              type: 'success'
            })
            this.getData(this.tmFrom.id ? this.page : 1)
          }
        } else {
          return false
        }
      })
    }
  }
}

</script>

<style scoped>
.tradeMark {
  width: 100%;
}
.avatar-uploader .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #a09f9f;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    margin-top: 10px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
