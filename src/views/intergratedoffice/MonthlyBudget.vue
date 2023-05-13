<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          月度预算
        </span>
      </div>
      <div class="mb-18">
        <el-button type="primary" @click="$router.push('/intergratedoffice/MonthlyBudgetApply')">预算申请</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          border
          stripe
          size="small"
          class="mb-18"
        >
          <el-table-column label="部门" align="center" show-overflow-tooltip />
          <el-table-column label="月份" align="center" show-overflow-tooltip prop="month" />
          <el-table-column label="填写人" align="center" show-overflow-tooltip />
          <el-table-column label="填写时间" align="center" show-overflow-tooltip />
          <el-table-column label="预算金额" align="center" show-overflow-tooltip />
          <el-table-column label="实际开销" align="center" show-overflow-tooltip />
          <el-table-column label="填写时间" align="center" show-overflow-tooltip />
          <el-table-column label="操作" align="center" show-overflow-tooltip>
            <el-button type="text">实际开销录入</el-button>
          </el-table-column>
        </el-table>

      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        { month: '2021' }
      ]
    }
  }
}
</script>
