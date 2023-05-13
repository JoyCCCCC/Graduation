<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>待开票列表</span>
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
        <el-table-column label="本次开票金额" show-overflow-tooltip align="center" prop="thisTimeinvoiceAmount" />
        <el-table-column label="合同编号" show-overflow-tooltip align="center" prop="ContractNo" />
        <el-table-column label="合同名称" show-overflow-tooltip align="center" prop="contractName" />
        <el-table-column label="总开票金额" show-overflow-tooltip align="center" prop="totalinvoiceAmount" />
        <el-table-column label="累计已开票金额" show-overflow-tooltip align="center" width="110px" prop="invoiceAmount" />
        <el-table-column label="状态" show-overflow-tooltip align="center" prop="invoiceStatus">
          <template slot-scope="scope">
            {{ scope.row.invoiceStatus|invoiceStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.invoiceStatus == 1" type="text" @click="$router.push('/contract-manage/pending-invoice')">开票</el-button>
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
    invoiceStatusFilter(status) {
      const statusMap = {
        '0': '已开票',
        '1': '待开票'
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
