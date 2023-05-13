<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>投标产品清单</span>
      </div>
      <ProductList
        :parent-props="parentProps"
        :is-disabled="isDisabled"
      />
    </el-card>
  </div>
</template>

<script>

import ProductList from '../product/ProductList'
export default {
  name: 'InquiryPrice',
  components: { ProductList },

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
      resData: {
        total: 0
      },
      resList: [],
      projectId: this.parentProps.projectId,
      quiryFormVisible: false,
      apodtFormVisible: false,
      quiryIndex: '',
      quiryNum: '',
      quiryForm: {
        brand: '',
        price: '',
        technical: ''
      },
      apodtForm: {
        reason: ''
      }

    }
  },

  created() {
    // this.fetchData()
    // this.totalPrice()
  },
  methods: {
    fetchData() {
      // if (this.projectId) {
      //   fetchTenderProducts(this.params, {}, this.projectId).then(res => {
      //     if (res) {
      //       this.resData = res
      //       this.resList = res.records
      //     }
      //   })
      // }
    },

    handleRowClick(row, index, e) {
      if (index.label !== '操作') {
        this.$refs.quirytable.toggleRowExpansion(row)
      }
    },

    addQuiryForm(index) {
      this.quiryForm.brand = ''
      this.quiryForm.price = ''
      this.quiryForm.technical = ''
      this.quiryIndex = index
      this.quiryNum = this.testdata[index].productNum
      this.quiryFormVisible = true
    },
    saveQquiryForm() {
      this.quiryFormVisible = false
      const addform = {
        brandName: this.quiryForm.brand,
        quotedPrice: this.quiryForm.price,
        technical: this.quiryForm.technical,
        totalPrice: this.quiryForm.price * this.quiryNum
      }
      this.testdata[this.quiryIndex].childrenData.push(addform)
    },
    totalPrice() {
      this.testdata.forEach((item, index) => {
        item.totalPrice = item.productNum * item.limitedPrice
        const num = item.productNum
        if (item.childrenData && item.childrenData.length) {
          item.childrenData.forEach((item, index) => {
            item.totalPrice = num * item.quotedPrice
          })
        }
      })
    }
  }
}
</script>
