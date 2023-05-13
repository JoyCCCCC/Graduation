<template>
  <div>
    <el-form label-width="140px" size="small">
      <el-row :gutter="32">
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="所得税费">
            <el-input />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'IncomeTax'
}
</script>
