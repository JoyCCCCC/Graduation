<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix text-left">
        <i class="bar" />
        <span>询价列表</span>
      </div>
      <el-table
        :data="resList"
        border
        stripe
        class="mb-18"
      >
        <el-table-column show-overflow-tooltip label="品牌" prop="brand.inquiryBrandName" />
        <el-table-column show-overflow-tooltip label="厂家报价" prop="quotedPrice" />
        <el-table-column show-overflow-tooltip label="技术指标" prop="technicalIndex" />
        <el-table-column show-overflow-tooltip label="总价" header-align="center" align="right" prop="totalPrice">
          <template slot-scope="scope">
            {{ scope.row.totalPrice | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column v-if="isCurrentStep" label="操作">
          <template slot-scope="scope">
            <div class="btn-text-group">
              <el-button v-if="inquiryPrice && scope.row.choose" :disabled="isDisabled" type="text" size="small" @click="onUse(scope.row)">取消采用</el-button>
              <el-button v-if="!inquiryPrice && !scope.row.choose " :disabled="isDisabled" type="text" size="small" @click="onUse(scope.row)">采用</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="useDialog.visible" destroy-on-close width="600px" :close-on-click-modal="CLOSE_ON_CLICK_MODAL">
      <div slot="title" class="text-left fz-18">{{ useDialog.title||'采用' }}</div>
      <UsePrice @onUseCallback="onUseCallback" @onCancel="onCancel" />
      <!-- <el-form>
        <el-form-item label="采用理由" label-width="80px">
          <el-input v-model="apodtForm.remark" type="textarea" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="loading" @click="onUsePrice">保存</el-button>
        <el-button @click="apodtFormVisible=false">取消</el-button>
      </span> -->
    </el-dialog>
  </div>

</template>

<script>
import { fetchInquiryList, useInquiryPrice } from '@/api/project'
import { mapGetters } from 'vuex'
import UsePrice from './UsePrice'
export default {
  name: 'InquiryList',
  components: { UsePrice },
  props: {
    projectId: {
      type: Number,
      default: 0
    },
    productId: {
      type: Number,
      default: 0
    },
    inquiryPrice: {
      type: Number,
      default: 0
    },
    isCurrentStep: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      apodtFormVisible: false,
      resList: [],
      useDialog: {
        visible: false
      },
      CLOSE_ON_CLICK_MODAL: this.$defaultCfg.closeOnClickModal
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  created() {
    this.fetchData()
  },
  methods: {

    fetchData() {
      if (this.projectId && this.productId) {
        const params = {
          projectId: this.projectId,
          productId: this.productId
        }
        fetchInquiryList(params).then(res => {
          if (res) {
            this.resList = res
          }
        })
      }
    },
    onUse(item) {
      this.useDialog = {
        visible: true,
        title: item.choose ? '取消采用' : '采用',
        choose: item.choose,
        productId: item.productId,
        projectId: item.projectId,
        tenderProductInquiryPriceId: item.tenderProductInquiryPriceId
      }
    },

    onUseCallback(body) {
      if ('choose' in this.useDialog) {
        const params = {
          projectId: this.useDialog.projectId,
          productId: this.useDialog.productId,
          tenderProductInquiryPriceId: this.useDialog.tenderProductInquiryPriceId
        }
        body.choose = !this.useDialog.choose
        useInquiryPrice(params, body).then(res => {
          this.refresh()
          this.onCancel()
        })
      }
    },

    refresh() {
      this.fetchData()
      this.$listeners.onRefresh && this.$listeners.onRefresh()
    },

    onCancel() {
      this.useDialog = {
        visible: false
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
