<template>
  <div>
    <el-form
      ref="contractInfo"
      :model="contractInfo"
      label-width="105px"
      size="small"
    >
      <el-row :gutter="32">
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="甲方合同编号">
            <el-input v-model="contractInfo.aContractNo" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="乙方合同编号">
            <el-input v-model="contractInfo.bContractNo" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="合同名称">
            <el-input v-model="contractInfo.contractName" />
          </el-form-item>
        </el-col>
        <el-col v-if="isexpend" :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="支出类型">
            <el-select v-model="contractInfo.incomeExpenseDetailId" placeholder="请选择">
              <el-option label="技术外包" :value="1" />
              <el-option label="采购" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="合同金额">
            <el-input v-model="contractInfo.contractAmount" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="签订日期">
            <el-date-picker
              v-model="contractInfo.signDate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="预计毛利率">
            <el-input v-model="contractInfo.incomeExpenseTypeId" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="预计毛利额">
            <el-input v-model="contractInfo.incomeExpenseDetailId" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="生效日期">
            <el-date-picker
              v-model="contractInfo.startDate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="终止日期">
            <el-date-picker
              v-model="contractInfo.endDate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="合同份数">
            <el-input v-model="contractInfo.contractQuantity" type="number" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="质保金">
            <el-input v-model="contractInfo.receiveMoneyRequire" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="质保期">
            <el-input v-model="contractInfo.warrantyPeriod" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="货期">
            <el-input v-model="contractInfo.deliveryDate" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="货物金额">
            <el-input v-model="contractInfo.deliveryAmount" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="货物税率">
            <el-input v-model="contractInfo.deliveryTaxRate" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="服务金额">
            <el-input v-model="contractInfo.serviceAmount" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="服务税率">
            <el-input v-model="contractInfo.serviceTaxRate" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="收款条件">
            <el-input v-model="contractInfo.one" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="主要条款">
            <el-input v-model="contractInfo.mainClause" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :xl="6">
          <el-form-item label="附件">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :on-exceed="handleExceed"
              :file-list="accessory"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    isexpend: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      DialogVisible: false,
      accessory: []
      // accessory: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  computed: {
    contractInfo: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }

  }
}
</script>

<style lang='scss' scoped>
</style>
