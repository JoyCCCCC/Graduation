<template>
  <div>
    <el-form
      ref="tenderForm"
      :model="tenderForm"
      :rules="tenderRules"
      label-width="148px"
      :disabled="isDisabled"
    >
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>招标信息</span>
        </div>

        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标文件项目编号" prop="bidFileProjectNum">
              <el-input
                v-model="tenderForm.bidFileProjectNum"
                placeholder="请输入招标文件项目编号"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标文件项目名称" prop="bidFileProjectName">
              <el-input
                v-model="tenderForm.bidFileProjectName"
                placeholder="请输入招标文件项目名称"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="合同包号" prop="concordatPackageNum">
              <el-input
                v-model="tenderForm.concordatPackageNum"
                placeholder="请输入合同包号"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="交付地点" prop="deliveryLocation">
              <el-input
                v-model="tenderForm.deliveryLocation"
                placeholder="请输入交付地点"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="数量" prop="quantity">
              <el-input
                v-model="tenderForm.quantity"
                placeholder="请输入数量"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="交货期" prop="deliveryDate">
              <el-date-picker
                v-model="tenderForm.deliveryDate"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择交货期"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>采购人/招标单位的基本信息</span>
        </div>
        <!-- <el-form
        ref="tenderForm"
        :model="tenderForm"
        label-width="125px"
        size="small"
        :disabled="isDisabled"
      > -->
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="采购人" prop="puchaser">
              <el-input
                v-model="tenderForm.puchaser"
                placeholder="请输入采购人"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="地址" prop="address">
              <el-input v-model="tenderForm.address" placeholder="请输入地址" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="项目联系人" prop="projectContracter">
              <el-input
                v-model="tenderForm.projectContracter"
                placeholder="请输入项目联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系电话" prop="connectPhone">
              <el-input
                v-model="tenderForm.connectPhone"
                placeholder="请输入联系电话"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- </el-form> -->
      </el-card>
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>招标代理机构基本信息</span>
        </div>
        <!-- <el-form
        ref="tenderForm"
        :model="tenderForm"
        label-width="125px"
        size="small"
        :disabled="isDisabled"
      > -->
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标代理机构公司" prop="bidAgencyCompany">
              <el-input
                v-model="tenderForm.bidAgencyCompany"
                placeholder="请输入招标代理机构公司"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="地址" prop="bidAgencyAddress">
              <el-input
                v-model="tenderForm.bidAgencyAddress"
                placeholder="请输入地址"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="项目联系人" prop="bidAgencyProjectContracter">
              <el-input
                v-model="tenderForm.bidAgencyProjectContracter"
                placeholder="请输入项目联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系电话" prop="bidAgencyConnectPhone">
              <el-input
                v-model="tenderForm.bidAgencyConnectPhone"
                placeholder="请输入联系电话"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标文件发售时间" prop="bidFileSaleTime">
              <el-date-picker
                v-model="tenderForm.bidFileSaleTime"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择招标文件发售时间"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标文件发售地点" prop="bidFileSaleAddress">
              <el-input
                v-model="tenderForm.bidFileSaleAddress"
                placeholder="请输入招标文件发售地点"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标文件价格" prop="bidFilePrice">
              <el-input
                v-model="tenderForm.bidFilePrice"
                placeholder="请输入招标文件价格"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标文件购买方式" prop="bidFilePurchaseWay">
              <el-input
                v-model="tenderForm.bidFilePurchaseWay"
                placeholder="请输入招标文件购买方式"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <!-- <el-form-item label="招标文件发布公告媒介网站"> -->
            <el-form-item label="招标文件发布公告" prop="bidFileReleaseWebsite">
              <el-input
                v-model="tenderForm.bidFileReleaseWebsite"
                placeholder="请输入招标文件发布公告"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="投标人资格要求" prop="qualityRequire">
              <el-input
                v-model="tenderForm.qualityRequire"
                placeholder="请输入投标人资格要求"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item
              label="主要技术及服务要求"
              prop="mainTechnologyServiceRequire"
            >
              <el-input
                v-model="tenderForm.mainTechnologyServiceRequire"
                placeholder="请输入主要技术及服务要求"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="投标有效期" prop="tenderValidPeriod">
              <el-input
                v-model="tenderForm.tenderValidPeriod"
                placeholder="请输入投标有效期"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item
              label="投标文件递交地址"
              prop="tenderFileSubmitAddress"
            >
              <el-input
                v-model="tenderForm.tenderFileSubmitAddress"
                placeholder="请输入投标文件递交地址"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="投标文件接收人" prop="tenderFileReceiver">
              <el-input
                v-model="tenderForm.tenderFileReceiver"
                placeholder="请输入投标文件接收人"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="投标截止时间" prop="tenderDeadline">
              <el-date-picker
                v-model="tenderForm.tenderDeadline"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择投标截止时间"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="投标保证金金额" prop="tenferMarginAmount">
              <el-input
                v-model="tenderForm.tenferMarginAmount"
                placeholder="请输入投标保证金金额"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- </el-form> -->
      </el-card>
      <el-card class="mb-18">
        <div slot="header" class="clearfix">
          <i class="bar" />
          <span>购买招标文件及保证金金额缴齐帐户</span>
        </div>
        <!-- <el-form
        ref="tenderForm"
        :model="tenderForm"
        label-width="125px"
        size="small"
        :disabled="isDisabled"
      > -->
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="开户名称" prop="accountName">
              <el-input
                v-model="tenderForm.accountName"
                placeholder="请输入开户名称"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="账号" prop="account">
              <el-input v-model="tenderForm.account" placeholder="请输入账号" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="开户行" prop="accountBank">
              <el-input
                v-model="tenderForm.accountBank"
                placeholder="请输入开户行"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="退还保证金手续" prop="returnMarginProcedure">
              <el-input
                v-model="tenderForm.returnMarginProcedure"
                placeholder="请输入退还保证金手续"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="开标时间" prop="bidOpenTime">
              <el-date-picker
                v-model="tenderForm.bidOpenTime"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择开标时间"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="开标地点" prop="bidOpenAddress">
              <el-input
                v-model="tenderForm.bidOpenAddress"
                placeholder="请输入开标地点"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标公告期限" prop="bidAnnouncementPeriod">
              <!-- <el-date-picker v-model="tenderForm.bidAnnouncementPeriod" /> -->
              <el-date-picker
                v-model="tenderForm.bidAnnouncementPeriod"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择招标公告期限"
              />
              <!-- <el-input v-model="tenderForm.bidAnnouncementPeriod" /> -->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="结果公告期限" prop="resultAnnouncementPeriod">
              <!-- <el-date-picker v-model="tenderForm.resultAnnouncementPeriod" /> -->
              <el-date-picker
                v-model="tenderForm.resultAnnouncementPeriod"
                type="date"

                value-format="yyyy-MM-dd"
                placeholder="请选择结果公告期限"
              />
              <!-- <el-input v-model="tenderForm.resultAnnouncementPeriod" /> -->
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="评标标准和方法" prop="scoreStandardWay">
              <el-input
                v-model="tenderForm.scoreStandardWay"
                placeholder="请输入评标标准和方法"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="交付时间和地点" prop="deliveryTimeAndPlace">
              <el-input
                v-model="tenderForm.deliveryTimeAndPlace"
                placeholder="请输入交付时间和地点"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="交付方法" prop="consignWay">
              <el-input
                v-model="tenderForm.consignWay"
                placeholder="请输入交付方法"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="最高单价限价" prop="maxUnitPriceLimit">
              <el-input
                v-model="tenderForm.maxUnitPriceLimit"
                placeholder="请输入最高单价限价"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标代理收费标准" prop="bidAgencyCharge">
              <el-input
                v-model="tenderForm.bidAgencyCharge"
                placeholder="请输入招标代理收费标准"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="招标代理缴纳方式" prop="bidAgencyPayWay">
              <el-input
                v-model="tenderForm.bidAgencyPayWay"
                placeholder="请输入招标代理缴纳方式"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="召开答疑会" prop="answerMeeting">
              <el-select v-model="tenderForm.answerMeeting">
                <el-option
                  v-for="item in MeetingOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="评分标准和方法">
              <el-input v-model="tenderForm.scoreStandardWay" type="textarea" />
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item
              label="投标人资格要求及提交资格文件内容"
              prop="qualityRequireFile"
            >
              <el-input
                v-model="tenderForm.qualityRequireFile"
                type="textarea"
                placeholder="请输入投标人资格要求及提交资格文件内容"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="备注">
              <el-input
                v-model="tenderForm.remark"
                type="textarea"
                placeholder="请输入备注"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <!-- accessory -->
            <el-form-item label="附件">
              <Upload
                :file-list="fileList"
                @handleRemove="handleRemove"
                @handleSuccess="handleUploadSuccess"
                @handleError="handleUploadError"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- </el-form> -->
        <div v-if="!isDisabled" class="foot-button text-center t-line pt-18">
          <el-button type="primary" :loading="loading" @click="onSave">保存</el-button>
          <el-button @click="onCancel">取消</el-button>
        </div>
      </el-card>
    </el-form>
    <el-card v-if="tenderForm.projectId" class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>产品清单</span>
      </div>
      <!-- <ProductList :is-disabled="isDisabled" /> -->
      <ProductList
        :parent-props="parentProps"
        :is-disabled="isDisabled"
      />
    </el-card>
  </div>
</template>

<script>
import ProductList from './product/ProductList'
import { tender, fetchTenderDetail } from '@/api/project'
import Upload from '@/components/Upload'
import { validateQuantity, validateMoney } from '@/utils/validateForm'
import { mapGetters } from 'vuex'
import props from '../mixins/props'
import { getFileName } from '@/utils'
export default {
  name: 'AssistTender',
  components: {
    ProductList, Upload
  },
  mixins: [props],
  data: function() {
    return {
      tenderForm: {},
      tenderRules: {
        // 招标信息
        bidFileProjectNum: [
          { required: true, message: '请输入招标文件项目编号', trigger: 'blur' }
        ],
        bidFileProjectName: [
          { required: true, message: '请输入招标文件项目名称', trigger: 'blur' }
        ],
        concordatPackageNum: [
          { required: true, message: '请输入合同包号', trigger: 'blur' }
        ],
        deliveryLocation: [
          { required: true, message: '请输入交付地点', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { validator: validateQuantity, trigger: 'blur' }
        ],
        deliveryDate: [
          { required: true, message: '请选择交货期', trigger: 'blur' }
        ],
        // 采购人/招标单位的基本信息
        puchaser: [
          { required: true, message: '请输入采购人', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        projectContracter: [
          { required: true, message: '请输入项目联系人', trigger: 'blur' }
        ],
        connectPhone: [
          { required: true, message: '请输入项目电话', trigger: 'blur' }
        ],
        // 招标代理机构基本信息
        bidAgencyCompany: [
          { required: true, message: '请输入招标代理机构公司', trigger: 'blur' }
        ],
        bidAgencyAddress: [
          { required: true, message: '请输入招标代理机构地址', trigger: 'blur' }
        ],
        bidAgencyProjectContracter: [
          { required: true, message: '请输入招标代理机构项目联系人', trigger: 'blur' }
        ],
        bidAgencyConnectPhone: [
          { required: true, message: '请输入招标代理机构联系电话', trigger: 'blur' }
        ],
        bidFileSaleTime: [
          { required: true, message: '请选择招标文件发售时间', trigger: 'blur' }
        ],
        bidFileSaleAddress: [
          { required: true, message: '请输入招标文件发售地点', trigger: 'blur' }
        ],
        bidFilePrice: [
          { required: true, message: '请输入招标文件价格', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ],
        bidFilePurchaseWay: [
          { required: true, message: '请输入招标文件购买方式', trigger: 'blur' }
        ],
        bidFileReleaseWebsite: [
          { required: true, message: '请输入招标文件发布公告媒介网站', trigger: 'blur' }
        ],
        qualityRequire: [
          { required: true, message: '请输入投标人资格要求', trigger: 'blur' }
        ],
        mainTechnologyServiceRequire: [
          { required: true, message: '请输入主要技术及服务要求', trigger: 'blur' }
        ],
        tenderValidPeriod: [
          { required: true, message: '请选择投标有效期', trigger: 'blur' }
        ],
        tenderFileSubmitAddress: [
          { required: true, message: '请输入投标文件递交地址', trigger: 'blur' }
        ],
        tenderFileReceiver: [
          { required: true, message: '请输入投标文件接收人', trigger: 'blur' }
        ],
        tenderDeadline: [
          { required: true, message: '请选择投标截止日期', trigger: 'blur' }
        ],
        tenferMarginAmount: [
          { required: true, message: '请输入投标保证金额', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ],
        // 购买招标文件及保证金金额缴齐帐户
        accountName: [
          { required: true, message: '请输入开户名称', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入银行账号', trigger: 'blur' }
        ],
        accountBank: [
          { required: true, message: '请输入开户行', trigger: 'blur' }
        ],
        returnMarginProcedure: [
          { required: true, message: '请输入退还保证金手续', trigger: 'blur' }
        ],
        bidOpenTime: [
          { required: true, message: '请选择开标时间', trigger: 'blur' }
        ],
        bidOpenAddress: [
          { required: true, message: '请输入开标地点', trigger: 'blur' }
        ],
        bidAnnouncementPeriod: [
          { required: true, message: '请选择招标公告期限', trigger: 'blur' }
        ],
        resultAnnouncementPeriod: [
          { required: true, message: '请选择结果公告期限', trigger: 'blur' }
        ],
        scoreStandardWay: [
          { required: true, message: '请输入评标标准和方法', trigger: 'blur' }
        ],
        deliveryTimeAndPlace: [
          { required: true, message: '请输入交付时间和地点', trigger: 'blur' }
        ],
        consignWay: [
          { required: true, message: '请输入交付方式', trigger: 'blur' }
        ],
        maxUnitPriceLimit: [
          { required: true, message: '请输入最高单价限价', trigger: 'blur' },
          { validator: validateMoney, trigger: 'blur' }
        ],
        bidAgencyCharge: [
          { required: true, message: '请输入招标代理服务费收费标准', trigger: 'blur' }
        ],
        bidAgencyPayWay: [
          { required: true, message: '请输入招标代理服务费交纳方式', trigger: 'blur' }
        ],
        answerMeeting: [
          { required: true, message: '请选择是否召开答疑会', trigger: 'blur' }
        ],
        qualityRequireFile: [
          { required: true, message: '请输入投标人的资格要求及提交资格证明文件内容', trigger: 'blur' }
        ]
      },
      MeetingOptions: [{
        value: true, label: '是'
      }, {
        value: false, label: '否'
      }],
      projectId: this.parentProps.projectId,
      params: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      fileList: []
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
      if (this.projectId) {
        fetchTenderDetail(this.projectId).then(res => {
        // 已有投标数据
          if (res) {
            this.tenderForm = res
            if (res && res.accessory && this.sysConfig && this.sysConfig.filepath) {
              const _file = {
                name: getFileName(res.accessory),
                url: this.sysConfig.filepath + res.accessory,
                uid: new Date().getTime()
              }
              this.fileList.push(_file)
            }
          } else {
            this.tenderForm = {}
          }
        })
      }
    },

    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(v => v && v.uid !== file.uid)
    },

    handleUploadError(err, file, fileList) {
      console.log(err)
    },

    handleUploadSuccess(response, file, fileList) {
      file.raw.path = response.data[0]
      file.raw.url = this.sysConfig.filepath + file.raw.path
      // const _file = {
      //   ...file.raw
      //   // path: response.data[0]
      // }
      this.fileList.push(file.raw)
    },

    onSave() {
      // console.log(this.tenderForm)
      this.$refs.tenderForm.validate(valid => {
        if (valid) {
          const body = {
            ...this.tenderForm,
            accessory: ''
          }
          if (this.fileList && this.fileList.length > 0) {
            body.accessory = this.fileList[0].path
          }
          tender(body, this.projectId).then(res => {
            console.log(res, 'ressss')
            this.fetchData()
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
