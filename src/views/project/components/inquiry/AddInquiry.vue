<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="formRules"
    >
      <el-form-item label="品牌" prop="brand">
        <el-input v-model="form.brand" />
      </el-form-item>
      <el-form-item label="单价" prop="quotedPrice">
        <el-input v-model="form.quotedPrice" />
      </el-form-item>
      <el-form-item label="技术指标" prop="technicalIndex">
        <el-input v-model="form.technicalIndex" type="textarea" />
      </el-form-item>
    </el-form>

    <div class="text-center">
      <el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { validateMoney } from '@/utils/validateForm'
import { addInquiry } from '@/api/project'
import { mapGetters } from 'vuex'
export default {
  name: 'AddInquiry',
  components: {},
  props: {
    productId: {
      type: Number,
      default: 0
    },
    projectId: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      form: {},
      formRules: {
        brand: [
          { required: true, message: '请输入品牌', trigger: 'blur' }
        ],
        technicalIndex: [
          { required: true, message: '请输入技术指标', trigger: 'blur' }
        ],
        quotedPrice: [
          { required: true, message: '请输入单价', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  created() {},
  methods: {
    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            projectId: this.projectId,
            productId: this.productId
          }
          addInquiry(params, this.form).then(res => {
            this.$refs.form.resetFields()
            this.$listeners.onInquirySuccess && this.$listeners.onInquirySuccess()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$refs.form.resetFields()
      this.$listeners.onCancel && this.$listeners.onCancel()
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
