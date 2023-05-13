<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>周报查询</span>
      </div>
      <el-form :inline="true" :model="formInline4" class="form-inline-nolabel mt-18 b-line">
        <el-form-item>
          <el-input v-model="formInline4.search" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item class="ml-12">
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button>搜索</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" class="mb-18" :data="list" border margin-top="50px">
        <el-table-column prop="weekNum" label="周数" align="center" />
        <el-table-column prop="createUserName" label="姓名" align="center" />
        <el-table-column prop="doneWork" label="完成工作" align="center" />
        <el-table-column prop="workPlan" label="下周计划" align="center" />
        <el-table-column prop="workSummary" label="工作总结" align="center" />
        <el-table-column prop="needSupport" label="需要的资源及支持" align="center" />
        <el-table-column prop="accessory" label="附件" align="center" />
        <el-table-column prop="isOverdue" label="是否逾期" align="center" />
      </el-table>
      <div class="clearfix">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.limit"
          class="pull-right"
          @pagination="fetchData"
        />
      </div>

    </el-card>
  </div>
</template>
<script>
import { getList } from '@/api/intergratedoffice2'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      query: {
        page: 1,
        limit: 10 },
      dialogDailyForm: false,

      list: null,
      listLoading: true,
      formInline4: {

      },
      formInline2: {
        createUserName2: '张三',
        time: '',
        Name: '帅哥',
        Name2: '大帅哥'
      }

    }
  },
  created() {
    this.fetchData()
    this.formInline2.time = this.getNowTime()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.query).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
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
    }
  }

}
</script>
