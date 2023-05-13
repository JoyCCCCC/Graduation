<template>
  <div>
    <!-- <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>日报工作查询</span>
      </div> -->
    <el-form :inline="true" :model="formInline3" class="form-inline-nolabel mt-18 b-line">
      <el-form-item>
        <el-input v-model="formInline3.search" placeholder="请输入内容" />
      </el-form-item>
      <el-form-item class="ml-12">
        <el-button type="primary">查询</el-button>
        <el-button>切换</el-button>
      </el-form-item>
    </el-form>
    <el-table class="mb-18" :data="list" border margin-top="50px">
      <el-table-column prop="dailyReportId" label="日报ID" align="center" />
      <el-table-column prop="createUserName" label="姓名" align="center" />
      <el-table-column prop="day" label="日期" align="center" />
      <el-table-column prop="morningWorkContent" label="上午工作" align="center" />
      <el-table-column prop="afternoonWorkContent" label="下午工作" align="center" />
      <el-table-column prop="unfinishedWorkContent" label="未完成工作" align="center" />
      <el-table-column prop="coordinateWorkContent" label="需协调工作" align="center" />
      <el-table-column prop="accessory" label="附件" align="center" />
      <el-table-column prop="workPlan" label="明日计划" align="center" />
      <el-table-column prop="isOverdue" label="是否逾期" align="center">
        <template slot-scope="scope">
          <span>
            {{ scope.row.isOverdue|isOverduefilters }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column prop="action" label="操作" align="center">
        <temp>
          <el-button type="text" @click="dialogDailyForm=true">查看</el-button>
        </temp>
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
    <el-dialog title="查看日报" :visible.sync="dialogDailyForm">
      <div class="weekly-wrap  mt-18">
        <el-form :inline="true" :model="formInline1" size="small" class="mt-5 " label-width="70px">
          <el-form-item label="提交人">
            <el-input v-model="formInline1.createUserName2" :disabled="true" />
          </el-form-item>
          <el-form-item label="收件人">
            <el-input v-model="formInline1.Name" :disabled="true" />
          </el-form-item>
          <el-form-item label="提交日期">
            <el-input v-model="formInline1.time" type="date" :disabled="true" />
          </el-form-item>
          <el-form-item label="抄送人">
            <el-input v-model="formInline1.Name2" :disabled="true" />
          </el-form-item>
        </el-form>
      </div>
      <el-form ref="formInline2" :model="formInline2" size="small" class="mt-5 ">
        <el-form-item prop="morningWorkContent" label="上午工作：">
          <el-input v-model="formInline2.morningWorkContent" type="textarea" :rows="3" /></el-form-item>
        <el-form-item label="下午工作：" prop="afternoonWorkContent">
          <el-input v-model="formInline2.afternoonWorkContent" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="未完成工作：" prop="unfinishedWorkContent">
          <el-input v-model="formInline2.unfinishedWorkContent" type="textarea" :row="3" />
        </el-form-item>
        <el-form-item label="需调节工作：" prop="coordinateWorkContent">
          <el-input v-model="formInline2.coordinateWorkContent" type="textarea" :row="3" />
        </el-form-item>
        <el-form-item label="明日计划：" prop="workPlan">
          <el-input v-model="formInline2.workPlan" type="textarea" rows="3" />
        </el-form-item>
      </el-form>
      <div class="text-center mb-18">
        <el-button type="primary" size="small" @click="dialogDailyForm=false">返回</el-button>
      </div>
    </el-dialog>
    <!--
    </el-card> -->
  </div>
</template>
<script>
import { getList5 } from '@/api/intergratedoffice3'
import Pagination from '@/components/Pagination'
export default {
  name: 'Report',
  components: {
    Pagination
  },
  filters: {
    isOverduefilters(status) {
      const statusMap = {
        '0': '逾期',
        '1': '未逾期'

      }
      return statusMap[status]
    }
  },
  data() {
    return {
      dialogDailyForm: false,
      total: 0,
      resData: { total: 0 },
      query: {
        pageSize: 1,
        pageIndex: 10,
        typeId: 0,
        year: 2021,
        month: 1
      },
      list: null,
      listLoading: true,
      formInline2: {
        'doneWork': 'doneWork',
        'workPlan': '下周计划',
        'workSummary': '本周工作总结',
        'needSupport': '需要的资源及支持',
        'accessory': '附件'

      },
      formInline1: {
        createUserName2: '张三',
        time: this.getNowTime(),
        Name: '帅哥',
        Name2: '大帅哥'

      },
      formInline3: {

      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {

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

    selectDate(data) {
      console.log(data.day)
    },
    onsubmit() {
      this.$refs.formInline2.validate((valid) => {
        if (valid) {
          getList5(this.formInline2).then(res => {
            console.log(this.formInline2, 1222)
          })
        }
      })
    },
    fetchData() {
      getList5(this.query, {}).then(res => {
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
