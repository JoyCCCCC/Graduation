<template>
  <el-card>
    <div>

      <el-button type="primary" @click="add"> 增加</el-button>
    </div>
    <el-collapse class="mt-18">

      <el-collapse-item v-for="(RecoredForm,index) in collapseForm" :key="index">
        <template slot="title">
          <i class="header-icon el-icon-info" />
          <el-button type="text" @click="handeldelete(index)"> 删除</el-button>
        </template>
        <div>
          <el-form
            label-width="150px"
            :model="RecoredForm"
            size="small"
            :rules="rules"
          >
            <el-row :gutter="32">
              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item v-if="recordShow" label="项目名称" prop="productName">
                  <el-select v-model="RecoredForm.productName" @change="selectChange">
                    <el-option v-for="item in projectOptions" :key="item.value" :value="item" :label="item.name" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="预计招标时间">
                  <el-date-picker v-model="RecoredForm.estimatedBiddingTime" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="主要竞争对手">
                  <el-input v-model="RecoredForm.mainCompetitors" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="周数" prop="weekNum">
                  <el-input v-model="RecoredForm.weekNum" />
                </el-form-item>
              </el-col>
              <template v-if="RecoredForm.productName">
                <el-col :xs="24" :sm="6" :md="12" :xl="6">
                  <el-form-item label="客户名称">
                    <el-input v-model="RecoredForm.productName.costomerName" :disabled="true" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="6" :md="12" :xl="6">
                  <el-form-item label="金额">
                    <el-input v-model="RecoredForm.productName.projectAmount" :disabled="true" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="6" :md="12" :xl="6">
                  <el-form-item label="部门">
                    <el-input v-model="RecoredForm.productName.departmentName" :disabled="true" />
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="6" :md="12" :xl="6">
                  <el-form-item label="项目阶段">
                    <el-input v-model="RecoredForm.productName.projectSubStatus" :disabled="true" />
                  </el-form-item>
                </el-col>
              </template>
              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="本周工作任务" prop="workContent">
                  <el-input v-model="RecoredForm.workContent" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="预定成果物" prop="achievements">
                  <el-input v-model="RecoredForm.achievements" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="计划时间" prop="planTime">
                  <el-date-picker v-model="RecoredForm.planTime" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="实际完成时间" prop="estimatedCompletionTime">
                  <el-date-picker v-model="RecoredForm.estimatedCompletionTime" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="完成情况" prop="completion">
                  <el-input v-model="RecoredForm.completion" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="状态及问题">
                  <el-input v-model="RecoredForm.problem" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="需求">
                  <el-input v-model="RecoredForm.needSupport" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="下周任务" prop="workPlan">
                  <el-input v-model="RecoredForm.workPlan" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="预定成果物">
                  <el-input v-model="RecoredForm.workPlanAchievements" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="其他工作事项">
                  <el-input v-model="RecoredForm.otherWork" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="备注">
                  <el-input v-model="RecoredForm.remark" type="textarea" />
                </el-form-item>
              </el-col>

              <el-col :xs="24" :sm="6" :md="12" :xl="6">
                <el-form-item label="附件">
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                  >
                    <el-button size="small" type="primary">点击上传</el-button></el-upload>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="text-center  mt-18">
      <el-button type="primary" size="small" @click="handleOk">保存</el-button>
      <el-button size="small">取消</el-button>
    </div>

  </el-card>
</template>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
<script>
import { addWeekSalesReport } from '@/api/intergratedoffice2'
export default {
  data() {
    return {
      activeNames: ['1'],
      recordShow: true,
      productName: false,
      RecoredForm: {
        'year': 2021,
        'weekNum': 28,
        'otherWork': '其他工作',
        'remark': '备注',
        'accessory': '附件',
        'projectDetail': [
          {
            'projectId': 1,
            'industryName': 1,
            'customerName': 1,
            'projectAmount': 1.1,
            'departmentName': '部门',
            'projectMainStatus': 1,
            'projectSubStatus': 1,
            'estimatedBiddingTime': '2021-06-22 00:00:00',
            'mainCompetitors': '主要竞争对手',
            'workContent': '本周工作任务',
            'achievements': '预定成果物',
            'planTime': '2021-06-22 00:00:00',
            'estimatedCompletionTime': '2021-06-22 00:00:00',
            'completion': '完成情况',
            'problem': '当前状态及存在问题',
            'needSupport': '需要的资源及支持',
            'workPlan': '下周工作计划',
            'workPlanAchievements': '下周预定成果物',
            'workPlanTime': '2021-06-22 00:00:00',
            'workPlanNeedSupport': '下周需要的资源及支持'
          }
        ]
      },

      projectOptions: [
        { value: '1', name: '项目1', costomerName: '张三', projectAmount: '1000', departmentName: '研发部', projectSubStatus: '立项' },
        { value: '2', name: '项目2', costomerName: '李四', projectAmount: '800', departmentName: '市场部', projectSubStatus: '中标' }
      ],
      statusOptions: [
        { value: '1101', label: '准备-机会点' },
        { value: '1201', label: '立项-立项' },
        { value: '1402', label: '招投标-协助投标' },
        { value: '1403', label: '招投标-询价' }
      ],
      productForm: {},
      collapseForm: [
        {
          productName: '',
          estimatedBiddingTime: '',
          mainCompetitors: '',
          costomerName: '',
          projectAmount: '',
          departmentName: '',
          projectSubStatus: '',
          workContent: '',
          achievements: '',
          planTime: '',
          estimatedCompletionTime: '',
          completion: '',
          problem: '',
          needSupport: '',
          workPlan: '',
          workPlanAchievements: '',
          otherWork: ''

        }
      ],
      rules: {
        productName: [
          { required: true, message: '项目不能为空', trigger: 'blur' }
        ],
        workContent: [
          { required: true, message: '工作任务不能为空', trigger: 'blur' }
        ],
        achievements: [
          { required: true, message: '成果不能为空', trigger: 'blur' }
        ],
        estimatedCompletionTime: [
          { required: true, message: '实际完成时间不能为空', trigger: 'blur' }
        ],
        planTime: [
          { required: true, message: '计划时间不能为空', trigger: 'blur' }
        ],
        completion: [
          { required: true, message: '完成情况不能为空', trigger: 'blur' }
        ],
        workPlan: [
          { required: true, message: '下周任务不能为空', trigger: 'blur' }
        ],
        weekNum: [
          { required: true, message: '周数不能为不能为空', trigger: 'blur' }
        ]

      },
      findIndex: {}

    }
  },

  methods: {
    add() {
      this.collapseForm.push({})
    },
    handeldelete(index) {
      this.collapseForm.splice(index, 1)
    },
    handleChange(val) {
      console.log(val)
    },
    selectChange(item) {
      this.choseproduct(item)
    },
    choseproduct(id) {
      const index = this.productNameOptions.findIndex((item, index) => {
        return item.value === id
      })
      this.productForm = this.productNameOptions[index]
    },
    handleOk() {
      console.log(23)
      addWeekSalesReport(this.RecoredForm).then(() => {
        console.log(555)
      }, () => {})// 满足条件进行这步骤操作
    }

  }

}

</script>
