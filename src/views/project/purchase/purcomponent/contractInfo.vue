<template>
  <div class="form-text-list">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">合同不含税金额：</span>
          <span v-ellipsis:top="contractInfo.noDuesAmount" class="text">{{ contractInfo.noDuesAmount }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">合同金额：</span>
          <span v-ellipsis:top="contractInfo.ContractAmount" class="text">{{ contractInfo.ContractAmount }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    contractInfo: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: { }
}
</script>

<style lang='scss' scoped>
</style>

