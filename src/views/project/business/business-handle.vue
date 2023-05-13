<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>商机信息</span>
      </div>
      <BusinessForm :business-form-data="businessFormData" :is-handle-edit="true" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseBusinessForm" />
      <!-- <el-form label-width="135px" :model="businessFormData">
        <el-form-item label="处理意见：">
          <el-select v-model="businessFormData.handleOpinion" placeholder="请选择处理意见">
            <el-option
              v-for="item in handleOpinions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="isHandle!==1" label="处理说明：">
          <el-input v-model="businessFormData.handleDescription" type="textarea" />
        </el-form-item>
        <el-form-item label="商机名称" prop="businessOpportunityName">
          <el-input
            v-model="businessFormData.businessOpportunityName"
            placeholder="请输入商机名称"
          />
        </el-form-item>
        <el-form-item label="行业" prop="industryName">
          <el-select
            v-model="businessFormData.industryName"
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
        <div class="add-form-part ml-92">
          <i class="el-icon-circle-plus-outline i-add" @click="addProduct" />
          <div class="add-cont-part pt-18 plr-18">
            <div v-if="!hasProduct" class="no-data">
              <span>暂无产品数据，请先添加</span>
            </div>
            <el-form
              v-for="(item, index) in businessFormData.product"
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
            v-model="businessFormData.secretRelated"
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
            v-model="businessFormData.estimateSigningTime"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请输入预计签单日期"
          />
        </el-form-item>
        <el-form-item label="项目所在区域" prop="areaName">
          <el-input
            v-model="businessFormData.areaName"
            placeholder="请输入项目所在区域"
          />
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input
            v-model="businessFormData.description"
            type="textarea"
            placeholder="请输入项目描述"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="businessFormData.remark"
            type="textarea"
            placeholder="请输入备注"
          />
        </el-form-item>
        <el-row v-if="isHandle!==1" class="text-center">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-row>
      </el-form> -->
    </el-card>
    <!-- <template v-if="isHandle==1">
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>添加项目</span>
        </div>
        <div>
          <ProjectForm :project-form-data="businessFormData.project" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseBusinessForm" />
        </div>
      </el-card>
    </template> -->
    </el-form>
  </div>
</template>

<script>
import ProjectForm from './ProjectForm'
import BusinessForm from './BusinessForm'
import { bhandleOpinions } from '@/views/project/constant'
import { editBusinessList, fetchBusinessDetail } from '@/api/project'
import {
  handleBusinessList
} from '@/api/project'

export default {
  components: {
    ProjectForm, BusinessForm
  },
  data() {
    return {
      id: this.$route.params.id,
      businessFormData: {},
      handleOpinions: bhandleOpinions
    }
  },
  computed: {
    isHandle() {
      return this.businessFormData.handleOpinion
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      if (this.id) {
        await fetchBusinessDetail(this.id).then((res) => {
          if (res) {
            this.businessFormData = this.$deepcopy({}, res)
            console.log(189, this.businessFormData)
          }
        }, () => {})
      } else {
        this.formData = {}
        this.$set(this.formData, 'estimateSigningAmount', 0)
      }
      console.log(1777, this.id, this.businessFormData)
    },

    onSubmit() {
    },
    onCancel() {
    },
    oSuccessCallback(val) {
      this.businessFormData.project = val
      handleBusinessList(this.id, this.businessFormData).then((res) => {
        console.log(res)
      }, () => {})
    },
    onCloseBusinessForm() {
    }
  }
}
</script>

