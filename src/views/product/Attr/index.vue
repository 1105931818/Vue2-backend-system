<template>
  <div class="attr">
    <Category :show="!isShow" @getCategory="cateid" />

    <el-card style="width: 97%; margin-top: 30px;">
      <div v-show="isShow">
        <el-button type="success" plain icon="el-icon-plus" :disabled="!cid3" @click="showadd">添加属性</el-button>

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
            label="属性名称"
            align="center"
            width="150px"
          />
          <el-table-column
            label="属性值列表"
          >
            <template slot-scope="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.id"
                type="success"
                disable-transitions
                style="margin-left: 15px;"
              > {{ item.valueName }} </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" icon="el-icon-edit" @click="handleEdit(scope.row)" />
              <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)" />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 添加/修改属性 -->
      <div v-show="!isShow">
        <el-form :model="attrList" :inline="true" class="demo-form-inline" style="margin-top: 15px;">
          <el-form-item label="属性名">
            <el-input v-model="attrList.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>
        <el-button type="success" plain icon="el-icon-plus" style="margin-top: 5px;" :disabled="!attrList.attrName.trim()" @click="addAttr">添加属性值</el-button>
        <el-button plain style="margin-top: 5px" @click="backadd">取消</el-button>
        <el-table
          stripe
          style="width: 100%; margin-top: 25px;"
          border
          :data="attrList.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          />
          <el-table-column
            prop="name"
            label="属性值名称"
            align="center"
          >
            <template slot-scope="{ row, $index }">
              <el-input v-if="row.flag" :ref="$index" v-model.trim="row.valueName" placeholder="请输入属性值名称" size="mini" @blur="tolook(row)" @keyup.native.enter="tolook(row)" />
              <span v-else @click="toEdit(row, $index)">{{ row.valueName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200px"
          >
            <template slot-scope="scope">
              <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                icon="el-icon-info"
                icon-color="red"
                :title="`确定删除${scope.row.valueName}吗？`"
                @onConfirm="attrDelete(scope.$index)"
              >
                <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" />
              </el-popconfirm>

            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" plain style="margin-top: 20px;" :disabled="attrList.attrValueList.length < 1" @click="addList">保存</el-button>
        <el-button plain style="margin-top: 20px" @click="backadd">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>

import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'Attr',
  data() {
    return {
      cid1: '',
      cid2: '',
      cid3: '',
      infolist: [],
      isShow: true,
      /* 收集新增/修改属性数据 */
      attrList: {
        /* 属性名 */
        attrName: '',
        /* 属性值数组 */
        attrValueList: [],
        /* cid3 */
        categoryId: 0,
        /* cid3的level */
        categoryLevel: 0
      }
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
    async getInfo() {
      const result = await this.$API.attr.infolist({ cid1: this.cid1, cid2: this.cid2, cid3: this.cid3 })
      if (result.code === 200) {
        this.infolist = result.data
      }
    },
    async handleDelete(val) {
      /* const result = await this.$API.attr.deletecate(val.categoryId)
      if (result.code === 200) {
        this.getInfo()
        this.$message.success('删除成功!')
      } */
    },
    attrDelete(index) {
      this.attrList.attrValueList.splice(index, 1)
    },
    handleEdit(val) {
      this.isShow = false
      // 需要使用深拷贝
      this.attrList = cloneDeep(val)
      this.attrList.attrValueList.forEach(item => {
        /* item.flag = false 不是响应式数据，Vue无法探测普通新增的数据 */
        this.$set(item, 'flag', false)
      })
    },
    showadd() {
      this.isShow = false
      this.attrList = {
        /* 属性名 */
        attrName: '',
        /* 属性值数组 */
        attrValueList: [],
        /* cid3 */
        categoryId: this.cid3,
        /* cid3的level */
        categoryLevel: 3
      }
    },
    addAttr() {
      if (this.attrList.attrValueList.length > 0) {
        const repat = this.attrList.attrValueList.some(item => {
          return item.valueName.trim() === ''
        })
        if (repat) {
          this.$message('输入不能为空')
        } else {
          this.attrList.attrValueList.push({
            /* 对于修改某一个属性的时候，可以在已有的属性基础上新增新的属性，但必须把已有的属性带上 */
            attrId: this.attrList.id,
            /* 属性值 */
            valueName: '',
            flag: true
            /*
              flag属性：给每一个属性值添加一个标记，用户切换查看模式与编辑模式，每一个属性值都可以控制自己的模式切换
            */
          })

          this.$nextTick(() => {
            this.$refs[this.attrList.attrValueList.length - 1].focus()
          })
        }
      } else {
        this.attrList.attrValueList.push({
          /* 对于修改某一个属性的时候，可以在已有的属性基础上新增新的属性，但必须把已有的属性带上 */
          attrId: this.attrList.id,
          /* 属性值 */
          valueName: '',
          flag: true
          /*
              flag属性：给每一个属性值添加一个标记，用户切换查看模式与编辑模式，每一个属性值都可以控制自己的模式切换
            */
        })

        this.$nextTick(() => {
          this.$refs[this.attrList.attrValueList.length - 1].focus()
        })
      }
    },
    async addList() {
      this.attrList.attrValueList = this.attrList.attrValueList.filter(item => {
        if (item.attrName !== '') {
          delete item.flag
          return true
        }
      })
      const result = await this.$API.attr.addcate(this.attrList)
      if (result.code === 200) {
        this.isShow = true
        this.$message.success('添加成功!')
        this.getInfo()
      }
      this.attrList = {
        /* 属性名 */
        attrName: '',
        /* 属性值数组 */
        attrValueList: [],
        /* cid3 */
        categoryId: 0,
        /* cid3的level */
        categoryLevel: 0
      }
    },
    backadd() {
      this.isShow = true
      this.attrList = {
        /* 属性名 */
        attrName: '',
        /* 属性值数组 */
        attrValueList: [],
        /* cid3 */
        categoryId: 0,
        /* cid3的level */
        categoryLevel: 0
      }
    },
    tolook(row) {
      if (row.valueName.trim() === '') {
        this.$message('输入不能为空')
        return
      }

      const repat = this.attrList.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName === item.valueName
        }
      })

      if (repat) {
        this.$message('已有相同属性值，请勿重复输入')
        row.valueName = ''
        return
      }
      row.flag = false
    },
    toEdit(row, index) {
      row.flag = true
      /*
        需要注意，点击span时，切换为input，但是页面重绘与重排需要时间
        应此不能立即获取到input
       */
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    }
  }
}

</script>

<style scoped>

  .attr {
    width: 100%;
  }

</style>
