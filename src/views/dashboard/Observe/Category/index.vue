<template>
  <div class="cate">
    <el-card>
      <div slot="header" class="cate_header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-row :gutter="15">
        <el-col :span="12">
          <lineCharts title="搜索用户数" arry="[28, 18, 36, 43, 32, 54, 75, 88]" />
        </el-col>
        <el-col :span="12">
          <lineCharts title="人均搜索次数" arry="[58, 48, 36, 43, 32, 34, 45, 48]" />
        </el-col>
      </el-row>
      <el-table
        stripe
        style="width: 100%; margin: auto; margin-top: 15px;"
        border
      >
        <el-table-column
          type="index"
          label="排名"
          width="80"
          align="center"
        />
        <el-table-column
          label="搜索关键字"
          align="center"
        />
        <el-table-column
          label="用户数"
          align="center"
          sortable
        />
        <el-table-column
          label="周涨幅"
          align="center"
          sortable
        />
      </el-table>
      <el-pagination
        :total="1000"
        :current-page.sync="currentPage1"
        :page-size="100"
        style="margin: auto; width: 80%; margin-top: 20px;"
        layout="total, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import lineCharts from './lineCharts'

export default {
  name: 'Category',
  components: {
    lineCharts
  },
  data() {
    return {
      currentPage1: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}

</script>

<style>

.cate{
    width: 100%;
}

.cate_header{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid rgb(192, 192, 192);
}
</style>
