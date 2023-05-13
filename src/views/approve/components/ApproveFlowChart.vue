<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>流程图</span>
      </div>
      <div class="text-center">
        <el-image :src="flowChartImg">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  fetchApprovalImg
} from '@/api/approve'
export default {
  name: 'ApproveFlowChart',
  components: {},
  props: {
    flowInstanceId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      flowChartImg: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.flowInstanceId) {
        fetchApprovalImg(this.flowInstanceId).then(res => {
          this.flowChartImg = res
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
