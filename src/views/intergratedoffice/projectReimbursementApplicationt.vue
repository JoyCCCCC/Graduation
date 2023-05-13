<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          新增项目报销申请
        </span>
      </div>
      <div>
        <el-form ref="apply" size="small" label-width="80px" :model="apply" :disable="isADD">
          <el-row :gutter="32">
            <el-col :xs="24" :sm="6" :md="12" :xl="6">
              <el-form-item label="项目" prop="type">
                <el-select v-model="apply.type">
                  <el-option :value="1" label="项目" />
                  <el-option :value="2" label="非项目" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="12" :xl="6">
              <el-form-item label="剩余余额">
                <el-input v-model="apply.yue" />
              </el-form-item>
            </el-col>
          </el-row>
          <div v-for="(formitem,index) in apply.detail" :key="index">
            <el-row :model="apply.detail[index]" :gutter="32">
              <el-col :span="24">
                <el-button type="text" style="float:right" @click="handeldelete(index)">删除</el-button>
                <div> <el-button type="text" style="float:right;margin-left:50px;" @click="add">添加</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="32">
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="报销金额" :prop="`detail[${index}].amount`">
                  <el-input v-model="apply.amount" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="报销明细" :prop="`detail[${index}].mingxi`">
                  <el-input v-model="apply.mingxi" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :xl="6">
                <el-form-item label="备注" :prop="`detail[${index}].remark`">
                  <el-input v-model="apply.remark" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="总金额" prop="totalAmount">
                <el-input v-model="apply.detail.totalAmount" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="收款账号">
                <el-select v-model="apply.detail.bankAccount">
                  <el-option :value="1" label="123456" />

                  <el-option :value="2" label="123" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="备注">
                <el-input v-model="apply.detail.remark" type="textarea" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            label="电子发票"
            prop="invoice"
          >
            <ImageUpload

              :file-list="fileList"
              @on-remove="handleRemove"
              @handleSuccess="handleUploadSuccess"
              @handleError="handleUploadError"
            />
          </el-form-item>
          <el-form-item label="附件" prop="accessory" :rules="{ required: true, message: '请上传附件', trigger: 'blur' }">
            <Upload

              :file-list="fileList2"
              @on-remove="handleRemove"
              @handleSuccess="handleUploadSuccess"
              @handleError="handleUploadError"
            />

          </el-form-item>
          <div class="text-center">
            <el-button size="small" @click="$router.push('/intergratedoffice/reimbursementList')">
              关 闭
            </el-button>
            <el-button type="primary" size="small" @click="saveProjectForm">
              保 存
            </el-button>
          </div>

        </el-form>

      </div>
    </el-card>
  </div>
</template>
<script>
// reimbursementForm
import ImageUpload from '@/components/ImageUpload'
import { apply } from '@/api/ActivityForm'
import Upload from '@/components/Upload'
import { reimbursementForm } from '@/api/intergratedoffice2'
export default {
  components: {
    ImageUpload, Upload
  },
  data() {
    return {

      apply: {
        'typeId': 1,
        'projectId': 1,
        'collectionAccount': '收款账户',
        'totalAmount': 1.1,
        'externalCollection': 2,
        'payee': '收款单位',
        'contactNumber': '联系电话',
        'contacts': '联系人',

        'businessTripApplyId': 1,
        'invoice': [
          // '/20210706//5794313d-be86-47c8-b51d-5efed767ef3d.docx',
          // '/20210706//5794313d-be86-47c8-b51d-5efed767ef3d.docx'
        ],
        'image': '图片',
        'accessory': '附件',
        'detail': [
          {
            'amount': '',
            'type': 1,
            'remark': '备注1'
          },
          {
            'amount': 2.2,
            'type': 2,
            'remark': '备注2'
          }
        ]

      },
      fileList: [],
      fileList2: [],
      isADD: {

      }
    }
  },
  created() {

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
      file.raw.url = file.url
      // const _file = {
      //   ...file.raw
      //   // path: response.data[0]
      // }
      this.fileList.push(file.raw)
    },
    handeldelete(index) {
      this.apply.detail.splice(index, 1)
    },
    add() {
      this.apply.detail.push({})
    },
    saveProjectForm() {
      console.log(this.apply)
      console.log(this.$refs)
      this.$refs.apply.validate((valid) => {
        if (valid) {
          const body = {
            ...this.apply,
            invoice: this.apply.invoice.map(v => {
              return v.path
            }),

            accessory: this.apply.accessory[0].path

          }
          apply(body).then(res => {
            console.log(res)
          })
        }
      })
    },
    reimbursementForm() {
      const reimbursementApplyId = this.$route.query.reimbursementApplyId

      reimbursementForm(reimbursementApplyId).then(res => {
        this.apply = res
      })
    }

    // saveProjectForm() {
    //   console.log(this.apply)
    //   apply(this.apply).then(() => {

    //   }, () => {})
    // }

  }
}

</script>
