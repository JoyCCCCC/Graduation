<template>
  <el-card>
    <div>
      <el-form :inline="true" :model="formInline10" class=" mt-18 b-line">
        <el-form-item>
          <el-input v-model="formInline10.search" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item class="ml-12">
          <el-button type="primary">查询</el-button>
          <el-button>切换</el-button>
        </el-form-item>
      </el-form>

      <el-table class="mb-18" :data="list" border margin-top="50px">
        <el-table-column prop="weekNum" label="周数" align="center" />

        <el-table-column prop="year" label="年份" align="center" />
        <el-table-column prop="startDate" label="开始时间" align="center" />
        <el-table-column prop="otherWork" label="其他工作事项" align="center" />
        <el-table-column prop="endDate" label="结束时间" align="center" />
        <el-table-column prop="needSupport" label="需要的资源及支持" align="center" />
        <el-table-column prop="accessory" label="附件" align="center" />
        <el-table-column prop="overdue.value" label="是否逾期" align="center">

          <!-- <template slot-scope="scope">
            <span>
              {{ scope.row.isOverdue|isOverduefilters }}
            </span>
          </template> -->
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" />
        <el-table-column prop="aciton" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="fetchData2(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        </el-table-column></el-table>
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
      <el-dialog title="查看销售周报" :visible.sync="dialogDailyForm">
        <div class="weekly-wrap  mt-18">
          <el-form :model="formInline8" size="small" label-width="100px">
            <el-row :gutter="32">
              <el-col :xs="24" :sm="18" :md="12" :xl="6">
                <el-form-item label="提交人">
                  <el-input v-model="formInline8.createUserName" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :md="12" :xl="6">
                <el-form-item label="客户名称" prop="customerName">
                  <el-input v-model="formInline8.customerName" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :md="12" :xl="6">
                <el-form-item label="部门" prop="departmentName">
                  <el-input v-model="formInline8.departmentName" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :md="12" :xl="6">
                <el-form-item label="项目阶段">
                  <el-input v-model="formInline8.workPlan" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :md="12" :xl="6">
                <el-form-item label="计划时间">
                  <el-date-picker v-model="formInline8.planTime" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :md="12" :xl="6">
                <el-form-item label="主要竞争对手">
                  <el-input v-model="formInline8.mainCompetitors" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="32">
              <el-form-item label="完成工作内容" prop="completion">
                <el-input v-model="formInline8.completion" :disabled="true" type="textarea" />
              </el-form-item>
              <el-form-item label="下周工作计划" prop="workPlan">
                <el-input v-model="formInline8.workPlan" :disabled="true" type="textarea" />
              </el-form-item>
              <el-form-item label="需求" prop="workPlanNeedSupport">
                <el-input v-model="formInline8.workPlanNeedSupport" :disabled="true" type="textarea" />
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formInline8.remark" :disabled="true" type="textarea" />
              </el-form-item>
              <div class="text-center mb-18">
                <el-button type="primary" size="small" @click="dialogDailyForm=false">返回</el-button>
              </div>
            </el-row>
          </el-form>
        </div>
      </el-dialog>

    </div>
  </el-card>

</template>
<script>
import Pagination from '@/components/Pagination'
// import { getList } from '@/api/intergratedoffice3'
import { weekSalesReport } from '@/api/intergratedoffice2'
// import { weekSalesReportDetails } from '@/api/intergratedoffice2'

export default {
  name: 'SReport',
  components: {
    Pagination
  },

  filters: {
    overduefilters(status) {
      const statusMap = {
        '0': '逾期',
        '1': '未逾期'

      }
      return statusMap[status]
    }
  },
  data() {
    return {
      resData: {
        total: 0
      },

      query: {
        year: 2021,
        pageSize: 1,
        typeId: 0,
        pageIndex: 1

      },

      dialogDailyForm: false,
      list: null,

      formInline10: {

      },
      formInline8: {

      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      weekSalesReport(this.query).then(res => {
        console.log(res)
        if (res) {
          console.log('res:', res)
          this.list = res.records
          this.resData = res
        }
      })
    },
    fetchData2(rowData) {
      console.log(rowData)
      // weekSalesReportDetails(this.saleWeekReportId, {}).then(res => {
      //   console.log(res)
      //   if (res) {
      //     this.list = res.records
      //     this.resData = res
      //   }
      // })
    },
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      return defaultDate
    },
    editForm(rowData) {
      this.titleName = '查看详情信息'
      this.dialogDailyForm = true
      this.formInline8 = rowData
    }
  }

}
</script>
