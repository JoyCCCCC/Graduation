<template>
  <div>
    <el-form
      ref="signInfo"
      :model="signInfo"
      label-width="105px"
      size="small"
    >
      <el-row :gutter="32">
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="甲方单位">
            <el-input v-model="signInfo.aCompanyName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="联系人">
            <el-input v-model="signInfo.acontractorName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="联系方式">
            <el-input v-model="signInfo.aContractWay" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="联系地址">
            <el-input v-model="signInfo.aContractAddress" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="乙方信息">
            <el-select v-model="signInfo.bCompany" placeholder="请选择">
              <el-option label="海峡基石" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="签订人">
            <el-select v-model="signInfo.bContractorName" placeholder="请选择">
              <el-option label="张三" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="是否安装调试">
            <el-select v-model="signInfo.isInstallDebug" placeholder="请选择">
              <el-option label="是" :value="1" />
              <el-option label="否" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="业主">
            <el-input v-model="signInfo.businessOwner" />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
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

<style lang='scss' scoped>
</style>
