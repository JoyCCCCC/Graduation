<template>
  <el-card>
    <div slot="header" class="clearfix">
      <i class="bar" />
      <span>
        {{ this.titleName }}
      </span>
    </div>
    <div>
      <div>
        <el-form
          ref="communicateRecord"
          :rules="formRules"
          label-width="80px"
          :model="communicationRecordForm"
          size="small"
          :disabled="!this.isAdd"
        >
          <el-row :gutter="32">
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item v-if="this.formStatus == 'communicate'" label="项目" prop="projectId">
                <el-select v-model="communicationRecordForm.projectId" @change="selectprojectStatus($event,communicationRecordForm.projectId.key)">
                  <el-option v-for="item in projectOptions" :key="item.key" :value="item.key" :label="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item v-if="communicationRecordForm.projectId" label="项目状态">
                <el-select v-model="communicationRecordForm.projectSubStatus">
                  <el-option v-for="item in statusOptions" :key="item.key" :value="item.key" :label="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="沟通地点" prop="place">
                <el-input v-model="communicationRecordForm.place" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="沟通时间" prop="time">
                <el-date-picker
                  v-model="communicationRecordForm.time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item v-if="this.formStatus == 'communicate'" label="客户对象">
                <el-select v-model="communicationRecordForm.customer" @change="changeCustomer($event,communicationRecordForm.customer.key)">
                  <el-option v-for="item in customerOptions" :key="item.key" :value="item.key" :label="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <template>
              <el-col :xs="24" :sm="18" :md="12" :xl="4">
                <el-form-item v-if="this.formStatus == 'communicate'&& communicationRecordForm.customer" label="职业">
                  <label>{{ communicationRecordForm.position }}</label>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="18" :md="12" :xl="4">
                <el-form-item v-if="this.formStatus == 'communicate'&& communicationRecordForm.customer" label="联系方式">
                  <label>{{ communicationRecordForm.linkWay }}</label>
                </el-form-item>
              </el-col>
            </template>
          </el-row>
          <el-row :gutter="32">
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="沟通目的" prop="purpose">
                <el-input v-model="communicationRecordForm.purpose" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="沟通内容">
                <el-input v-model="communicationRecordForm.content" type="textarea" />
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="存在问题">
                <el-input v-model="communicationRecordForm.existingProblems" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="跟进建议">
                <el-input v-model="communicationRecordForm.proposal" type="textarea" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="备注">
                <el-input v-model="communicationRecordForm.remark" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :xs="24" :sm="18" :md="12" :xl="4">
              <el-form-item label="附件">
                <Upload
                  v-model="communicationRecordForm.accessory"
                  :file-list="fileList"
                  @handleRemove="handleRemove"
                  @handleSuccess="handleUploadSuccess"
                  @handleError="handleUploadError"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="isAdd" class="foot-button text-center mt-18">
        <el-button type="primary" @click="onsubmit">保存</el-button>
        <el-button @click="back">返回</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import Upload from '@/components/Upload'
import { fetchCustomerData, fetchApolloData, fetchProjectStatus, fetchProject } from '@/api/dict'
import { addconmmunicateList, editconmmunicateList, fetchconmmunicateDetail } from '@/api/intergratedoffice'
import { fetchCrmDetail } from '@/api/customer'
export default {
  name: 'CommunicateRecord',
  components: { Upload },
  props: {
    communicateRecordData: {
      type: Object,
      default: () => ({})
    }
  },
  data: function() {
    return {
      fileList: [],
      formType: 1,
      titleName: '',
      isAdd: true,
      recordShow: true,
      customerNameShow: false,
      customerName: '',
      formStatus: 'communicate',
      statusOptions: [],
      projectOptions: [],
      customerOptions: [],
      communicationRecordForm: {
      },
      formRules: {
        place: [{ required: true, message: '请填写沟通地点', trigger: 'blur' }],
        time: [{ required: true, message: '请选择沟通时间', trigger: 'blur' }],
        purpose: [{ required: true, message: '请填写沟通目的', trigger: 'blur' }]
      },
      list: []
    }
  },

  created() {
    this.getQuery()
    this.getDetail()
    this.selectCustomer()
    // this.selectForm()
    // this.selectprojectStatus()
    this.selectProject()
  },
  methods: {
    // selectForm() {
    //   console.log(this.communicationRecordForm)
    //   if (this.isAdd !== true) {
    //     fetchCrmDetail(this.communicationRecordForm.customer).then(res => {
    //       this.communicationRecordForm.position = res.position
    //       this.communicationRecordForm.linkWay = res.wechatNum
    //     })
    //     fetchProjectStatus(this.communicationRecordForm.projectId).then(res => {
    //       console.log(res)
    //     })
    //   }
    // },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(v => v && v.uid !== file.uid)
    },
    handleUploadError(err, file, fileList) {
      console.log(err)
    },
    handleUploadSuccess(response, file, fileList) {
      file.raw.path = response.data[0]
      this.fileList.push(file.raw)
    },
    changeCustomer(customerId) {
      fetchCrmDetail(customerId).then(res => {
        this.communicationRecordForm.position = res.position
        this.communicationRecordForm.linkWay = res.wechatNum
      })
    },
    selectProject() {
      fetchProject().then(res => {
        console.log(res)
        this.projectOptions = res
      })
    },
    selectprojectStatus(projectId) {
      fetchProjectStatus(projectId).then(res => {
        this.statusOptions = res
      })
    },
    selectCustomer() {
      fetchCustomerData().then(res => {
        this.customerOptions = res
      })
    },
    back() {
      this.$route.go(-1)
      // this.$router.push({
      //   path: '/intergratedoffice/communicateList',
      //   query: { formStatus: this.formStatus }
      // })
    },
    getDetail() {
      const routerIsAdd = this.$route.query.isAdd
      const routerRecordId = this.$route.query.communicationRecordId
      this.communicationRecordId = routerRecordId
      this.isAdd = routerIsAdd
      if (this.isAdd === true) {
        console.log(this.isAdd)
      } else {
        fetchconmmunicateDetail(this.communicationRecordId).then(res => {
          fetchProjectStatus(res.projectId).then(selectRes => {
            console.log(this.isAdd, 'isadd?', this.communicationRecordForm.projectSubStatus)
            this.communicationRecordForm.projectSubStatus.key = res.projectId
            this.statusOptions = selectRes
            this.communicationRecordForm.projectSubStatus = this.communicationRecordForm.projectSubStatus.value
          })
          console.log(res)
          this.communicationRecordForm = res
          this.titleName = '查看详情'
          this.$route.meta.title = this.titleName
        })
      }
    },
    getQuery() {
      const routerformStaus = this.$route.query.formStatus
      const routercustomer = this.$route.query.customer
      const routerprojectId = this.$route.query.projectId
      this.formStatus = routerformStaus
      if (this.formStatus === 'follow') {
        this.titleName = '新增跟进记录'
        this.$route.meta.title = this.titleName
        this.communicationRecordForm.typeId = 2
        this.communicationRecordForm.projectId = routerprojectId
        this.communicationRecordForm.customer = routercustomer
        console.log('这里是跟进', this.communicationRecordForm.projectId)
        fetchProjectStatus(this.communicationRecordForm.projectId).then(res => {
          this.statusOptions = res
        })
      } else if (this.formStatus === 'communicate') {
        this.titleName = '新增沟通记录'
        this.$route.meta.title = this.titleName
        this.communicationRecordForm.typeId = 1
      }
      console.log(this.formStatus)
    },
    onsubmit() {
      this.$refs.communicateRecord.validate((valid) => {
        if (valid) {
          if (!this.communicateRecordData.communicationRecordId) {
            console.log(this.communicationRecordForm, this.communicationRecordForm.customerId, '添加打印')
            addconmmunicateList(this.communicationRecordForm).then(() => {
              console.log(this.communicationRecordForm.customerId, 'kehuID')
              this.$message({ message: '添加成功', type: 'success' })
              this.$router.go(-1)
              // this.$router.push({
              //   path: '/intergratedoffice/communicateList',
              //   query: {
              //     formStatus: this.formStatus,
              //     projectId: this.projectId
              //   }
              // })
            }, () => {})
          } else {
            editconmmunicateList(this.communicateRecordData.communicationRecordId, this.communicationRecordForm).then(() => {
              console.log(this.communicateRecordData, this.communicationRecordForm)
              this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
              this.$message({ message: '修改成功', type: 'success' })
            }, () => {})
          }
        }
      })
    }
  }
}
</script>
