<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目信息</span>
      </div>
      <ProjectInfo :project-info="projectInfo" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购申请信息</span>
      </div>
      <PurchaseApplyInfo :project-purchase-apply-id="projectPurchaseApplyId" :project-id="projectId" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购合同信息</span>
      </div>
      <el-form
        ref="purContractForm"
        :rules="purContractRule"
        :model="purContractForm"
        label-width="130px"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请主题" prop="title">
              <el-input v-model="purContractForm.title" placeholder="请输入申请主题" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同名称" prop="contractName">
              <el-input v-model="purContractForm.contractName" placeholder="请输入合同名称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同编号" prop="aContractNo">
              <el-input v-model="purContractForm.aContractNo" placeholder="请输入合同编号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="签订日期" prop="signDate">
              <el-date-picker
                v-model="purContractForm.signDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择签订日期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同金额" prop="contractAmount">
              <el-input v-model="purContractForm.contractAmount" placeholder="请输入合同金额" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="税率" prop="taxRate">
              <el-input v-model="purContractForm.taxRate" placeholder="请输入税率" />
              <!-- <el-select v-model="purContractForm.taxRate" placeholder="请选择税率">
                <el-option label="6%" :value="1" />
                <el-option label="10%" :value="2" />
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="税金" prop="tax">
              <el-input v-model="purContractForm.tax" placeholder="请输入税金" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同类型" prop="contractType">
              <el-select v-model="purContractForm.contractType" placeholder="请选择合同类型">
                <el-option label="合同内" :value="1" />
                <el-option label="合同外" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同属性" prop="contractAttribute">
              <el-select v-model="purContractForm.contractAttribute" placeholder="请选择合同属性">
                <el-option label="合同内" :value="1" />
                <el-option label="合同外" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="甲方单位" prop="aCompanyId">
              <el-select v-model="purContractForm.aCompanyId" placeholder="请选择甲方单位">
                <el-option label="海峡基石" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="签订人" prop="signPersonId">
              <el-select v-model="purContractForm.signPersonId" placeholder="请选择签订人">
                <el-option label="张三" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系方式" prop="bContractWay">
              <el-input v-model="purContractForm.bContractWay" placeholder="请输入联系方式" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系地址" prop="bContractAddress">
              <el-input v-model="purContractForm.bContractAddress" placeholder="请输入联系地址" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方单位" prop="bCompany">
              <el-input v-model="purContractForm.bCompany" placeholder="请输入乙方公司" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方联系人" prop="contractor">
              <el-input v-model="purContractForm.contractor" placeholder="请输入乙方联系人" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方联系方式" prop="bContractWay">
              <el-input v-model="purContractForm.bContractWay" placeholder="请输入乙方联系人" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方联系地址" prop="bContractAddress">
              <el-input v-model="purContractForm.bContractAddress" placeholder="请输入乙方联系地址" />
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="期望到货时间" prop="estimatedArrivalTime">
              <el-input v-model="purContractForm.estimatedArrivalTime" />
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="预计到货时间" prop="estimatedArrivalTime">
              <el-date-picker
                v-model="purContractForm.estimatedArrivalTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择预计到货时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>结算信息</span>
      </div>
      <billingInput v-model="contractForm.Payment" :is-contract-pay="true" :type="type" />
    </el-card>
  </div>
</template>

<script>
import ProjectInfo from '../components/ProjectInfo.vue' // 项目信息
import PurchaseApplyInfo from '../components/purchase/PurchaseApplyInfo'
import billingInput from '../contract/contractcompnent/billingInput.vue' // 结算信息
import { contractForm, projectForm, curFormInfo } from '../data'
import { fetchProjectDetail } from '@/api/project'
export default {
  name: 'PurContract',
  components: {
    ProjectInfo, billingInput, PurchaseApplyInfo
  },

  data: function() {
    return {
      purContractForm: {},
      contractForm: {},
      projectForm: {},
      curFormInfo: {},
      type: 'expend',

      projectId: this.$route.params.projectId,
      projectPurchaseApplyId: this.$route.params.projectPurchaseApplyId,
      projectInfo: {},
      purContractRule: {
        title: [
          { required: true, message: '请输入申请主题', trigger: 'blur' }
        ]
        // title: [
        //   { required: true, message: '请输入申请主题', trigger: 'blur' }
        // ]
      }
    }
  },
  computed: {
  },
  created() {
    this.contractForm = contractForm
    this.projectForm = projectForm
    this.curFormInfo = curFormInfo

    this.getProjectInfo()
  },
  methods: {
    getProjectInfo() {
      if (this.projectId) {
        fetchProjectDetail(this.projectId)
          .then(res => {
            this.projectInfo = res
          })
      }
    }
  }
}
</script>
