<template>
  <div class="form-text-list">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">甲方单位：</span>
          <span v-ellipsis:top="signInfo.aCompanyName" class="text">{{ signInfo.aCompanyName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">联系人：</span>
          <span v-ellipsis:top="signInfo.acontractorName" class="text">{{ signInfo.acontractorName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">联系方式：</span>
          <span v-ellipsis:top="signInfo.aContractWay" class="text">{{ signInfo.aContractWay }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">联系地址：</span>
          <span v-ellipsis:top="signInfo.aContractAddress" class="text">{{ signInfo.aContractAddress }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">乙方信息：</span>
          <span v-ellipsis:top="signInfo.bCompany" class="text">{{ signInfo.bCompany }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">签订人：</span>
          <span v-ellipsis:top="signInfo.bContractorName" class="text">{{ signInfo.bContractorName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">是否安装调试：</span>
          <span v-ellipsis:top="signInfo.isInstallDebug" class="text">{{ signInfo.isInstallDebug }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">业主：</span>
          <span v-ellipsis:top="signInfo.businessOwner" class="text">{{ signInfo.businessOwner }}</span>
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
    signInfo: {
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

<style lang='scss'>
</style>

