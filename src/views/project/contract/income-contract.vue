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
        <span>合同信息</span>
      </div>
      <contractInput v-model="incomeContractForm" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>签约信息</span>
      </div>
      <signInput v-model="incomeContractForm" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>结算信息</span>
      </div>
      <billingInput v-model="incomeContractForm.Payment" />
    </el-card>
  </div>
</template>

<script>
import ProjectInfo from '../components/ProjectInfo.vue' // 项目信息
import contractInput from './contractcompnent/contractInput.vue' // 合同信息
import signInput from './contractcompnent/signInput.vue' // 签约信息
import billingInput from './contractcompnent/billingInput.vue' // 结算信息
import { contractForm, projectForm } from '../data'
export default {
  name: '',
  components: {
    ProjectInfo, contractInput, signInput, billingInput
  },

  data: function() {
    return {
      contractForm: {},
      projectForm: {},
      incomeContractForm: {}
    }
  },
  computed: {
  },
  created() {
    this.contractForm = contractForm
    this.projectForm = projectForm
    this.incomeContractForm = this.$deepcopy({}, contractForm)
  },
  methods: {

  }
}
</script>

<style>
</style>
