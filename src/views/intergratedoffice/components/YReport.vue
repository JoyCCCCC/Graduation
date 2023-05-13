<template>
  <div>
    <el-form :inline="true" :model="formInline3" class="form-inline-nolabel mt-18 b-line">
      <el-form-item>
        <el-input v-model="formInline3.search" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item class="ml-12">
        <el-button type="primary">查询</el-button>
        <el-button>切换</el-button>

      </el-form-item>
    </el-form>
    <el-table

      class="mb-18"
      :data="list"
      border
      margin-top="50px"
    >
      <el-table-column prop="weekNum" label="月数" align="center" />
      <el-table-column prop="createUserName" label="姓名" align="center" />
      <el-table-column prop="doneWork" label="本月完成工作" align="center" />
      <el-table-column prop="workPlan" label="下月工作计划" align="center" />
      <el-table-column prop="workSummary" label="工作总结" align="center" />
      <el-table-column prop="needSupport" label="需要的资源及支持" align="center" />
      <el-table-column prop="accessory" label="附件" align="center" />
      <el-table-column prop="overdue.value" label="是否逾期" align="center">
        <!-- <template slot-scope="scope">
          <span>
            {{ scope.row.isOverdue|isOverduefilters }}
          </span>
        </template> -->
      </el-table-column>

      <el-table-column prop="aciton" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editForm(scope.row)">查看</el-button>
        </template>
      </el-table-column>
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
    <el-dialog title="查看月报" :visible.sync="dialogDailyForm">
      <div class="weekly-wrap  mt-18">
        <el-form :inline="true" :model="formInline6" size="small" class="mt-5" label-width="70px">
          <el-form-item label="提交人">
            <el-input v-model="formInline6.createUserName" :disabled="true" />
          </el-form-item>
          <el-form-item label="收件人">
            <el-input v-model="formInline6.Name" :disabled="true" />
          </el-form-item>
          <el-form-item label="提交日期">
            <el-input v-model="formInline6.time" type="date" value-format="yyyy-MM-dd" :disabled="true" />
          </el-form-item>
          <el-form-item label="抄送人">
            <el-input v-model="formInline6.Name2" :disabled="true" />
          </el-form-item>
        </el-form>
      </div>
      <el-form ref="formInline6" :model="formInline6" size="small" class="mt-5">
        <el-form-item prop="doneWork" label="本月完成工作：">
          <el-input v-model="formInline6.doneWork" type="textarea" :rows="3" :disabled="true" />
        </el-form-item>
        <el-form-item prop="workPlan" label="下月工作计划：">
          <el-input v-model="formInline6.workPlan" type="textarea" :rows="3" :disabled="true" />
        </el-form-item>
        <el-form-item prop="workSummary" label="本月工作总结：">
          <el-input v-model="formInline6.workSummary" type="textarea" :disabled="true" />
        </el-form-item>
        <el-form-item prop="needSupport" label="需求：">
          <el-input v-model="formInline6.needSupport" type="textarea" :disabled="true" />
        </el-form-item>
      </el-form>
      <div class="text-center mb-18">
        <el-button type="primary" size="small" @click="dialogDailyForm=false">返回</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { monthReportList } from '@/api/intergratedoffice2'

export default {
  components: {
    Pagination
  },
  filters: {
    overdue(status) {
      const statusMap = {
        '2': '逾期',
        '1': '未逾期'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      resData: { total: 0 },

      query: {
        pageSize: 10,
        pageIndex: 1,
        year: 2021,
        typeId: 0
      },
      dialogDailyForm: false,
      list: [],
      listLoading: true,
      formInline3: {

      },
      formInline6: {

      }

    }
  },
  created() {
    this.fetchData()
    this.formInline6.time = this.getNowTime()
  },
  methods: {
    fetchData() {
      monthReportList(this.query, {}).then(res => {
        console.log(res)
        if (res) {
          this.list = res.records
          this.resData = res
        }
      })
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
      this.formInline6 = rowData
    }
  }

}

</script>
