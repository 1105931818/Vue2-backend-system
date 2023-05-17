<template>
  <div class="obser">
    <el-row :gutter="10">
      <el-col :span="12">
        <Category />
      </el-col>
      <el-col :span="12">
        <Search />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Category from './Category'
import Search from './Search'

export default {
  name: 'Observe',
  components: {
    Category,
    Search
  },
  data() {
    return {

    }
  }
}

</script>

<style>

.obser{
  width: 100%;
  margin-top: 20px;

}
</style>

