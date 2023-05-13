<template>
  <div class="form-text-list">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">项目ID：</span>
          <span v-ellipsis:top="budget.projectId" class="text">{{ budget.projectId }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">项目编号：</span>
          <span v-ellipsis:top="budget.projectNo" class="text">{{ budget.projectNo }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">项目名称：</span>
          <span v-ellipsis:top="budget.projectName" class="text">{{ budget.projectName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">项目类型：</span>
          <span v-ellipsis:top="budget.peojectTypeId" class="text">{{ budget.peojectTypeId }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">预计签单金额：</span>
          <span v-ellipsis:top="budget.estimateSigningAmount" class="text">{{ budget.estimateSigningAmount }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">预计签单时间：</span>
          <span v-ellipsis:top="budget.estimateSigningTime" class="text">{{ budget.estimateSigningTime }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">赢率(%)：</span>
          <span v-ellipsis:top="budget.winningRate" class="text">{{ budget.winningRate }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">审批状态：</span>
          <span v-ellipsis:top="budget.estimateSigningAmount" class="text">{{ budget.estimateSigningAmount }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">最后跟单人：</span>
          <span v-ellipsis:top="budget.lastFollowUserName" class="text">{{ budget.lastFollowUserName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">所在区域：</span>
          <span v-ellipsis:top="budget.area" class="text">{{ budget.area }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">销售人员：</span>
          <span v-ellipsis:top="budget.saleUserName" class="text">{{ budget.saleUserName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">创建时间：</span>
          <span v-ellipsis:top="budget.createTime" class="text">{{ budget.createTime }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">创建人：</span>
          <span v-ellipsis:top="budget.createUserName" class="text">{{ budget.createUserName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">修改人：</span>
          <span v-ellipsis:top="budget.updateUserName" class="text">{{ budget.updateUserName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">发现人员：</span>
          <span v-ellipsis:top="budget.findUserName" class="text">{{ budget.findUserName }}</span>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :xl="6">
        <div class="form-text-group">
          <span class="label">协助人员：</span>
          <span v-ellipsis:top="budget.assistUserNames" class="text" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Budget',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    budget: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {

  }
}
</script>
