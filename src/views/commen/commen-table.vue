<template>
  <div>
    <el-card>
      <div class="mb-18">
        <el-button type="primary" size="small">添加项目</el-button>
      </div>
      <el-table :data="projectList" border stripe size="small" class="mb-18">
        <el-table-column prop="projectNo" label="项目编号" show-overflow-tooltip align="center" />
        <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip align="center" />
        <el-table-column prop="peojectTypeId" label="渠道类型" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.peojectTypeId === 1" size="small">集成</span>
            <span v-else size="small">行政</span>
          </template>
        </el-table-column>
        <el-table-column prop="estimateSigningAmount" label="预计签单金额" width="100px" align="center" />
        <el-table-column prop="estimateSigningTime" label="预计签单时间" width="100px" align="center" />
        <el-table-column prop="projectMainStatus" label="项目状态" show-overflow-tooltip align="center" />
        <el-table-column prop="auditStatus" label="审批状态" show-overflow-tooltip align="center" />
        <el-table-column prop="winningRate" label="赢率" width="60px" show-overflow-tooltip align="center" />
        <el-table-column prop="areaName" label="所在省" show-overflow-tooltip align="center" />
        <el-table-column prop="saleUserName" label="客户信息" show-overflow-tooltip align="center" />
        <el-table-column prop="createUserName" label="报备人" show-overflow-tooltip align="center" />
        <el-table-column prop="createTime" label="报备时间" show-overflow-tooltip align="center" />
        <el-table-column prop="opration" label="操作" width="240px" align="center">
          <template>
            <div class="btn-text-group">
              <el-button type="text">立项</el-button>
              <el-button type="text">沟通/跟进</el-button>
              <el-button type="text">修改</el-button>
              <el-button type="text">废止</el-button>
              <el-button type="text">分析报告</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="clearfix">
        <el-pagination
          class="pull-right"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectList: [{
        'projectId': '通信工程',
        'projectNo': 'hnfjxm20210424',
        'projectName': '台商GA服务器采购',
        'peojectTypeId': 1,
        'estimateSigningAmount': 1.1,
        'estimateSigningTime': 1,
        'winningRate': 90, // 赢率
        'auditStatus': '审批中',
        'lastFollowUserName': '十一',
        'areaName': '福建省',
        'saleUserName': '1234567',
        'createTime': '2021-05-01',
        'createUserName': '十二',
        'updateTime': '2021-05-01',
        'updateUserName': '十二',
        'projectMainStatus': 1
      },
      {
        'projectId': '通信工程',
        'projectNo': 'hnfjxm20210424',
        'projectName': '台商GA服务器采购',
        'peojectTypeId': 2,
        'estimateSigningAmount': 1.1,
        'estimateSigningTime': 1,
        'winningRate': 90, // 赢率
        'auditStatus': '审批中',
        'lastFollowUserName': '十一',
        'areaName': '福建省',
        'saleUserName': '1234567',
        'createTime': '2021-05-01',
        'createUserName': '十二',
        'updateTime': '2021-05-01',
        'updateUserName': '十二',
        'projectMainStatus': 1
      }
      ]
    }
  },
  created() {}
}
</script>

<style>
</style>
