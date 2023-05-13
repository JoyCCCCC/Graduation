<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购申请</span>
      </div>
      <el-form
        ref="purForm"
        :model="purForm"
        label-width="105px"
        size="small"
        class="b-line"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请主题">
              <el-input v-model="purForm.title" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="是否外包">
              <el-select v-model="purForm.isOutsource" placeholder="请选择是否外包">
                <el-option label="是" :value="1" />
                <el-option label="否" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="软硬件">
              <el-select v-model="purForm.productTypeId" placeholder="请选择软硬件">
                <el-option label="硬件" :value="1" />
                <el-option label="软件" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="申请说明">
              <el-input v-model="purForm.remark" />
            </el-form-item>
          </el-col>
          <template>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="清单类型">
                <el-select v-model="purForm.purchaseTypeId" placeholder="请选择清单类型">
                  <el-option label="合同内" :value="1" />
                  <el-option label="合同外" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="收货人">
                <el-input v-model="purForm.consignee" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="收货地址">
                <el-input v-model="purForm.receivingAddress" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="联系电话">
                <el-input v-model="purForm.contactNumber" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="所属区域">
                <el-input v-model="purForm.areaId" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="维保期限">
                <el-input v-model="purForm.maintenancePeriod" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="期望到货时间">
                <el-input v-model="purForm.expectedArrivalTime" />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="附件">
                <el-input />
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
      <div class="pt-18">
        <el-button type="primary" size="small" @click="select()">选择采购清单</el-button>
      </div>
      <div v-if="list.length==0" class="foot-button text-center">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-card>
    <el-card v-if="list.length>0" class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>采购清单详情</span>
      </div>
      <el-table
        v-loading="listLoading"
        border
        stripe
        :data="list"
        element-loading-text="Loading"
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
      </el-table>
      <div class="foot-button text-center">
        <el-button type="primary">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getPurList } from '@/api/project'
export default {
  name: '',
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
  data: function() {
    return {
      list: [],
      listLoading: true,
      purForm: {
        'title': '',
        'isOutsource': 1,
        'productTypeId': 1,
        'remark': '',
        'purchaseTypeId': 1,
        'consignee': '',
        'receivingAddress': '',
        'contactNumber': '',
        'areaId': '', // 区域
        'maintenancePeriod': '',
        'expectedArrivalTime': '',
        'purchaseList': [
          {
            'projectPurchaseId': '采购清单ID'
          }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.name === 'choose') {
      this.getTableList()
    }
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
    select() {
      this.$router.push({
        name: 'choosepurlist'
      })
    }
  }
}
</script>

<style lang="scss">
</style>
