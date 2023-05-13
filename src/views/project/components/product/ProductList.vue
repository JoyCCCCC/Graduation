<template>
  <div>
    <div v-if="isAssistTender&&isCurrentStep" class="mb-18">
      <el-button type="primary" :disabled="!isCurrentStep" @click="dialogFormVisible=true">添 加</el-button>
      <el-button :disabled="!isCurrentStep" @click="dialogImportVisible=true">导 入</el-button>
    </div>
    <el-table
      border
      stripe
      :row-key="getRowKey"
      :expand-row-keys="expandRows"
      class="mb-18"
      :data="resList"
      @expand-change="onExpandChange"
    >
      <el-table-column v-if="isInquiry" type="expand">
        <template slot-scope="scope">
          <InquiryList :key="expandRowKey" :is-current-step="isCurrentStep" :is-disabled="isDisabled" :inquiry-price="scope.row.inquiryPrice" :project-id="scope.row.projectId" :product-id="scope.row.productId" @onRefresh="fetchData" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="品目号" prop="productNo" />
      <el-table-column show-overflow-tooltip label="品名" prop="productName" />
      <el-table-column show-overflow-tooltip label="技术指标" prop="technicalIndex" />
      <el-table-column show-overflow-tooltip label="数量" prop="productNum" />
      <el-table-column show-overflow-tooltip label="限价" header-align="center" align="right" prop="limitedPrice">
        <template slot-scope="scope">
          {{ scope.row.limitedPrice | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="总价" header-align="center" align="right" prop="totalPrice">
        <template slot-scope="scope">
          {{ scope.row.totalPrice | toThousandFilter }}
        </template>
      </el-table-column>
      <el-table-column v-if="isInquiry" show-overflow-tooltip label="询价品牌" prop="inquiryBrand.inquiryBrandName" />
      <el-table-column v-if="isInquiry" show-overflow-tooltip label="询价价格" prop="inquiryPrice" />
      <el-table-column show-overflow-tooltip label="状态" prop="status.value" />
      <el-table-column v-if="isCurrentStep" label="操作">
        <template slot-scope="scope">
          <div v-if="isAssistTender" class="btn-text-group">
            <!-- <el-button type="text" size="small" @click="goInquiryPrice">询价</el-button> -->
            <el-popconfirm
              title="确定删除该条产品？"
              @onConfirm="onDelete(scope.row.productId)"
            >
              <el-button slot="reference" type="text" :disabled="!isCurrentStep||isDisabled">删除</el-button>
            </el-popconfirm>
          </div>
          <div v-if="isInquiry" class="btn-text-group">
            <el-button type="text" :disabled="!isCurrentStep||isDisabled" @click="addInquiryForm(scope.row.productId)">添加询价</el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="resData.total > 0"
      :total="resData.total"
      :page.sync="params.pageIndex"
      :limit.sync="params.pageSize"
      class="text-right"
      @pagination="fetchData"
    />
    <el-dialog
      title="添加产品清单"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="CLOSE_ON_CLICK_MODAL"
      width="600px"
    >
      <AddProduct :project-id="projectId" @onAddSuccess="onAddSuccess" @onCancel="dialogFormVisible=false" />
    </el-dialog>

    <el-dialog
      title="导入产品清单"
      :visible.sync="dialogImportVisible"
      :close-on-click-modal="CLOSE_ON_CLICK_MODAL"
      width="500px"
    >
      <ImportProduct @uploadFile="uploadFile" @importFile="importFile" @onCancel="dialogImportVisible=false" />
    </el-dialog>

    <el-dialog :close-on-click-modal="CLOSE_ON_CLICK_MODAL" :visible.sync="inquiryDialog.visible" title="添加询价" width="600px">
      <AddInquiry :project-id="projectId" :product-id="inquiryDialog.productId" @onInquirySuccess="onInquirySuccess" @onCancel="onAddInquiryCancel" />

    <!-- <el-dialog v-model="apodtForm" :visible.sync="apodtFormVisible" title="采用" width="600px">
      <el-form>
        <el-form-item label="采用理由" label-width="80px">
          <el-input v-model="apodtForm.reason" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="apodtFormVisible=false">保存</el-button>
        <el-button @click="apodtFormVisible=false">取消</el-button>
      </span>
    </el-dialog> -->

    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import AddProduct from './AddProduct'
import InquiryList from '../inquiry/InquiryList.vue'
import ImportProduct from './ImportProduct'
import { fetchTenderProducts, deleteProduct, importProduct } from '@/api/project'
import { projectBtnType } from '../../constant'
import AddInquiry from '../inquiry/AddInquiry'
import props from '../../mixins/props'

export default {
  name: 'ProductList',
  components: { Pagination, AddProduct, ImportProduct, InquiryList, AddInquiry },
  mixins: [props],
  data() {
    return {
      dialogFormVisible: false,
      dialogImportVisible: false,
      inquiryDialog: {
        productId: 0,
        visible: false
      },
      params: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      resList: [],
      resData: {
        total: 0
      },
      projectId: this.parentProps.projectId,
      entryType: this.parentProps.entryType,
      isCurrentStep: this.parentProps.isCurrentStep,
      CLOSE_ON_CLICK_MODAL: this.$defaultCfg.closeOnClickModal,
      expandRows: [], // 展开的行
      expandRowKey: '' // 添加询价行刷新展开列表
    }
  },

  computed: {
    isAssistTender() {
      return this.entryType === projectBtnType.ASSIST_TENDER
    },
    isInquiry() {
      return this.entryType === projectBtnType.INQUIRY
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchTenderProducts(this.params, {}, this.projectId).then(res => {
        this.resList = res.records
        this.resData = res
        this.$checkCurrentPageData(res, (page) => {
          this.params.pageIndex = page || this.params.pageIndex--
          this.fetchData()
        })
      })
    },

    uploadFile(param) {
      const _file = param.file
      // const isLt2M = _file.size / 1024 / 1024 < 2
      // 通过 FormData 对象上传文件
      var formData = new FormData()
      formData.append('file', _file)

      // if (!isLt2M) {
      //   this.$message.error('请上传2M以下的.xlsx文件')
      //   return false
      // }

      // 发起请求
      importProduct(formData, this.projectId).then(res => {
        // console.log('_RequestUploads_', res)
        this.params.pageIndex = 1
        this.dialogImportVisible = false
        this.fetchData()
      })
    },

    importFile() {

    },

    onDelete(productId) {
      if (productId && this.projectId) {
        const params = {
          projectId: this.projectId,
          productId: productId
        }
        deleteProduct(params).then(res => {
          this.$message.success('操作成功！')
          this.fetchData()
        })
      }
    },

    onAddSuccess() {
      this.dialogFormVisible = false
      this.params.pageIndex = 1
      this.fetchData()
    },

    onInquirySuccess() {
      if (this.expandRows.includes(this.inquiryDialog.productId)) { // 添加询价的数据是展开的状态
        this.expandRowKey = this.expandRowKey === this.inquiryDialog.productId ? '1' : this.inquiryDialog.productId
      }
      this.fetchData()
      this.onAddInquiryCancel()
    },

    addInquiryForm(productId) {
      if (productId) {
        this.inquiryDialog = {
          visible: true,
          productId: productId
        }
      }
    },

    onAddInquiryCancel() {
      this.inquiryDialog = {
        visible: false,
        productId: 0
      }
    },

    onExpandChange(row, expandedRows) {
      this.expandRows = expandedRows.map(v => v && v.productId)
      this.expandRowKey = row.productId
    },
    getRowKey(row) {
      return row.productId
    }

  }

}
</script>

<style lang='scss' scoped>
</style>

