<template>
  <div class="form-text-list">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">申请主题：</span>
          <span v-ellipsis:top="purInfo.title" class="text">{{ purInfo.title }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">是否外包：</span>
          <span v-ellipsis:top="purInfo.isOutsource" class="text">{{ purInfo.outsource?'是':'否' }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">软硬件：</span>
          <span v-ellipsis:top="purInfo.productTypeId" class="text">{{ purInfo.productTypeId&&purInfo.productTypeId.value }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">申请说明：</span>
          <span v-ellipsis:top="purInfo.remark" class="text">{{ purInfo.remark }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">清单类型：</span>
          <span v-ellipsis:top="purInfo.purchaseTypeId" class="text">{{ purInfo.purchaseTypeId&&purInfo.purchaseTypeId.value }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">收货人：</span>
          <span v-ellipsis:top="purInfo.consignee" class="text">{{ purInfo.consignee }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">收货地址：</span>
          <span v-ellipsis:top="purInfo.receivingAddress" class="text">{{ purInfo.receivingAddress }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">联系电话：</span>
          <span v-ellipsis:top="purInfo.contactNumber" class="text">{{ purInfo.contactNumber }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">所属区域：</span>
          <span v-ellipsis:top="purInfo.areaId" class="text">{{ purInfo.areaId }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">维保期限：</span>
          <span v-ellipsis:top="purInfo.maintenancePeriod" class="text">{{ purInfo.maintenancePeriod }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">期望到货时间：</span>
          <span v-ellipsis:top="purInfo.expectedArrivalTime" class="text">{{ purInfo.expectedArrivalTime }}</span>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { fetchPurchaseApplyDetail } from '@/api/project'
export default {
  name: 'PurchaseApplyInfo',
  props: {
    projectPurchaseApplyId: {
      type: Number,
      default: 0
    },
    projectId: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      purInfo: {}
    }
  },
  created() {
    this.fetchData()
  },

  methods: {

    fetchData() {
      if (this.projectPurchaseApplyId && this.projectId) {
        const params = {
          projectId: this.projectId,
          projectPurchaseApplyId: this.projectPurchaseApplyId
        }
        fetchPurchaseApplyDetail(params).then(res => {
          this.purInfo = res
        })
      }
    }

  }
}
</script>

<style lang='scss' scoped>
</style>

