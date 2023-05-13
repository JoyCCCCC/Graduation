<template>
  <div>
    <el-form
      ref="addStampApply"
      :model="addSealApplication"
      size="small"
      label-width="100px"
      :disabled="stampApplyData.isAdd == false"
      :rules="formRules"
    >
      <el-row :gutter="32">
        <!-- <el-col :xs="24" :sm="18" :md="12" :xl="6">
          <el-form-item label="申请单编号" prop="stampName">
            <el-input v-model="addSealApplication.stampName" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col :xs="24" :sm="18" :md="12" :xl="6">
          <el-form-item label="用章人">
            <el-input v-model="addSealApplication.sealUser" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="18" :md="12" :xl="6">
          <el-form-item label="申请部门">
            <el-select v-model="addSealApplication.applyDepartment">
              <el-option v-for="item in applyDepartmentOptions" :key="item.value" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item label="印章名称" prop="stampName">
            <el-select v-model="addSealApplication.stampName">
              <el-option v-for="item in sealNameOptions" :key="item.key" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item label="用章日期" prop="useStampTime">
            <el-date-picker
              v-model="addSealApplication.useStampTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item label="文件份数" prop="fileNum">
            <el-input v-model="addSealApplication.fileNum" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
          </el-form-item>
        </el-col>
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item label="盖章次数" prop="sealNum">
            <el-input v-model="addSealApplication.sealNum" oninput="value=value.replace(/^\.+|[^\d.]/g,'')" />
          </el-form-item>
        </el-col>
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item label="是否外借" prop="lend">
            <el-select v-model="addSealApplication.lend">
              <el-option v-for="item in lendOptions" :key="item.value" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item label="发往单位(人)" prop="lendAddr">
            <el-input v-model="addSealApplication.lendAddr" />
          </el-form-item>
        </el-col>
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item v-if="addSealApplication.lend == 1" label="外借开始时间">
            <el-date-picker
              v-model="addSealApplication.lendStartTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item v-if="addSealApplication.lend == 1" label="外借归还时间">
            <el-date-picker
              v-model="addSealApplication.lendEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col :xs="32" :sm="16" :md="12" :xl="6">
          <el-form-item label="盖章文件名称">
            <ImageUpload
              v-model="addSealApplication.sealFile"
              :file-list="fileList"
              @handleRemove="handleRemove"
              @handleSuccess="handleUploadSuccess"
              @handleError="handleUploadError"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="32">
        <el-col>
          <el-form-item label="用章事由" prop="useStampReason">
            <el-input v-model="addSealApplication.useStampReason" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addSealApplication.remark" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div v-if="stampApplyData.isAdd == true" class="foot-button text-center mt-18">
      <el-button type="primary" @click="onsubmit">保存</el-button>
      <el-button @click="closeForm">返回</el-button>
    </div>
  </div>
</template>
<script>
import ImageUpload from '@/components/ImageUpload'
import { fetchApolloData } from '@/api/dict'
import { addStampList, fetchStampDetail } from '@/api/intergratedoffice'

export default {
  name: 'StampApplyForm',
  components: {
    ImageUpload
  },
  props: {
    stampApplyData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      fileList: [],
      isAdd: true,
      addSealApplication: {
        'stampUser': 11,
        'department': 11
      },
      lendOptions: [
        { value: 1, label: '是' },
        { value: 2, label: '否' }
      ],
      sealNameOptions: [],
      formRules: {
        stampName: [{ required: true, message: '请选择印章名称', trigger: 'blur' }],
        useStampTime: [{ required: true, message: '请选择用章时间', trigger: 'blur' }],
        fileNum: [{ required: true, message: '请填写文件份数', trigger: 'blur' }],
        sealNum: [{ required: true, message: '请填写盖章次数', trigger: 'blur' }],
        lend: [{ required: true, message: '请选择是否外借', trigger: 'blur' }],
        useStampReason: [{ required: true, message: '请填写用章事由', trigger: 'blur' }],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.selectStamp()
    this.fetchDetail()
  },
  methods: {
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
    closeForm() {
      const formvisi = false
      this.$emit('closeform', formvisi)
    },
    fetchDetail() {
      // this.isAdd = this.stampApplyData.isAdd
      // this.useStampApplyId = this.stampApplyData.useStampApplyId
      if (this.stampApplyData.isAdd === false) {
        fetchStampDetail(this.stampApplyData.useStampApplyId).then(res => {
          this.addSealApplication = res
        }, () => {})
      } else if (this.stampApplyData.isAdd === true) {
      //   this.addSealApplication = {}
      }
    },
    selectStamp() {
      fetchApolloData({ key: 'stampName' }).then(res => {
        this.sealNameOptions = res
      })
    },
    onsubmit() {
      this.$refs.addStampApply.validate((valid) => {
        if (valid) {
          addStampList(this.addSealApplication).then(() => {
            this.$message({ message: '添加成功', type: 'success' })
            this.$listeners.oSuccessCallback && this.$listeners.oSuccessCallback()
          }, () => {})
        }
      })
    },
    onCancel() {
      this.$listeners.onCancel && this.$listeners.onCancel()
    }
  }
}
</script>
