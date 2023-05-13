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
        <span>签约信息</span>
      </div>
      <signInfo v-model="signForm" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>结算信息</span>
      </div>
      <el-form
        :model="billingInfo"
        label-width="105px"
        size="small"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="不含税金额">
              <el-input v-model="billingInfo.receiveMoneyRequire" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同金额">
              <el-input v-model="billingInfo.contractAmount" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="货物金额">
              <el-input v-model="billingInfo.deliveryAmount" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="货物税率">
              <el-input v-model="billingInfo.deliveryTaxRate" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="服务金额">
              <el-input v-model="billingInfo.serviceAmount" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="服务税率">
              <el-input v-model="billingInfo.serviceTaxRate" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="备注">
              <el-input v-model="billingInfo.mainClause" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="t-line pt-18">
        <billingInput v-model="signFormInfo.Payment" />
        <el-form
          :model="billingInfo"
          label-width="105px"
          size="small"
        >
          <el-form-item label="补充合同">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="foot-button text-center pt-18 t-line">
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import ProjectInfo from '../components/ProjectInfo.vue' // 项目信息
import signInfo from './contractcompnent/signInfo.vue' // 签约信息
import billingInput from './contractcompnent/billingInput.vue' // 结算信息
import { signFormInfo, projectForm, contractForm } from '../data'
export default {
  name: '',
  components: {
    ProjectInfo, signInfo, billingInput
  },

  data: function() {
    return {
      signForm: {},
      projectForm: {},
      billingInfo: {},
      imageUrl: ''
    }
  },
  computed: {
  },
  created() {
    this.signForm = signFormInfo
    this.projectForm = projectForm
    this.signFormInfo = contractForm
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
    // const isJPG = file.type === 'image/jpeg'
    // const isLt2M = file.size / 1024 / 1024 < 2

    // if (!isJPG) {
    //   this.$message.error('上传图片只能是 JPG 格式!')
    // }
    // if (!isLt2M) {
    //   this.$message.error('上传图片大小不能超过 2MB!')
    // }
    // return isJPG && isLt2M
    }

  }
}
</script>

<style>
</style>
