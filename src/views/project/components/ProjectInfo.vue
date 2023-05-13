<template>
  <div class="form-text-list">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">项目编号：</span>
          <span v-ellipsis:top="projectInfo.projectNo" class="text">{{ projectInfo.projectNo }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">项目名称：</span>
          <span v-ellipsis:top="projectInfo.name" class="text">{{ projectInfo.name }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">项目类型：</span>
          <span class="text">{{ projectInfo.projectTypeId | getObjValue('value') }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">预计签单金额：</span>
          <span class="text">{{ projectInfo.estimateSigningAmount| toThousandFilter }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">预计签单时间：</span>
          <span v-ellipsis:top="projectInfo.estimateSigningTime" class="text">{{ projectInfo.estimateSigningTime }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">赢率(%)：</span>
          <span v-ellipsis:top="projectInfo.winningRate" class="text">{{ projectInfo.winningRate }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">审批状态：</span>
          <span class="text">{{ projectInfo.auditStatus|getObjValue('value') }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">最后跟单人：</span>
          <span class="text">{{ projectInfo.lastFollowUser | getObjValue }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">所在区域：</span>
          <span class="text">{{ projectInfo.area | getObjValue('areaName') }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">销售人员：</span>
          <span class="text">{{ projectInfo.saleUser | getObjValue }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">创建时间：</span>
          <span v-ellipsis:top="projectInfo.createTime" class="text">{{ projectInfo.createTime }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">创建人：</span>
          <span class="text">{{ projectInfo.creator | getObjValue }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">修改人：</span>
          <span class="text">{{ projectInfo.updater | getObjValue }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">发现人员：</span>
          <span class="text">{{ projectInfo.findUser | getObjValue }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">协助人员：</span>
          <span class="text">{{ projectInfo.assistUsers | getObjValue }}</span>
          <!-- <span v-ellipsis:top="projectInfo.assistUserNames" class="text">
            <span v-for="(item,index) in projectInfo.assistUserNames" :key="index">{{ item }},</span>
          </span> -->
        </div>
      </el-col>
    </el-row>
    <el-row>
      <div class="form-text-group">
        <span class="label">备注：</span>
        <span class="text">{{ projectInfo.remark }}</span>
      </div>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'ProjectInfo',
  props: {
    projectInfo: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
  },
  methods: { }
}
</script>

<style lang='scss' scoped>
</style>

