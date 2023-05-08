<template>
  <div class="spu">
    <Category :show="scene !== 0" @getCategory="cateid" />

    <el-card style="width: 97%; margin-top: 30px;">
      <!-- 展示Spu列表 -->
      <div v-show="scene === 0">
        <el-button type="success" plain icon="el-icon-plus" :disabled="!cid3" @click="addSpu">添加SPU</el-button>

        <el-table
          :data="infolist"
          stripe
          style="width: 100%; margin-top: 30px;"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column
            prop="spuName"
            label="Spu名称"
            align="center"
          />
          <el-table-column
            prop="description"
            label="Spu描述"
            align="center"
          />

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <hint-button size="mini" type="success" icon="el-icon-plus" title="添加Spu" @click="scene = 2" />
              <hint-button size="mini" type="warning" icon="el-icon-edit" title="修改Spu" @click="updataSpu(scope.row)" />
              <hint-button size="mini" type="info" icon="el-icon-info" title="查看当前Spu全部的Sku列表" />
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                :title="`确定删除${scope.row.spuName}吗？`"
                @onConfirm="handleDelete(scope)"
              >
                <hint-button slot="reference" size="mini" type="danger" icon="el-icon-delete" title="删除Spu" />
              </el-popconfirm>
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
          @current-change="getInfo"
        />
      </div>

      <!-- 展示添加/修改Spu -->
      <SpuForm v-show="scene === 1" ref="spu" @changeScene="changeScene" />

      <!-- 展示添加SKU结构 -->
      <SkuForm v-show="scene === 2" />

    </el-card>
  </div>
</template>

<script>

import SkuForm from './SkuForm'
import SpuForm from './SpuForm'

export default {
  name: 'Spu',
  components: {
    SkuForm,
    SpuForm
  },
  data() {
    return {
      cid1: '',
      cid2: '',
      cid3: '',
      infolist: [],
      page: 1,
      pageSize: 9,
      pageSizes: [9, 13, 17],
      total: 0,
      /* 0展示Spu列表，1展示添加/修改Spu，2展示添加SKU结构 */
      scene: 0
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
    async getInfo(pager = 1) {
      this.page = pager
      const result = await this.$API.spu.product({ page: this.page, limit: this.pageSize, category3Id: this.cid3 })
      if (result.code === 200) {
        this.infolist = result.data.records
        this.page = result.data.current
        this.total = result.data.total
        this.pageSize = result.data.size
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getInfo()
    },
    async handleDelete(scope) {
      const result = await this.$API.spu.deleteSpu(scope.row.id)
      if (result.code === 200) {
        this.getInfo(this.infolist.length > 1 ? this.page : this.page - 1)
        this.$message.success('删除成功')
      }
    },
    // 添加
    addSpu() {
      this.scene = 1
      this.$refs.spu.initaddSpu(this.cid3)
    },
    // 修改
    updataSpu(row) {
      this.scene = 1
      this.$refs.spu.initSpuData(row)
    },
    changeScene({ scene, flag }) {
      this.scene = scene
      // 子组件通知父组件切换场景，需要再次获取SPU列表的数据
      if (flag) {
        this.getInfo(this.page)
      } else {
        this.getInfo()
      }
    }
  }
}

</script>

<style scoped>

  .spu {
    width: 100%;
  }

</style>
