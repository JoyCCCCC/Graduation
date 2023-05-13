<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>报价清单</span>
      </div>
      <div>
        <el-form ref="searchForm" :inline="true" :model="searchForm" size="small" class="mt-18">
          <el-form-item label="状态" prop="status">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <!-- 0-全部，1-进行中，2-完成 -->
              <el-option label="全部" :value="0" />
              <el-option label="进行中" :value="1" />
              <el-option label="完成" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        border
        stripe
        size="small"
        class="mb-18"
        :data="resList"
      >
        <el-table-column label="品目号" prop="productNo" show-overflow-tooltip />
        <el-table-column label="品名" prop="productName" show-overflow-tooltip />
        <el-table-column label="品牌" prop="brand.inquiryBrandName" show-overflow-tooltip />
        <el-table-column label="技术指标" prop="technicalIndex" show-overflow-tooltip />
        <el-table-column label="采购价" prop="purchasePrice" header-align="center" show-overflow-tooltip align="right">
          <template slot-scope="scope">
            {{ scope.row.purchasePrice | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column label="限价" prop="limitedPrice" show-overflow-tooltip header-align="center" align="right">
          <template slot-scope="scope">
            {{ scope.row.limitedPrice | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column label="数量" prop="productNum" show-overflow-tooltip />
        <el-table-column prop="quotedPrice" label="报价" header-align="center" align="right">
          <template slot-scope="scope">
            <div v-if="scope.row.isEdit" class="customer-input">
              <el-input ref="editInput" v-model="scope.row.quotedPrice" :precision="2" size="mini" @input="inputChange(scope.$index,$event)" />
              <!-- <el-input ref="editInput" v-model="scope.row.quotedPrice" size="mini" oninput="value=value.replace(/[^0-9.]/g,'')" /> -->
            </div>
            <span v-else> {{ scope.row.quotedPrice | toThousandFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总毛利" show-overflow-tooltip prop="totalGrossProfit" header-align="center" align="right">
          <template slot-scope="scope">
            {{ scope.row.totalGrossProfit | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column label="毛利率" prop="grossProfitRate" show-overflow-tooltip />
        <el-table-column label="总采购价" prop="totalPurchasePrice" show-overflow-tooltip header-align="center" align="right">
          <template slot-scope="scope">
            {{ scope.row.totalPurchasePrice | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column label="总报价" prop="totalQuotedPrice" show-overflow-tooltip header-align="center" align="right">
          <template slot-scope="scope">
            {{ scope.row.totalQuotedPrice | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div v-if="!scope.row.isEdit" class="btn-text-group">
              <el-button type="text" @click="handleEdit(scope.$index)">报价</el-button>
            </div>
            <div v-else class="btn-text-group">
              <el-button type="text" @click="handleSave(scope.$index)">保存</el-button>
              <el-button type="text" @click="handleCancel(scope.$index)">取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-form :inline="true" size="small" class="form-text-inline pull-left">
        <el-form-item label="预估毛利率：">
          <span class="text">{{ estimatedGrossMargin }}</span>
        </el-form-item>
        <el-form-item label="预估毛利额：">
          <span class="text">{{ estimatedGrossProfit| toThousandFilter }}</span>
        </el-form-item>
      </el-form>
      <div class="clearfix">
        <Pagination
          v-show="resData.total > 0"
          :total="resData.total"
          :page.sync="params.pageIndex"
          :limit.sync="params.pageSize"
          class="pull-right"
          @pagination="fetchData"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchOfferList, offerPrice } from '@/api/project'
import { formatMoney } from '@/utils/validateForm'
import { calcuPercentage } from '@/utils'
export default {
  name: 'QuotedPrice',
  components: { Pagination },
  props: {
    isDisabled: {
      type: Boolean,
      default: true
    },
    parentProps: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      params: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      searchForm: {
        status: 0
      },
      resList: [],
      originResList: [],
      resData: {
        total: 0
      },
      projectId: this.parentProps.projectId
    }
  },
  computed: {
    // 预估毛利额
    estimatedGrossProfit() {
      return this.resList.reduce((sum, cur) => {
        if (cur.totalGrossProfit) {
          sum += Number(cur.totalGrossProfit)
        }
        return sum
      }, 0)
    },

    // 预估毛利率
    estimatedGrossMargin() {
      //  总毛利/总采购价
      const _estimatedGrossProfit = this.resList.reduce((sum, cur) => {
        if (cur.totalGrossProfit) {
          sum += Number(cur.totalGrossProfit)
        }
        return sum
      }, 0)

      const _totalPurchasePrice = this.resList.reduce((sum, cur) => {
        if (cur.totalPurchasePrice) {
          sum += Number(cur.totalPurchasePrice)
        }
        return sum
      }, 0)

      return calcuPercentage(_estimatedGrossProfit, _totalPurchasePrice) + '%'
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.projectId) {
        fetchOfferList(this.params, this.searchForm, this.projectId).then(res => {
          this.resList = res.records
          this.originResList = this.$deepcopy({}, res.records)
          this.resData = res
        })
      }
    },

    onSearch() {
      this.params.pageIndex = 1
      this.fetchData()
    },

    onReset() {
      this.$refs.searchForm.resetFields()
    },

    handleEdit(index) {
      const item = this.resList[index]
      item.isEdit = true
      this.$set(this.resList, index, item)
    },

    // 取消报价  还原数据
    handleCancel(index) {
      const item = { ...this.originResList[index] }
      item.isEdit = false
      this.$set(this.resList, index, item)
    },

    // 保存报价  更新数据
    handleSave(index) {
      const params = {
        projectId: this.resList[index].projectId,
        productQuotedPriceId: this.resList[index].productQuotedPriceId
      }
      const body = {
        quotedPrice: this.resList[index].quotedPrice
      }
      offerPrice(params, body).then(res => {
        this.fetchData()
      })
    },

    inputChange(index, value) {
      const _num = Number(this.resList[index].productNum)
      const _totalPurchasePrice = Number(this.resList[index].totalPurchasePrice) // 总采购价
      const _offerPrice = Number(formatMoney(value)) // 格式化金额  （报价）
      const _inquiryPrice = Number(this.resList[index].purchasePrice) // 采购价
      const _grossProfitRate = calcuPercentage(_offerPrice - _inquiryPrice, _inquiryPrice)// 计算毛利率=（报价-采购价）/采购价
      const _totalQuotedPrice = _offerPrice * _num // 计算总报价 totalQuotedPrice
      const _totalGrossProfit = _totalQuotedPrice - _totalPurchasePrice // 计算总毛利  totalGrossProfit
      this.resList[index].quotedPrice = _offerPrice
      this.resList[index].grossProfitRate = _grossProfitRate + '%'
      this.resList[index].totalQuotedPrice = _totalQuotedPrice
      this.resList[index].totalGrossProfit = _totalGrossProfit
    }
  }

}
</script>

<style lang='scss'>

  .customer-input{
     .el-input__inner{
      padding: 0 6px !important;
    }
  }

</style>
