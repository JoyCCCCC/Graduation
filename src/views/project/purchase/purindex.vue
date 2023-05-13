<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购清单</span>
      </div>
      <div class="mb-18">
        <el-button type="primary" size="small" @click="handleAdd()">添加</el-button>
        <el-button size="small">签收</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        border
        stripe
        :data="list"
        element-loading-text="Loading"
        size="small"
        class="mb-18"
      >
        <el-table-column prop="productNo" label="品目号" show-overflow-tooltip align="center" />
        <el-table-column prop="productName" label="品名" show-overflow-tooltip align="center" />
        <el-table-column prop="brandName" label="品牌" show-overflow-tooltip align="center" />
        <el-table-column prop="isAuxiliaryMaterials" label="辅材" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.isAuxiliaryMaterials === 1">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column prop="purchasePrice" label="单价" width="100px" align="center" />
        <el-table-column prop="hasBuyNum" label="数量" width="100px" align="center" />
        <el-table-column prop="allPrice" label="总价" width="100px" align="center" />
        <el-table-column prop="quotedPrice" label="报价" width="100px" align="center" />
        <el-table-column prop="status" label="状态" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status | statusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="opration" label="操作" width="120px" align="center">
          <template slot-scope="scope">
            <div class="btn-text-group">
              <el-button type="text" @click="handleEdit(scope.$index)">修改</el-button>
              <el-button type="text" @click="handleDelete(scope.$index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <pagination v-show="total>0" :total="total" :page.sync="query.page" :limit.sync="query.limit" class="pull-right" @pagination="getTableList" />
      </div>
    </el-card>
    <el-dialog title="添加采购清单" :visible.sync="DialogVisible" width="500px">
      <el-form ref="addPurchaseForm" :model="addPurchaseForm" label-width="75px" size="small" :rules="addPurchaseFormRules">
        <el-form-item label="品目号" prop="productNo">
          <el-input v-model="addPurchaseForm.productNo" placeholder="请输入品目号" />
        </el-form-item>
        <el-form-item label="品名" prop="productName">
          <el-input v-model="addPurchaseForm.productName" placeholder="请输入品名" />
        </el-form-item>
        <el-form-item label="品牌" prop="projectNo">
          <el-input v-model="addPurchaseForm.brandName" placeholder="请输入品牌" />
        </el-form-item>
        <el-form-item label="是否辅材">
          <el-select v-model="addPurchaseForm.isAuxiliaryMaterials" placeholder="请选择">
            <el-option
              v-for="item in addPurchaseForm.isAuxiliaryMaterialsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="purchasePrice">
          <el-input v-model="addPurchaseForm.purchasePrice" placeholder="请输入品目号" />
        </el-form-item>
        <el-form-item label="数量" prop="hasBuyNum">
          <el-input v-model="addPurchaseForm.hasBuyNum" placeholder="请输入品目号" />
        </el-form-item>
        <el-form-item label="报价" prop="quotedPrice">
          <el-input v-model="addPurchaseForm.quotedPrice" placeholder="请输入品名" />
        </el-form-item>
        <el-form-item label="总价" prop="allPrice">
          <el-input v-model="addPurchaseForm.allPrice" placeholder="请输入品牌" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="savePurchaseForm('addPurchaseForm')">保存</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
import { getPurList, addPurList, editPurList, deletePurList } from '@/api/project'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '1': '未采购',
        '2': '已采购',
        '3': '部分采购',
        '4': '已签收'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      DialogVisible: false,
      total: 0,
      query: {
        page: 1,
        limit: 10
      },
      addPurchaseForm: {
        index: null,
        isAuxiliaryMaterialsOptions: [{
          value: 1,
          label: '是'
        }, {
          value: 2,
          label: '否'
        }
        ],
        'isAuxiliaryMaterials': 1,
        'projectNo': '',
        'productName': '',
        'brandName': '',
        'purchasePrice': '',
        'quotedPrice': '',
        'allPrice': '',
        'hasBuyNum': ''
      },
      index: null,
      isAdd: true,
      list: null,
      listLoading: true,
      addPurchaseFormRules: {
        productName: [
          { required: true, message: '请输入品名', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      this.listLoading = true
      getPurList(this.query).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleAdd() {
      this.DialogVisible = true
      this.isAdd = true
    },
    savePurchaseForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.DialogVisible = false
          if (this.isAdd) {
            console.log('add')
            addPurList(this.addPurchaseForm).then(response => {
              this.list = response.data.items
            })
          } else {
            console.log('edit', this.index)
            this.addPurchaseForm.index = this.index
            editPurList(this.addPurchaseForm).then(response => {
              this.list = response.data.items
            })
          }
          this.getTableList()
        } else {
          return false
        }
      })
    },
    handleEdit(index) {
      this.isAdd = false
      this.DialogVisible = true
      this.index = index
    },
    handleDelete(index) {
      this.addPurchaseForm.index = index
      deletePurList(this.addPurchaseForm).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
      this.getTableList()
      // this.list.splice(index,1);
    }
  }
}
</script>
<style lang="scss">
</style>

