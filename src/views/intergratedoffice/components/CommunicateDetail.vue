<template>
  <div>
    <el-form :model="communicateDetail">
      <el-card>
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>沟通信息</span>
        </div>
        <div class="form-text-list">
          <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">沟通记录ID：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">客户对象：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">项目名称：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">项目状态：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">沟通地点：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">沟通时间：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">存在问题：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">沟通目的：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">跟进建议：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">备注：</span>

              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <div class="form-text-group">
                <span class="label">附件：</span>

              </div>
            </el-col>

          </el-row>
        </div>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { fetchconmmunicateDetail } from '@/api/intergratedoffice'
export default {
  data() {
    return {
      communicateDetail: {}
    }
  },
  methods: {
    fetchData() {
      fetchconmmunicateDetail(this.id).then(res => {
        if (res) {
          this.communicateDetail = res
        }
      })
    }
  }
}
</script>
