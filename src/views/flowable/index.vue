<template>
  <div>

    <el-card>
      <el-row class="mb-8">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          @click="handleAdd"
        >新增</el-button>
      </el-row>

      <el-table :data="resList" border stripe class="mb-18">
        <!-- <el-table-column prop="deploymentId" width="260px" label="流程编号" show-overflow-tooltip /> -->
        <el-table-column prop="key" label="流程标识" show-overflow-tooltip />
        <el-table-column prop="flowCategoryEnum.value" label="流程分类" show-overflow-tooltip />
        <el-table-column prop="name" label="流程名称(流程图)" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="showFlowChart(scope.row.deploymentId)"
            >{{ scope.row.name }}
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="derivedForm" label="挂载表单" show-overflow-tooltip /> -->
        <!-- <el-table-column prop="version" width="70px" label="流程版本" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tag>v{{ scope.row.version }}</el-tag>
        </template>
      </el-table-column> -->
        <el-table-column prop="suspended" width="80px" label="状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-tag :type="scope.row.suspended?'danger':'success'">{{ scope.row.suspended?'冻结':'激活' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="deploymentDate" label="部署时间" show-overflow-tooltip />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="changeStatus(scope.row.deploymentId)"
            >{{ scope.row.suspended?'激活':'冻结' }}</el-button>
            <el-button
              type="text"
              @click="handleDelete(scope.row.deploymentId)"
            >删除</el-button>
          </template>
        </el-table-column></el-table>

      <Pagination
        :total="resData.total"
        :page.sync="params.pageIndex"
        :limit.sync="params.pageSize"
        class="text-right"
        @pagination="fetchData"
      />
    </el-card>
    <div class="flow-chart-container">
      <el-dialog
        v-if="showFlowDialog.visible"
        title="流程图"
        :visible.sync="showFlowDialog.visible"
        :close-on-click-modal="CLOSE_ON_CLICK_MODAL"
        width="70%"
      >
        <FlowChart :deployment-id="showFlowDialog.deploymentId" />
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { fetchFlowList, changeStatus, deleteFlow } from '../../api/flowable'
import Pagination from '@/components/Pagination'
import FlowChart from './components/FlowChart'
export default {
  name: 'FlowableDesign',
  components: { Pagination, FlowChart },
  data: function() {
    return {
      params: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      resData: {
        total: 0
      },
      resList: [],
      showFlowDialog: {
        visible: false
      },
      CLOSE_ON_CLICK_MODAL: this.$defaultCfg.closeOnClickModal
    }
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      fetchFlowList(this.params)
        .then(res => {
          this.resList = res.records
          this.resData = res
        })
    },
    // handleSearch() {
    //   this.prams.pageIndex = 1
    //   this.fetchData()
    // },
    handleAdd() {
      this.$router.push('/flowable/design')
    },
    changeStatus(deploymentId) {
      changeStatus(deploymentId).then(() => {
        this.$message.success('操作成功！')
        this.fetchData()
      })
    },
    handleDelete(deploymentId) {
      deleteFlow(deploymentId).then(() => {
        this.$message.success('操作成功')
        this.fetchData()
      })
    },
    showFlowChart(deploymentId) {
      this.showFlowDialog = {
        visible: true,
        deploymentId: deploymentId
      }
    }
  }
}
</script>

<style lang='scss'>

  .flow-chart-container{
     .el-dialog__body{
       height: 70vh;
     }
  }
</style>
