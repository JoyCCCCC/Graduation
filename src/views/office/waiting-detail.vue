<template>
  <div>
    <el-form :model="detailForm">
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>待办信息</span>
        </div>
        <div class="form-text-list">
          <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">待办层级：</span>
                <span class="text">{{ detailForm.level }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">父级待办ID：</span>
                <span class="text">{{ detailForm.FatherWaitProcessing }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">任务标题：</span>
                <span class="text">{{ detailForm.taskTitle }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">任务内容：</span>
                <span class="text">{{ detailForm.taskContent }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">逾期完成时间额：</span>
                <span class="text">{{ detailForm.expectedCompletionTime }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">事件ID：</span>
                <span class="text">{{ detailForm.taskEventId }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">事件类型：</span>
                <span class="text">{{ detailForm.taskEventType }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">状态：</span>
                <span class="text">{{ detailForm.status }}</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">执行人：</span>
                <span class="text">{{ detailForm.executor }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import {
  fetchWaitProcessDetail
} from '@/api/office'

export default {
  data() {
    return {
      id: this.$route.params.id,
      detailForm: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchWaitProcessDetail(this.id).then(res => {
        if (res) {
          this.detailForm = res
        }
      })
    }
  }
}
</script>

