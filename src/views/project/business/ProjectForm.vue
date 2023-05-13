<template>
  <div>
    <el-form
      ref="projectForm"
      :model="formData"
      label-width="135px"
      size="small"
      :rules="rules"
    >
      <el-form-item label="项目名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入项目名称"
        />
      </el-form-item>
      <el-form-item label="项目编码" prop="projectNo">
        <el-input
          v-model="formData.projectNo"
          placeholder="请输入项目编码"
        />
      </el-form-item>
      <el-form-item label="行业">
        <el-select
          v-model="formData.industry"
          placeholder="请选择行业"
        >
          <el-option
            v-for="item in industryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div class="add-form-part ml-92">
        <i class="el-icon-circle-plus-outline i-add" @click="addProduct" />
        <div class="add-cont-part pt-18 plr-18">
          <div v-if="!hasProduct" class="no-data">
            <span>暂无产品数据，请先添加</span>
          </div>
          <el-form
            v-for="(item, index) in formData.product"
            :key="index"
            :inline="true"
            :model="item"
            size="small"
            class="form-wxm"
          >
            <el-form-item label="产品">
              <el-select
                v-model="item.productType"
                placeholder="请选择产品类型"
              >
                <el-option
                  v-for="item1 in productTypeIdOptions"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="预计金额">
              <el-input
                v-model="item.amount"
                placeholder="请输入预计金额"
                type="number"
              />
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
      <el-form-item label="是否SM" class="form-flex-tip">
        <el-select
          v-model="formData.secretRelated"
          placeholder="请选择"
        >
          <el-option
            v-for="item in secretRelatedOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span class="tip">SM项目无法上传附件</span>
      </el-form-item>
      <el-form-item label="预计签单金额" prop="estimateSigningAmount">
        <el-input
          v-model="formData.estimateSigningAmount"
          placeholder="请输入预计签单金额"
        />
      </el-form-item>
      <el-form-item label="预计签单日期">
        <el-date-picker
          v-model="formData.estimateSigningTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请输入预计签单日期"
        />
      </el-form-item>
      <el-form-item label="赢率(%)" prop="winningRate">
        <el-input
          v-model="formData.winningRate"
          placeholder="请输入赢率"
        />
      </el-form-item>
      <el-form-item label="项目所在区域">
        <!-- 回填数据暂无map  -->
        <el-input
          v-model="formData.area"
          placeholder="请输入项目所在区域"
        />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input
          v-model="formData.projectDescribe"
          type="textarea"
          placeholder="请输入项目描述"
        />
      </el-form-item>
      <el-form-item label="客户信息">
        <el-select
          v-model="formData.customer"
          placeholder="请选择客户"
        >
          <el-option
            v-for="item in customerIdOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="商机发现人员">
        <el-select
          v-model="formData.findUser"
          placeholder="请选择商机发现人员"
        >
          <el-option
            v-for="item in findUserIdOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="协助人员">
        <el-select
          v-model="formData.assistUsers"
          placeholder="请选择协助人员"
          :multiple="true"
        >
          <el-option
            v-for="item in assistUserIdsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="机会点拥有人员">
        <el-select
          v-model="formData.saleUser"
          placeholder="请选择机会点拥有人员"
        >
          <el-option
            v-for="item in saleUserIdOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="formData.remark"
          type="textarea"
          placeholder="请输入备注"
        />
      </el-form-item>

      <el-row class="text-center">
        <el-button :loading="loading" type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { validateMoney, validateRate } from '@/utils/validateForm'
import { secretRelatedOptions, industryOptions, customerIdOptions, findUserIdOptions, saleUserIdOptions, assistUserIdsOptions, productTypeIdOptions } from '@/views/project/constant'
import { addAndModifyProject } from '@/api/project'
import { mapGetters } from 'vuex'
export default {
  name: 'ProjectForm',
  components: { },
  props: {
    projectFormData: {
      type: Object,
      default: () => ({})
    }
  },
  data: function() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        estimateSigningAmount: [
          { validator: validateMoney, trigger: 'blur' }
        ],
        winningRate: [
          { validator: validateRate, trigger: 'blur' }
        ]
      },
      formData: this.$deepcopy({}, this.projectFormData),
      secretRelatedOptions: secretRelatedOptions,
      industryOptions: industryOptions,
      customerIdOptions: customerIdOptions,
      findUserIdOptions: findUserIdOptions,
      saleUserIdOptions: saleUserIdOptions,
      assistUserIdsOptions: assistUserIdsOptions,
      productTypeIdOptions: productTypeIdOptions
    }
  },

  computed: {
    ...mapGetters([
      'loading'
    ]),
    hasProduct() {
      if (this.formData && this.formData.product && this.formData.product.length > 0) {
        return true
      } else {
        return false
      }
      // return !!(this.formData && this.formData.product && this.formData.product.length > 0)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.formData && this.formData.projectId) {
        const _assistUsers = [];
        (this.formData.assistUsers || []).map(v => v && _assistUsers.push(Number(v.userId)))
        this.formData.assistUsers = _assistUsers
      }
    },

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
      this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback(this.formData)
      // this.$refs.projectForm.validate((valid) => {
      //   if (valid) {
      //     addAndModifyProject(this.formData).then(() => {
      //       this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
      //     }, () => {})
      //   }
      // })
    },

    onCancel() {
      this.$listeners.onCancel && this.$listeners.onCancel()
    }
  }
}
</script>

<style lang='scss' scoped>
.ml-92{
  margin-left: 92px;
}
</style>
