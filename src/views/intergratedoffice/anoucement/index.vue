<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          公告管理
        </span>
      </div>
      <div class="mb-18">
        <el-button type="primary" @click="addNoticeForm">新增公告</el-button>
      </div>
      <el-table

        border
        stripe
        size="small"
        class="mb-18"
      >
        <el-table-column label="标题" align="center" show-overflow-tooltip prop="title" />
        <el-table-column label="创建人" align="center" show-overflow-tooltip prop="creator.userName" />
        <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime" />
        <!-- <el-table-column label="修改人" align="center" show-overflow-tooltip prop="updataUserName" />
        <el-table-column label="修改时间" align="center" show-overflow-tooltip prop="updataTime" /> -->
        <el-table-column label="发布状态" align="center" show-overflow-tooltip prop="status">
          <template slot-scope="scope">
            {{ scope.row.status|statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center" show-overflow-tooltip prop="releaseTime" />
        <el-table-column label="操作" align="center" show-overflow-tooltip width="250px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.top == 2" type="text">置顶</el-button>
            <el-button v-if="scope.row.top == 1" type="text">取消置顶</el-button>
            <el-button v-if="scope.row.status == 1" type="text" @click="editNoticeForm(scope.row)">修改</el-button>
            <el-button v-if="scope.row.status == 1" type="text">公告发布</el-button>
            <el-button type="text">取消发布</el-button>
            <el-button type="text">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <pagination
          v-show="resData.total>0"
          :total="resData.total"
          :page.sync="query.pageIndex"
          :limit.sync="query.pageSize"
          class="pull-right"
          @pagination="getTableList"
        />
      </div>
    </el-card>
    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :title="titleName"
      @close="onCloseProjectForm"
    >
      <notice-form :notice-form-data="noticeFormData" @onCancel="onCloseProjectForm" @oSuccessCallback="oSuccessCallback" />
    </el-dialog>
  </div>
</template>

<script>
import NoticeForm from '../components/NoticeForm.vue'
import { fetchNoticeList } from '@/api/intergratedoffice'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination, NoticeForm
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '未发布',
        2: '已发布'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      noticeFormData: {},
      body: {},
      dialogVisible: false,
      list: [],
      query: {
        pageIndex: 1,
        pageSize: 10,
        type: 1
      },
      resData: {
        total: 0
      },
      statusOptions: [
        { value: 1, label: '未发布' },
        { value: 2, label: '已发布' }
      ],
      titleName: ''
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      fetchNoticeList(this.query, this.body).then(res => {
        this.list = res.records
        this.resData = res
      })
    },
    onCancel() {
      this.$listeners.onCancel && this.$listeners.onCancel()
    },
    onCloseProjectForm() {
      this.dialogVisible = false
      this.noticeFormData = {}
    },
    oSuccessCallback() {
      this.dialogVisible = false
      // this.params.pageIndex = 1
      this.getTableList()
    },
    addNoticeForm() {
      this.dialogVisible = true
      this.titleName = '新增公告'
      this.noticeFormData = {}
    },
    editNoticeForm() {
      this.dialogVisible = true
      this.titleName = '公告修改'
    }
  }
}
</script>
