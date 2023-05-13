<template>
  <div>
    <el-form
      ref="applyForm"
      :model="formData"
      label-width="135px"
      size="small"
      :rules="rules"
    >
      <el-form-item label="项目类型" prop="typeId">
        <el-select v-model="formData.typeId">
          <el-option v-for="item in typeIdOption" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <div class="add-form-part  ml-92">
        <i class="el-icon-circle-plus-outline i-add" @click="addProduct" />
        <div class="add-cont-part pt-18 plr-18">
          <div v-if="!hasProduct" class="no-data">
            <span>暂无数据，请先添加</span>
          </div>
          <el-form
            v-for="(item,index) in formData.apply"
            :key="index"
            :inline="true"
            :model="item"
            size="small"
            class="form-wxm"
          >
            <el-form-item label="报销金额" prop="amount">
              <el-input v-model="item.amount" />
            </el-form-item>
            <el-form-item label="报销类型" prop="typeId2">
              <el-select v-model="item.typeId2">
                <el-option v-for="item in typeId2Option" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="mark">
              <el-input v-model="item.mark" type="textarea" />
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="deleteProduct(index)"
              >删除</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-form-item label="是否外部收款" prop="isExternalColletio">
        <el-select v-model="item.isExternalColletio">
          <el-option v-for="item in isExternalColletioOption" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <div v-if="shenqing.isExternalColletio==1">
        <div style="text-align: center">
          <span class="label">外部收款明细</span>
        </div>
        <el-form-item label="收款单位" prop="payee">
          <el-input v-model="item.payee" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input v-model="item.contactNumber" />
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="item.contacts" />
        </el-form-item>
        <el-form-item label="开户行" prop="bankName">
          <el-input v-model="item.bankName" />
        </el-form-item>
        <el-form-item label="收款账号" prop="bankAccount2">
          <el-input v-model="item.bankAccount2" />
        </el-form-item>
        <div style="text-align: center">
          <span class="label" style="text-align: center">内部收款明细</span>
        </div>
        <el-form-item label="收款账号">
          <el-select v-model="item.bankAccount">
            <el-option v-for="item in bankAccount" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <el-form-item label="总金额" prop="totalAmount">
          <el-input v-model="shenqing.totalAmount" />
        </el-form-item>
        <el-form-item label="电子发票" prop="invoice">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="附件" prop="accessory">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-row class="text-center">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-row>
      </div></el-form>

  </div>
</template>
<script>
import { apply } from '@/api/ActivityForm'
export default {
  data: function() {
    return {
      formData: {

      },
      rules: {
        amount: [
          { required: true, message: '金额不能为空', trigger: 'blur' }
        ],
        typeId2: [
          { required: true, message: '选项不能为空', trigger: 'blur' }
        ],
        totalAmount: [
          { required: true, message: '总金额不能为空', trigger: 'blur' }
        ],
        fapiao: [
          { required: true, message: '项目不能为空', trigger: 'blur' }
        ],
        isExternalColletio: [
          { required: true, message: '选项不能为空', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '项目类型不能为空', trigger: 'blur' }
        ],
        contacts: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '开户行不能为空', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        payee: [
          { required: true, message: '收款单位不能为空', trigger: 'blur' }
        ],
        invoice: [
          { required: true, message: '电子发票不能为空不能为空', trigger: 'blur' }
        ]

      },
      typeIdOption: [
        { value: '1', label: '项目' },
        { value: '2', label: '非项目' }
      ],
      typeId2Option: [
        { value: '1', label: '项目' },
        { value: '2', label: '非项目' }
      ],
      bankAccount: [
        { value: '1', label: '123' },
        { value: '2', label: '321' }
      ],
      isExternalColletioOption: [
        { value: '1', label: '是' },
        { value: '2', label: '否' }

      ],
      hasProduct() {
        if (this.formData && this.formData.product && this.formData.product.length > 0) {
          return true
        } else {
          return false
        }
      // return !!(this.formData && this.formData.product && this.formData.product.length > 0)
      },
      methods: {
        addProduct() {
          // const emptyItem = { amount: '',productType:'' }
          const emptyItem = {}
          if (this.hasProduct) {
            this.formData.product.push(emptyItem)
          } else {
            this.$set(this.formData, 'product', [emptyItem])
          }
        },
        deleteProduct(index) {
          this.formData.product.splice(index, 1)
        },
        onSubmit() {
          this.$refs.projectForm.validate((valid) => {
            if (valid) {
              this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback(this.formData)
            }
          })
        },
        onCancel() {
          this.$listeners.onCancel && this.$listeners.onCancel()
        },
        saveProjectForm() {
          apply(this.formData).then(() => {

          }, () => {})
        }

      }

    }
  }

}
</script>
