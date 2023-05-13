<template>
  <div>
    <!-- <el-card class="mb-18 pb-0">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>周工作报告</span>
      </div> -->

    <el-tabs type="border-card">
      <el-tab-pane label="周报填写">
        <div class="weekly-wrap  clearfix">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="16" class="r-line">
              <div class="weekly-wrap  mt-18">
                <el-form :inline="true" :model="formInline3" size="small" class="mt-5 b-line" label-width="90px">
                  <el-form-item label="提交人">
                    <el-input v-model="formInline3.createUserName2" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="收件人">
                    <el-input v-model="formInline3.Name" />
                  </el-form-item>
                  <el-form-item label="提交日期">
                    <el-input v-model="formInline3.time" type="date" value-format="yyyy-MM-dd" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="抄送人">
                    <el-input v-model="formInline3.Name2" />
                  </el-form-item>
                </el-form>
              </div>
              <el-form ref="formInline3" :model="formInline3.projectDetail" size="small" class="mt-5 b-line">
                <el-form-item label="本周完成工作:" prop="doneWork">
                  <el-input v-model="formInline3.doneWork" type="textarea" :rows="3" /></el-form-item>
                <el-form-item label="下周工作计划:" prop="workPlan">
                  <el-input v-model="formInline3.workPlan" type="textarea" :rows="3" />
                </el-form-item>
                <el-form-item label="本周工作总结:" prop="workSummary">
                  <el-input v-model="formInline3.workSummary" type="textarea" :row="3" />
                </el-form-item>
                <el-form-item label="需求:" prop="workPlanNeedSupport">
                  <el-input v-model="formInline3.workPlanNeedSupport" type="textarea" :row="3" />
                </el-form-item>
                <el-form-item label="附件：" prop="accessory">
                  <Upload
                    v-model="formInline3.accessory"
                    :file-list="fileList"
                    @on-remove="handleRemove"
                    @handleSuccess="handleUploadSuccess"
                    @handleError="handleUploadError"
                  />
                </el-form-item>
                <div class="text-center mb-18">
                  <el-button type="primary" size="small" @click="handleOk">保存</el-button>
                  <el-button size="small">取消</el-button>
                </div>

              </el-form>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-calendar />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="周报查询">
        <WeekReport />
      </el-tab-pane>
    </el-tabs>

    <!-- <el-form :inline="true" :model="formInline3" size="small" class="form-inline-nolabel mt-5 b-line">
        <el-form-item>

          <el-button-group>
            <el-button size="small">周工作内容提交</el-button>
            <el-button size="small" @click="$router.push('/intergratedoffice/mreport')">周工作报告查询</el-button>
          </el-button-group>
        </el-form-item>
      </el-form> -->

    <!-- </el-card> -->
  </div>
</template>
<script>
import Upload from '@/components/Upload'
import WeekReport from './components/WeekReport'
import { getList3 } from '@/api/intergratedoffice3'
export default {
  components: { WeekReport, Upload },
  data: function() {
    return {
      formInline3: {
        'year': 2021,
        'weekNum': 26,
        'doneWork': 'doneWork',
        'workPlan': '下周计划',
        'workSummary': '本周工作总结',
        'needSupport': '需要的资源及支持',
        'accessory': '附件'
        // 'year': 2021,
        // 'weekNum': 26,
        // 'otherWork': '其他工作',
        // 'remark': '备注',
        // 'accessory': '附件',
        // 'workSummary': '本周工作总结',
        // 'doneWork': 'doneWork',

        // 'projectDetail': []
        //   {
        //     'projectId': 1,
        //     'industryName': 1,
        //     'customerName': 1,
        //     'projectAmount': 1.1,
        //     'departmentName': '部门',
        //     'projectMainStatus': 1,
        //     'projectSubStatus': 1,
        //     'estimatedBiddingTime': '2021-06-22 00:00:00',
        //     'mainCompetitors': '主要竞争对手',
        //     'workContent': '本周工作任务',
        //     'achievements': '预定成果物',
        //     'planTime': '2021-06-22 00:00:00',
        //     'estimatedCompletionTime': '2021-06-22 00:00:00',
        //     'completion': '完成情况',
        //     'problem': '当前状态及存在问题',
        //     'needSupport': '需要的资源及支持',
        //     'workPlan': '下周工作计划',
        //     'workPlanAchievements': '下周预定成果物',
        //     'workPlanTime': '2021-06-22 00:00:00',
        //     'workPlanNeedSupport': '下周需要的资源及支持'
        //   }
      },
      value: new Date(),
      rules: {

        // workPlan: [
        //   { required: true, message: '内容不能为空', trigger: 'blur' }
        // ]

      },
      fileList: []

    }
  },

  created() {
    this.formInline3.time = this.getNowTime()
    this.fetchData()
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
      getList3(this.formInline3).then(() => {
        console.log(555)
      }, () => {})// 满足条件进行这步骤操作
      this.fetchData()
    }
    // handleOk() {
    //   console.log(23)
    //   getList3(this.formInline3).then(() => {
    //     console.log(555)
    //   }, () => {})// 满足条件进行这步骤操作
    // }

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

</script>
<style>
.el-calendar-table .el-calendar-day{
  text-align:center;
  height: 50px
}
</style>

