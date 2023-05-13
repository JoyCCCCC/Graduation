<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          用章申请
        </span>
      </div>
      <div class="mb-18">
        <el-button type="primary" @click="AddForm">新增申请</el-button>
      </div>
      <div>
        <el-table
          :data="list"
          border
          stripe
          size="small"
          class="mb-18"
        >
          <el-table-column label="用章人" prop="creator.userName" align="center" show-overflow-tooltip />
          <el-table-column label="申请部门" align="center" show-overflow-tooltip prop="department" />
          <el-table-column label="印章名称" prop="stampName.stampName" align="center" show-overflow-tooltip />
          <el-table-column label="申请日期" prop="createTime" align="center" show-overflow-tooltip />
          <el-table-column label="用章时间" prop="useStampTime" align="center" show-overflow-tooltip />
          <el-table-column label="是否外借" prop="lend.value" align="center" show-overflow-tooltip />
          <el-table-column label="发往单位" prop="lendAddr" align="center" show-overflow-tooltip />
          <el-table-column label="操作" align="center" width="180px">
            <template slot-scope="scope">
              <el-button type="text" @click="toDetail(scope.row)">查看详情</el-button>
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
      </div>
    </el-card>
    <el-dialog
      v-if="dialogAddForm"
      title="新增用章申请"
      :visible.sync="dialogAddForm"
      destroy-on-close
      @close="onCloseProjectForm"
    >
      <stamp-apply :stamp-apply-data="stampApplyData" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseProjectForm" />
    </el-dialog>
  </div>
</template>

<script>
import StampApply from './components/StampApplicationForm.vue'
import { fetchStampList } from '@/api/intergratedoffice'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination, StampApply
  },
  filters: {
    lendFilter(status) {
      const statusMap = {
        '1': '是',
        '2': '否'
      }
      return statusMap[status]
    }
  },
  data: function() {
    return {
      stampApplyData: {},
      resData: {
        total: 0
      },
      listLoading: true,
      dialogAddForm: false,
      lendTiemShow: false,
      list: [],
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      addSealApplication: {
        applyDate: new Date()
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    AddForm() {
      this.dialogAddForm = true
      this.stampApplyData = {
        isAdd: true
      }
    },
    oSuccessCallback() {
      this.dialogAddForm = false
      // this.params.pageIndex = 1
      this.getTableList()
    },
    toDetail(rowData) {
      this.dialogAddForm = true
      this.stampApplyData = {
        isAdd: false,
        useStampApplyId: rowData.useStampApplyId
      }
    },
    closeForm() {
    },
    onCloseBusinessForm() {
      this.businessFormVisible = false
    },
    getTableList() {
      fetchStampList(this.query).then(res => {
        this.list = res.records
        this.resData = res
      })
    },
    onCloseProjectForm() {
      this.dialogAddForm = false
      this.stampApplyData = {}
    },
    lendConfig() {
    }
  }

}
</script>
