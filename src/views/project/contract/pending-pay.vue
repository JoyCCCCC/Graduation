<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>待付款列表</span>
      </div>
      <el-table
        v-loading="listLoading"
        border
        stripe
        :data="list"
        element-loading-text="Loading"
        size="small"
        class="mb-18"
      >
        <el-table-column label="申请主题" show-overflow-tooltip align="center" prop="title" />
        <el-table-column label="采购公司" show-overflow-tooltip align="center" prop="purchasingCompany" />
        <el-table-column label="付款金额" show-overflow-tooltip align="center" prop="paymentAmount" />
        <el-table-column label="付款类型" show-overflow-tooltip align="center" prop="paymentTypeId">
          <template slot-scope="scope">
            <span>
              {{ scope.row.paymentTypeId| paymentTypeFilter }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="兑付时间" show-overflow-tooltip align="center" prop="cashingTime" />
        <el-table-column label="合同编号" align="center" prop="ContractNo" width="150px" />
        <el-table-column label="合同名称" show-overflow-tooltip align="center" prop="contractName" />
        <el-table-column label="总付款金额" show-overflow-tooltip align="center" prop="totalpaymentAmount" />
        <el-table-column label="累计已付款金额" show-overflow-tooltip align="center" width="110px">
          <template slot-scope="scope">
            {{ scope.row.haspaymentAmount }}
          </template>
        </el-table-column>
        <el-table-column label="付款时间" show-overflow-tooltip align="center" prop="paymentTime" />
        <el-table-column label="状态" show-overflow-tooltip align="center" prop="paymentStatus">
          <template slot-scope="scope">
            {{ scope.row.paymentStatus| statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.paymentStatus == 1" type="text" @click="scope.row.paymentStatus = 0">付款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.limit"
          class="pull-right"
          @pagination="getTableList"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getContractList
} from '@/api/project'
import Pagination from '@/components/Pagination'
export default {
  name: 'PendingPay',
  components: {
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '0': '已付款',
        '1': '待付款'
      }
      return statusMap[status]
    },
    paymentTypeFilter(status) {
      const statusMap = {
        '1': '支票',
        '2': '转账',
        '3': '银行承兑汇款',
        '4': '商业承兑汇款'
      }
      return statusMap[status]
    }
  },
  data: function() {
    return {
      list: null,
      listLoading: true,
      total: 0,
      query: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      this.listLoading = true
      getContractList(this.query).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    paymentFinish(scope) {
      scope.row.paymentStatus = 0
    }
  }

}

</script>

<style lang='scss' scoped>
</style>
