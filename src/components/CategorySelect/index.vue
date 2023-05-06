<template>
  <div class="category">
    <el-card style="width: 97%; margin-top: 10px;">
      <!--
        inline:行内表单，代表一行可以放置多个表单元素
        -->
      <el-form :inline="true" :model="cForm" class="demo-form-inline" style="margin-top: 10px;">
        <el-form-item label="一级分类">
          <el-select v-model="cForm.cid1" placeholder="请选择" :disabled="show">
            <el-option v-for="item1 in list1" :key="item1.id" :label="item1.name" :value="item1.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" style="margin-left: 30px;">
          <el-select v-model="cForm.cid2" placeholder="请选择" :disabled="show">
            <el-option v-for="item2 in list2" :key="item2.id" :label="item2.name" :value="item2.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="三级分类" style="margin-left: 30px;">
          <el-select v-model="cForm.cid3" placeholder="请选择" :disabled="show" @change="handler">
            <el-option v-for="item3 in list3" :key="item3.id" :label="item3.name" :value="item3.id" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Category',
  // eslint-disable-next-line vue/require-prop-types
  props: ['show'],
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      cForm: {
        cid1: '',
        cid2: '',
        cid3: ''
      }
    }
  },
  watch: {
    'cForm.cid1': {
      async handler(value) {
        this.list2 = []
        this.list3 = []
        this.cForm.cid2 = ''
        this.cForm.cid3 = ''
        if (value !== '') {
          this.$emit('getCategory', { id: this.cForm.cid1, level: 1 })
          const result = await this.$API.attr.category2(value)
          if (result.code === 200) {
            this.list2 = result.data
          }
        }
      }
    },
    'cForm.cid2': {
      async handler(value) {
        this.list3 = []
        this.cForm.cid3 = ''
        if (value !== '') {
          this.$emit('getCategory', { id: this.cForm.cid2, level: 2 })
          const result = await this.$API.attr.category3(value)
          if (result.code === 200) {
            this.list3 = result.data
          }
        }
      }
    }
  },
  mounted() {
    this.getCategory1()
  },
  methods: {
    async getCategory1() {
      const result = await this.$API.attr.category1()
      if (result.code === 200) {
        this.list1 = result.data
      }
    },

    handler() {
      this.$emit('getCategory', { id: this.cForm.cid3, level: 3 })
    }
  }
}

</script>

<style scoped>

.category{
  width: 100%;
}

</style>
