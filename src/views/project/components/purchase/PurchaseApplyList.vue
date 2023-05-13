<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购申请列表</span>
      </div>
      <el-table
        ref="expendtable"
        border
        stripe
        :data="resList"
        class="mb-18"
        @row-click="handleRowClick"
      >
        <el-table-column v-if="resList.length>0" type="expand">
          <template>
            <ContractList />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="申请主题" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>主题{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="outsource" label="是否外包" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.outsource?'是':'否' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productTypeId.value" label="软硬件" show-overflow-tooltip />
        <el-table-column prop="remark" label="申请说明" show-overflow-tooltip />
        <el-table-column prop="purchaseTypeId.value" label="清单类型" width="100px" />
        <el-table-column prop="opration" label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="open(scope.row)"
            >合同申请
            </el-button>
          </template>
        </el-table-column>

      <!--        <el-table-column prop="opration" label="操作" width="120px" >
           <template slot-scope="scope">
             <div class="btn-text-group">
               <el-button type="text">选择</el-button>
             </div>
           </template>
        </el-table-column> -->
      </el-table>
      <!-- <div class="clearfix">
        <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" class="pull-right" @pagination="getTableList" />
      </div> -->
    </el-card>
  </div>

</template>

<script>
import { fetchPurchaseApply } from '@/api/project'
import Pagination from '@/components/Pagination'
import props from '../../mixins/props'
import ContractList from '../../components/contract/ContractList'
export default {
  name: 'PurchaseApplyList',
  components: { Pagination, ContractList },
  mixins: [props],
  data() {
    return {
      DialogVisible: false,

      multipleSelection: [],

      resList: [],
      projectId: this.parentProps.projectId
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.projectId) {
        fetchPurchaseApply(this.projectId).then(res => {
          this.resList = res
        })
      }
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
    },

    open(item) {
      const projectId = item.projectId
      const projectPurchaseApplyId = item.projectPurchaseApplyId
      this.$router.push(`/project/pur-contract/${projectId}/${projectPurchaseApplyId}`)
    },

    handleRowClick(row, index, e) {
      if (index.label !== '操作') {
        this.$refs.expendtable.toggleRowExpansion(row)
      }
    }
  }
}
</script>
<style lang="scss">
</style>
