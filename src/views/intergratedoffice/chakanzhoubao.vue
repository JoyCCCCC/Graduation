<template>
  <div>
    <div>
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>查看周报</span>
        </div>
        <div class="weekly-wrap  mt-18">
          <el-form :inline="true" :model="formInline3" size="small" class="mt-5 " label-width="70px">
            <el-form-item label="提交人">
              <el-input v-model="formInline3.createUserName2" :disabled="true" />
            </el-form-item>
            <el-form-item label="收件人">
              <el-input v-model="formInline3.Name" :disabled="true" />
            </el-form-item>
            <el-form-item label="提交日期">
              <el-input v-model="formInline3.time" type="date" value-format="yyyy-MM-dd" :disabled="true" />
            </el-form-item>
            <el-form-item label="抄送人">
              <el-input v-model="formInline3.Name2" :disabled="true" />
            </el-form-item>
          </el-form>
        </div>
        <el-form ref="formInline3" :model="formInline3" size="small" class="mt-5 ">
          <el-form-item label="本周完成工作:" prop="doneWork">
            <el-input v-model="formInline3.doneWork" type="textarea" :rows="3" /></el-form-item>
          <el-form-item label="下周工作计划:" prop="workPlan">
            <el-input v-model="formInline3.workPlan" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="本周工作总结:" prop="workSummary">
            <el-input v-model="formInline3.workSummary" type="textarea" :row="3" />
          </el-form-item>
          <el-form-item label="需求:" prop="needSupport">
            <el-input v-model="formInline3.needSupport" type="textarea" :row="3" />
          </el-form-item>
        </el-form>
        <div class="text-center mb-18">
          <el-button type="primary" size="small" @click="$router.go(-1)">返回</el-button>

        </div>
      </el-card>

    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      formInline3: {
        createUserName2: '张三',
        time: '',
        Name: '帅哥',
        Name2: '大帅哥'
      }

    }
  },
  created() {
    this.formInline3.time = this.getNowTime()
  },
  methods: {
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      return defaultDate
    }
  }

}
</script>
