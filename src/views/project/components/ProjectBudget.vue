<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>项目预算</span>
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
          >
            <el-form-item label="预算支出金额">
              <el-input v-model="item.amount" placeholder="请输入预算支出金额" />
            </el-form-item>
            <el-form-item label="预算类型">
              <el-select v-model="item.typeId" placeholder="请选择预算类型">
                <el-option label="辅材" :value="1" />
                <el-option label="非辅材" :value="2" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="deleteContract(index)">删除</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="foot-button text-center">
        <el-button type="primary" size="small">保存</el-button>
        <el-button size="small">取消</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
const emptyItem = {
  amount: '',
  typeId: ''
}
export default {
  name: 'ProjectBudget',
  components: {},
  data: function() {
    return {
      contractForm: [{
        amount: '',
        typeId: ''
      }],
      item: {},
      newcontractForm: {
        amount: '',
        typeId: ''
      }
    }
  },
  created() {},
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
