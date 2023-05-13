<template>
  <div>
    <div>
      <el-form
        ref="communicateRecord"
        :rules="formRules"
        label-width="70px"
        :model="communicationRecordForm"
        size="small"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item v-if="recordShow" label="项目" prop="projectId">
              <el-select v-model="communicationRecordForm.projectId">
                <el-option v-for="item in projectOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="项目状态">
              <el-select v-model="communicationRecordForm.projectSubStatus">
                <el-option v-for="item in statusOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="沟通地点">
              <el-input v-model="communicationRecordForm.place" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="沟通时间">
              <el-date-picker
                v-model="communicationRecordForm.time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item v-if="recordShow" label="客户对象">
              <el-select v-model="communicationRecordForm.customer">
                <el-option v-for="item in customerNameOptions" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- </el-row>
        <el-row :gutter="32"> -->
          <template v-if="communicationRecordForm.customer">
            <el-col :xs="24" :sm="12" :md="12" :xl="4">
              <el-form-item v-if="recordShow" label="职业">
                <label>{{ communicationRecordForm.position }}</label>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :xl="4">
              <el-form-item v-if="recordShow" label="联系方式">
                <label>{{ communicationRecordForm.linkWay }}</label>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="沟通目的">
              <el-input v-model="communicationRecordForm.purpose" type="textarea" rows="3" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="沟通内容">
              <el-input v-model="communicationRecordForm.content" type="textarea" rows="3" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="存在问题">
              <el-input v-model="communicationRecordForm.existingProblems" type="textarea" rows="3" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="跟进建议">
              <el-input v-model="communicationRecordForm.proposal" type="textarea" rows="3" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :xl="4">
            <el-form-item label="备注">
              <el-input v-model="communicationRecordForm.remark" type="textarea" rows="3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件">
          <el-upload
            v-model="communicationRecordForm.accessory"
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="foot-button text-center mt-18">
      <el-button type="primary" @click="onsubmit">保存</el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>

<script>
import { addconmmunicateList, editconmmunicateList } from '@/api/intergratedoffice'
export default {
  name: 'CommunicateRecord',
  props: {
    communicateRecordData: {
      type: Object,
      default: () => ({})
    }
  },
  data: function() {
    return {
      isEdit: false,
      recordShow: true,
      customerNameShow: false,
      customerName: '',
      formStatus: 'communicate',
      // textMap: {
      //   communicate: '沟通记录',
      //   follow: '跟进记录'
      // },
      statusOptions: [
        { value: 1, label: '准备-机会点' },
        { value: 2, label: '立项-立项' },
        { value: 3, label: '招投标-协助投标' },
        { value: 4, label: '招投标-询价' }
      ],
      projectOptions: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 }
      ],
      customerNameOptions: [
        { value: 111, label: '张三' },
        { value: 222, label: '李四' }

      ],
      // communicationRecordForm: this.$deepcopy({}, this.communicateRecordData),
      customerForm: {},
      communicationRecordForm: this.$deepcopy({
        'projectMainStatus': 1,
        'accessory': '附件'
      }, this.communicateRecordData),
      formRules: {
        productName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      },
      list: []
    }
  },

  created() {
    this.getQuery()
  },
  methods: {
    getQuery() {
      const routerformStaus = this.$route.query.formStatus
      const routerShow = this.$route.query.recordShow
      this.$route.meta.title = '跟进记录'
      this.formStatus = routerformStaus
      this.recordShow = routerShow
      if (this.formStatus == null) {
        this.recordShow = true
        this.formStatus = 'communicate'
        this.$route.meta.title = '沟通记录'
      }
      console.log(this.formStatus, this.recordShow, this.communicationRecordForm, this.communicateRecordData)
    },
    // selectChange(item) {
    //   this.choseCustomer(item)
    // },
    // choseCustomer(id) {
    //   const index = this.customerNameOptions.findIndex((item, index) => {
    //     return item.value === id
    //   })
    //   this.customerForm = this.customerNameOptions[index]
    // },
    onsubmit() {
      this.$refs.communicateRecord.validate((valid) => {
        if (valid) {
          if (!this.communicateRecordData.communicationRecordId) {
            console.log(11, this.formStatus)
            addconmmunicateList(this.communicationRecordForm).then(() => {
              this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
              this.$message('添加成功')
              console.log(this.communicationRecordForm, 1222)
            }, () => {})
          } else {
            editconmmunicateList(this.communicateRecordData.communicationRecordId, this.communicationRecordForm).then(() => {
              console.log(this.communicateRecordData, this.communicationRecordForm)
              this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
              this.$message('修改成功')
            }, () => {})
          }
        }
      })
    }
  }
}
</script>
