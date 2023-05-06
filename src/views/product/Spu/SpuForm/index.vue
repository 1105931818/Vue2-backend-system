<template>
  <div>
    <el-form ref="form" :model="spuData" label-width="80px" style="margin-top: 15px;">
      <el-form-item label="Spu名称">
        <el-input v-model="spuData.spuName" placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌" style="margin-top: 15px;">
        <el-select v-model="spuData.tmId" placeholder="请选择品牌">
          <el-option v-for="item in spuArr" :key="item.id" :label="item.tmName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spuData.description"
          type="textarea"
          :rows="5"
          placeholder="描述"
        />
      </el-form-item>
      <el-form-item label="SPU图片">
        <!--
            上传图片
            :on-preview：预览图片
            :on-remove：删除图片
            file-list：照片墙
         -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="imgArr"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" style="margin-top: 15px;">
        <el-select value="" placeholder="请选择品牌">
          <el-option v-for="item in saleArr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button type="success" icon="el-icon-plus" style="margin-left: 25px;">添加销售属性</el-button>
        <el-table
          :data="spuData.spuSaleAttrList"
          stripe
          style="width: 100%; margin-top: 20px;"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="180"
            align="center"
          />
          <el-table-column
            prop="spuSaleAttrValueList"
            label="属性名称列表"
            align="center"
          >
            <template slot-scope="{ row }">
              <!--
                tag标签
                -->
              <el-tag
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.spuSaleAttrValueList.inputVisible"
                ref="saveTagInput"
                v-model="inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="updataSpu(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">立即创建</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'SpuForm',
  comments: {

  },
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      spuData: {
        // 三级分类的ID
        category3Id: 0,

        // 描述
        description: '',

        // SPU名称
        spuName: '',

        // 品牌的ID
        tmId: 0,

        // 收集SPU图片的信息
        spuImageList: [
          {
            id: 0,
            imgName: '',
            imgUrl: '',
            spuId: 0
          }
        ],

        // 品牌属性与属性值
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: '',
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: '',
                saleAttrName: '',
                saleAttrValueName: '',
                inputVisible: false,
                spuId: 0
              }
            ]
          }
        ]
      },
      imgArr: [],
      spuArr: [],
      saleArr: [],
      inputValue: ''
    }
  },
  methods: {
    onSubmit() {

    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async initSpuData(row) {
      // 获取spu信息
      const spuresult = await this.$API.spu.spubyid(row.id)
      if (spuresult.code === 200) {
        this.spuData = spuresult.data
      }

      // 获取品牌信息
      const traderesult = await this.$API.spu.trademarklist()
      if (traderesult.code === 200) {
        this.spuArr = traderesult.data
      }

      // 获取图片信息
      const imgresult = await this.$API.spu.spuimge(row.id)
      if (imgresult.code === 200) {
        const listArr = imgresult.data
        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.imgArr = listArr
      }

      // 获取全部销售属性
      const saleresult = await this.$API.spu.saleattr()
      if (saleresult.code === 200) {
        this.saleArr = saleresult.data
      }
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}

</script>

<style>
 .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
