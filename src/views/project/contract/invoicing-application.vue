<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>开票申请（客户）</span>
      </div>
      <el-form
        ref="invoiceForm"
        :rules="rules"
        :model="invoiceForm"
        label-width="150px"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请主题：" prop="title">
              <el-input v-model="invoiceForm.title" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="发票抬头：" prop="invoiceTitle">
              <el-input v-model="invoiceForm.invoiceTitle" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="客户纳税人识别号：" prop="taxIdentificationNumber">
              <el-input v-model="invoiceForm.taxIdentificationNumber" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="客户地址：" prop="address">
              <el-input v-model="invoiceForm.address" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="电话：" prop="phoneNo">
              <el-input v-model="invoiceForm.phoneNo" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="开户行：" prop="bankName">
              <el-input v-model="invoiceForm.bankName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="账号：" prop="bankAccount">
              <el-input v-model="invoiceForm.bankAccount" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- </el-form> -->
        <div class="add-form-part">
          <i class="el-icon-circle-plus-outline i-add" @click="addContract" />
          <div class="add-cont-part pt-18 plr-18">
            <div v-if="invoiceForm.invoice.length==0" class="no-data">
              <span>暂无产品数据，请先添加</span>
            </div>
            <div v-for="(item,index) in invoiceForm.invoice" :key="index" class="invoice-container">
              <el-form-item
                label="开票金额："
                label-width="100px"
                :prop="`invoice[${index}].invoiceAmount`"
                :rules="invoiceAmountRules"
              >
                <el-input v-model="item.invoiceAmount" placeholder="请输入开票金额" />
              </el-form-item>
              <el-form-item
                label="税率(%)："
                label-width="100px"
                :prop="`invoice[${index}].taxRate`"
                :rules="invoiceTaxRules"
              >
                <!-- <el-select v-model="item.taxRate" placeholder="请选择税率">
                  <el-option
                    v-for="taxItem in taxRateOptions"
                    :key="taxItem.key"
                    :label="taxItem.value"
                    :value="taxItem.key"
                  />
                </el-select> -->
                <el-input v-model="item.taxRate" placeholder="请输入税率" />
              </el-form-item>
              <el-form-item
                label="发票类型："
                label-width="100px"
                :prop="`invoice[${index}].invoiceTypeId`"
                :rules="{ required: true, message: '请选择发票类型', trigger: 'blur' }"
              >
                <el-select v-model="item.invoiceTypeId" placeholder="请选择发票类型">
                  <el-option :key="1" label="普通发票" :value="1" />
                  <el-option :key="2" label="增值税专用票" :value="2" />
                </el-select>
              </el-form-item>
              <el-form-item label-width="20px">
                <el-button type="primary" @click="deleteContract(index)">删除</el-button>
              </el-form-item>
            </div>

          </div>
        </div>
      </el-form>
      <el-row class="mt-6 ml-40">
        <span class="mr-20">本次开票金额：{{ totalAmount | toThousandFilter }}</span>
        <span>本次开票不含税金额：{{ noTaxTotalAmount | toThousandFilter }}</span>
      </el-row>
      <el-row class="mt-6 ml-40">
        <span class="mr-20">累计已开票金额：{{ '等待接口数据' }}</span>
        <span>累计已开票不含税金额：{{ '等待接口数据' }}</span>
      </el-row>
      <div class="foot-button text-center mt-18">
        <el-button type="primary" size="small" @click="onSave">保存</el-button>
        <el-button size="small" @click="onCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { validateMoney, validateRate } from '@/utils/validateForm'
import { invoiceApply } from '@/api/project'

const emptyItem = {
  invoiceAmount: '',
  taxRate: '',
  invoiceTypeId: ''
}
export default {
  name: '',
  data: function() {
    return {
      projectContractMoneyId: this.$route.params && this.$route.params.projectContractMoneyId,
      taxRateOptions: [],
      invoiceForm: {
        invoice: []
      },
      rules: {
        title: [{ required: true, message: '请输入申请主题', trigger: 'blur' }],
        invoiceTitle: [{ required: true, message: '请输入发票抬头', trigger: 'blur' }],
        taxIdentificationNumber: [{ required: true, message: '请输入客户纳税人识别号', trigger: 'blur' }],
        address: [{ required: true, message: '请输入客户地址', trigger: 'blur' }],
        phoneNo: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入账号', trigger: 'blur' }]
      },
      invoiceAmountRules: [
        { required: true, message: '请输入开票金额', trigger: 'blur' },
        { validator: validateMoney, trigger: 'blur' }
      ],
      invoiceTaxRules: [
        { required: true, message: '请输入税率', trigger: 'blur' },
        { validator: validateRate, trigger: 'blur' }
      ]
    }
  },
  computed: {
    totalAmount() {
      return this.invoiceForm.invoice.reduce((total, v) => total + Number(v.invoiceAmount || 0), 0)
    },
    noTaxTotalAmount() {
      return this.invoiceForm.invoice.reduce((total, v) => {
        total = total + (Number(v.invoiceAmount || 0) * (1 + (Number(v.taxRate || 0) / 100)))
        return total
      }, 0)
    }
  },
  methods: {
    deleteContract(index) {
      // this.invoicForm.invoiceList.splice(index, 1)
    },
    addContract() {
      const data = this.$deepcopy({}, emptyItem)
      this.invoiceForm.invoice.push(data)
    },
    onSave() {
      this.$refs.invoiceForm.validate(valid => {
        if (valid && this.projectContractMoneyId) {
          // this.invoiceForm.
          invoiceApply(this.invoiceForm, this.projectContractMoneyId).then(res => {
            this.invoiceForm = {
              invoice: []
            }
            this.$message.success('操作成功！')
            this.$router.back()
          })
        } else {
          console.log('error')
        }
      })
    },

    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">

  .invoice-container{
    display: flex;
  }

  .ml-40{
    margin-left: 40px;
  }

</style>
