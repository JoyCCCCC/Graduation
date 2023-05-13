<template>
  <div>
    <div>
      <el-form
        ref="searchForm"
        :inline="true"
        :model="searchForm"
        size="small"
        class="mt-18"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-card> -->
    <el-table
      border
      stripe
      :data="resList"
      class="mb-18"
    >
      <el-table-column
        prop="flowInstanceId"
        label="审批编号"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="审批名称"
        show-overflow-tooltip
      />
      <el-table-column
        prop="creator.userName"
        label=" 发起人"
        show-overflow-tooltip
      />
      <el-table-column
        prop="startTime"
        label="发起时间"
        show-overflow-tooltip
      />
      <!-- <el-table-column
          prop="endTime"
          label="结束时间"
          show-overflow-tooltip
        /> -->
      <el-table-column
        prop="flowInstanceStatus.value"
        show-overflow-tooltip
        label="审批状态"
      />
      <!-- <el-table-column
        prop="flowCategoryEnum.value"
        label="审批类型"
        show-overflow-tooltip
      /> -->
      <el-table-column
        label="操作"
        width="150px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.flowInstanceId" class="btn-text-group">
            <el-button
              type="text"
              @click="handleApprove(scope.row)"
            >审批</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="resData.total > 0"
      :total="resData.total"
      :page.sync="params.pageIndex"
      :limit.sync="params.pageSize"
      class="text-right"
      @pagination="fetchData"
    />
    <!-- </el-card> -->
  </div>
</template>

<script>
import {
  fetchWaitApproval
} from '@/api/approve'
import Pagination from '@/components/Pagination'
export default {
  name: 'Pending',
  components: {
    Pagination
  },
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      searchForm: {
        // name: ''
      },
      resList: [],
      resData: {
        total: 0
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchWaitApproval(this.params, this.searchForm).then(res => {
        if (res) {
          this.resList = res.records
          this.resData = res
        }
      })
    },
    handleApprove(rowData) {
      const path = `/approve/detail/${rowData.flowInstanceId}`
      this.$router.push(path)
    },

    onSearch() {
      this.params.pageIndex = 1
      this.fetchData()
    },

    onReset() {
      this.$refs.searchForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

