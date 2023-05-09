<template>
  <div class="sku">
    <el-card style="width: 98%; margin-top: 20px;">
      <el-table
        :data="skuData"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
          align="center"
        />
        <el-table-column
          prop="skuName"
          label="名称"
          width="160"
          align="center"
        />
        <el-table-column
          prop="skuDesc"
          label="描述"
          align="center"
        />
        <el-table-column
          prop="skuDefaultImg"
          label="默认图片"
          width="120px"
          align="center"
        >
          <template slot-scope="{ row }">
            <img :src="row.skuDefaultImg" style="width: 90px; height: 90px;">
          </template>
        </el-table-column>

        <el-table-column
          prop="weight"
          label="重量(KG)"
          width="90"
          align="center"
        />
        <el-table-column
          prop="price"
          label="价格(元)"
          width="90"
          align="center"
        />

        <el-table-column
          label="操作"
          width="250"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-button v-if="row.isSale === 0" size="mini" type="success" icon="el-icon-bottom" @click="upsale(row)" />
            <el-button v-else size="mini" type="primary" icon="el-icon-top" @click="downsale(row)" />
            <el-button size="mini" type="warning" icon="el-icon-edit" @click="editsale(row)" />
            <el-button size="mini" type="info" icon="el-icon-info" @click="getSkuItem(row)" />
            <el-drawer
              size="35%"
              :visible.sync="drawer"
              :with-header="false"
            >
              <el-form label-width="100px" style="width: 90%; margin: auto; margin-top: 40px;">
                <el-form-item label="名称">
                  {{ skuItem.skuName }}
                </el-form-item>
                <el-form-item label="描述">
                  {{ skuItem.skuDesc }}
                </el-form-item>
                <el-form-item label="价格">
                  {{ skuItem.price }}元
                </el-form-item>
                <el-form-item label="平台属性">
                  <el-tag v-for="item in skuItem.skuAttrValueList" :key="item.id" type="success" style="margin-left: 10px;">{{ item.attrName }}:{{ item.valueName }}</el-tag>
                </el-form-item>
                <el-form-item label="商品图片">

                  <template>
                    <el-carousel indicator-position="outside">
                      <el-carousel-item v-for="item in skuItem.skuImageList" :key="item.id">
                        <img :src="item.imgUrl" alt="" style="width: 350px; height: 350px;">
                      </el-carousel-item>
                    </el-carousel>
                  </template>

                </el-form-item>
              </el-form>
            </el-drawer>
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="el-icon-info"
              icon-color="red"
              :title="`确定删除${row.spuName}吗？`"
              @onConfirm="handleDelete(row)"
            >
              <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" style="margin-left: 10px;" />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
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
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Sku',
  data() {
    return {
      page: 1,
      pageSize: 9,
      pageSizes: [9, 13, 17],
      total: 0,
      skuData: [],
      skuItem: {},
      drawer: false
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo(pager = 1) {
      this.page = pager
      const result = await this.$API.sku.getSkuInfo(this.page, this.pageSize)
      if (result.code === 200) {
        this.skuData = result.data.records
        this.page = result.data.current
        this.pageSize = result.data.size
        this.total = result.data.total
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    async handleDelete(row) {
      const result = await this.$API.sku.deletesku(row.id)
      if (result.code === 200) {
        this.getInfo(this.skuData.length > 1 ? this.page : this.page - 1)
        this.$message.success('删除成功')
      }
    },
    async upsale(row) {
      const result = await this.$API.sku.onsale(row.id)
      if (result.code === 200) {
        this.getInfo(this.page)
        this.$message.success('上架成功')
      }
    },
    async downsale(row) {
      const result = await this.$API.sku.downsale(row.id)
      if (result.code === 200) {
        this.getInfo(this.page)
        this.$message.success('下架成功')
      }
    },
    editsale(row) {
      this.$message('正在开发中')
    },
    async getSkuItem(row) {
      const result = await this.$API.sku.getSkuItem(row.id)
      if (result.code === 200) {
        this.skuItem = result.data
        this.drawer = true
      }
    }
  }
}

</script>

<style scoped>

  .sku {
    width: 100%;
  }

</style>
