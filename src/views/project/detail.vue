<template>
  <div>

    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目信息</span>
      </div>
      <ProjectInfo :project-info="projectInfo" />
    </el-card>
    <el-card v-if="showProjectStatus" class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目状态</span>
      </div>
      <div class="project-status">
        <el-tag>主状态</el-tag>
        <div class="project-step">
          <Step
            :is-main="true"
            :is-origin-status="mainActive===originMainActive"
            :origin-active="originMainActive"
            :active="mainActive"
            :step-list="mainStepList"
            @onSelectStep="onSelectStep"
          />
        </div>
      </div>
      <div v-if="subStepList&&subStepList.length>1" class="project-status">
        <el-tag type="success">子状态</el-tag>
        <div class="project-step">
          <Step
            :is-origin-status="mainActive===originMainActive"
            :origin-active="originSubActive"
            :active="subActive"
            :step-list="subStepList"
            @onSelectStep="onSelectSubStep"
          />
        </div>
      </div>
    </el-card>
    <component
      :is="currentComponent.component"
      :parent-props="currentComponent.props"
      :is-disabled="isDisabled"
      @onBack="onBack"
    />
  </div>
</template>

<script>

import Step from './components/Step.vue'
import AbolishInfo from './components/AbolishInfo.vue'
import AbolishAnalysis from './components/AbolishAnalysis.vue'
import ProjectInfo from './components/ProjectInfo.vue'
import ProjectType from './components/ProjectType.vue'
import ContractInfo from './components/contract/ContractInfo.vue'
import ContractList from './components/contract/ContractList.vue'
import PurchaseApply from './components/purchase/PurchaseApply.vue'
import StandUp from './components/StandUp.vue'
import Delivery from './components/Delivery.vue'
import Acceptance from './components/Acceptance.vue'
import PurchaseApplyList from './components/purchase/PurchaseApplyList.vue'
import QuotedPrice from './components/QuotedPrice.vue'
import InquiryPrice from './components/inquiry/InquiryPrice.vue'
import AssistTender from './components/AssistTender.vue'
import ProjectBudget from './components/ProjectBudget'
import AssistBid from './components/AssistBid'

import { fetchProjectDetail, fetchProjectSteps } from '@/api/project'
import { projectBtnType } from '@/views/project/constant'
export default {
  name: 'Detail',
  components: {
    AssistBid, QuotedPrice, ProjectBudget, Step, AbolishInfo,
    AbolishAnalysis, ProjectInfo, ProjectType, ContractInfo,
    ContractList, StandUp, PurchaseApply, PurchaseApplyList,
    Delivery, Acceptance, InquiryPrice, AssistTender
  },

  data: function() {
    return {
      stepList: [],
      rules: {},
      isexpend: '',

      projectId: this.$route.params.projectId,
      entryType: this.$route.params && this.$route.params.type || '',
      projectInfo: {},
      currentComponent: {
        component: null,
        props: {}
      },
      originMainActive: 0, // 初始主状态进度
      originSubActive: 0, // 初始子状态进度
      mainActive: 0, // 当前主状态进度
      subActive: 0, // 当前子状态进度
      mainStepList: []
    }
  },

  computed: {
    subStepList() {
      return this.stepList && this.stepList[this.mainActive] && this.stepList[this.mainActive].projectSubStatus
    },
    isDisabled() {
      return this.entryType === projectBtnType.DETAIL || this.mainActive < this.originMainActive || (this.mainActive === this.originMainActive && this.subActive < this.originSubActive)
    },
    isCurrentStep() {
      return this.mainActive === this.originMainActive && this.subActive === this.originSubActive
    },
    showProjectStatus() {
      if (this.projectInfo && this.projectInfo.projectTypeId && this.projectInfo.projectTypeId.key === 0) {
        return false
      } else if (this.entryType && this.entryType === projectBtnType.BUDGET) {
        return false
      }
      return true
    }
  },
  created() {
    this.fetchData() // 获取项目信息详情数据，根据返回值判断哪种类型，显示不同的状态进度条
    this.isexpends()
  },
  methods: {
    fetchData() {
      fetchProjectDetail(this.projectId)
        .then(projectInfo => {
          this.projectInfo = projectInfo
          return projectInfo
        // 需要根据类型请求接口获取当前所有步骤数据
        })
        .then(projectInfo => {
          // 类型已确定  需要获取步骤条数据
          if (projectInfo && projectInfo.projectTypeId && projectInfo.projectTypeId.key) {
            return fetchProjectSteps(projectInfo.projectId)
          } else {
            return []
          }
        })
        .then(res => {
          this.stepList = res
          this.getInitData()
        })
        .catch(error => console.log(error))
    },
    isexpends() {
      if (this.entryType === projectBtnType.EXPEND_CONTRACT) {
        this.isexpend = true
      } else {
        this.isexpend = false
      }
    },

    // 初始化数据  页面、当前状态进度
    getInitData() {
      if (this.projectInfo && this.projectInfo.projectTypeId && this.projectInfo.projectTypeId.key) {
        const mainStatus = this.projectInfo.projectMainStatus.key
        const subStatus = this.projectInfo.projectSubStatus.key
        this.mainStepList = this.stepList.map(v => v && v.projectMainStatus)
        let _mainIndex = this.mainStepList.findIndex(v => v.key === mainStatus)
        const _subStepList = this.stepList[_mainIndex].projectSubStatus
        let _subIndex = _subStepList.findIndex(v => v.key === subStatus)

        // 每个子步骤的最后一步，进入详情页都对应下一个步骤的第一步
        if (this.entryType !== projectBtnType.DETAIL && _mainIndex !== this.mainStepList.length - 1 && _subIndex === _subStepList.length - 1) {
          _mainIndex++
          _subIndex = 0
        }
        if (this.entryType === projectBtnType.ASSIST_BID) { // 协助中标进入时，实际还是报价状态，需要手动让子状态进1
          _subIndex++
        }
        this.mainActive = _mainIndex
        this.subActive = _subIndex
        this.originMainActive = _mainIndex
        this.originSubActive = _subIndex
        this.getCurrentComponent()
      } else {
        if (this.entryType !== projectBtnType.DETAIL && this.projectInfo.projectTypeId.key === 0 && this.projectInfo.auditStatus.key === 0) {
          this.currentComponent = {
            component: StandUp,
            props: {
              projectId: this.projectInfo.projectId
            }
          }
        }
      }
    },

    // 获取当前状态下显示的组件以及数据
    getCurrentComponent() {
      let _currentComponent = {
        component: null,
        props: {}
      }
      if (this.entryType === projectBtnType.BUDGET) { // 预算录入
        _currentComponent = {
          component: ProjectBudget,
          props: {}
        }
      } else if ([projectBtnType.EXPEND_CONTRACT, projectBtnType.INCOME_CONTRACT].includes(this.entryType)) { // 点击收入合同或支出合同时  显示录入合同信息页面  其他情况下在该状态下显示的是合同列表页面
        _currentComponent = {
          component: ContractInfo,
          props: {
            projectId: this.projectInfo.projectId,
            isCurrentStep: this.isCurrentStep,
            entryType: this.entryType
          }
        }
      } else if ([projectBtnType.PURCHASE_APPLY].includes(this.entryType)) { // 点击采购申请时  显示录入采购申请组件  其他情况下在该状态下显示的是申请列表
        _currentComponent = {
          component: PurchaseApply,
          props: {
            projectId: this.projectInfo.projectId,
            isCurrentStep: this.isCurrentStep,
            entryType: this.entryType
          }
        }
      } else {
        _currentComponent = this.getComponentsByStatus()
      }
      this.currentComponent = _currentComponent
    },

    getComponentsByStatus() {
      let _currentComponent = {
        component: null,
        props: {}
      }
      const componentsMap = {
        1201: { // 立项
          component: StandUp
        },
        1402: { // 协助投标
          component: AssistTender
        },
        1403: { // 询价
          component: InquiryPrice
        },
        1404: { // 报价
          component: QuotedPrice
        },
        1406: { // 协助中标
          component: AssistBid
        },
        1501: { // 实施-签合同  收入合同/支出合同  列表
          component: ContractList,
          props: {
            projectMainStatus: this.projectInfo.projectMainStatus.key,
            projectSubStatus: this.projectInfo.projectSubStatus.key
          }
        },
        1503: { // 实施-供货  采购申请列表
          component: PurchaseApplyList
        }
      }
      const _subStatus = this.subStepList[this.subActive].key
      // console.log(_subStatus, '_subStatus_subStatus')
      if (componentsMap[_subStatus]) {
        _currentComponent = componentsMap[_subStatus]
        _currentComponent.props = {
          ..._currentComponent.props,
          projectId: this.projectInfo.projectId,
          isCurrentStep: this.isCurrentStep,
          entryType: this.entryType
        }
      }
      return _currentComponent
    },

    onSelectStep(active) {
      this.mainActive = active
      // console.log('一级状态', this.mainActive)
      this.getCurrentSubActive()
    },

    onSelectSubStep(active) {
      this.subActive = active
      // console.log('二级状态', this.subActive)
      this.getCurrentComponent()
    },

    getCurrentSubActive() {
      const _length = this.stepList[this.mainActive].projectSubStatus.length
      if (this.mainActive < this.originMainActive) {
        this.subActive = _length - 1
      } else {
        this.subActive = this.originSubActive
      }
      this.getCurrentComponent()
    },

    submitForm() {
      console.log(this.projectForm)
    // this.$refs.postForm.validate(valid => {
    //   if (valid) {
    //     this.loading = true
    //     this.$notify({
    //       title: '成功',
    //       message: '发布文章成功',
    //       type: 'success',
    //       duration: 2000
    //     })
    //     this.postForm.status = 'published'
    //     this.loading = false
    //   } else {
    //     console.log('error submit!!')
    //     return false
    //   }
    // })
    },
    onBack() {
      this.$router.go(-1)
      // this.$router.replace('/project/manage')
    }
  }

}
</script>

<style lang='scss' scoped>
.project-status {
  display: flex;
  .project-step {
    flex-grow: 1;
  }
  & + .project-status {
    margin-top: 20px;
  }
}
</style>
