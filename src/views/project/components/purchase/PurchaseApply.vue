<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购申请</span>
      </div>
      <el-form
        ref="purchaseForm"
        :rules="purchaseRule"
        :disabled="isDisabled"
        :model="purchaseForm"
        label-width="110px"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请主题" prop="title">
              <el-input v-model="purchaseForm.title" placeholder="请输入申请主题" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="是否外包" prop="outsource">
              <el-select
                v-model="purchaseForm.outsource"
                placeholder="请选择是否外包"
              >
                <el-option label="是" :value="1" />
                <el-option label="否" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="产品类型" prop="productTypeId">
              <el-select
                v-model="purchaseForm.productTypeId"
                placeholder="请选择软硬件"
              >
                <el-option label="硬件" :value="1" />
                <el-option label="软件" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请说明" prop="remark">
              <el-input v-model="purchaseForm.remark" placeholder="请输入申请说明" />
            </el-form-item>
          </el-col>
          <template>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="清单类型" prop="purchaseTypeId">
                <el-select
                  v-model="purchaseForm.purchaseTypeId"
                  placeholder="请选择清单类型"
                >
                  <el-option label="合同内" :value="1" />
                  <el-option label="合同外" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="收货人" prop="consignee">
                <el-input v-model="purchaseForm.consignee" placeholder="请输入收货人" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="收货地址" prop="receivingAddress">
                <el-input v-model="purchaseForm.receivingAddress" placeholder="请输入收货地址" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="联系电话" prop="contactNumber">
                <el-input v-model="purchaseForm.contactNumber" placeholder="请输入联系电话" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="所属区域" prop="area">
                <el-input v-model="purchaseForm.area" placeholder="请选择所属区域" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="维保期限" prop="maintenancePeriod">
                <el-input v-model="purchaseForm.maintenancePeriod" placeholder="请输入维保期限" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="期望到货时间" prop="expectedArrivalTime">
                <el-date-picker
                  v-model="purchaseForm.expectedArrivalTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择期望到货时间"
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="附件" prop="accessory">
                <Upload
                  :file-list="purchaseForm.accessory"
                  @handleRemove="handleRemove"
                  @handleSuccess="handleUploadSuccess"
                  @handleError="handleUploadError"
                />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>选择采购清单</span>
      </div>
      <PurchaseList ref="purchase-list" :project-id="projectId" :is-disabled="isDisabled" />
      <div class="foot-button text-center mt-18">
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button>取消</el-button>
      </div>
      <!-- <el-button type="primary" size="small" @click="select()">选择采购清单</el-button> -->

    </el-card>
  </div>
</template>

<script>
import Upload from '@/components/Upload'
import PurchaseList from './PurchaseList.vue'
import props from '../../mixins/props'
import { mapGetters } from 'vuex'
import { purchaseApply } from '@/api/project'
export default {
  name: 'PurchaseApply',
  components: {
    PurchaseList, Upload
  },
  mixins: [props],
  data: function() {
    return {
      projectId: this.parentProps.projectId,
      purchaseRule: {
        title: [
          { required: true, message: '请输入申请主题', trigger: 'blur' }
        ],
        outsource: [
          { required: true, message: '请选择是否外包', trigger: 'blur' }
        ],
        productTypeId: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入申请说明', trigger: 'blur' }
        ],
        purchaseTypeId: [
          { required: true, message: '请选择清单类型', trigger: 'blur' }
        ],
        consignee: [
          { required: true, message: '请输入收货人', trigger: 'blur' }
        ],
        receivingAddress: [
          { required: true, message: '请输入收货地址', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '请选择所属区域', trigger: 'blur' }
        ],
        maintenancePeriod: [
          { required: true, message: '请输入维保期限', trigger: 'blur' }
        ],
        expectedArrivalTime: [
          { required: true, message: '请选择期望到货时间', trigger: 'blur' }
        ],
        accessory: [
          { required: true, message: '请上传附件', trigger: 'blur' }
        ]
      },
      purchaseForm: {
        accessory: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'areaConfig'
    ])

  },
  created() {
    // if (this.$route.query.name === 'choose') {
    // }
    // this.getCity
  },
  methods: {
    // select() {
    //   this.$router.push({
    //     name: 'choosepurlist'
    //   })
    // },
    onSave() {
      // console.log(this.$refs['purchase-list'].selectedData)
      const _selectedData = this.$refs['purchase-list'].selectedData || []
      if (_selectedData.length > 0) {
        this.$refs.purchaseForm.validate((valid) => {
          if (valid) {
            const body = {
              ... this.purchaseForm,
              purchase: _selectedData.map(v => {
                return {
                  projectPurchaseId: v.projectPurchaseId // 采购清单ID
                // num:
                }
              })
            }
            body.accessory = body.accessory[0].path
            // console.log(this.purchaseForm, 'purchaseForm')
            purchaseApply(body, this.projectId).then(res => {
              this.$listeners.onBack && this.$listeners.onBack()
            })
          } else {
            console.log('submit error')
          }
        })
      } else {
        this.$message.error('请选择采购清单')
      }
    },

    onCancel() {

    },
    handleRemove(file, fileList) {
      this.purchaseForm.accessory = this.purchaseForm.accessory.filter(v => v && v.uid !== file.uid)
    },

    handleUploadError(err, file, fileList) {
      console.log(err)
    },

    handleUploadSuccess(response, file, fileList) {
      file.raw.path = response.data[0]
      if (this.sysConfig && this.sysConfig.filepath) {
        file.raw.url = this.sysConfig.filepath + file.raw.path
      }
      this.purchaseForm.accessory.push(file.raw)
    }
  }
}
</script>

<style lang="scss" scope>
</style>
