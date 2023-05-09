<template>
  <div>
    <el-form ref="form" :data="skuInfo" label-width="100px">
      <el-form-item label="SPU名称">
        {{ spu.spuName }}
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" type="number" placeholder="价格(元)" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          type="textarea"
          :rows="5"
          placeholder="规格描述"
        />
      </el-form-item>
      <el-form-item label="平台属性" style="margin-top: 30px;">
        <el-form :inline="true" class="demo-form-inline" style="margin-top: -1px; margin-left: 25px;">
          <el-form-item v-for="(sku, index) in skuData" :key="index" :label="sku.attrName" style="margin-right: 40px; margin-bottom: 10px;">
            <el-select v-model="sku.attrIdandvalueId" placeholder="请选择">
              <el-option v-for="item in sku.attrValueList" :key="item.id" :label="item.valueName" :value="`${sku.id}:${item.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性" style="margin-top: 25px;">
        <el-form :inline="true" class="demo-form-inline" style="margin-top: -1px; margin-bottom: 10px; margin-right: 10px; margin-left: 25px;">
          <el-form-item v-for="(sale, index) in saleArr" :key="index" :label="sale.saleAttrName" style="margin-right: 40px; margin-bottom: 10px;">
            <el-select v-model="sale.attrIdandvalueId" placeholder="请选择">
              <el-option v-for="item in sale.spuSaleAttrValueList" :key="item.id" :label="item.saleAttrValueName" :value="`${sale.id}:${item.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="imgArr"
          stripe
          border
          style="width: 95%; margin-top: 5px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="80"
            align="center"
          />
          <el-table-column
            prop="imgUrl"
            label="图片"
            align="center"
          >
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 80px; height: 80px;">
            </template>
          </el-table-column>
          <el-table-column
            prop="imgName"
            label="名称"
            align="center"
          />
          <el-table-column
            prop="name"
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-button v-show="row.isDefault === 0" type="warning" @click="adddefault(row)">设为默认</el-button>
              <el-button v-show="row.isDefault === 1">默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
        <el-button @click="backScene">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'SkuForm',
  data() {
    return {
      // 平台属性
      skuData: [],

      // 销售属性
      saleArr: [],
      imgArr: [],

      // 收集Sku数据
      skuInfo: {
        category3Id: 0,

        // 价格
        price: '',
        spuId: 0,
        tmId: 0,

        // 默认图片
        skuDefaultImg: '',

        // 描述
        skuDesc: '',

        // 名称
        skuName: '',

        // 重量
        weight: '',

        // 平台属性
        skuAttrValueList: [
          /* {
            attrId: 0,
            valueId: 0,
          } */
        ],

        // 收集图片
        skuImageList: [
          /* {
            id: 0,
            imgName: '',
            imgUrl: '',
            isDefault: '',
            skuId: 0,
            spuImgId: 0
          } */
        ],

        // 销售属性
        skuSaleAttrValueList: [
          /* {
            id: 0,
            saleAttrId: 0,
            saleAttrName: '',
            saleAttrValueId: 0,
            saleAttrValueName: '',
            skuId: 0,
            spuId: 0
          } */
        ]
      },
      spu: {},

      // 收集图片的数据字段,但是确实isDefault字段
      imagelist: []
    }
  },
  methods: {
    async onSubmit() {
      if (this.skuInfo.price === '') {
        this.$message('请输入价格')
        return
      }
      if (this.skuInfo.weight === '') {
        this.$message('请输入重量')
        return
      }
      if (this.skuInfo.skuName === '') {
        this.$message('请输入名称')
        return
      }
      if (this.skuInfo.skuDesc === '') {
        this.$message('请输入描述')
        return
      }
      /* const arr = []
      this.skuData.forEach(item => {
        if (item.attrIdandvalueId) {
          const [attrId, valueId] = item.attrIdandvalueId.split(':')
          arr.push({ attrId, valueId })
        }
      })
      this.skuInfo.skuAttrValueList = arr */
      this.skuInfo.skuAttrValueList = this.skuData.reduce((prev, item) => {
        if (item.attrIdandvalueId) {
          const [attrId, valueId] = item.attrIdandvalueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])

      this.skuInfo.skuSaleAttrValueList = this.saleArr.reduce((prev, item) => {
        if (item.attrIdandvalueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdandvalueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])

      this.skuInfo.skuImageList = this.imgArr.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })

      const result = await this.$API.spu.addSku(this.skuInfo)
      if (result.code === 200) {
        this.$emit('changeScene', { scene: 0, flag: '1' })
        Object.assign(this._data, this.$options.data())
        this.$message.success('保存成功')
      }
    },
    adddefault(row) {
      this.imgArr.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    backScene() {
      this.$emit('changeScene', { scene: 0, flag: '1' })
      Object.assign(this._data, this.$options.data())
    },
    handleSelectionChange(params) {
      this.imagelist = params
    },
    async initSkuData(cid1, cid2, row) {
      this.spu = row
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      // 获取平台属性的数据
      const skureslut = await this.$API.spu.getattrSku({ category1Id: cid1, category2Id: cid2, category3Id: row.category3Id })
      if (skureslut.code === 200) {
        this.skuData = skureslut.data
      }

      // 获取销售属性的数据
      const salereslut = await this.$API.spu.getSkuSale(row.id)
      if (salereslut.code === 200) {
        this.saleArr = salereslut.data
      }

      // 获取图片数据
      const imgreslut = await this.$API.spu.getSkuImg(row.id)
      if (imgreslut.code === 200) {
        const list = imgreslut.data
        list.forEach(item => {
          item.isDefault = 0
        })
        this.imgArr = list
      }
    }
  }
}

</script>

<style>

</style>
