<template>
  <div>
    <el-card class="mb-18 pb-0">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>协助中标录入信息</span>
      </div>
      <el-form ref="bidForm" :rules="bidRules" :model="bidForm" label-width="204px" :disabled="isDisabled">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="中标人：" prop="winningBidUserName">
              <el-input v-model="bidForm.winningBidUserName" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="中标时间：" prop="winningTime">
              <el-date-picker
                v-model="bidForm.winningTime"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择中标时间"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="通知书领取时间：" prop="noticeCollectionTime">
              <el-date-picker
                v-model="bidForm.noticeCollectionTime"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择通知书领取时间"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="代理服务费：" prop="agencyServiceAmount">
              <el-input v-model="bidForm.agencyServiceAmount" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="业务交底：" prop="businessDisclosure">
              <el-input v-model="bidForm.businessDisclosure" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="技术交底：" prop="technicalDisclosure">
              <el-input v-model="bidForm.technicalDisclosure" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="中标公告链接：" class="mb-16" prop="winningBidNoticeLink">
              <el-input v-model="bidForm.winningBidNoticeLink" />
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="已消费金额">
              <el-input v-model="bidForm.sales" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="预估毛利">
              <el-input v-model="bidForm.estimatedGrossProfit" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="预估毛利率" class="mr-0">
              <el-input v-model="bidForm.estimatedGrossMargin" />
            </el-form-item>
          </el-col> -->
          <!-- </el-row>
        <el-row :gutter="32"> -->
        </el-row>

        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="中标通知书：" prop="winningBidAdviceNote">
              <Upload
                :file-list="bidForm.winningBidAdviceNote"
                @handleRemove="handleRemove('winningBidAdviceNote',...arguments)"
                @handleSuccess="handleUploadSuccess('winningBidAdviceNote',...arguments)"
                @handleError="handleUploadError('winningBidAdviceNote',...arguments)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标文件：" prop="tenderDocuments">
              <Upload
                :file-list="bidForm.tenderDocuments"
                @handleRemove="handleRemove('tenderDocuments',...arguments)"
                @handleSuccess="handleUploadSuccess('tenderDocuments',...arguments)"
                @handleError="handleUploadError('tenderDocuments',...arguments)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="投标文件：" prop="biddingDocuments">
              <Upload
                :file-list="bidForm.biddingDocuments"
                @handleRemove="handleRemove('biddingDocuments',...arguments)"
                @handleSuccess="handleUploadSuccess('biddingDocuments',...arguments)"
                @handleError="handleUploadError('biddingDocuments',...arguments)"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="32">
          <el-col>
            <el-form-item label="中标公告截图（需含网址）：" prop="winningBidNoticeImg">
              <ImageUpload
                :file-list="bidForm.winningBidNoticeImg"
                @handleRemove="handleRemove('winningBidNoticeImg',...arguments)"
                @handleSuccess="handleUploadSuccess('winningBidNoticeImg',...arguments)"
                @handleError="handleUploadError('winningBidNoticeImg',...arguments)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同" label-width="280px">
              <Upload
                :file-list="fileList"
                :on-remove="handleRemove"
                @handleSuccess="handleUploadSuccess"
                @handleError="handleUploadError"
              />
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div v-if="!isDisabled" class="foot-button text-center t-line ptb-18">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import {
  bidApply, bidDetail
} from '@/api/project'
import { validateMoney } from '@/utils/validateForm'
import ImageUpload from '@/components/ImageUpload'
import Upload from '@/components/Upload'
import props from '../mixins/props'
import { mapGetters } from 'vuex'
import { getFileName } from '@/utils'
export default {
  components: {
    ImageUpload, Upload
  },
  mixins: [props],
  data() {
    return {
      imageUrl: '',
      list: null,
      listLoading: true,
      projectId: this.parentProps.projectId,
      bidForm: {},
      bidRules: {
        winningBidUserName: [
          { required: true, message: '请输入中标人', trigger: 'blur' }
        ],
        winningTime: [
          { required: true, message: '请选择中标时间', trigger: 'blur' }
        ],
        noticeCollectionTime: [
          { required: true, message: '请选择通知书领取时间', trigger: 'blur' }
        ],
        winningBidNoticeLink: [
          { required: true, message: '请输入中标公告链接', trigger: 'blur' }
        ],
        businessDisclosure: [
          { required: true, message: '请输入业务交底', trigger: 'blur' }
        ],
        technicalDisclosure: [
          { required: true, message: '请输入技术交底', trigger: 'blur' }
        ],
        agencyServiceAmount: [
          { required: true, message: '请输入代理服务费', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ],
        winningBidAdviceNote: [
          { required: true, message: '请上传中标通知书', trigger: 'blur' }
        ],
        tenderDocuments: [
          { required: true, message: '请上传招标文件', trigger: 'blur' }
        ],
        biddingDocuments: [
          { required: true, message: '请上传投标文件', trigger: 'blur' }
        ],
        winningBidNoticeImg: [
          { required: true, message: '请上传中标公告截图', trigger: 'blur' }
        ]

      }
    }
  },
  computed: {
    ...mapGetters([
      'sysConfig', 'loading'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      bidDetail(this.projectId).then(res => {
        if (res) {
          this.bidForm = res
          if (this.sysConfig && this.sysConfig.filepath) {
            this.bidForm.winningBidNoticeImg = [
              {
                url: this.sysConfig.filepath + res.winningBidNoticeImg,
                name: getFileName(res.winningBidNoticeImg),
                uid: new Date().getTime()
              }] || []
            this.bidForm.tenderDocuments = [
              {
                url: this.sysConfig.filepath + res.tenderDocuments,
                name: getFileName(res.tenderDocuments),
                uid: new Date().getTime()
              }] || []
            this.bidForm.biddingDocuments = [
              {
                url: this.sysConfig.filepath + res.biddingDocuments,
                name: getFileName(res.biddingDocuments),
                uid: new Date().getTime()
              }] || []
            this.bidForm.winningBidAdviceNote = [
              {
                url: this.sysConfig.filepath + res.winningBidAdviceNote,
                name: getFileName(res.winningBidAdviceNote),
                uid: new Date().getTime()
              }] || []
          }
        } else {
          this.bidForm = {}
        }
      })
    },

    handleRemove(type, file, fileList) {
      // console.log(type)
      // console.log(file)
      // console.log(this.bidForm[type])
      this.bidForm[type] = this.bidForm[type].filter(v => v && v.uid !== file.uid)
    },

    handleUploadSuccess(type, response, file, fileList) {
      // console.log(file, 'filefile')
      file.raw.path = response.data[0]
      file.raw.url = this.sysConfig.filepath + file.raw.path
      if (this.bidForm && this.bidForm[type] && Array.isArray(this.bidForm[type])) {
        this.bidForm[type].push(file.raw)
      } else {
        this.$set(this.bidForm, type, [file.raw])
      }
    },
    handleUploadError(type, err, file, fileList) {
      console.log(err)
    },

    onSave() {
      console.log(this.bidForm, 'bidFormbidForm')
      this.$refs.bidForm.validate(valid => {
        if (valid) {
          const body = {
            ...this.bidForm,
            winningBidNoticeImg: this.bidForm.winningBidNoticeImg[0].path,
            tenderDocuments: this.bidForm.tenderDocuments[0].path,
            biddingDocuments: this.bidForm.biddingDocuments[0].path,
            winningBidAdviceNote: this.bidForm.winningBidAdviceNote[0].path
          }
          bidApply(body, this.projectId).then(res => {
            console.log(res, 'ressss')
            // this.fetchData()
            // this.$listeners.onBack && this.$listeners.onBack()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onCancel() {
      this.$listeners.onBack && this.$listeners.onBack()
    }
  }
}
</script>

