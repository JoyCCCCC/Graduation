<template>
  <div>
    <div>
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>查看日报</span>
        </div>
        <div class="weekly-wrap  mt-18">
          <el-form :inline="true" :model="formInline2" size="small" class="mt-5 " label-width="70px">
            <el-form-item label="提交人">
              <el-input v-model="formInline2.createUserName2" :disabled="true" />
            </el-form-item>
            <el-form-item label="收件人">
              <el-input v-model="formInline2.Name" :disabled="true" />
            </el-form-item>
            <el-form-item label="提交日期">
              <el-input v-model="formInline2.time" type="date" value-format="yyyy-MM-dd" :disabled="true" />
            </el-form-item>
            <el-form-item label="抄送人">
              <el-input v-model="formInline2.Name2" :disabled="true" />
            </el-form-item>
          </el-form>
        </div>
        <el-form ref="formInline2" :model="formInline2" size="small" class="mt-5 ">
          <el-form-item prop="morningWorkContent" label="上午工作：">
            <el-input v-model="formInline2.morningWorkContent" type="textarea" :rows="3" /></el-form-item>
          <el-form-item label="下午工作：" prop="afternoonWorkContent">
            <el-input v-model="formInline2.afternoonWorkContent" type="textarea" :rows="3" />
          </el-form-item>
          <el-form-item label="未完成工作：" prop="unfinishedWorkContent">
            <el-input v-model="formInline2.unfinishedWorkContent" type="textarea" :row="3" />
          </el-form-item>
          <el-form-item label="需调节工作：" prop="coordinateWorkContent">
            <el-input v-model="formInline2.coordinateWorkContent" type="textarea" :row="3" />
          </el-form-item>
          <el-form-item label="明日计划：" prop="workPlan">
            <el-input v-model="formInline2.workPlan" type="textarea" rows="3" />
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
      formInline2: {
        createUserName2: '张三',
        time: '',
        Name: '帅哥',
        Name2: '大帅哥'
      }

    }
  },
  created() {
    this.formInline2.time = this.getNowTime()
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
