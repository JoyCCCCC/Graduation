<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购清单</span>
      </div>
      <div class="mb-18">
        <el-button type="primary" @click="add()">签收</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        border
        stripe
        :data="list"
        element-loading-text="Loading"
        class="mb-18"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="productNo" label="品目号" show-overflow-tooltip align="center" />
        <el-table-column prop="productName" label="品名" show-overflow-tooltip align="center" />
        <el-table-column prop="brandName" label="品牌" show-overflow-tooltip align="center" />
        <el-table-column prop="isAuxiliaryMaterials" label="辅材" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isAuxiliaryMaterials === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="purchasePrice" label="单价" width="100px" align="center" />
        <el-table-column prop="hasBuyNum" label="数量" width="100px" align="center" />
        <el-table-column prop="allPrice" label="总价" width="100px" align="center" />
        <el-table-column prop="quotedPrice" label="报价" width="100px" align="center" />
        <el-table-column prop="status" label="状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="opration" label="操作" width="120px" align="center">
           <template slot-scope="scope">
             <div class="btn-text-group">
               <el-button type="text">选择</el-button>
             </div>
           </template>
        </el-table-column> -->
      </el-table>
      <div class="clearfix">
        <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" class="pull-right" @pagination="getTableList" />
      </div>
    </el-card>
  </div>

</template>

<script>
import { getPurList } from '@/api/project'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '未采购',
        '2': '已采购',
        '3': '部分采购',
        '4': '已签收'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      DialogVisible: false,
      total: 0,
      query: {
        page: 1,
        limit: 10
      },
      list: null,
      listLoading: true,
      multipleSelection: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      this.listLoading = true
      getPurList(this.query).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },
    add() {
      this.$router.push({
        name: 'pur-application',
        query: {
          name: 'choose'
        }
      })
    }
  }
}
</script>
<style lang="scss">
</style>
