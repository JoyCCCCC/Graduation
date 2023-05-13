<template>
  <div>
    <el-card class="mb-18">
      <div slot="header" class="clearfix">
        <i class="bar" />
        <span>审批记录</span>
      </div>
      <div class="block flow-record">
        <el-timeline :reverse="true">
          <el-timeline-item
            v-for="(item, index) in flowList"
            :key="index"
            placement="top"
            :timestamp="item.commentDateTime"
          >
            <div slot="dot" class="circle-name">
              {{ item.commentBy && item.commentBy.userName | getName }}
            </div>
            <el-card>
              <div class="text mb-8">
                {{ item.flowCommentEnum.key | flowType }}
              </div>
              <el-tag type="success">{{ item.content }}</el-tag>
              <!-- <el-form :inline="true" class="form-text-inline mt-8">
                <el-form-item label="评论内容：">
                  <span class="text">{{ item.flowCommentEnum.key | flowType }}</span>
                </el-form-item>
                <el-tag v-if="item.flowCommentEnum.key===99" type="success">{{ item.content }}</el-tag>
                <el-form-item label="评论人：">
                  <span class="text">{{ item.commentBy&&item.commentBy.userName }}</span>
                </el-form-item>
              </el-form> -->
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-card>
  </div>
</template>

<script>
import { fetchApprovalRecord } from '@/api/approve'
export default {
  name: 'ApproveRecord',
  components: {},
  filters: {
    flowType(key) {
      // 审批意见:1-审批通过,3-审批驳回,8-审批拒绝，99-评论
      const keyMap = {
        1: '已同意',
        3: '已驳回',
        2: '已拒绝',
        9: '发起审批',
        10: '重新申请',
        99: '添加了评论'
      }
      return keyMap[key]
    },

    getName(userName) {
      let result = ''
      if (userName) {
        result = userName.slice(-2)
      }
      return result
    }
  },
  props: {
    flowInstanceId: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      flowList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      if (this.flowInstanceId) {
        fetchApprovalRecord(this.flowInstanceId).then(res => {
          this.flowList = res
        })
      }
    }
  }
}
</script>

<style lang='scss'>
.flow-record {
  margin-top: 20px;
  padding-right: 30px;
  .el-timeline-item__dot {
    left: -15px;
    top: -8px;
    .circle-name {
      width: 40px;
      height: 40px;
      background: #1890ff;
      border-radius: 100%;
      color: #fff;
      text-align: center;
      line-height: 40px;
    }
  }
  .el-timeline-item__wrapper {
    padding-left: 40px;
  }
  .el-timeline-item {
    padding-bottom: 40px;
  }
  .el-card__body {
    padding-bottom: 12px;
  }
}
</style>

<style lang="scss" scoped>
.form-text-inline {
  .el-form-item {
    margin-bottom: 0;
    margin-right: 30px;
  }
}
</style>
