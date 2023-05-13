<template>
  <div>
    <!-- <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>周报查询</span>

      </div> -->
    <el-form :inline="true" :model="formInline4" class="form-inline-nolabel mt-18 b-line">
      <el-form-item>
        <el-input v-model="formInline4.search" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item class="ml-12">
        <el-button type="primary">查询</el-button>
        <el-button>切换</el-button>

      </el-form-item>
    </el-form>
    <el-table class="mb-18" :data="list" border margin-top="50px">
      <el-table-column prop="weekNum" label="周数" align="center" />

      <el-table-column prop="doneWork" label="完成工作" align="center" />
      <el-table-column prop="workPlan" label="下周计划" align="center" />
      <el-table-column prop="workSummary" label="工作总结" align="center" />
      <el-table-column prop="needSupport" label="需要的资源及支持" align="center" />
      <el-table-column prop="accessory" label="附件" align="center" />
      <el-table-column prop="overdue.value" label="是否逾期" align="center">
        <!-- <template slot-scope="scope">
          <span>
            {{ scope.row.Overdue|Overduefilters }}
          </span>
        </template> -->
      </el-table-column>
      <el-table-column prop="aciton" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editForm(scope.row)">查看</el-button>
        </template>
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
    <el-dialog title="查看周报" :visible.sync="dialogDailyForm">
      <div class="weekly-wrap  mt-18">
        <el-form :inline="true" :model="formInline2" size="small" class="mt-5 " label-width="70px">
          <el-form-item label="提交人">
            <el-input v-model="formInline2.createUserName2" :disabled="true" />
          </el-form-item>
          <el-form-item label="收件人">
            <el-input v-model="formInline2.Name" :disabled="true" />
          </el-form-item>
          <el-form-item label="提交日期">
            <el-input v-model="formInline2.time" type="date" value-format="yyyy-MM-dd" :disabled="true" />
          </el-form-item>
          <el-form-item label="抄送人">
            <el-input v-model="formInline2.Name2" :disabled="true" />
          </el-form-item>
        </el-form>
      </div>
      <el-form ref="formInline2" :model="formInline2" size="small" class="mt-5 ">
        <el-form-item prop="doneWork" label="本周完成工作：">
          <el-input v-model="formInline2.doneWork" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="下周工作计划：" prop="workPlan">
          <el-input v-model="formInline2.workPlan" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="工作总结：" prop="workSummary">
          <el-input v-model="formInline2.workSummary" type="textarea" :row="3" />
        </el-form-item>
        <el-form-item label="需调节工作：" prop="coordinateWorkContent">
          <el-input v-model="formInline2.needSupport" type="textarea" :row="3" />
        </el-form-item>
        <el-form-item label="需求：" prop="workPlan">
          <el-input v-model="formInline2.needSupport" type="textarea" rows="3" />
        </el-form-item>
      </el-form>
      <div class="text-center mb-18">
        <el-button type="primary" size="small" @click="dialogDailyForm=false">返回</el-button>
      </div>
    </el-dialog>
    <!-- </el-card> -->
  </div>

</template>
<script>
import { zhoubao } from '@/api/ActivityForm'
import { WeekReportList } from '@/api/intergratedoffice2'
import Pagination from '@/components/Pagination'
export default {
  name: 'WeekReport',

  components: {
    Pagination
  },
  filters: {
    Overduefilters(status) {
      const statusMap = {
        '2': '逾期',
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
        pageIndex: 1,
        pageSize: 10,
        year: 2021,
        typeId: 1
      },
      dialogDailyForm: false,
      list: [],
      listLoading: true,
      formInline4: {

      },
      formInline2: {
        // createUserName2: '张三',
        // // time: this.getNowTime(),
        // Name: '帅哥',
        // Name2: '大帅哥'
      }

    }
  },
  created() {
    this.fetchData()
    this.fetchData
  },
  methods: {

    fetchData() {
      WeekReportList(this.query).then(res => {
        console.log(res)
        if (res) {
          this.list = res.records
          this.resData = res
        }
      })
    },
    fetchData2() {
      zhoubao(this.query).then(res => {
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
      this.formInline2 = rowData
    }
  }
}
</script>
