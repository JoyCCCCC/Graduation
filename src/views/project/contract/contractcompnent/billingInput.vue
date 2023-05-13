<template>
  <div>
    <div class="mb-18">
      <el-button type="primary" size="small" @click="handleAdd">{{
        isexpend ? "添加付款信息" : "添加回款信息"
      }}</el-button>
    </div>
    <el-table border stripe :data="billingInfo" size="small" class="mb-18">
      <el-table-column
        prop="projectSubStatus"
        label="项目阶段"
        show-overflow-tooltip
        align="center"
      >
        <template>
          <span>初验</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="expectedPaymentData"
        label="回款日期"
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
          <span>{{ scope.row.paymentTypeId | statusFilter }}</span>
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
            v-if="type==='fromNo'"
            type="text"
            @click="handleEdit(scope.$index)"
          >{{ scope.$index | optName }}</el-button>
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
      :title="isexpend ? '添加付款信息' : '添加回款信息'"
      :visible.sync="DialogVisible"
      width="600px"
    >
      <el-form
        ref="adddialogForm"
        :model="dialogForm"
        label-width="80px"
        size="small"
      >
        <el-form-item label="项目阶段" prop="projectSubStatus">
          <el-select v-model="dialogForm.projectSubStatus" placeholder="请选择">
            <el-option label="初试" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="回款日期" prop="expectedPaymentData">
          <el-date-picker
            v-model="dialogForm.expectedPaymentData"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请输入回款日期"
          />
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model="dialogForm.amount" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="提前通知" prop="noticeDays">
          <el-input
            v-model="dialogForm.noticeDays"
            type="number"
            placeholder="请输入天数"
          />
        </el-form-item>
        <el-form-item label="付款方式" prop="paymentTypeId">
          <el-select v-model="dialogForm.paymentTypeId" placeholder="请选择">
            <el-option label="转账" :value="1" />
            <el-option label="支票" :value="2" />
            <el-option label="银承" :value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancelbillForm()">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="savebillForm()"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '转账',
        '2': '支票',
        '3': '银承'
      }
      return statusMap[status]
    },
    optName(index) {
      const result = index % 2 === 0
      const optMap = {
        'income': '开票申请',
        'expend': '付款申请'
      }
      return result ? optMap['income'] : optMap['expend']
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    isexpend: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    projectSubStatus: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      DialogVisible: false,
      add: true, // 从哪个方式进入弹窗
      dialogForm: {
        'projectSubStatus': 1, // 项目阶段
        'expectedPaymentData': '', // 回款日期
        'amount': '', // 金额
        'hasPaymentAmount': '', // 已回款金额
        'noticeDays': '', // 提前N天通知
        'paymentTypeId': 1 // 付款方式:1-转账，2-支票，3-银承
      }
    }
  },
  computed: {
    billingInfo: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
  },
  methods: {
    savebillForm() {
      if (this.add) {
        var newdialogForm = this.$deepcopy({}, this.dialogForm)
        this.billingInfo.push(newdialogForm)
      }
      this.DialogVisible = false
    },
    cancelbillForm() {
      this.DialogVisible = false
    },
    handleAdd() {
      this.add = true
      this.DialogVisible = true
    },
    handleEdit(index) {
      if (this.type !== 'fromNo') {
        this.DialogVisible = true
        this.dialogForm = this.billingInfo[index]
        this.add = false
      } else {
        // purpay

        const result = index % 2 === 0

        const pathMap = {
          'income': '/project/invoicing-application',
          'expend': '/project/purpay'
        }
        this.$router.push(result ? pathMap['income'] : pathMap['expend'])
        // this.$router.push(`/project/invoicing-application`)
      }
    },
    handleDelete(index) {
      this.billingInfo.splice(index, 1)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
