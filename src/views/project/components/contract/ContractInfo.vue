<template>
  <div class="contract-info-container">
    <el-card v-if="isFromProjectDetail" class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目信息</span>
      </div>
      <ProjectInfo :project-info="projectInfo" />
    </el-card>

    <el-form
      ref="contractForm"
      :model="contractInfo"
      :rules="contractRule"
      :disabled="isFromProjectDetail"
      label-width="120px"
    >
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>合同信息</span>
        </div>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="甲方合同编号：" prop="aContractNo">
              <el-input
                v-model="contractInfo.aContractNo"
                placeholder="请输入甲方合同编号"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方合同编号：" prop="bContractNo">
              <el-input
                v-model="contractInfo.bContractNo"
                placeholder="请输入乙方合同编号"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="支出类型" prop="expenseType">
              <el-select v-model="contractInfo.expenseType" placeholder="请选择支出类型" :disabled="isIncome">
                <!-- 1-项目，2-技术服务，3-采购，4-外包 -->
                <el-option label="项目" :value="1" />
                <el-option label="技术服务" :value="2" />
                <el-option label="采购" :value="3" />
                <el-option label="外包" :value="4" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同名称：" prop="contractName">
              <el-input
                v-model="contractInfo.contractName"
                placeholder="请输入合同名称"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同金额：" prop="contractAmount">
              <el-input
                v-model="contractInfo.contractAmount"
                placeholder="请输入合同金额"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="签订日期：" prop="signDate">
              <el-date-picker
                v-model="contractInfo.signDate"
                type="date"
                placeholder="请选择签订日期"

                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="生效日期：" prop="startDate">
              <el-date-picker
                v-model="contractInfo.startDate"
                type="date"
                placeholder="请选择生效日期"

                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="终止日期：" prop="endDate">
              <el-date-picker
                v-model="contractInfo.endDate"
                type="date"
                placeholder="请选择终止日期"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同份数：" prop="contractQuantity">
              <el-input
                v-model="contractInfo.contractQuantity"
                type="number"
                placeholder="请输入合同份数"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="质保金：" prop="warranty">
              <el-input
                v-model="contractInfo.warranty"
                placeholder="请输入质保金"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="质保期：" prop="warrantyPeriod">
              <el-input
                v-model="contractInfo.warrantyPeriod"
                placeholder="请输入质保期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="货期：" prop="deliveryDate">
              <el-input
                v-model="contractInfo.deliveryDate"
                placeholder="请输入货期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="货物金额：" prop="deliveryAmount">
              <el-input
                v-model="contractInfo.deliveryAmount"
                placeholder="请输入货物金额"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="货物税率：" prop="deliveryTaxRate">
              <el-input
                v-model="contractInfo.deliveryTaxRate"
                placeholder="请输入货物税率"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="服务金额：" prop="serviceAmount">
              <el-input
                v-model="contractInfo.serviceAmount"
                placeholder="请输入服务金额"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="服务税率：" prop="serviceTaxRate">
              <el-input
                v-model="contractInfo.serviceTaxRate"
                placeholder="请输入服务税率"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="收款条件：" prop="receiveMoneyRequire">
              <el-input
                v-model="contractInfo.receiveMoneyRequire"
                type="textarea"
                placeholder="请输入收款条件"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="主要条款：" prop="mainClause">
              <el-input
                v-model="contractInfo.mainClause"
                type="textarea"
                placeholder="请输入主要条款"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="附件：" prop="accessory">
              <Upload
                :file-list="contractInfo.accessory"
                @handleRemove="handleRemove"
                @handleSuccess="handleUploadSuccess"
                @handleError="handleUploadError"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>

      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>签约信息</span>
        </div>

        <!-- 收入合同显示的签约信息 -->
        <el-row v-if="isIncome" :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="甲方单位：" prop="aCompany">
              <el-input v-model="contractInfo.aCompany" placeholder="请输入甲方单位" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="甲方联系人：" prop="aContractor">
              <el-input v-model="contractInfo.aContractor" placeholder="请输入甲方签订人" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="甲方联系方式：" prop="aContractWay">
              <el-input v-model="contractInfo.aContractWay" placeholder="请输入甲方联系方式" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="甲方联系地址：" prop="aContractAddress">
              <el-input v-model="contractInfo.aContractAddress" placeholder="请输入甲方联系地址" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方信息：" prop="bCompanyId">
              <el-select v-model="contractInfo.bCompanyId" placeholder="请选择乙方公司">
                <el-option label="海峡基石" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="签订人：" prop="signPerson">
              <el-select
                v-model="contractInfo.signPerson"
                placeholder="请选择签订人"
              >
                <el-option label="张三" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="是否安装调试：" prop="installDebug">
              <el-select
                v-model="contractInfo.installDebug"
                placeholder="请选择是否安装调试"
              >
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="业主：" prop="businessOwner">
              <el-input v-model="contractInfo.businessOwner" placeholder="请输入业主名称" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 支出合同显示的签约信息 -->
        <el-row v-if="isExpend" :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="甲方单位：" prop="aCompanyId">
              <el-select v-model="contractInfo.aCompanyId" placeholder="请选择甲方公司">
                <el-option label="海峡基石" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="签订人：" prop="signPerson">
              <el-select
                v-model="contractInfo.signPerson"
                placeholder="请选择签订人"
              >
                <el-option label="张三" :value="1" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="是否安装调试：" prop="installDebug">
              <el-select
                v-model="contractInfo.installDebug"
                placeholder="请选择是否安装调试"
              >
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="业主：" prop="businessOwner">
              <el-input v-model="contractInfo.businessOwner" placeholder="请输入业主名称" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方信息：" prop="bCompany">
              <el-input v-model="contractInfo.bCompany" placeholder="请输入乙方单位" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方联系人：" prop="bContractor">
              <el-input v-model="contractInfo.bContractor" placeholder="请输入乙方联系人" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方联系方式：" prop="bContractWay">
              <el-input v-model="contractInfo.bContractWay" placeholder="请输入乙方联系方式" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="乙方联系地址：" prop="bContractAddress">
              <el-input v-model="contractInfo.bContractAddress" placeholder="请输入乙方联系地址" />
            </el-form-item>
          </el-col>

        </el-row>
      </el-card>
    </el-form>

    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>结算信息</span>
      </div>
      <FundInfo
        v-model="contractInfo.payment"
        :entry-type="parentProps.entryType"
        :project-id="parentProps.projectId"
        :contract-type="contractType"
      />

      <div v-if="!isDisabled" class="foot-button text-center t-line pt-18">
        <el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import ProjectInfo from '../ProjectInfo.vue' // 项目信息
import { contractApply, fetchProjectDetail, fetchContractDetail } from '@/api/project'
import props from '../../mixins/props'
import Upload from '@/components/Upload'
import { validateMoney, validateRate } from '@/utils/validateForm'
import FundInfo from './FundInfo'
import { mapGetters } from 'vuex'
import { projectBtnType } from '../../constant'
import { getFileName } from '@/utils'
export default {
  name: 'ContractInfo',
  components: {
    ProjectInfo, Upload, FundInfo
  },
  mixins: [props],
  props: {
    contractType: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      contractForm: {},
      projectId: this.parentProps.projectId,
      contractId: this.parentProps.contractId,
      projectInfo: {},
      contractInfo: {
        payment: [],
        expenseType: this.parentProps.entryType === projectBtnType.INCOME_CONTRACT ? 1 : ''
      },
      contractRule: {
        aContractNo: [
          { required: true, message: '请输入甲方合同编号', trigger: 'blur' }
        ],
        bContractNo: [
          { required: true, message: '请输入乙方合同编号', trigger: 'blur' }
        ],
        expenseType: [
          { required: true, message: '请选择支出类型', trigger: 'blur' }
        ],
        contractName: [
          { required: true, message: '请输入合同名称', trigger: 'blur' }
        ],
        contractAmount: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ],
        signDate: [
          { required: true, message: '请选择签订日期', trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择生效日期', trigger: 'blur' }
        ],
        endDate: [
          { required: true, message: '请选择终止日期', trigger: 'blur' }
        ],
        contractQuantity: [
          { required: true, message: '请输入合同分数', trigger: 'blur' }
        ],
        warranty: [
          { required: true, message: '请输入质保金', trigger: 'blur' }
        ],
        warrantyPeriod: [
          { required: true, message: '请输入质保期', trigger: 'blur' }
        ],
        deliveryDate: [
          { required: true, message: '请输入货期', trigger: 'blur' }
        ],
        deliveryAmount: [
          { required: true, message: '请输入货物金额', trigger: 'blur' }
        ],
        deliveryTaxRate: [
          { required: true, message: '请输入货物税率', trigger: 'blur' },
          { validator: validateRate, trigger: 'blur' }
        ],
        serviceAmount: [
          { required: true, message: '请输入服务金额', trigger: 'blur' }
        ],
        serviceTaxRate: [
          { required: true, message: '请输入服务税率', trigger: 'blur' },
          { validator: validateRate, trigger: 'blur' }
        ],
        receiveMoneyRequire: [
          { required: true, message: '请输入收款条件', trigger: 'blur' }
        ],
        mainClause: [
          { required: true, message: '请输入主要条款', trigger: 'blur' }
        ],
        accessory: [
          { required: true, message: '请上传附件', trigger: 'blur' }
        ],
        aCompany: [
          { required: true, message: '请输入甲方单位', trigger: 'blur' }
        ],
        aCompanyId: [
          { required: true, message: '请选择甲方单位', trigger: 'blur' }
        ],
        aContractor: [
          { required: true, message: '请输入甲方签订人', trigger: 'blur' }
        ],
        aContractWay: [
          { required: true, message: '请输入甲方联系方式', trigger: 'blur' }
        ],
        aContractAddress: [
          { required: true, message: '请输入甲方联系地址', trigger: 'blur' }
        ],
        bCompanyId: [
          { required: true, message: '请选择乙方公司', trigger: 'blur' }
        ],
        bContractorId: [
          { required: true, message: '请选择乙方签订人', trigger: 'blur' }
        ],
        installDebug: [
          { required: true, message: '请选择是否安装调试', trigger: 'blur' }
        ],
        businessOwner: [
          { required: true, message: '请输入业主名称', trigger: 'blur' }
        ],
        signPerson: [
          { required: true, message: '请选择签订人', trigger: 'blur' }
        ],
        bCompany: [
          { required: true, message: '请输入乙方单位', trigger: 'blur' }
        ],
        bContractor: [
          { required: true, message: '请输入乙方联系人', trigger: 'blur' }
        ],
        bContractWay: [
          { required: true, message: '请输入乙方联系方式', trigger: 'blur' }
        ],
        bContractAddress: [
          { required: true, message: '请输入乙方联系地址', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loading', 'sysConfig']),
    isIncome() { // 是否收入合同
      return this.parentProps.entryType === projectBtnType.INCOME_CONTRACT ||
      this.contractInfo.incomeExpenseTypeId && this.contractInfo.incomeExpenseTypeId.key === 1
    },
    isExpend() { // 是否支出合同
      return this.parentProps.entryType === projectBtnType.EXPEND_CONTRACT ||
      this.contractInfo.incomeExpenseTypeId && this.contractInfo.incomeExpenseTypeId.key === 2
    },
    isInquiry() { // 是否采购合同
      return false
    },
    isFromProjectDetail() {
      return this.parentProps.entryType === projectBtnType.DETAIL
    }
  },
  created() {
    this.fetchData()
    if (this.isFromProjectDetail) {
      this.getProjectInfo()
    }
  },
  methods: {

    getProjectInfo() {
      fetchProjectDetail(this.projectId)
        .then(res => {
          this.projectInfo = res
        })
    },

    fetchData() {
      if (this.contractId) {
        fetchContractDetail({ projectId: this.projectId, contractId: this.contractId }).then(res => {
          if (res) {
            this.contractInfo = res
            this.contractInfo.expenseType = res.expenseType && res.expenseType.key
            if (res && res.accessory && this.sysConfig && this.sysConfig.filepath) {
              this.contractInfo.accessory = [
                {
                  name: getFileName(res.accessory),
                  url: this.sysConfig.filepath + res.accessory,
                  uid: new Date().getTime()
                }] || []
            }
            if (this.contractInfo.payment) {
              this.contractInfo.payment.map(v => {
                v.projectSubStatus = v.projectSubStatus.key
                v.paymentTypeId = v.paymentTypeId.key
              })
            }
          } else {
            this.contractInfo = {}
          }
        })
      }
    },

    handleRemove(file, fileList) {
      // this.fileList = this.fileList.filter(v => v && v.uid !== file.uid)
      this.$set(this.contractInfo, 'accessory', [])
    },

    handleUploadError(err, file, fileList) {
      console.log(err)
    },

    handleUploadSuccess(response, file, fileList) {
      file.raw.path = response.data[0]
      file.raw.url = this.sysConfig.filepath + file.raw.path
      this.$set(this.contractInfo, 'accessory', [file.raw])
    },

    onSave() {
      this.$refs.contractForm.validate(valid => {
        if (valid) {
          const body = {
            ...this.contractInfo,
            incomeExpenseTypeId: this.isIncome ? 1 : 2, // 收入合同1，支出合同2
            expenseType: this.isIncome ? 1 : this.contractInfo.expenseType, // 支出类型：1-项目，2-技术服务，3-采购，4-外包
            accessory: this.contractInfo.accessory[0].path
          }
          contractApply(body, this.projectId).then(res => {
            // console.log(res, 'ressss')
            // this.fetchData()
            this.$listeners.onBack && this.$listeners.onBack()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onCancel() {
      // this.$router.go(-1)
      this.$listeners.onBack && this.$listeners.onBack()
    }
  }
}
</script>

<style lang='scss' scope>
 .contract-info-container{
    .el-textarea.is-disabled .el-textarea__inner,.el-input.is-disabled .el-input__inner{
       /* background-color: #fff; */
       /* border: none; */
       color: #333;
       /* padding-left:0px; */
       font-size: 14px;
       /* cursor: text; */
    }

    .el-input__suffix{
      display: none;
    }
 }
</style>
