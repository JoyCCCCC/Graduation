<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目信息</span>
      </div>
      <ProjectInfo v-model="projectForm" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购信息</span>
      </div>
      <PurchaseApplyInfo v-model="projectForm" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购付款</span>
      </div>
      <el-form
        ref="curContractForm"
        :model="curContractForm"
        label-width="130px"
        size="small"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请主题">
              <el-input v-model="curContractForm.p1" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="采购公司">
              <el-input v-model="curContractForm.p2" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="本次付款金额">
              <el-input v-model="curContractForm.p3" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="是否完工验收款">
              <el-select v-model="curContractForm.p4">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="外包质量评价">
              <el-input v-model="curContractForm.p5" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="付款类型">
              <el-select v-model="curContractForm.p6">
                <el-option label="支票" :value="1" />
                <el-option label="转账" :value="2" />
                <el-option label="银行承兑汇票" :value="3" />
                <el-option label="商业承兑汇票" :value="4" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="兑付时间">
              <el-input v-model="curContractForm.p7" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请说明">
              <el-input v-model="curContractForm.p8" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同金额">
              <el-input v-model="curContractForm.p9" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="累计已付款金额">
              <el-input v-model="curContractForm.p10" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="附件">
              <el-input v-model="curContractForm.p11" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ProjectInfo from '../components/ProjectInfo.vue' // 项目信息
import PurchaseApplyInfo from '../components/purchase/PurchaseApplyInfo' // 信息
import { contractForm, projectForm, curFormInfo } from '../data'
export default {
  name: '',
  components: {
    ProjectInfo, PurchaseApplyInfo
  },

  data: function() {
    return {
      curContractForm: {},
      contractForm: {},
      projectForm: {},
      curFormInfo: {}
    }
  },
  computed: {
  },
  created() {
    this.contractForm = contractForm
    this.projectForm = projectForm
    this.curFormInfo = curFormInfo
  },
  methods: {

  }
}
</script>
