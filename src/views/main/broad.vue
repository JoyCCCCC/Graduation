<template>
  <div>
    <!-- 暂时显示 方便调试 -->
    <!-- <div>name: {{ userInfo.userName }}</div>
    <div>id: {{ userInfo.id.userId }}</div>
    <div>token: {{ userInfo.accessToken }}</div> -->
    <div class="header-body">
      <div class="header-body-left">
        <div class="header-body-left-text">
          <div class="header-body-left-text-user">
            {{ userInfo && userInfo.id && userInfo.id.userName }}，欢迎回来！
          </div>
          <!-- <div style="color:rgb(173, 173, 173)">
                xx部 - 职位 - {{ user }}
              </div> -->
        </div>
      </div>
      <div class="header-body-right" />
    </div>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="grid-content bg-light" shadow="hover">
          <div slot="header" class="tx-blue">
            <span>未完成作业列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '作业 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="grid-content bg-light" shadow="hover">
          <div slot="header" class="tx-blue">
            <span>未批改作业列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '作业 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="grid-content bg-light" shadow="hover">
          <div slot="header" class="tx-blue">
            <span>已批改作业列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '作业 ' + o }}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="grid-content bg-light" shadow="hover">
          <div slot="header" class="tx-blue">
            <span>已订正作业列表</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ '作业 ' + o }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style scoped>
    /* .el-col {
      border-radius: 20px;
    } */
  .el-row {
    margin-bottom: 10px;
  }
  .bg-light {
    background: rgb(255, 255, 255);
  }
  .tx-blue {
    color: #38a5ff;
  }
  .grid-content {
    border-radius: 20px;
    min-height: 36px;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }
</style>
