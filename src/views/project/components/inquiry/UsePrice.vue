<template>
  <div>
    <el-form
      ref="useForm"
      :model="formData"
      size="small"
      :rules="rules"
    >
      <el-form-item label="理由" label-width="80px" prop="remark">
        <el-input v-model="formData.remark" type="textarea" :rows="3" placeholder="请输入采用/取消采用理由" />
      </el-form-item>
    </el-form>
    <div class="text-center">
      <el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {},
  data: function() {
    return {
      formData: {},
      rules: {
        remark: [
          { required: true, message: '请输入理由', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  created() {
    // this.$refs.useForm.resetFields()
  },
  methods: {
    onSave() {
      this.$refs.useForm.validate((valid) => {
        if (valid) {
          this.$listeners.onUseCallback && this.$listeners.onUseCallback(this.formData)
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
