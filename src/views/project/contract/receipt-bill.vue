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
        <span>收票信息</span>
      </div>
      <div class="add-form-part">
        <i class="el-icon-circle-plus-outline i-add" @click="addContract" />
        <div class="add-cont-part pt-18 plr-18">
          <div v-if="contractForm.length==0" class="no-data">
            <span>暂无产品数据，请先添加</span>
          </div>
          <el-form
            v-for="(item,index) in contractForm"
            :key="index"
            v-model="contractForm"
            :inline="true"
            size="small"
            class="form-wxm"
          >
            <el-form-item label="收票金额">
              <el-input v-model="item.amount" placeholder="请输入收票金额" />
            </el-form-item>
            <el-form-item label="税率">
              <el-select v-model="item.duesType" placeholder="请选择税率">
                <el-option
                  v-for="item1 in item.duesTypeOptions"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="收票时间">
              <el-date-picker v-model="item.time" type="date" value-format="yyyy-MM-dd" placeholder="请输入收票时间" />
            </el-form-item>
            <el-form-item label="附件">
              <el-input v-model="item.file" placeholder="请输入附件" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="deleteContract(index)">删除</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-form :inline="true" size="small" class="form-text-inline text-center">
        <el-form-item label="合同不含税金额：">
          <span class="text">111</span>
        </el-form-item>
        <el-form-item label="本次收票不含税金额：">
          <span class="text">111</span>
        </el-form-item>
        <el-form-item label="累计已收票金额：">
          <span class="text">111</span>
        </el-form-item>
        <el-form-item label="累计已收票不含税金额:">
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
          label: '0%',
          value: 1
        }, {
          label: '6%',
          value: 2
        }, {
          label: '9%',
          value: 3
        }, {
          label: '13%',
          value: 4
        }],
        time: '',
        file: ''
      }],
      newcontractForm: {
        amount: '',
        duesType: 1,
        duesTypeOptions: [{
          label: '0%',
          value: 1
        }, {
          label: '6%',
          value: 2
        }, {
          label: '9%',
          value: 3
        }, {
          label: '13%',
          value: 4
        }],
        time: '',
        file: ''
      }
    }
  },
  computed: {},
  created() {
    this.ncontractFormInfo = contractFormInfo
  },
  methods: {
    deleteContract(index) {
      this.contractForm.splice(index, 1)
    },
    addContract() {
      var data = this.$deepcopy({}, this.newcontractForm)
      this.contractForm.push(data)
    }
  }
}
</script>

<style lang="scss">
</style>
