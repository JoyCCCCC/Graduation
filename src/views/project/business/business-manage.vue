<template>
  <div>
    <el-card>
      <div class="mb-18">
        <el-button type="primary" size="small" @click="add">添加商机</el-button>
      </div>
      <el-table
        border
        stripe
        :data="list"
        size="small"
        class="mb-18"
      >
        <el-table-column
          prop="name"
          label="商机名称"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="openDetail(scope.row)">
              {{ scope.row.businessOpportunityName }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="industryName.industryName"
          label="行业"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="estimateSigningAmount"
          label="预计签单金额"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="secretRelated.value"
          label="是否SM"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="estimateSigningTime"
          show-overflow-tooltip
          label="预计签单日期"
          align="center"
        />
        <el-table-column
          prop="areaName"
          label="项目所在区域"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="handleOpinion.value"
          label="处理意见"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="handleUserId"
          label="创建人"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          prop="handleTime"
          label="创建时间"
          show-overflow-tooltip
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="150px"
        >
          <template slot-scope="scope">
            <div class="btn-text-group">
              <el-button
                type="text"
                @click="handle(scope.row)"
              >处理</el-button>
              <el-button
                type="text"
                @click="edit(scope.row)"
              >修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="params.pageIndex"
        :limit.sync="params.pageSize"
        class="text-right"
        @pagination="fetchData"
      />
    </el-card>
    <el-dialog
      v-if="businessFormVisible"
      :title="titleName"
      :visible="businessFormVisible"
      width="850px"
      @close="onCloseBusinessForm"
    >
      <BusinessForm :business-form-data="businessFormData" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseBusinessForm" />
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchBusinessList
} from '@/api/project'
import Pagination from '@/components/Pagination'
import BusinessForm from './BusinessForm'
export default {
  components: {
    Pagination, BusinessForm
  },

  data() {
    return {
      businessFormVisible: false,
      businessFormData: {},
      titleName: '添加商机',
      params: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      body: {},
      list: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchBusinessList(this.params, this.body).then(res => {
        if (res) {
          this.total = res.total
          this.list = res.records
        }
      })
      console.log(1111, 2222)
    },

    // 添加/修改项目回调
    oSuccessCallback() {
      this.businessFormVisible = false
      this.params.pageIndex = 1
      this.fetchData()
    },
    add() {
      this.titleName = '添加商机'
      this.businessFormVisible = true
      this.businessFormData = {}
    },
    onCloseBusinessForm() {
      this.businessFormVisible = false
    },
    edit(rowData) {
      this.titleName = '修改商机'
      this.businessFormData = rowData || {}
      this.businessFormVisible = true
    },
    handle(rowData) {
      const path = `/project/business-handle/${rowData.opportunityId}`
      this.$router.push(path)
    },
    openDetail(rowData) {
      const path = `/project/business-detail/${rowData.opportunityId}`
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped="">
</style>
