<template>
  <!-- <div>
    <el-card class="mb-18 pb-0">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>日工作报告</span>
      </div> -->

  <el-tabs type="border-card">
    <el-tab-pane label="日报填写">

      <div class="daily-wrap clearfix">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="16" class="r-line">
            <div class="daily-work mt-18">
              <el-form :inline="true" :model="formInline2" size="small" class=" mt-5 b-line " label-width="90px">
                <el-form-item label="提交人：">
                  <el-input v-model="formInline2.createUserName" :disabled="true" />
                </el-form-item>
                <el-form-item label="收件人:">
                  <el-input v-model="formInline2.Name" />
                </el-form-item>
                <el-form-item label="提交日期：">
                  <el-date-picker v-model="formInline2.time" type="date" value-format="yyyy-MM-dd" :disabled="true" />
                </el-form-item>
                <el-form-item label="抄送人:">
                  <el-input v-model="formInline2.Name2" />
                </el-form-item>

              </el-form>
            </div>
            <el-form ref="formInline2" :model="formInline2" size="small" class=" mt-5 b-line" :rules="rules">
              <el-form-item prop="morningWorkContent" label="上午工作：">
                <el-input v-model="formInline2.morningWorkContent" type="textarea" :rows="3" />
              </el-form-item>
              <el-form-item label="下午工作：" prop="afternoonWorkContent">
                <el-input v-model="formInline2.afternoonWorkContent" type="textarea" :rows="3" />
              </el-form-item>
              <el-form-item label="未完成工作：" prop="unfinishedWorkContent">
                <el-input v-model="formInline2.unfinishedWorkContent" type="textarea" :rows="3" />
              </el-form-item>
              <el-form-item label="需调节工作：" prop="coordinateWorkContent">
                <el-input v-model="formInline2.coordinateWorkContent" type="textarea" :rows="3" />
              </el-form-item>
              <el-form-item label="明日计划：" prop="workPlan">
                <el-input v-model="formInline2.workPlan">" type="textarea" rows="3" />
                </el-input>
              </el-form-item>
              <el-form-item label="附件：" prop="accessory">
                <Upload
                  :file-list="fileList"
                  @on-remove="handleRemove"
                  @handleSuccess="handleUploadSuccess"
                  @handleError="handleUploadError"
                />
              </el-form-item>
              <div class="text-center mb-18">
                <el-button type="primary" size="small" @click="handleOk('formInline2')">保存</el-button>
                <el-button size="small">取消</el-button>
              </div>

            </el-form>
          </el-col>
          <el-col :xs="24" :sm="8">
            <!-- <div style="width: 335px;height: 600px;margin: 30px auto"> -->
            <el-calendar>
              <template
                slot="dateCell"
                slot-scope="{date,data}"
              >
                <p :class="data.isSlected?'is-selected':''" @click="selectDate(data)">
                  {{ data.day.split('-').slice(2).join('-') }}
                </p>
              </template>
            </el-calendar>
          </el-col>
        </el-row>
      </div>
    </el-tab-pane>
    <el-tab-pane label="日报查询">

      <Report />

    </el-tab-pane>
  </el-tabs>
  <!-- <el-form :inline="true" :model="formInline2" size="small" class="form-inline-nolabel mt-5 b-line">
        <el-form-item>

          <el-button-group>
            <el-button size="small" type="primary">日工作内容提交</el-button>
            <el-button size="small" @click="$router.push('/intergratedoffice/report')">日工作报告查询</el-button>
          </el-button-group>
        </el-form-item>

      </el-form> -->

  <!-- </el-card>
  </div> -->
</template>

<script>
// import eleCalendar from 'ele-calendar'
// import 'ele-calendar/dist/vue-calendar.css'

import Report from './components/Report'
import { getList } from '@/api/intergratedoffice'
import Upload from '@/components/Upload'
export default {
  components: { Report, Upload },
  data: function() {
    return {
      formInline2: {
        'day': '2021-06-12',
        'accessory': '附件'
      },

      value: new Date(),
      rules: {
        morningWorkContent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        afternoonWorkContent: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ],
        workPlan: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]

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
    },
    handleOk() {
      this.$refs.formInline2.validate((valid) => {
        if (valid) {
          console.log(this.formInline2)
          getList(this.formInline2).then(() => {

          }, () => {})// 满足条件进行这步骤操作
        } else {
          console.log('error submit!!', 11)
          return false
        }
      })
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(v => v && v.uid !== file.uid)
    },

    handleUploadError(err, file, fileList) {
      console.log(err)
    },

    handleUploadSuccess(response, file, fileList) {
      file.raw.path = response.data[0]
      // const _file = {
      //   ...file.raw
      //   // path: response.data[0]
      // }
      this.fileList.push(file.raw)
    },

    selectDate(data) {
      console.log(data.day)
    }

  }
}

</script>
<style>
.el-calendar-table .el-calendar-day{
  text-align:center;
  height: 50px
}
.is-selected{
  color: #ff5d5d;
}
</style>
