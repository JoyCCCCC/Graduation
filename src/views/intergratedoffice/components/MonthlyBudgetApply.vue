<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          月度预算申请
        </span>
      </div>
      <div>
        <el-form size="small" label-width="140px">
          <el-row :gutter="32">
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="月份">
                <el-date-picker />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="股东到资">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="预计销售收入">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="预计回款">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="预计收款押金保证金">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="预计采购总额">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="预计采购支出">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :xl="6">
              <el-form-item label="发薪人数">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          期间费用
        </span>
      </div>
      <period-expenses />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          财务费用
        </span>
      </div>
      <financial-expenses />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          税金和附加
        </span>
      </div>
      <taxe-surcharges />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          所得税费
        </span>

      </div>
      <income-tax />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          筹资
        </span>
      </div>
      <financing />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          投资
        </span>
      </div>
      <investment />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          其他支出
        </span>
      </div>
      <other-expenses />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          营业外收支
        </span>
      </div>
      <nonoperating-expenses />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          非现金支出费用
        </span>
      </div>
      <no-cash />
    </el-card>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>
          预期净现金流
        </span>
      </div>
      <expect-cash />
      <budget-list />
      <div class="foot-button text-center mt-18">
        <el-button type="primary">保存</el-button>
        <el-button>返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import FinancialExpenses from './FinancialExpenses.vue'
import PeriodExpenses from './PeriodExpenses.vue'
import TaxeSurcharges from './TaxeSurcharges.vue'
import IncomeTax from './IncomeTax.vue'
import Financing from './Financing.vue'
import Investment from './Investment.vue'
import OtherExpenses from './OtherExpenses.vue'
import NonoperatingExpenses from './NonoperatingExpenses.vue'
import NoCash from './NoCash.vue'
import ExpectCash from './ExpectCash.vue'
import BudgetList from './BudgetList.vue'
export default {
  components: { PeriodExpenses, FinancialExpenses, TaxeSurcharges, IncomeTax, Financing, Investment, OtherExpenses,
    NonoperatingExpenses, NoCash, ExpectCash, BudgetList }

}
</script>
