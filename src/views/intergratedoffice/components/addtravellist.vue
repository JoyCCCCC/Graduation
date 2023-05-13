<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          新增出差申请
        </span>
      </div>

      <div>
        <el-form
          ref="addtraveapply"
          label-width="90px"
          :model="addtravellistForm"
          size="small"
          :rules="rules"
        >
          <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="出差事由" prop="rea">
                <el-input v-model="addtravellistForm.reason" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="出差天数" prop="days">
                <el-input v-model="addtravellistForm.days" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="同行人" prop="colleagues">
                <el-select
                  v-model="addtravellistForm.colleagues"
                  multiple
                  filterable
                  remote
                  placeholder="请输入关键字"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in colleaguesOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="addtravellistForm.remark" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>

          <div v-for="(formitem,index) in addtravellistForm.detail" :key="index">
            <el-row :model="addtravellistForm.detail[index]" :gutter="64">
              <el-col :span="24" class="form-inline-nolabel ">
                <el-button type="text" style="float:right" @click="handeldelete(index)">删除</el-button>
                <div> <el-button type="text" style="float:right;margin-left:50px;" @click="add">添加</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="32">
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="项目" :prop="`detail[${index}].projectId`" :rules="{ required: true, message: '请选择项目', trigger: 'blur' }">
                  <el-select v-model="formitem.projectId">
                    <el-option v-for="item in projectIdOption" :key="item.key" :value="item.key" :label="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="交通工具" :prop="`detail[${index}].vehicle`" :rules="{ required: true, message: '请选择交通工具', trigger: 'blur' }">
                  <el-select v-model="formitem.vehicle">
                    <el-option v-for="item in vehicleOption" :key="item.key" :value="item.key" :label="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="单程往返" :prop="`detail[${index}].typeId`" :rules="{ required: true, message: '请选择往返类型', trigger: 'blur' }">
                  <el-select v-model="formitem.typeId">
                    <el-option v-for="item in typeIdOption" :key="item.value" :value="item.value" :label="item.label" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="出发城市" :prop="`detail[${index}].departureCity`" :rules="{ required: true, message: '请选择出发位置', trigger: 'blur' }">
                  <el-select v-model="formitem.departureCity">
                    <el-option v-for="item in departureCityOptions " :key="item.key" :value="item.key" :label="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="目的城市" :prop="`detail[${index}].destinationCity`" :rules="{ required: true, message: '请选择目的地', trigger: 'blur' }">
                  <el-select v-model="formitem.destinationCity">
                    <el-option v-for="item in destinationCityOptions" :key="item.key" :value="item.key" :label="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="开始时间" :prop="`detail[${index}].startTime`" :rules="{ required: true, message: '请选择开始时间', trigger: 'blur' }">
                  <el-date-picker
                    v-model="formitem.startTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="结束时间" :prop="`detail[${index}].endTime`" :rules="{ required: true, message: '请选择结束时间', trigger: 'blur' }">
                  <el-date-picker
                    v-model="formitem.endTime"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="时长" :prop="`detail[${index}].duration`" :rules="{ required: true, message: '请选择时长', trigger: 'blur' }">
                  <el-input v-model="formitem.duration" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-form-item label="出差天数" prop="days">
              <el-input v-model="addtravellistForm.detail.days" />
            </el-form-item> -->

            <!-- <div class="text-center">
              <el-button>取 消</el-button>
              <el-button type="primary" style="align:center" @click="businessTripApply">提交</el-button>
            </div> -->

          </div>
        </el-form>
        <div class="text-center">
          <el-button>取 消</el-button>
          <el-button type="primary" style="align:center" @click="businessTripApply">提交</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { businessTripApply } from '@/api/intergratedoffice'
import { fetchApolloData, fetchProject, province, fetchEmployeeData } from '@/api/dict'

export default {
  data() {
    return {
      rules: {
        reason: [
          { required: true, message: '出差事由不能为空', trigger: 'blur' }
        ],
        days: [
          { required: true, message: '出差天数不能为空', trigger: 'blur' }
        ],
        colleagues: [
          { required: true, message: '同行人数不能为空', trigger: 'blur' }
        ]
      },
      body: {
      },

      // xiangmuOption: [
      //   { value: '1', label: '项目' },
      //   { value: '2', label: '项目2' },
      //   { value: '3', label: '项目3' }
      // ],
      typeIdOption: [
        { value: 1, label: '单程' },
        { value: 2, label: '往返' }
      ],
      list1: [],
      loading: false,
      destinationCity: [],
      vehicleOption: [],
      typeId: [],
      colleaguesOptions: [],
      departureCity: [],
      departureCityOptions: [],
      destinationCityOptions: [],
      projectIdOption: [],
      addtravellistForm: {

        'detail': [
          {

          }
        ]

      }

    }
  },
  created() {
    // this.businessTripApply()
    this.cityApply()
    this.province()
    this.fetchProject()
    this.fetchEmployeeData()

    // this.test()
  },

  methods: {

    // const a = {
    //   'reason': '出差事由',
    //   'days': 2,
    //   'colleagues': [
    //     '同行人',
    //     '同行人2'
    //   ],
    //   'remark': '备注',
    //   'detail': [
    //     {
    //       'projectId': 1,
    //       'vehicle': 2,
    //       'typeId': 1,
    //       'departureCity': 110000,
    //       'destinationCity': 120000,
    //       'startTime': '2021-06-23 07:03:18',
    //       'endTime': '2021-06-23 07:03:18',
    //       'duration': 0.02
    //     }
    //   ]\\
    // test() {
    //   const a = 'dsdsd666sds'
    //   const b = 's'

    //   console.log(a.indexOf(b), 'pppppp')

    //   const array = [1, 2, 3, 4, 5, 6]

    //   console.log(array.filter(v => {
    //     return v > 5
    //   }))
    // },

    add() {
      this.addtravellistForm.detail.push({})
    },

    handeldelete(index) {
      this.addtravellistForm.detail.splice(index, 1)
    },
    businessTripApply() {
      businessTripApply(this.addtravellistForm).then((res) => {
        console.log(11, res)
      }, () => {})
    },
    cityApply() {
      console.log(123123323232)
      fetchApolloData({ key: 'vehicle' }).then(res => {
        this.vehicleOption = res
      })
    },
    province() {
      province().then(res => {
        this.departureCityOptions = res
        this.destinationCityOptions = res
      })
    },
    fetchProject() {
      fetchProject().then(res => {
        this.projectIdOption = res
      })
    },
    fetchEmployeeData() {
      fetchEmployeeData().then(res => {
        this.colleaguesOptions = res
      })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.colleaguesOptions = this.list1.filter(item => {
            return item.label()
              .indexOf(query()) > -1
          })
        }, 200)
      } else {
        this.colleaguesOptions = []
      }
    }
  }

}

</script>
