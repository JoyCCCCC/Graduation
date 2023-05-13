<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>报销列表</span>
      </div>
      <div class="mb-18">
        <el-button type="primary" @click="open">报销申请</el-button>
      </div>
      <div>
        <el-table :data="list" border size="small" class="mb-18">
          <el-table-column label="报销人" prop="creator.userName" align="center" />
          <el-table-column label="部门" prop="departmentName" align="center" />

          <el-table-column label="总金额" prop="totalAmount" align="center" />
          <el-table-column label="报销时间" prop="createTime" align="center" />
          <el-table-column label="付款时间" prop="payTime" align="center" />
          <el-table-column label="状态" prop="payStatus.value" align="center" />
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="toDetail(scope.row)">查看详情</el-button>
              <el-button type="text">付款</el-button>
            </template>
            <!-- <el-button type="text" @click="dialogAddForm=true">查看详情</el-button>
            <el-button type="text">付款</el-button> -->
          </el-table-column>
        </el-table>
      </div>
      <div class="clearfix">
        <pagination
          v-show="rdata.total>0"
          :total="rdata.total"
          :page.sync="query.pageIndex"
          :limit.sync="query.pageSize"
          class="pull-right"
          @pagination="fetchData"
        />
      </div>
    </el-card>

    <el-dialog
      v-if="dialogpayForm"
      title="报销申请"
      :visible.sync="dialogpayForm"
      destroy-on-close
    >

      <el-form ref="shenqing" :model="shenqing" size="small" label-width="120px" :rules="rules" :disabled="this.isAdd==false">

        <div v-for="(formitem,index) in shenqing.detail" :key="index">
          <!-- <el-form label-width="120px" > -->
          <el-row :model="shenqing.detail[index]" :gutter="64">
            <el-col :span="24" class="form-inline-nolabel ">
              <el-button type="text" style="float:right" @click="handeldelete(index)">删除</el-button>
              <div> <el-button type="text" style="float:right;margin-left:50px;" @click="add">添加</el-button>
              </div>
            </el-col>
          </el-row>
          <el-form-item
            label="报销金额"
            :prop="`detail[${index}].amount`"
            :rules="detailAmountRules"
          >
            <el-input v-model="formitem.amount" />
          </el-form-item>
          <el-form-item
            label="报销类型"
            :prop="`detail[${index}].type`"
            :rules="{ required: true, message: '请选择报销类型', trigger: 'blur' }"
          >
            <el-select v-model="formitem.type">
              <el-option v-for="item in reimbursementType" :key="item.key" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formitem.remark" type="textarea" />
          </el-form-item>
        </div>

        <el-form-item label="是否外部收款" prop="externalCollection">
          <el-select v-model="shenqing.externalCollection">
            <el-option v-for="item in externalCollection" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>
        <div v-if="shenqing.externalCollection==1">

          <el-row :gutter="32">
            <el-col :xs="24" :sm="6" :md="12" :xl="6">
              <el-form-item label="收款单位" prop="payee">
                <el-input v-model="shenqing.payee" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="12" :xl="6">
              <el-form-item label="联系电话" prop="contactNumber">
                <el-input v-model="shenqing.contactNumber" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="12" :xl="6">
              <el-form-item label="联系人" prop="contacts">
                <el-input v-model="shenqing.contacts" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="12" :xl="6">
              <el-form-item label="开户行" prop="bankName">
                <el-input v-model="shenqing.bankName" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="6" :md="12" :xl="6">
              <el-form-item label="收款账号" prop="collectionAccount">
                <el-input v-model="shenqing.collectionAccount" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-form-item v-if="shenqing.externalCollection == 2" label="银行账号">
          <el-input v-model="shenqing.bankAccount" /></el-form-item>

        <el-form-item label="总金额" prop="totalAmount">
          <el-input v-model="shenqing.totalAmount" />
        </el-form-item>
        <el-form-item label="电子发票" prop="invoice" :rules="{ required: true, message: '请上传电子发票', trigger: 'blur' }">
          <ImageUpload
            ref="upload"

            :file-list="shenqing.invoice"
            @handleRemove="handleRemove('invoice',...arguments)"
            @handleSuccess="handleUploadSuccess('invoice',...arguments)"
            @handleError="handleUploadError('invoice',...arguments)"
          />
        </el-form-item>
        <el-form-item label="附件：" prop="accessory" :rules="{ required: true, message: '请上传附件', trigger: 'blur' }">
          <Upload
            ref="upload"

            :file-list="shenqing.accessory"
            @handleRemove="handleRemove('accessory',...arguments)"
            @handleSuccess="handleUploadSuccess('accessory',...arguments)"
            @handleError="handleUploadError('accessory',...arguments)"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer mt-18 text-center">
        <el-button size="small" @click="dialogpayForm = false">
          关 闭
        </el-button>
        <el-button type="primary" size="small" @click="saveProjectForm">
          保 存
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { baoxiaolist2 } from '@/api/ActivityForm'
import { reimbursementForm } from '@/api/intergratedoffice2'

import { apply } from '@/api/ActivityForm'

import Pagination from '@/components/Pagination'
// import ContractListVue from '../project/components/ContractList.vue'
import ImageUpload from '@/components/ImageUpload'
import { validateMoney } from '@/utils/validateForm'
import { fetchApolloData } from '@/api/dict'
import Upload from '@/components/Upload'

const initForm = {
  typeId: 1,
  projectId: 1,
  'externalCollection': '',
  'bankAccount': '',
  'businessTripApplyId': '1',
  detail: [{}]

}
export default {
  components: {
    Pagination, ImageUpload, Upload
  },
  // filters: {
  //   departmentNameFilter(status) {
  //     const statusMap = {
  //       '1': '研发部',
  //       '2': '集层部'

  //     }
  //     return statusMap[status]
  //   },
  //   statusFilter(status) {
  //     const statusMap = {
  //       '0': '未付款',
  //       '1': '已付款'
  //     }
  //     return statusMap[status]
  //   }
  // },
  props: {
    reimbursementData: {
      type: Object,
      default: () => ({})
    }

  },
  data() {
    return {
      isAdd: true,
      rdata: { total: 0 },
      apply: {
        typeId: '1',
        collectionAccount: ''
      },
      query: {
        pageIndex: 1,
        pageSize: 10,
        typeId: 1

      },
      dialogpayForm: false,
      list: [],
      shenqing: initForm,
      imageUrl: {

      },
      detailAmountRules: [
        { required: true, message: '报销金额不能为空', trigger: 'blur' },
        { validator: validateMoney, trigger: 'blur' }
      ],
      rules: {

        totalAmount: [
          { required: true, message: '总金额不能为空', trigger: 'blur' }
        ],
        fapiao: [
          { required: true, message: '项目不能为空', trigger: 'blur' }
        ],
        isExternalColletio: [
          { required: true, message: '选项不能为空', trigger: 'blur' }
        ],
        typeId: [
          { required: true, message: '项目类型不能为空', trigger: 'blur' }
        ],
        contacts: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '开户行不能为空', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        payee: [
          { required: true, message: '收款单位不能为空', trigger: 'blur' }
        ]

      },

      typeIdOption: [
        { value: '1', label: '项目' },
        { value: '2', label: '非项目' }
      ],
      typeId2Option: [
        { value: '1', label: '项目' },
        { value: '2', label: '非项目' }
      ],
      bankAccount: [
        { value: '1', label: '123' },
        { value: '2', label: '321' }
      ],
      externalCollection: [
        { value: '1', label: '是' },
        { value: '2', label: '否' }

      ],
      fileList: [],
      fileList2: []

    }
  },
  created() {
    this.getTableList()
    this.getReimbursementTypeData()
  },
  methods: {
    fetchData() {

    },

    open() {
      this.shenqing = initForm
      this.dialogpayForm = true
      this.isAdd = true
    },
    close() {
      this.dialogpayForm = false
    },

    toDetail(rowData) {
      console.log(rowData, 'rrrrr')
      this.dialogpayForm = true
      this.isAdd = false
      this.shenqing = rowData
      this.titleName = '查看详情'
      // this.reimbursementData = {
      //   isAdd: false,
      //   reimbursementApplyId: rowData.reimbursementApplyId

      // }
    },

    beforeAvatarUpload(file) {

    },
    handleAvatarSuccess(res, file) {

    },
    add() {
      this.shenqing.detail.push({})
    },
    handeldelete(index) {
      this.shenqing.detail.splice(index, 1)
    },
    saveProjectForm() {
      console.log(this.shenqing)
      console.log(this.$refs)
      this.$refs.shenqing.validate((valid) => {
        if (valid) {
          // es6语法
          // 数组操作
          // const _invoice = this.shenqing.invoice

          // const a = []
          // for (let i = 0; i < _invoice.length; i++) {
          //   a.push(_invoice[i].path)
          // }

          // console.log(a, 'oooooo')
          console.log(this.shenqing)
          const body = {
            ...this.shenqing,
            invoice: this.shenqing.invoice.map(v => {
              return v.path
            }),

            accessory: this.shenqing.accessory[0].path

            // invoice:['fsfd','dfgdg']

          }
          console.log(body, 'body')

          console.log()
          apply(body).then(res => {
            console.log(this.shenqing, res, '8888')
            this.list = res.records
          })
        }
      })
      this.dialogpayForm = false
    },
    getReimbursementTypeData() {
      fetchApolloData({ key: 'reimbursementType' }).then(res => {
        if (res) {
          this.reimbursementType = res
        }
      })
    },
    getTableList() {
      baoxiaolist2(this.query).then(res => {
        console.log(111, res)
        if (res) {
          this.list = res.records
          this.rdata = res
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    getTableList2() {
      reimbursementForm(this.reimbursementApplyId).then(res => {
        console.log(111, res)
        if (res) {
          this.list = res.records
          this.rdata = res
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    handleRemove(type, file, fileList) {
      this.shenqing[type] = this.shenqing[type].filter(v => v && v.uid !== file.uid)
      // this.$forceUpdate()
    },

    handleUploadError(type, err, file, fileList) {
      console.log(err)
    },

    handleUploadSuccess(type, response, file, fileList) {
      console.log(type, response, file, fileList)
      file.raw.path = response.data[0]
      if (type === 'invoice') {
        file.raw.url = file.url
      }
      if (this.shenqing && this.shenqing[type] && Array.isArray(this.shenqing[type])) {
        this.shenqing[type].push(file.raw)
      } else {
        this.$set(this.shenqing, type, [file.raw])
      }
      console.log(this.shenqing)
    }

    // toDetail(rowData) {
    //   this.dialogpayForm = true
    //   this.reimbursementData = {
    //     isAdd: false,
    //     reimbursementApplyId: rowData.reimbursementApplyId

  //   }
  // }
  }
}
</script>

