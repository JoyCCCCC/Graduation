<template>
  <div>
    <el-form :model="businsssDetailForm">
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>商机信息</span>
        </div>
        <div class="form-text-list">
          <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">商机ID：</span>
                <span class="text">{{ businsssDetailForm.opportunityId }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">商机名称：</span>
                <span class="text">{{ businsssDetailForm.businessOpportunityName }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">行业名称：</span>
                <span class="text">{{ businsssDetailForm.industryName.industryName }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">是否涉密：</span>
                <span class="text">{{ businsssDetailForm.secretRelated.value }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">预计签单金额：</span>
                <span class="text">{{ businsssDetailForm.estimateSigningAmount }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">预计签单日期：</span>
                <span class="text">{{ businsssDetailForm.estimateSigningTime }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">项目所在区域：</span>
                <span class="text">{{ businsssDetailForm.areaName }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">处理意见：</span>
                <span class="text">{{ businsssDetailForm.handleOpinion.value }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">商机处理备注：</span>
                <span class="text">{{ businsssDetailForm.handleDescription }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">商机状态：</span>
                <span class="text">{{ businsssDetailForm.status.value }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">商机处理时间：</span>
                <span class="text">{{ businsssDetailForm.handleTime }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">商机处理人：</span>
                <span class="text">{{ businsssDetailForm.handleUserId }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">审批状态：</span>
                <span class="text">{{ businsssDetailForm.auditStatus.value }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :xl="24">
              <div class="form-text-group">
                <span class="label">商机描述：</span>
                <span class="text">{{ businsssDetailForm.description }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :xl="24">
              <div class="form-text-group">
                <span class="label">备注：</span>
                <span class="text">{{ businsssDetailForm.remark }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>产品列表</span>
        </div>
        <el-table
          border
          stripe
          :data="businsssDetailForm.product"
        >
          <el-table-column
            prop="productId"
            label="产品ID"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="productType.productType"
            label="商机产品ID"
            show-overflow-tooltip
            align="center"
          />
          <el-table-column
            prop="productType.productTypeName"
            label="产品类型"
            align="center"
          />
          <el-table-column
            prop="amount"
            label="预计金额"
            show-overflow-tooltip
            align="center"
          />

        </el-table>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import {
  fetchBusinessDetail
} from '@/api/project'

export default {
  'name': 'BusinessDetail',
  data() {
    return {
      id: this.$route.params.id,
      businsssDetailForm: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchBusinessDetail(this.id).then(res => {
        if (res) {
          this.businsssDetailForm = res
        }
      })
    }
  }
}
</script>

