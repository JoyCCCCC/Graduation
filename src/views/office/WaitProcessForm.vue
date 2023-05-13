<template>
  <div>
    <el-form
      ref="Form"
      :model="formData"
      label-width="135px"
      size="small"
      :rules="rules"
    >
      <el-form-item label="待办层级" prop="level">
        <el-input
          v-model="formData.level"
          placeholder="请输入待办层级"
        />
      </el-form-item>
      <el-form-item label="父级待办ID" prop="FatherWaitProcessing">
        <el-input
          v-model="formData.FatherWaitProcessing"
          placeholder="请输入父级待办ID"
        />
      </el-form-item>

      <el-form-item label="任务标题" prop="taskTitle">
        <el-input
          v-model="taskTitle"
          disabled
          placeholder="请输入任务标题"
        />
      </el-form-item>
      <el-form-item label="任务内容" prop="taskContent">
        <el-input
          v-model="taskContent"
          disabled
          placeholder="请输入任务内容"
        />
      </el-form-item>

      <el-form-item label="逾期完成时间" prop="expectedCompletionTime">
        <el-date-picker
          v-model="formData.expectedCompletionTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="请选择逾期完成时间"
        />
      </el-form-item>
      <el-form-item label="事件ID" prop="taskEventId">
        <el-input
          v-model="formData.taskEventId"
          placeholder="请输入事件ID"
        />
      </el-form-item>
      <el-form-item label="事件类型" prop="taskEventType">
        <el-input
          v-model="formData.taskEventId"
          placeholder="请输入事件类型"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input
          v-model="formData.status"
          placeholder="请输入状态"
        />
      </el-form-item>
      <el-form-item label="执行人" prop="executor">
        <el-input
          v-model="formData.executor"
          placeholder="请输入执行人"
        />
      </el-form-item>
      <el-row class="text-center">
        <el-button :loading="loading" type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {
  addWaitProcessList
} from '@/api/office'
import { mapGetters } from 'vuex'
export default {
  name: 'WaitProcessForm',
  components: { },
  props: {
    waitFormData: {
      type: Object,
      default: () => ({})
    }
  },
  data: function() {
    return {
      rules: {
        level: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        FatherWaitProcessing: [
          { required: true, message: '请选择行业', trigger: 'blur' }
        ],
        taskTitle: [
          { required: true, message: '请选择时间', trigger: 'blur' }
        ],
        taskContent: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        expectedCompletionTime: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        taskEventId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        taskEventType: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        executor: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      formData: {}
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  methods: {
    onSubmit() {
      this.$refs.Form.validate((valid) => {
        if (valid) {
          addWaitProcessList(this.formData).then(() => {
            this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
          }, () => {})
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
