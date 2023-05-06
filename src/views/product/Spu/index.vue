<template>
  <div class="spu">
    <Category @getCategory="cateid" />

    <el-card style="width: 97%; margin-top: 30px;">
      <div v-show="isShow">
        <el-button type="success" plain icon="el-icon-plus" :disabled="!cid3" @click="showadd">添加SPU</el-button>

        <el-table
          :data="infolist"
          stripe
          style="width: 97%; margin-top: 30px;"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column
            prop="attrName"
            label="Spu名称"
            align="center"
          />
          <el-table-column
            prop="attrName"
            label="Spu描述"
            align="center"
          />

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" icon="el-icon-edit" @click="handleEdit(scope.row)" />
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" />
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" />
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>

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
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Spu',
  data() {
    return {
      isShow: true,
      cid1: '',
      cid2: '',
      cid3: '',
      infolist: [],
      page: 1,
      pageSize: 9,
      pageSizes: [9, 13, 17],
      total: 0
    }
  },
  methods: {
    cateid({ id, level }) {
      if (level === 1) {
        this.cid1 = id
        this.cid2 = ''
        this.cid3 = ''
      } else if (level === 2) {
        this.cid2 = id
        this.cid3 = ''
      } else {
        this.cid3 = id
        this.getInfo()
      }
    },
    getInfo() {

    },
    showadd() {
      this.isShow = false
    }
  }
}

</script>

<style scoped>

  .spu {
    width: 100%;
  }

</style>
