<template>
  <div class="reimbursement-approve-container">
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>基础信息</span>
      </div>
      <el-form
        ref="childForm"
        :model="approveInfo"
        :rules="approveRules"
        label-width="100px"
        :disabled="!editable"
      >

        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="审批类型：">
              <span>{{ approveDetail.businessTypeId&&approveDetail.businessTypeId.value }}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="项目类型：" prop="typeId">
              <el-select v-model="approveInfo.typeId" placeholder="请选择项目类型" :disabled="true">
                <el-option :value="1" label="项目" />
                <el-option :value="2" label="非项目" />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="报销详情：" prop="detail">
              <el-collapse v-if="approveInfo&&approveInfo.detail&&approveInfo.detail.length>0" v-model="activeNames">
                <el-collapse-item v-for="(item,index) in approveInfo.detail" :key="index" :name="index+1">
                  <template slot="title">
                    报销清单{{ index+1 }}
                    <span v-if="editable" class="ml-20 fz-20" @click.stop="onAdd(index)"><i class="el-icon-circle-plus-outline" /></span>
                    <span v-if="editable&&approveInfo&&approveInfo.detail&&approveInfo.detail.length>1" slot="reference" class="ml-20 fz-20">
                      <i class="el-icon-remove-outline" @click.stop="onDelete(index)" />
                    </span>
                  </template>
                  <el-row>
                    <el-col :xs="24" :sm="12" :md="8" :xl="6">
                      <el-form-item
                        label="报销金额："
                        :prop="`detail[${index}].amount`"
                        :rules="detailAmountRules"
                      >
                        <el-input
                          v-model="item.amount"
                          placeholder="请输入报销金额"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :xl="6">
                      <el-form-item
                        label="报销类型："
                        :prop="`detail[${index}].type`"
                        :rules="{ required: true, message: '请选择报销类型', trigger: 'blur' }"
                      >
                        <el-select v-model="item.type" placeholder="请选择报销类型">
                          <el-option
                            v-for="item1 in reimbursementTypeData"
                            :key="item1.key"
                            :label="item1.value"
                            :value="item1.key"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="报销备注：">
                        <el-input
                          v-model="item.remark"
                          placeholder="请输入报销备注"
                          type="textarea"
                          :rows="2"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <el-button v-else type="text" @click="onAdd">新增</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="总金额：" prop="totalAmount">
              <span>{{ approveInfo.totalAmount | toThousandFilter }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="外部收款：" prop="externalCollection">
              <el-select v-model="approveInfo.externalCollection" placeholder="请选择是否外部收款">
                <el-option :value="1" label="是" />
                <el-option :value="2" label="否" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-divider content-position="left">{{ approveInfo.externalCollection===2?'内部':'外部' }}收款信息</el-divider>
        </el-row>
        <el-row v-if="approveInfo.externalCollection===1">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="收款单位：" prop="payee">
              <el-input
                v-model="approveInfo.payee"
                placeholder="请输入收款单位"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系人：" prop="contacts">
              <el-input
                v-model="approveInfo.contacts"
                placeholder="请输入联系人"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="联系电话：" prop="contactNumber">
              <el-input
                v-model="approveInfo.contactNumber"
                placeholder="请输入联系电话"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="收款账户：" prop="collectionAccount">
              <el-input
                v-model="approveInfo.collectionAccount"
                placeholder="请输入收款账户"
              />
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="开户行：" prop="bankName">
              <el-input
                v-model="approveInfo.bankName"
                placeholder="请输入开户行"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="银行账号：" prop="bankAccount">
              <el-input
                v-model="approveInfo.bankAccount"
                placeholder="请输入银行账号"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row v-if="approveInfo.externalCollection===2">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="收款账号：" prop="collectionAccount">
              <el-input
                v-model="approveInfo.collectionAccount"
                placeholder="请选择收款账号"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="备注：" prop="remark">
              <el-input
                v-model="approveInfo.remark"
                placeholder="请输入备注"
                type="textarea"
                :rows="2"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="电子发票：" prop="invoice">
              <ImageUpload
                :is-single="!editable"
                :disabled="!editable"
                :file-list="approveInfo.invoice"
                @handleRemove="handleRemove('invoice',...arguments)"
                @handleSuccess="handleUploadSuccess('invoice',...arguments)"
                @handleError="handleUploadError('invoice',...arguments)"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col>
            <el-form-item label="图片：" prop="image" />
          </el-col>
        </el-row> -->

        <el-row>
          <el-col>
            <el-form-item label="附件：" prop="accessory">
              <Upload
                :file-list="approveInfo.accessory"
                @handleRemove="handleRemove('accessory',...arguments)"
                @handleSuccess="handleUploadSuccess('accessory',...arguments)"
                @handleError="handleUploadError('accessory',...arguments)"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>

const emptyItem = {
  type: '',
  amount: '',
  remark: ''
}

import { fetchReimbursementDetail } from '@/api/approve'
import { fetchApolloData } from '@/api/dict'
import ImageUpload from '@/components/ImageUpload'
import Upload from '@/components/Upload'
import { mapGetters } from 'vuex'
import { getFileName } from '@/utils'
import { validateMoney } from '@/utils/validateForm'
export default {
  name: 'ReimbursementApproveInfo',
  components: { ImageUpload, Upload },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    businessId: {
      type: Number,
      default: 0
    },
    approveDetail: {
      type: Object,
      default: () => {}
    }
  },
  data: function() {
    return {
      approveInfo: {
        accessory: []
      },
      activeNames: ['1'],
      approveRules: {
        payee: [{ required: true, message: '请输入收款单位', trigger: 'blur' }],
        contacts: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactNumber: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        collectionAccount: [{ required: true, message: '请输入收款账户', trigger: 'blur' }],
        bankName: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }],
        invoice: [{ required: true, message: '请上传电子发票', trigger: 'blur' }]
      },
      reimbursementTypeData: [],
      detailAmountRules: [
        { required: true, message: '请输入报销金额', trigger: 'blur' },
        { validator: validateMoney, trigger: 'blur' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'sysConfig'
    ])
  },
  watch: {
    'approveInfo.detail': {
      handler(val) {
        if (val && Array.isArray(val)) {
          this.approveInfo.totalAmount = val.reduce((total, v) => total + Number(v.amount || 0), 0)
        } else {
          this.approveInfo.totalAmount = 0
        }
      },
      deep: true
    }
  },
  created() {
    this.getReimbursementTypeData() // 获取报销类型下拉数据
    this.fetchData()
  },
  methods: {
    // 获取行业信息
    getReimbursementTypeData() {
      fetchApolloData({ key: 'reimbursementApplyDetailType' }).then(res => {
        if (res) {
          this.reimbursementTypeData = res
        }
      })
    },
    fetchData() {
      if (this.businessId) {
        fetchReimbursementDetail(this.businessId).then(res => {
          if (res) {
            this.approveInfo = {
              typeId: res.typeId,
              projectId: res.projectId,
              collectionAccount: res.collectionAccount,
              totalAmount: res.totalAmount,
              externalCollection: res.externalCollection,
              payee: res.payee,
              contactNumber: res.contactNumber,
              contacts: res.contacts,
              bankName: res.bankName,
              bankAccount: res.bankAccount,
              remark: res.remark,
              businessTripApplyId: res.businessTripApplyId,
              image: res.image,
              detail: [
                {
                  amount: 1.1,
                  type: 1,
                  remark: '备注1'
                }
              ]
            }

            this.approveInfo.detail = (res.detail || []).map(v => {
              return {
                amount: v.amount,
                type: v.type.reimbursementApplyDetailTypeId,
                remark: v.remark
              }
            })
            if (this.sysConfig && this.sysConfig.filepath) {
              const _accessory = [
                {
                  name: getFileName(res.accessory),
                  url: this.sysConfig.filepath + res.accessory,
                  uid: new Date().getTime(),
                  path: res.accessory
                }
              ]
              const _invoice = (res.invoice).map((v, index) => {
                return {
                  name: getFileName(v),
                  url: this.sysConfig.filepath + v,
                  uid: new Date().getTime() + index,
                  path: v
                }
              })
              this.$set(this.approveInfo, 'accessory', _accessory)
              this.$set(this.approveInfo, 'invoice', _invoice)
            }
          } else {
            this.approveInfo = {}
          }
        })
      }
    },

    onAdd(index) {
      const _empty = this.$deepcopy({}, emptyItem)
      if (this.approveInfo && this.approveInfo.detail && this.approveInfo.detail.length > 0) {
        this.approveInfo.detail.push(_empty)
      } else {
        this.$set(this.approveInfo, 'detail', [_empty])
      }
    },

    onDelete(index) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.approveInfo.detail.splice(index, 1)
      }).catch(() => {})
    },

    handleRemove(type, file, fileList) {
      this.approveInfo[type] = this.approveInfo[type].filter(v => v && v.uid !== file.uid)
      // this.$forceUpdate()
    },

    handleUploadError(type, err, file, fileList) {
      console.log(err)
    },

    handleUploadSuccess(type, response, file, fileList) {
      file.raw.path = response.data[0]
      if (this.sysConfig && this.sysConfig.filepath) {
        file.raw.url = this.sysConfig.filepath + file.raw.path
      }
      if (this.approveInfo && this.approveInfo[type] && Array.isArray(this.approveInfo[type])) {
        this.approveInfo[type].push(file.raw)
      } else {
        this.$set(this.approveInfo, type, [file.raw])
      }
    },

    // 在父组件被调用
    beforeSubmit() {
      const _approveInfo = this.$deepcopy({}, this.approveInfo)
      const _accessory = _approveInfo.accessory || []
      const _invoice = _approveInfo.invoice || []
      _approveInfo.accessory = ''
      _approveInfo.invoice = []
      if (_accessory && Array.isArray(_accessory) && _accessory.length > 0) {
        _approveInfo.accessory = _accessory[0].path
      }
      if (_invoice && Array.isArray(_invoice) && _invoice.length > 0) {
        _approveInfo.invoice = _invoice.map(v => v && v.path)
      }
      return _approveInfo
    }
  }
}
</script>

<style lang='scss' scope>
 .reimbursement-approve-container{
    .el-textarea.is-disabled .el-textarea__inner,.el-input.is-disabled .el-input__inner{
       /* background-color: #fff; */
       /* border: none; */
       color: #333;
       /* padding-left:0px; */
       font-size: 14px;
       /* cursor: text; */
    }

    .el-input__suffix{
      display: none;
    }

    .el-collapse-item__header{
      span{
        display: none;
      }

      &:hover{
        span{
          display: flex;

          &:hover{
            color:#5cb6ff;
          }
        }
      }
    }
 }
</style>
