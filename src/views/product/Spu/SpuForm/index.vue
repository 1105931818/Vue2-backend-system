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
            file-list：照片墙需要展示的数据（数组，数组里面的元素必须有name、url属性）
            on-preview:照片墙预览的回调函数
         -->
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="imgArr"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" style="margin-top: 15px;">
        <el-select v-model="attrIdName" :placeholder="`还有${unSaleArr.length}个未选择销售属性`">
          <el-option v-for="item in unSaleArr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`" />
        </el-select>
        <el-button type="success" :disabled="!attrIdName" icon="el-icon-plus" style="margin-left: 25px;" @click="addSaleAttr">添加销售属性</el-button>
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
                v-for="(tag, index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm(row)"
                @blur="handleInputConfirm(row)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            width="180"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="spuData.spuSaleAttrList.splice($index, 1)" />
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="onSubmit">保存</el-button>
        <el-button @click="changShow">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'SpuForm',
  data() {
    return {
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      attrIdName: '',
      spuData: {
        // 三级分类的ID
        category3Id: '',

        // 描述
        description: '',

        // SPU名称
        spuName: '',

        // 品牌的ID
        tmId: '',

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
          /* {
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
          } */
        ]
      },
      imgArr: [],
      spuArr: [],
      saleArr: []
    }
  },
  computed: {
    /* 还未选择的销售属性 */
    unSaleArr() {
      /* 整个平台的销售属性一共三个：颜色，尺寸，版本 */
      /* 当前SPU拥有的销售属性spuData.spuSaleAttrList */
      return this.saleArr.filter(item => {
        return this.spuData.spuSaleAttrList.every(item1 => {
          return item.name !== item1.saleAttrName
        })
      })
    }

  },
  methods: {
    async onSubmit() {
      this.spuData.spuImageList = this.imgArr.map(item => {
        return {
          imageName: item.name,
          imageUrl: item.response ? item.response.data : item.url
        }
      })
      if (this.spuData.spuName.trim() === '') {
        this.$message('请输入SPU名称')
        return
      }
      if (this.spuData.tmId === '') {
        this.$message('请选择品牌')
        return
      }
      if (this.spuData.description.trim() === '') {
        this.$message('请输入SPU描述')
        return
      }
      if (this.spuData.spuImageList === []) {
        this.$message('请添加SPU图片')
        return
      }
      if (this.spuData.spuSaleAttrList === []) {
        this.$message('请添加SPU销售属性')
        return
      }
      const result = await this.$API.spu.addspuInfo(this.spuData)
      if (result.code === 200) {
        this.$emit('changeScene', { scene: 0, flag: this.spuData.id })
        this.$message.success('保存成功')

        // 清除数据,Object.assign:es6新增方法，可以合并对象
        // this._data：可以操作data中的响应式数据
        // this.$options:可以获取配置对象，配置对象的data函数执行，返回的响应式数据为初始化值
        Object.assign(this._data, this.$options.data())
        /* this.spuData = {
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
        }
        this.imgArr = []
        this.spuArr = []
        this.saleArr = [] */
      }
    },
    handleRemove(file, fileList) {
      this.imgArr = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res, file, fileList) {
      this.imgArr = fileList
    },
    // 获取修改数据
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
    // 获取添加数据
    async initaddSpu(cid3) {
      // 获取品牌信息
      this.spuData.category3Id = cid3
      const traderesult = await this.$API.spu.trademarklist()
      if (traderesult.code === 200) {
        this.spuArr = traderesult.data
      }

      // 获取全部销售属性
      const saleresult = await this.$API.spu.saleattr()
      if (saleresult.code === 200) {
        this.saleArr = saleresult.data
      }
    },
    showInput(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim()) {
        /* row.spuSaleAttrValueList.forEach(item => {
          if (inputValue !== item.saleAttrValueName) {
            const newSaleValue = { baseSaleAttrId, saleAttrValueName: inputValue }
            row.spuSaleAttrValueList.push(newSaleValue)
            row.inputVisible = false
            row.inputValue = ''
          } else {
            this.$message('不能添加相同属性值')
            row.inputValue = ''
            return
          }
        }) */

        const result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName !== inputValue)
        if (result) {
          const newSaleValue = { baseSaleAttrId, saleAttrValueName: inputValue }
          row.spuSaleAttrValueList.push(newSaleValue)
          row.inputVisible = false
          row.inputValue = ''
        } else {
          this.$message('不能添加相同属性值')
          row.inputValue = ''
          return
        }
      } else {
        this.$message('属性值不能为空')
        row.inputValue = ''
        return
      }
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdName.split(':')
      const newSaleArr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList: [] }
      this.spuData.spuSaleAttrList.push(newSaleArr)
      this.attrIdName = ''
    },
    changShow() {
      this.$emit('changeScene', { scene: 0, flag: '1' })
      /* this.spuData = {
        // 三级分类的ID
        category3Id: 0,

        // 描述
        description: '',

        // SPU名称
        spuName: '',

        // 品牌的ID
        tmId: '',

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
      }
      this.imgArr = []
      this.spuArr = []
      this.saleArr = [] */

      // 清除数据
      Object.assign(this._data, this.$options.data())
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
