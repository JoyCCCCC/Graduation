<template>
  <el-form :model="abolishtype" label-width="120px">
    <el-form-item label="废止类型：">
      <span>废止类型...</span>
    </el-form-item>
    <el-form-item label="备注：">
      <span>废止备注...</span>
    </el-form-item>
    <el-form-item label="附件：" />
  </el-form>
</template>

<script>
export default {
  name: 'AbolishInfo',
  components: {},
  data: function() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
