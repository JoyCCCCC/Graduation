<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          供应商列表
        </span>
      </div>
      <div class="mb-18">
        <el-button type="primary" size="small" @click="$router.push('/crm/supplier_add_edit')">添 加</el-button>
      </div>
      <div class="mb-18">
        <el-table
          border
          stripe
          size="small"
          class="mb-18"
          :data="list"
        >
          <el-table-column show-overflow-tooltip label="名称" align="center" prop="supplierName" />
          <el-table-column show-overflow-tooltip label="类型" align="center" prop="supplierType.supplierTypeName">
            <!-- <template slot-scope="scope">
              <span>
                {{ scope.row.supplierTypeName|supplierTypeFilter }}
              </span>
            </template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip label="品牌" align="center" prop="supplierBrand.supplierBrandName">
            <!-- <template slot-scope="scope">
              <span>
                {{ scope.row.supplierBrandName|supplierBrandFilter }}
              </span>
            </template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip label="业务范围" align="center" prop="mainProductBusiness" />
          <el-table-column show-overflow-tooltip label="联系人" align="center" prop="contractorName" />
          <el-table-column show-overflow-tooltip label="联系方式" align="center" prop="contractTel" />
          <el-table-column show-overflow-tooltip width="100px" label="联系人职位" align="center" prop="contractorPosition">
            <!-- <template slot-scope="scope">
              <span>
                {{ scope.row.contracterPosition|positionFilter }}
              </span>
            </template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip label="对接人" align="center" prop="ourCompanyConnector" />
          <el-table-column show-overflow-tooltip label="账期支持" align="center" prop="accountingPeriod" />
          <el-table-column show-overflow-tooltip label="代理等级" align="center" prop="agencyLevel">
            <template slot-scope="scope">
              <span>
                {{ scope.row.agencyLevel|agencyLevelFilter }}
              </span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="关系" align="center" prop="ourCompanyRelationship.value">
            <!-- <template slot-scope="scope">
              <span>
                {{ scope.row.relation|relationFilter }}
              </span>
            </template> -->
          </el-table-column>
          <el-table-column show-overflow-tooltip label="登记时间" align="center" prop="createTime" />
          <el-table-column show-overflow-tooltip label="登记人" align="center" prop="creator.userName" />
          <!-- <el-table-column show-overflow-tooltip label="更新时间" align="center" prop="updateTime" />
          <el-table-column show-overflow-tooltip label="更新人" align="center" prop="updateUserName" /> -->
          <el-table-column show-overflow-tooltip label="操作" align="center">
            <template>
              <div class="btn-text-group">
                <el-button type="text" size="small" @click="$router.push('/crm/supplier_add_edit')">修改</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="clearfix">
          <pagination
            v-show="resData.total>0"
            :total="resData.total"
            :page.sync="listquery.pageIndex"
            :limit.sync="listquery.pageSize"
            class="pull-right"
            @pagination="getTableList"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchSupplierList } from '@/api/customer'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    supplierTypeFilter(status) {
      const statusMap = {
        '1': '伙伴',
        '2': '优先',
        '3': '重点',
        '4': '商业'
      }
      return statusMap[status]
    },
    supplierBrandFilter(status) {
      const statusMap = {
        '1': '华为',
        '2': '苹果',
        '3': '三星',
        '4': '小米',
        '5': '华硕'
      }
      return statusMap[status]
    },
    agencyLevelFilter(status) {
      const statusMap = {
        '1': '金牌代理',
        '2': '银牌代理',
        '3': '铜牌代理'
      }
      return statusMap[status]
    },
    relationFilter(status) {
      const statusMap = {
        '0': '一般',
        '1': '支持',
        '2': '反对'
      }
      return statusMap[status]
    },
    positionFilter(status) {
      const statusMap = {
        '1': '销售',
        '2': '经理',
        '3': '总监'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      body: {},
      listLoading: true,
      list: [],
      resData: {
        total: 1
      },
      listquery: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      }
    }
  },

  created() {
    this.getTableList()
  },
  methods: {
    getTableList() {
      fetchSupplierList(this.listquery, this.body).then(res => {
        this.list = res.records
        this.resData = res
      })
    }
  }

}
</script>
