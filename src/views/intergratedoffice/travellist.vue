<template>
  <div>
    <el-card>
      <div class="mb-18">
        <el-button type="primary" @click="open">新增申请</el-button>
      </div>
      <el-table
        :data="list"
        border
        stripe
        size="small"
        class="mb-18"
      >
        <el-table-column label="申请单编号" prop="applyNo" />
        <el-table-column label="出差事由" prop="reason" />
        <el-table-column label="出差天数" prop="days" />
        <el-table-column label="创建日期" prop="createTime" />
        <el-table-column label="申请人" prop="creator.userName" />
        <el-table-column label="同行人数" prop="colleagues" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="look(scope.row)">查看详情</el-button>

          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <pagination
          v-show="rdata.total>0"
          :total="rdata.total"
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
import Pagination from '@/components/Pagination'
import { businesstripapplyList } from '@/api/intergratedoffice'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      rdata: { total: 0 },
      list: [],
      total: 0,
      query: {
        pageIndex: 1,
        pageSize: 20
      },
      body: { }

    }
  },
  created() {
    this.businesstripapplyList()
  },
  methods: {
    fetchData() {

    },

    businesstripapplyList() {
      businesstripapplyList(this.query, this.body).then(res => {
        console.log(111, res)
        if (res) {
          this.list = res.records
          this.rdata = res
        }
      })
      this.businesstripapplyList
    },
    look(rowData) {

    },
    open() {
      // this.$router.push('/intergratedoffice/addtravellist')
      this.$router.push({
        path: '/intergratedoffice/addtravellist'

      })
    }

  }

}
</script>
