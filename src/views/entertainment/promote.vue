<template>
  <div>
    <el-card>
      <div class="mb-18">
        <el-button class="filter-item" size="small" type="primary" @click="dialogFormVisible=true">提升额度</el-button>
      </div>
      <div style="margin-top:10px">
        <el-table :data="list" border stripe size="small" class="mb-18">
          <el-table-column
            v-loading="listLoading"
            min-width="20%"
            show-overflow-tooltip
            prop="title"
            label="项目主题"
            align="center"
          />
          <el-table-column min-width="30%" prop="amount" label="项目金额" align="center" />
          <el-table-column prop="reason" label="原因" align="center" />
          <el-table-column prop="createTime" label="申请时间" align="center" />
          <el-table-column min-width="30%" prop="createusename" label="申请人" align="center" />
        </el-table>
        <div class="filter-container" />
      </div>
      <el-dialog
        title="提升额度"
        custom-class="customWidth"
        :visible.sync="dialogFormVisible"
        customclass="customWidth"
        width="40%"
      >
        <el-form ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="申请主题" prop="projectId">
            <el-input v-model="form.projectId" />
          </el-form-item>
          <el-form-item label="提升金额" prop="amount">
            <el-input v-model="form.amount" />
          </el-form-item>
          <el-form-item label="申请原因" prop="remark">
            <el-input v-model="form.remark" :autosize="{ minRows: 2, maxRow: 4}" type="textarea" placeholder="请输入" />
          </el-form-item>
          <el-button style="margin-left:150px" @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" style="align:center" @click="dialogFormVisible = false">提交</el-button>
        </el-form>
      </el-dialog>

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
import {
  getList
} from '@/api/entertainment'
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

      list: [],
      listLoading: true,
      form: {
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(1, response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
