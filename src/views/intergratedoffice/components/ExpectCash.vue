<template>
  <div>
    <div>
      <el-form label-width="140px">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="总计">
              <el-input :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="现金流入">
              <el-input :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="现金流出">
              <el-input :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="预期利润总额">
              <el-input :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ExpectCash',
  data() {
    return {
      dialogVisible: false
    }
  }
}

</script>
