<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>合同信息</span>
      </div>
      <contractInfo v-model="ncontractFormInfo" />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>回款信息</span>
      </div>

      <el-form
        v-for="(item,index) in contractForm"
        :key="index"
        v-model="contractForm"
        label-width="100px"
      >
        <el-row :gutter="32">
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="付款金额">
              <el-input v-model="item.amount" placeholder="请输入收票金额" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="回款时间">
              <el-date-picker v-model="item.time" type="date" value-format="yyyy-MM-dd" placeholder="请输入回款时间" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="是否预期回款">
              <el-select v-model="item.duesType" placeholder="请选择">
                <el-option
                  v-for="item1 in item.duesTypeOptions"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :xl="6">
            <el-form-item label="附件">
              <el-input v-model="item.file" placeholder="请输入附件" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-form :inline="true" size="small" class="form-text-inline">
        <el-form-item label="合同金额：">
          <span class="text">111</span>
        </el-form-item>
        <el-form-item label="累计已回款金额：">
          <span class="text">111</span>
        </el-form-item>
        <el-form-item label="累计已经开票金额：">
          <span class="text">111</span>
        </el-form-item>
      </el-form>
      <div class="foot-button text-center">
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small">取消</el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
import contractInfo from './contractcompnent/contractInfo.vue' // 合同信息
import {
  contractFormInfo
} from '../data'
export default {
  name: '',
  components: {
    contractInfo
  },
  data: function() {
    return {
      ncontractFormInfo: {},
      contractForm: [{
        amount: '',
        duesType: 1,
        duesTypeOptions: [{
          label: '是',
          value: 1
        }, {
          label: '否',
          value: 2
        }],
        time: '',
        file: ''
      }]
    }
  },
  computed: {},
  created() {
    this.ncontractFormInfo = contractFormInfo
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .form-text-inline{
    text-align:center;
    .el-form-item__label{
      padding-right:0;
    }
  }
</style>
