<template>
  <div>
    <el-form
      ref="businessForm"
      :model="formData"
      label-width="135px"
      size="small"
      :rules="rules"
    >
      <div v-if="isHandleEdit">
        <el-form-item label="处理意见：">
          <el-select v-model="formData.handleOpinion" placeholder="请选择处理意见">
            <el-option
              v-for="item in handleOpinions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isHandle!==1" label="处理说明：">
          <el-input v-model="formData.handleDescription" type="textarea" />
        </el-form-item>
      </div>
      <el-form-item label="商机名称" prop="businessOpportunityName">
        <el-input
          v-model="formData.businessOpportunityName"
          placeholder="请输入商机名称"
        />
      </el-form-item>
      <el-form-item label="行业" prop="industryName">
        <el-select
          v-model="formData.industryName"
          placeholder="请选择行业"
        >
          <el-option
            v-for="item in industryNameOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div v-if="!isEdit||isHandleEdit" class="add-form-part ml-92">
        <!-- <div class="add-form-part ml-92"> -->
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
            :rules="productRules"
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
            <el-form-item label="预计金额" prop="amount">
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
      <el-form-item label="是否SM" class="form-flex-tip" prop="secretRelated">
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
      <el-form-item label="预计签单金额" prop="newestimateSigningAmount">
        <el-input
          v-model="newestimateSigningAmount"
          disabled
          placeholder="0"
        />
      </el-form-item>
      <el-form-item label="预计签单日期" prop="estimateSigningTime">
        <el-date-picker
          v-model="formData.estimateSigningTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请输入预计签单日期"
        />
      </el-form-item>
      <el-form-item label="项目所在区域" prop="areaName">
        <el-input
          v-model="formData.areaName"
          placeholder="请输入项目所在区域"
        />
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input
          v-model="formData.description"
          type="textarea"
          placeholder="请输入项目描述"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="formData.remark"
          type="textarea"
          placeholder="请输入备注"
        />
      </el-form-item>
      <el-row v-if="!isHandleEdit" class="text-center">
        <el-button :loading="loading" type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { validateMoney } from '@/utils/validateForm'
import { bsecretRelatedOptions, bindustryNameOptions, bproductTypeIdOptions, bhandleOpinions } from '@/views/project/constant'
import { addBusinessList, editBusinessList, fetchBusinessDetail } from '@/api/project'
import { mapGetters } from 'vuex'
export default {
  name: 'BusinessForm',
  components: { },
  props: {
    businessFormData: {
      type: Object,
      default: () => ({})
    },
    isHandleEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      rules: {
        businessOpportunityName: [
          { required: true, message: '请输入商机名称', trigger: 'blur' }
        ],
        industryName: [
          { required: true, message: '请选择行业', trigger: 'blur' }
        ],
        estimateSigningTime: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        secretRelated: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        areaName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      productRules: {
        amount: [
          { validator: validateMoney }
        ]
      },
      secretRelatedOptions: bsecretRelatedOptions,
      industryNameOptions: bindustryNameOptions,
      productTypeIdOptions: bproductTypeIdOptions,
      handleOpinions: bhandleOpinions,
      formData: {},
      isEdit: false
    }
  },
  watch: {
    newestimateSigningAmount(newval, oldval) {
      if (newval !== oldval) {
        this.formData.estimateSigningAmount = newval
      }
      console.log(this.formData.estimateSigningAmount)
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    newestimateSigningAmount() {
      if (this.isEdit) {
        return this.formData.estimateSigningAmount
      } else {
        if (this.formData.product && this.formData.product.length > 0) {
          return this.formData.product.reduce((total, v) => total + Number(v.amount || 0), 0)
        } else {
          return 0
        }
      }
    },
    hasProduct() {
      return (this.formData && this.formData.product && this.formData.product.length > 0)
    },
    isHandle() {
      return this.formData.handleOpinion
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.businessFormData && this.businessFormData.opportunityId) {
        this.isEdit = true
        fetchBusinessDetail(this.businessFormData.opportunityId).then((res) => {
          if (res) {
            this.formData = this.$deepcopy({}, res)
            this.formData.industryName = this.formData.industryName.industryId
            this.formData.secretRelated = this.formData.secretRelated.key
            this.formData.handleOpinion = this.formData.handleOpinion.key
            this.formData.product.forEach(item => {
              item.productType = item.productType.productType
            })
          }
        }, () => {})
      } else {
        this.formData = {}
        this.$set(this.formData, 'estimateSigningAmount', 0)
      }
      console.log(155, this.formData)
    },
    addProduct() {
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
      this.$refs.businessForm.validate((valid) => {
        console.log(3, this.formData)
        if (valid) {
          if (!this.isEdit) {
            addBusinessList(this.formData).then(() => {
              this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
            }, () => {})
          } else {
            editBusinessList(this.formData.opportunityId, this.formData).then(() => {
              this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
            }, () => {})
          }
        }
      })
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
