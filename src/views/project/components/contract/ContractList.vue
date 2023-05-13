<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>合同列表</span>
      </div>
      <!-- <div class="mb-18">
        <el-button type="primary" size="small" @click="DialogVisible = true">添加项目</el-button>
      </div> -->
      <el-table
        border
        stripe
        :data="resList"
        size="small"
        class="mb-18"
      >
        <el-table-column prop="contractId" label="合同编码" show-overflow-tooltip />
        <el-table-column prop="contractName" label="合同名称" show-overflow-tooltip />
        <el-table-column prop="contractType.value" label="合同类型" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.contractTypeId === 1">收入合同</span>
            <span v-else>支出合同</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="expenseType.value" label="合同产品" show-overflow-tooltip>
          <!-- <template slot-scope="scope">
            <span>{{ scope.row.contractProject | statusFilter }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="contractAmount" label="合同金额" align="right">
          <template slot-scope="scope">
            <span>{{ scope.row.contractAmount | toThousandFilter }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="isdues" label="是否含税" show-overflow-tooltip width="70px">
          <template slot-scope="scope">
            <span v-if="scope.row.isdues === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="projectNo" label="项目编码" show-overflow-tooltip  /> -->
        <!-- <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip  width="70px" /> -->
        <el-table-column prop="creator.userName" label="录入人" show-overflow-tooltip width="70px" />
        <el-table-column prop="status" label="合同状态" show-overflow-tooltip width="70px" />
        <el-table-column prop="signDate" label="签约日期" width="100px" />
        <el-table-column prop="hasPaymentAmount" label="回款金额" width="70px" />
        <el-table-column prop="qPeople" label="签订人" width="70px" />
        <!-- <el-table-column prop="qmainPeople" label="签订主体" width="70px" /> -->
        <el-table-column prop="hasInvoiceAmount" label="开票金额" width="70px" />
        <el-table-column prop="hasPayAmount" label="付款金额" width="70px" />
        <el-table-column prop="hasTicketsReceivedAmount" label="收票金额" width="70px" />
        <el-table-column prop="opration" label="操作" width="180px">
          <template slot-scope="scope">
            <div v-if="isFromProjectDetail" class="btn-text-group">
              <el-button
                type="text"
                @click="open(scope.row)"
              >详情
              </el-button>
            </div>
            <div v-else class="btn-text-group">
              <el-button
                v-for="(item,index) in getBtn(scope.row.oprationStatus)"
                :key="index"
                type="text"
                @click="open(item)"
              >{{ item.name }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="!isFromProjectDetail && resData.total>0"
        :total="resData.total"
        :page.sync="params.pageIndex"
        :limit.sync="params.pageSize"
        class="text-right"
        @pagination="fetchData"
      />
    </el-card>
    <el-dialog title="材料补充" :visible.sync="DialogVisible" width="600px">
      <el-form label-width="120px">
        <el-form-item label="附件：">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/">
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="DialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="DialogVisible = false"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import {
  fetchContractList
} from '@/api/project'
import props from '../../mixins/props'
import Pagination from '@/components/Pagination'
import { projectBtnType } from '../../constant'

export default {
  name: 'ContractList',
  components: {
    Pagination
  },
  mixins: [props],
  // props: {
  //   type: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data() {
    var btnStatus = {
      '1': [
        { type: 'change', name: '变更' },
        { type: 'add', name: '材料补充' },
        { type: 'archive', name: '归档' },
        { type: 'payback', name: '回款' }
      ],
      '2': [
        { type: 'change', name: '变更' },
        { type: 'receipt', name: '收票' },
        { type: 'archive', name: '归档' }
      ],
      '3': [
        { type: 'change', name: '变更' },
        { type: 'receipt', name: '收票' },
        { type: 'archive', name: '归档' },
        { type: 'payback', name: '回款' }
      ]
    }
    return {
      cur: '',
      DialogVisible: false,
      // total: 0,
      // params: {
      //   pageIndex: 1,
      //   pageSize: 10
      // },
      list: null,
      listLoading: true,
      btnStatus: btnStatus,

      params: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      body: {
        projectMainStatus: this.parentProps.projectMainStatus,
        projectSubStatus: this.parentProps.projectSubStatus
      },
      projectId: this.parentProps.projectId,
      resList: [],
      resData: {
        total: 0
      }
    }
  },
  computed: {

    isFromProjectDetail() { // 是否来自项目详情页   项目详情页不显示，合同管理列表要显示
      return this.parentProps.entryType === projectBtnType.DETAIL
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.isFromProjectDetail) { // 不显示分页时  默认查询条数最大化
        this.params.pageSize = this.$defaultCfg.maxPageSize
      }
      fetchContractList(this.params, this.body, this.projectId).then(res => {
        this.resList = res.records
        this.resData = res
      })
    },
    getBtn(type) {
      var btnarr = this.btnStatus[type]
      return btnarr
    },
    open(item) {
      if (this.isFromProjectDetail) {
        // console.log(item, 'ssss')
        const contractType = item && item.incomeExpenseTypeId && item.incomeExpenseTypeId.key === 1 ? projectBtnType.INCOME_CONTRACT : projectBtnType.EXPEND_CONTRACT
        const entryType = this.parentProps.entryType
        const contractId = item && item.contractId
        const projectId = item && item.projectId
        this.$router.push(`/project/contract-info/${entryType}/${contractId}?contractType=${contractType}&projectId=${projectId}`)
      } else {
        if (item.type === 'change') {
          this.$router.push('/contract-manage/change')
        }
        if (item.type === 'payback') {
          this.$router.push('/contract-manage/payback')
        }

        if (item.type === 'receipt') {
          this.$router.push('/contract-manage/receipt')
        }

        if (item.type === 'add') {
          this.DialogVisible = true
        }
        if (item.type === 'archive') {
          this.$confirm('确认归档？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

          }).catch(() => {})
        }
      }
    }
  }
}
</script>
<style lang="scss">

</style>
