<template>
  <div>
    <el-card>
      <div class="mb-18">
        <el-button type="primary" size="small" @click="add">添加待办</el-button>
      </div>
      <el-table
        border
        stripe
        :data="list"
        size="small"
        class="mb-18"
      >
        <el-table-column
          prop="taskTitle"
          label="任务标题"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="openDetail(scope.row)">
              {{ scope.row.taskTitle }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="taskContent"
          label="任务内容"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="completionTime"
          label="完成时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="level"
          label="待办层级"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="fatherWaitingProcessing"
          label="父级待办ID"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="expectedCompletionTime"
          label="逾期完成时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="executor"
          label="执行人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="taskEventTypeId"
          label="事件类型ID"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="taskEventId"
          label="事件ID"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="createUserId"
          label="创建人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        />
      </el-table>
      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="params.pageIndex"
        :limit.sync="params.pageSize"
        class="text-right"
        @pagination="fetchData"
      />
    </el-card>
    <el-dialog
      v-if="FormVisible"
      :title="titleName"
      :visible="FormVisible"
      width="850px"
      @close="onCloseCallback"
    >
      <WaitProcessForm :wait-form-data="waitFormData" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseCallback" />
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchWaitProcessList
} from '@/api/office'
import Pagination from '@/components/Pagination'
import WaitProcessForm from './WaitProcessForm'
export default {
  components: {
    Pagination, WaitProcessForm
  },

  data() {
    return {
      FormVisible: false,
      waitFormData: {},
      titleName: '添加待办',
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      body: {},
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchWaitProcessList(this.params, this.body).then(res => {
        if (res) {
          this.total = res.total
          this.list = res.records
        }
      })
    },

    // 添加/修改项目回调
    oSuccessCallback() {
      this.FormVisible = false
      this.fetchData()
    },
    onCloseCallback() {
      this.FormVisible = false
    },
    add() {
      this.titleName = '添加待办'
      this.FormVisible = true
    },
    openDetail(rowData) {
      const path = `/project/wait-detail/${rowData.waitingProcessingId}`
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped="">
</style>
