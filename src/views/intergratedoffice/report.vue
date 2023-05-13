<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>日报工作查询</span>
      </div>
      <el-form :inline="true" :model="formInline3" class="form-inline-nolabel mt-18 b-line">
        <el-form-item>
          <el-input v-model="formInline3.search" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item class="ml-12">
          <el-button type="primary">2</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" class="mb-18" :data="list" border margin-top="50px">
        <el-table-column prop="dailyReportId" label="日报ID" align="center" />
        <el-table-column prop="createUserName" label="姓名" align="center" />
        <el-table-column prop="day" label="日期" align="center" />
        <el-table-column prop="morningWorkContent" label="上午工作" align="center" />
        <el-table-column prop="afternoonWorkContent" label="下午工作" align="center" />
        <el-table-column prop="unfinishedWorkContent" label="未完成工作" align="center" />
        <el-table-column prop="coordinateWorkContent" label="需协调工作" align="center" />
        <el-table-column prop="accessory" label="附件" align="center" />
        <el-table-column prop="workPlan" label="明日计划" align="center" />
        <el-table-column prop="isOverdue" label="是否逾期" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
      </el-table>
      <div class="clearfix">
        <pagination
          v-show="resData.total > 0"
          :total="resData.total"
          :page.sync="query.pageIndex"
          :limit.sync="query.pageSize"
          class="pull-right"
          @pagination="fetchData"
        />
      </div>

    </el-card>
  </div>
</template>
<script>
import { getList } from '@/api/intergratedoffice'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      resData: { total: 0 },
      total: 0,
      query: {
        pageIndex: 1,
        pageSize: 10,
        typeId: 0,
        month: 1,
        year: 2021
      },
      list: null,
      listLoading: true,
      formInline3: {

      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList(this.query).then(res => {
        console.log(res)
        if (res) {
          this.list = res.records
          this.resData = res
        }
      })
    }
  }

}
</script>
