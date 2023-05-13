<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="月报填写">
        <div class="weekly-wrap  clearfix">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="16" class="r-line">
              <el-form :inline="true" :model="formInline5" size="small" class="mt-5 b-line" label-width="90px">
                <el-form-item label="提交人">
                  <el-input v-model="formInline5.createUserName" :disabled="true" />
                </el-form-item>
                <el-form-item label="收件人">
                  <el-input v-model="formInline5.Name" />
                </el-form-item>
                <el-form-item label="提交日期">
                  <el-input v-model="formInline5.time" type="date" value-format="yyyy-MM-dd" :disabled="true" />
                </el-form-item>
                <el-form-item label="抄送人">
                  <el-input v-model="formInline5.Name2" />
                </el-form-item>
              </el-form>
              <el-form ref="formInline5" :model="formInline5" size="small" class="mt-5 b-line">
                <el-form-item label="本月完成工作：" prop="doneWork">
                  <el-input v-model="formInline5.doneWork" type="textarea" :row="3" />
                </el-form-item>
                <el-form-item label="下月工作计划：" prop="workPlan">
                  <el-input v-model="formInline5.workPlan" type="textarea" :row="3" />
                </el-form-item>
                <el-form-item label="本月工作总结 " prop="workSummary">
                  <el-input v-model="formInline5.workSummary" type="textarea" :row="3" />
                </el-form-item>
                <el-form-item label="需求：" prop="needSupport">
                  <el-input v-model="formInline5.neeedSupport" type="textarea" :row="3" />
                </el-form-item>
                <el-form-item label="附件：" prop="accessory">
                  <Upload
                    v-model="formInline5.accessory"
                    :file-list="fileList"
                    @on-remove="handleRemove"
                    @handleSuccess="handleUploadSuccess"
                    @handleError="handleUploadError"
                  />
                </el-form-item>
                <div class="text-center  mb-18">
                  <el-button type="primary" size="small" @click="handleOk">保存</el-button>
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

      <el-tab-pane label="月报查询">
        <YReport />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import { monthreport } from '@/api/intergratedoffice2'
import YReport from './components/YReport'
import Upload from '@/components/Upload'
export default {
  components: { YReport, Upload },
  data: function() {
    return {
      formInline5: {
        // createUserName: '张三',
        // time: '',
        // Name: '',
        // Name2: ''
        'year': 2021,
        'monthNum': 7,
        'doneWork': '完成工作',
        'workPlan': '下周计划',
        'workSummary': '本周工作总结',
        'needSupport': '需要的资源及支持',
        'accessory': '附件'

      },
      value: new Date(),
      fileList: []

    }
  },
  created() {
    this.formInline5.time = this.getNowTime()
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
      console.log(23)
      monthreport(this.formInline5).then(() => {
        console.log(555)
      }, () => {})// 满足条件进行这步骤操作
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
    }

  }

}
</script>
<style>
.el-calendar-table .el-calendar-day{
  text-align:center;
  height: 50px;
 font-size: 15px;

}
.is-selected{
  color: #ff5d5d;
}
</style>
