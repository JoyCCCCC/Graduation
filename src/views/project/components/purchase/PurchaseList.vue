<template>
  <div>
    <el-table
      ref="multipleTable"
      border
      stripe
      :data="resList"
      class="mb-18"
      :row-key="getRowKey"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="resData.total>0" type="selection" reserve-selection :selectable="selectable" width="55" />
      <el-table-column prop="productNo" label="品目号" show-overflow-tooltip />
      <el-table-column prop="productName" label="品名" show-overflow-tooltip />
      <el-table-column prop="brand.value" label="品牌" show-overflow-tooltip />
      <el-table-column prop="isAuxiliaryMaterials" label="辅材" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.isAuxiliaryMaterials === 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="purchasePrice" label="单价" width="100px" align="right" header-align="center">
        <template slot-scope="scope">
          {{ scope.row.purchasePrice | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="hasBuyNum" label="数量" width="100px" />
      <el-table-column prop="allPrice" label="总价" width="100px" header-align="center" align="right">
        <template slot-scope="scope">
          {{ scope.row.purchasePrice | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="quotedPrice" label="报价" width="100px" header-align="center" align="right">
        <template slot-scope="scope">
          {{ scope.row.quotedPrice | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="status.value" label="状态" show-overflow-tooltip />
      <!--<el-table-column prop="opration" label="操作" width="120px" >
           <template slot-scope="scope">
             <div class="btn-text-group">
               <el-button type="text">选择</el-button>
             </div>
           </template>
        </el-table-column> -->
    </el-table>
    <el-row type="flex" justify="space-between">
      <el-col v-show="selectedData.length>0">
        已选采购清单{{ selectedData.length }}条
      </el-col>
      <el-col>
        <Pagination v-show="resData.total>0" :total="resData.total" :page.sync="params.pageIndex" :limit.sync="params.pageSize" class="text-right" @pagination="fetchData" />
      </el-col>
    </el-row>

    <!-- </el-card> -->
  </div>

</template>

<script>
import { fetchPurchaseList } from '@/api/project'
import Pagination from '@/components/Pagination'
export default {
  name: 'PurchaseList',
  components: { Pagination },
  props: {
    projectId: {
      type: Number,
      default: 0
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize,
        status: 0
      },
      resList: [],
      resData: {
        total: 0
      },
      selectedData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.projectId) {
        fetchPurchaseList(this.params, this.projectId).then(res => {
          if (res) {
            this.resList = res.records
            this.resData = res
          }
        })
      }
    },
    getRowKey(row) {
      return row.projectPurchaseId
    },
    selectable(row, index) {
      return !this.isDisabled
    },
    handleSelectionChange(val) {
      this.selectedData = val
    },
    clearTable() {
      this.$refs.multipleTable.clearSelection()// 清空选中的数据
      this.selectedData = []
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
