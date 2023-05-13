
<template>
  <div class="main-page">
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          CRM客户列表
        </span>
      </div>
      <div class="mb-18">
        <el-input v-model="searchName" placeholder="客户名称" style="width: 100px; margin-right: 10px;" size="small" />
        <el-select v-model="searchRelation" placeholder="客户关系" style="width: 100px; margin-right: 10px" size="small">
          <el-option v-for="item in relationOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="searchImportance" placeholder="重要程度" style="width: 100px; margin-right: 10px" size="small">
          <el-option v-for="item in importanceOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" size="small" style="width:80px">搜索</el-button>
        <el-button size="small" @click="addCusForm">添加客户</el-button>
      </div>
      <div>
        <el-table
          :data="list"
          element-loading-text="Loading"
          border
          stripe
          size="small"
          class="mb-18"
        >
          <el-table-column label="客户名称" align="center" show-overflow-tooltip prop="name" />
          <el-table-column label="客户关系" align="center" show-overflow-tooltip prop="relationId.value">
            <!-- <template slot-scope="scope">
              {{ scope.row.relationId|relationFilter }}
            </template> -->
          </el-table-column>
          <el-table-column label="重要程度" align="center" show-overflow-tooltip prop="importantId.value">
            <!-- <template slot-scope="scope">
              {{ scope.row.importantId|importanceFilter }}
            </template> -->
          </el-table-column>
          <el-table-column label="联系电话" align="center" show-overflow-tooltip prop="linkPhone">
            <!-- <template slot-scope="scope">
              <span>
                {{ scope.row.linkPhone }}
              </span>
            </template> -->
          </el-table-column>
          <el-table-column label="拥有人" align="center" show-overflow-tooltip prop="ownerId">
            <template slot-scope="scope">
              {{ scope.row.ownerId| ownerNameFilter }}
            </template>
          </el-table-column>
          <el-table-column label="创建时间" show-overflow-tooltip align="center" prop="createTime" />

          <el-table-column label="操作" align="center" width="240px">
            <template slot-scope="scope">
              <div class="btn-text-group">
                <el-button type="text" size="small" @click="editCustomerForm(scope.row)">修改</el-button>
                <el-button type="text" size="small" @click="changeForm(scope.row)">转移</el-button>
                <el-button type="text" size="small">共享</el-button>
                <el-button type="text" size="small" @click="goCommunicate(scope.row)">沟通记录</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="clearfix">
        <Pagination
          v-show="resData.total>0"
          :total="resData.total"
          :page.sync="listquery.pageIndex"
          :limit.sync="listquery.pageSize"
          class="pull-right"
          @pagination="getTableList"
        />
      </div>
      <el-dialog
        v-if="dialogFormVisible"
        :visible.sync="dialogFormVisible"
        :title="titleName"
        destroy-on-close
        @close="closeForm"
      >
        <el-form ref="addCustomer" :rules="rules" :model="addCustomerForm" label-width="80px" size="small">
          <el-row :gutter="32">
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="客户名称" prop="name">
                <el-input v-model="addCustomerForm.name" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="客户关系" prop="relationId">
                <el-select v-model="addCustomerForm.relationId" placeholder="请选择客户关系">
                  <el-option v-for="item in relationOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="重要程度" prop="importantId">
                <el-select v-model="addCustomerForm.importantId" placeholder="请选择客户关系">
                  <el-option v-for="item in importanceOptions" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="联系电话" prop="linkPhone">
                <el-input v-model="addCustomerForm.linkPhone" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="拥有人" prop="ownerName">
                <el-select v-model="addCustomerForm.ownerId">
                  <el-option v-for="item in ownerOptions" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="职位" prop="position">
                <el-select v-model="addCustomerForm.position">
                  <el-option v-for="item in positionOptions" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="联系人" prop="linkUser">
                <el-input v-model="addCustomerForm.linkUser" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="公司地址" prop="companyAddr">
                <el-input v-model="addCustomerForm.companyAddr" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="微信" prop="wechatNum">
                <el-input v-model="addCustomerForm.wechatNum" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="18" :md="12" :xl="6">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="addCustomerForm.email" />
              </el-form-item>
            </el-col>
            <el-col :xs="24">
              <el-form-item label="客户来源" prop="source">
                <el-input v-model="addCustomerForm.source" type="textarea" rows="3" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="营业执照" prop="businessLicense">
            <!-- <el-input v-model="addCustomerForm.businessLicense" /> -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="附件">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
            >
              <el-button size="small" type="primary">点击上传</el-button></el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt-18">
          <el-button size="small" @click="closeForm('')">
            关 闭
          </el-button>
          <el-button type="primary" size="small" @click="onsubmit">
            保 存
          </el-button>
        </div>
      </el-dialog>
      <el-dialog title="拥有人转移" :visible.sync="dialogOwnerFormVisible">
        <el-form label-width="60px" :model="changeOwnerForm">
          <el-form-item label="拥有人">
            <el-select v-model="changeOwnerForm.ownerId">
              <el-option v-for="item in ownerOptions" :key="item.value" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer mt-18">
          <el-button size="small" @click="dialogOwnerFormVisible = false">
            关 闭
          </el-button>
          <el-button type="primary" size="small" @click="changeOwner">
            保 存
          </el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { fetchCrmList, addCrmList, editCrmList, fetchCrmDetail } from '@/api/customer'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  filters: {
    importanceFilter(status) {
      const statusMap = {
        1: '一级',
        2: '二级',
        3: '三级'
      }
      return statusMap[status]
    },
    relationFilter(status) {
      const statusMap = {
        1: '一般',
        2: '支持',
        3: '反对'
      }
      return statusMap[status]
    },
    ownerNameFilter(status) {
      const statusMap = {
        1: '张三',
        2: '李四',
        3: '王五'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      customerId: '',
      isEdit: false,
      titleName: '',
      resData: {
        total: 0
      },
      searchRelation: '',
      searchName: '',
      searchImportance: '',
      listquery: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      body: {

      },
      list: [],

      imageUrl: '',
      importanceOptions: [
        { value: 1, label: '一级' },
        { value: 2, label: '二级' },
        { value: 3, label: '三级' }
      ],
      relationOptions: [
        { value: 1, label: '一般' },
        { value: 2, label: '同意' },
        { value: 3, label: '反对' }
      ],
      ownerOptions: [
        { value: 1, label: '张三' },
        { value: 2, label: '李四' },
        { value: 3, label: '王五' }
      ],
      positionOptions: [
        { value: 1, label: '员工' },
        { value: 2, label: '经理' },
        { value: 3, label: '董事' }
      ],
      addCustomerForm: {

      },
      changeOwnerForm: {

      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        relationID: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ]
      },

      dialogFormVisible: false,
      dialogOwnerFormVisible: false
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    changeOwner() {
      editCrmList(this.changeOwnerForm.customerId, this.changeOwnerForm).then(() => {
        this.dialogOwnerFormVisible = false
        this.getTableList()
      })
    },
    goCommunicate(rowData) {
      this.$router.push({
        path: '/intergratedoffice/communicateList',
        query: {
          formStatus: 'communicate',
          customer: rowData.customerId
        }
      })
    },
    getTableList() {
      fetchCrmList(this.listquery, this.body).then(res => {
        console.log(res.records, res)
        if (res) {
          this.list = res.records
          this.resData = res
        }
      })
        .catch(err => {
          console.log(err)
        })
    },
    onsubmit() {
      this.$refs.addCustomer.validate((valid) => {
        if (valid) {
          if (!this.isEdit) {
            addCrmList(this.addCustomerForm).then(res => {
              console.log(this.addCustomerForm, this.isEdit)
              this.dialogFormVisible = false
              this.getTableList()
            })
          } else {
            editCrmList(this.addCustomerForm.customerId, this.addCustomerForm).then(() => {
              console.log(11)
              this.dialogOwnerFormVisible = false
              this.getTableList()
            })
          }
        }
      })
    },
    changeForm(rowData) {
      this.dialogOwnerFormVisible = true
      this.changeOwnerForm = {
        customerId: rowData.customerId,
        'ownerId': rowData.ownerId
      }
    },
    editCustomerForm(rowData) {
      this.isEdit = true
      console.log(this.addCustomerForm.customerId)
      this.titleName = '修改客户信息'
      this.dialogFormVisible = true
      console.log(rowData)
      fetchCrmDetail(rowData.customerId).then(res => {
        this.addCustomerForm = res
      })
    },
    addCusForm() {
      console.log(this.isEdit)
      this.titleName = '添加客户'
      this.dialogFormVisible = true
      this.addCustomerForm = {
        'businessLicense': '营业执照',
        'accessory': '附件'
      }
    },
    closeForm() {
      this.dialogFormVisible = false
      this.addCustomerForm = {}
      console.log(this.addCustomerForm.customerId)
      this.addCustomerForm = {
        'businessLicense': '营业执照',
        'accessory': '附件'
      }
    },
    deleteContract(index) {
      this.addCustomerForm.splice(index, 1)
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {

    }
  }
}

</script>

