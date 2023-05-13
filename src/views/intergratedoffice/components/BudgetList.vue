<template>
  <div>
    <div class="mb-18">
      <el-button size="small" type="primary" @click="dialogVisible=true">项目预算</el-button>
    </div>
    <div>
      <el-table
        border
        stripe
        size="small"
        class="mb-18"
      >
        <el-table-column label="项目编号" align="center" show-overflow-tooltip />
        <el-table-column label="项目名称" align="center" show-overflow-tooltip />
        <el-table-column label="项目销售金额" align="center" show-overflow-tooltip />
        <el-table-column label="项目本月预计开票" align="center" show-overflow-tooltip />
        <el-table-column label="项目预计回款" align="center" show-overflow-tooltip />
        <el-table-column label="采购总成本" align="center" show-overflow-tooltip />
        <el-table-column label="本月预计成本" align="center" show-overflow-tooltip />
        <el-table-column label="本月预计付款" align="center" show-overflow-tooltip />
        <el-table-column label="操作" align="center" show-overflow-tooltip>
          <el-button type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加本月项目预算" :visible.sync="dialogVisible">
      <el-form size="small" label-width="100px">
        <el-form-item label="项目名称">
          <el-select />
        </el-form-item>
        <el-form-item label="项目销售金额">
          <el-input />
        </el-form-item>
        <el-form-item label="本月预计开票">
          <el-input />
        </el-form-item>
        <el-form-item label="本月预计回款">
          <el-input />
        </el-form-item>
        <el-form-item label="采购总成本">
          <el-input />
        </el-form-item>
        <el-form-item label="本月预计成本">
          <el-input />
        </el-form-item>
        <el-form-item label="本月预计付款">
          <el-input />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'BudgetList',
  data() {
    return {
      dialogVisible: false
    }
  }
}
</script>
