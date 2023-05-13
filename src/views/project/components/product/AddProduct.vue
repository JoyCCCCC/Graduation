<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="formRules"
    >
      <el-form-item label="品目号" prop="productNo">
        <el-input v-model="form.productNo" placeholder="请输入品目号" />
      </el-form-item>
      <el-form-item label="品名" prop="productName">
        <el-input v-model="form.productName" placeholder="请输入品名" />
      </el-form-item>
      <el-form-item label="数量" prop="productNum">
        <el-input v-model="form.productNum" placeholder="请输入数量" />
      </el-form-item>
      <el-form-item label="限价" prop="limitedPrice">
        <el-input v-model="form.limitedPrice" placeholder="请输入限价" />
      </el-form-item>
      <el-form-item label="技术指标" prop="technicalIndex">
        <el-input v-model="form.technicalIndex" placeholder="请输入技术指标" />
      </el-form-item>
      <el-form-item label="总价" prop="totalPrice">
        <el-input v-model="totalPrice" />
      </el-form-item>
    </el-form>
    <div class="text-center">
      <!-- <div class="foot-button text-center"> -->
      <el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
const emptyForm = {
  productNo: '',
  productName: '',
  technicalIndex: '',
  productNum: '',
  limitedPrice: '',
  totalPrice: ''
}
import { validateMoney, validateQuantity } from '@/utils/validateForm'
import { addProduct } from '@/api/project'
import { mapGetters } from 'vuex'
export default {
  name: 'AddProduct',
  components: {},
  props: {
    projectId: {
      type: Number,
      default: 0
    }
  },
  data: function() {
    return {
      form: emptyForm,
      formRules: {
        productNo: [
          { required: true, message: '请输入品目号', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入品名', trigger: 'blur' }
        ],
        productNum: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { validator: validateQuantity, trigger: 'blur' }
        ],
        limitedPrice: [
          { required: true, message: '请输入限价', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ]),
    totalPrice() {
      if (Number(this.form.productNum) && Number(this.form.limitedPrice)) {
        return Number(this.form.productNum) * Number(this.form.limitedPrice)
      }
      return 0
    }
  },
  created() {},
  methods: {
    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.totalPrice = this.totalPrice
          addProduct(this.form, this.projectId).then(res => {
            this.$refs.form.resetFields()
            this.$listeners.onAddSuccess && this.$listeners.onAddSuccess()
          })
        } else {
          console.log('error submit!!')
          return false
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
</style>
