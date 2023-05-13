<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>立项</span>
      </div>
      <el-form ref="standForm" :model="standForm" :rules="standRules" label-width="85px" :disabled="isDisabled">
        <el-form-item label="项目类型" prop="projectTypeId">
          <el-select v-model="standForm.projectTypeId" placeholder="请选择项目类型">
            <el-option v-for="item in projectTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div v-if="!isDisabled" class="foot-button text-center">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { projectTypeOptions } from '../constant'
import { fetchApprovalDetail, approvalProject } from '@/api/project'
import props from '../mixins/props'
export default {
  name: 'StandUp',
  components: {
  },
  mixins: [props],
  data() {
    return {
      projectTypeOptions: projectTypeOptions,
      standForm: {
        projectTypeId: ''
      },
      standRules: {
        projectTypeId: [
          { required: true, message: '请输入选择项目类型', trigger: 'blur' }
        ]
      },
      projectId: this.parentProps.projectId
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      if (this.projectId) {
        fetchApprovalDetail(this.projectId).then(res => {
        // 已有立项数据
          if (res && res.projectTypeId) {
            this.standForm.projectTypeId = res.projectTypeId.key
          }
          // else {
          //   this.standForm.projectTypeId = ''
          // }
        })
      }
    },
    onSave() {
      this.$refs.standForm.validate(valid => {
        if (valid) {
          const body = {
            projectTypeId: this.standForm.projectTypeId
          }
          approvalProject(body, this.projectId).then(res => {
            console.log(res, 'ressss')
            this.$listeners.onBack && this.$listeners.onBack()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onCancel() {
      this.$listeners.onBack && this.$listeners.onBack()
    }
  }
}
</script>
