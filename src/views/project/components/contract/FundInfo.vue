<template>
  <div>
    <div class="mb-18">
      <el-button v-if="entryType!==projectBtnType.DETAIL" type="primary" size="small" @click="handleAdd">{{ title }}</el-button>
    </div>
    <el-table border stripe :data="paymentInfo" size="small" class="mb-18">
      <el-table-column
        prop="projectSubStatus"
        label="项目阶段"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.projectSubStatus | projectStatus(statusOptionsData) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expectedPaymentDate"
        label="预付款日期"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="amount"
        label="金额"
        show-overflow-tooltip
        align="center"
      />
      <el-table-column
        prop="noticeDays"
        label="提前通知(天)"
        width="100px"
        align="center"
      />
      <el-table-column
        prop="paymentTypeId"
        label="回款方式"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paymentTypeId | payWay(payOptionsData) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="opration"
        label="操作"
        width="120px"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="entryType===projectBtnType.DETAIL"
            type="text"
            @click="toDetail(scope.row)"
          >{{ scope.row.typeId | optName }}</el-button>
          <div v-else class="btn-text-group">
            <el-button
              type="text"
              @click="handleEdit(scope.$index)"
            >修改</el-button>
            <el-button
              type="text"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="paymentDialog.visible"
      :title="title"
      :visible.sync="paymentDialog.visible"
      :close-on-click-modal="CLOSE_ON_CLICK_MODAL"
      width="600px"
    >
      <el-form
        ref="paymentForm"
        :model="paymentForm"
        :rules="payRule"
        label-width="120px"
        size="small"
      >
        <el-form-item label="项目阶段" prop="projectSubStatus">
          <el-select v-model="paymentForm.projectSubStatus" placeholder="请选择">
            <el-option v-for="item in statusOptionsData" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="回款日期" prop="expectedPaymentDate">
          <el-date-picker
            v-model="paymentForm.expectedPaymentDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请输入回款日期"
          />
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model="paymentForm.amount" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="提前通知天数" prop="noticeDays">
          <el-input
            v-model="paymentForm.noticeDays"
            type="number"
            placeholder="请输入天数"
          />
        </el-form-item>
        <el-form-item label="付款方式" prop="paymentTypeId">
          <el-select v-model="paymentForm.paymentTypeId" placeholder="请选择">
            <el-option v-for="item in payOptionsData" :key="item.key" :label="item.value" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancel">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="onSave"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { projectBtnType } from '../../constant'
import { fetchProjectSteps } from '@/api/project'
import { validateMoney } from '@/utils/validateForm'
import { payType } from '@/constants'
export default {
  name: 'FundInfo',
  filters: {
    projectStatus(status, optionData) {
      let result = ''
      if (status instanceof Object) {
        status = status.key
      }
      if (status && optionData && Array.isArray(optionData) && optionData.length > 0) {
        result = optionData.find(v => v && v.key === status).value
      }
      return result
    },
    payWay(type, optionData) {
      let result = ''
      if (type instanceof Object) {
        type = type.key
      }
      if (optionData && Array.isArray(optionData) && optionData.length > 0) {
        result = optionData.find(v => v && v.key === type).value
      }
      return result
    },
    optName(type) {
      let result = ''
      if (type && type.key) {
        result = type.key === 1 ? '开票申请' : '付款申请'
      }
      return result
      // return this.entryType === projectBtnType.INCOME_CONTRACT ? '开票申请' : '付款申请'
    }
  },
  props: {
    // payment: {
    //   type: Array,
    //   default: () => []
    // },
    value: {
      type: Array,
      default: () => []
    },
    entryType: {
      type: String,
      default: ''
    },
    projectId: {
      type: String,
      default: ''
    },
    contractType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      paymentDialog: {
        visible: false,
        index: -1
      },
      add: true, // 从哪个方式进入弹窗
      paymentForm: {
        // 'projectSubStatus': '', // 项目阶段
        // 'expectedPaymentDate': '', // 回款日期
        // 'amount': '', // 金额
        // 'hasPaymentAmount': '', // 已回款金额
        // 'noticeDays': '', // 提前N天通知
        // 'paymentTypeId': 1 // 付款方式:1-转账，2-支票，3-银承
      },
      CLOSE_ON_CLICK_MODAL: this.$defaultCfg.closeOnClickModal,
      title: this.entryType === projectBtnType.INCOME_CONTRACT ? '添加回款信息' : '添加付款信息',
      payOptionsData: payType,
      statusOptionsData: [],
      payRule: {
        projectSubStatus: [
          { required: true, message: '请选择项目阶段', trigger: 'blur' }
        ],
        expectedPaymentDate: [
          { required: true, message: '请选择预付款日期', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '请输入金额', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ],
        noticeDays: [
          { required: true, message: '请输入提前通知天数', trigger: 'blur' }
        ],
        paymentTypeId: [
          { required: true, message: '请选择付款方式', trigger: 'blur' }
        ]
      },
      projectBtnType: projectBtnType
    }
  },
  computed: {
    paymentInfo: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    isFirst() { // 首次输入是跟随合同信息，签约信息一起调用同一个接口保存的，之后所进行的增删改是单独接口操作
    // 从项目列表操作栏点击收入合同/支出合同 即是首次，从编号进入详情即是可修改
      return this.entryType !== projectBtnType.DETAIL
    }
  },
  created() {
    this.getProjectStatus() // 获取项目阶段状态
  },
  methods: {
    getProjectStatus() {
      fetchProjectSteps(this.projectId).then(res => {
        res.map(v => {
          if (v && v.projectSubStatus && Array.isArray(v.projectSubStatus)) {
            v.projectSubStatus.map(m => this.statusOptionsData.push({ ...m, main: v.projectMainStatus }))
          }
        })
      })
    },

    onSave() {
      this.$refs.paymentForm.validate(valid => {
        if (valid) {
          // 接口还需要projectMainStatus，根据projectSubStatus获取projectMainStatus
          const _projectSubStatus = this.paymentForm.projectSubStatus
          this.paymentForm = {
            ...this.paymentForm,
            projectMainStatus: this.statusOptionsData.find(v => v && v.key === _projectSubStatus).main.key
          }
          if (this.isFirst) {
            if (this.paymentDialog.index > 0) { // 修改
              this.$set(this.paymentInfo, this.paymentDialog.index, this.paymentForm)
              // this.paymentInfo[this.paymentDialog.index] = this.paymentForm
            } else {
              this.paymentInfo.push(this.paymentForm)
            }
          } else {
            if (this.paymentDialog.index > 0) { // 修改
              this.paymentInfo[this.paymentDialog.index] = this.paymentForm
            } else { // 新增

            }
          }
          this.onCancel()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onCancel() {
      this.paymentDialog = {
        visible: false,
        index: -1
      }
      this.paymentForm = {}
    },

    handleAdd() {
      this.add = true
      this.paymentForm = {}
      this.paymentDialog = {
        visible: true,
        index: -1
      }
    },

    toDetail(item) {
      if (item.typeId && item.typeId.key) {
        const pathMap = {
          1: `/project/invoicing-application/${item.projectContractMoneyId}`,
          2: `/project/purpay`
        }
        this.$router.push(pathMap[item.typeId.key])
        // this.$router.push(`/project/invoicing-application`)
      }
      // const result = index % 2 === 0
      // const pathMap = {
      //   'income': '/project/invoicing-application',
      //   'expend': '/project/purpay'
      // }
      // this.$router.push(result ? pathMap['income'] : pathMap['expend'])
      // this.$router.push(`/project/invoicing-application`)
    },

    handleEdit(index) {
      this.paymentDialog = {
        visible: true,
        index
      }
      this.paymentForm = this.$deepcopy({}, this.paymentInfo[index])
      // if (this.type !== 'fromNo') {
      //   this.DialogVisible = true
      //   this.paymentForm = this.paymentInfo[index]
      //   this.add = false
      // } else {
      //   // purpay
      //   const result = index % 2 === 0
      //   const pathMap = {
      //     'income': '/project/invoicing-application',
      //     'expend': '/project/purpay'
      //   }
      //   this.$router.push(result ? pathMap['income'] : pathMap['expend'])
      //   // this.$router.push(`/project/invoicing-application`)
      // }
    },
    handleDelete(index) {
      this.paymentInfo.splice(index, 1)
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
