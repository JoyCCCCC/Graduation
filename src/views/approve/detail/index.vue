<template>
  <div class="approve-page">
    <div>
      <!-- 父组件要获取该子组件表单数据，则子组件表的绑定对象需为approveInfo -->
      <component
        :is="approveCfg.component"
        ref="child"
        :business-id="businessId"
        :flow-instance-id="flowInstanceId"
        :editable="editable"
        :approve-detail="approveDetail"
      />
    </div>
    <div>
      <ApproveRecord :key="refreshCount" :flow-instance-id="flowInstanceId" />
    </div>
    <div>
      <ApproveFlowChart :flow-instance-id="flowInstanceId" />
    </div>

    <div class="fix-btn-bar" :style="{ marginLeft: offset+'px' }">
      <div class="btn-bar">
        <el-button v-if="!isSelf && canDeal" type="primary" @click="handelClick(btnType.AGREE)">同意</el-button>
        <el-button v-if="!isSelf && canDeal" @click="handelClick(btnType.REFUSE)">拒绝</el-button>
        <el-button v-if="!isSelf && canDeal" @click="handelClick(btnType.REJECT)">驳回</el-button>
        <el-button v-if="editable" type="primary" @click="handelClick(btnType.RE_APPLY)">申请</el-button>
        <el-button @click="handelClick(btnType.COMMENT)">评论</el-button>
      </div>
    </div>
    <el-dialog
      v-if="FormVisible"
      :title="titleName"
      :visible.sync="FormVisible"
      :close-on-click-modal="CLOSE_ON_CLICK_MODAL"
      width="800px"
    >
      <el-form ref="commentForm" :model="commentForm" label-width="80px">
        <el-form-item :label="commentForm.label" prop="remark" :rules="{ required: isRequireComment, message: '请输入评论内容', trigger: 'blur' }">
          <el-input
            v-model="commentForm.remark"
            type="textarea"
            :rows="5"
            :placeholder="`请输入${commentForm.label}`"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="FormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import {
  fetchApprovalDetail, sendApproval, sendComment
} from '@/api/approve'

import { approveConfig, btnType } from '../detail-cfg'

import ReimbursementApproveInfo from './reimbursement-approve/ReimbursementApproveInfo'
import ApproveRecord from '../components/ApproveRecord'
import ApproveFlowChart from '../components/ApproveFlowChart'
import { mapGetters } from 'vuex'
export default {
  name: 'ApproveDetail',
  components: { ReimbursementApproveInfo, ApproveRecord, ApproveFlowChart },
  data() {
    return {
      // id: this.$route.params.id || '',
      FormVisible: false,
      clickType: '',
      commentForm: {
        label: '',
        remark: ''
      },
      titleName: '审批处理',
      body: {
        'flowCommentEnum': 99,
        'content': '采购是否已落实'
      },
      approveCfg: {
        component: null,
        servreApproveServiceice: ''
      },
      flowInstanceId: this.$route.params.flowInstanceId,
      approveDetail: {},
      businessId: '',
      businessTypeId: '',
      // editable: false,
      btnType: btnType,
      refreshCount: 0,
      CLOSE_ON_CLICK_MODAL: this.$defaultCfg.closeOnClickModal
    }
  },
  computed: {
    ...mapGetters([
      'sidebar', 'userInfo'
    ]),
    offset() {
      return this.sidebar.opened ? 210 / 2 : 54 / 2
    },
    isSelf() {
      const userId = this.userInfo.id.userId
      const creatorUserId = this.approveDetail && this.approveDetail.creator && this.approveDetail.creator.userId
      return Number(userId) === Number(creatorUserId)
    },
    // 判断当前是否是自己在查看自己的审批
    // 状态为驳回 且 是自己查看时 需可编辑并可重新发起申请
    editable() {
      return this.isSelf && this.approveDetail && this.approveDetail.flowInstanceStatus && this.approveDetail.flowInstanceStatus.key === '1'
    },
    canDeal() {
      return !!(this.approveDetail && this.approveDetail.taskId)
    },
    isRequireComment() {
      return this.clickType === btnType.COMMENT
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      // this.flowInstanceId = this.$route.params.flowInstanceId
      if (this.flowInstanceId) {
        // console.log('2222222')
        // const userId = this.userInfo.id.userId
        fetchApprovalDetail(this.flowInstanceId).then(res => { // 获取审批详情数据
          // console.log(res, 'sss')
          if (res) {
            this.approveDetail = res
            this.businessTypeId = res.businessTypeId && res.businessTypeId.key
            this.businessId = res.businessId
            if (this.businessTypeId) {
              this.approveCfg = approveConfig[this.businessTypeId]
            } else {
              this.$message.error('未定义的审批流程！')
            }
          }
        })
      }
    },

    handelClick(type) {
      if (type === btnType.RE_APPLY) { // 重新发起
        console.log(this.$refs.child.$refs.childForm)
        this.$refs.child.$refs.childForm.validate(valid => {
          if (valid) {
            let body = this.$refs.child.approveInfo
            if (this.$refs.child.beforeSubmit) {
              body = this.$refs.child.beforeSubmit()
            }
            this.approveCfg.reApproveService(body, this.approveDetail.businessId).then(res => {
              this.initPage()
              this.$message.success('操作成功！')
              this.refreshCount++
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else {
        if (type === btnType.COMMENT) {
          this.commentForm.label = '评论内容'
          this.commentForm.remark = ''
          this.titleName = '评论'
        } else {
          this.commentForm.label = '审批意见'
          this.commentForm.remark = ''
          this.titleName = '审批'
        }
        this.clickType = type
        this.FormVisible = true
      }
    },
    submit() {
      this.$refs.commentForm.validate(valid => {
        if (valid) {
          if (this.clickType) {
            if ([btnType.AGREE, btnType.REFUSE, btnType.REJECT].includes(this.clickType)) {
              const _approveTypeEnum = {
                [btnType.AGREE]: 1,
                [btnType.REFUSE]: 3,
                [btnType.REJECT]: 2
              }
              const body = {
                taskId: this.approveDetail.taskId,
                content: this.commentForm.remark,
                approveTypeEnum: _approveTypeEnum[this.clickType]
              }
              sendApproval(body, this.flowInstanceId).then(() => {
                this.$message.success('操作成功！')
                this.$router.go(-1)
              })
            } else if (this.clickType === btnType.COMMENT) {
              const body = {
                flowCommentEnum: 99,
                content: this.commentForm.remark
              }
              sendComment(body, this.flowInstanceId).then(res => {
                this.$message.success('操作成功！')
                this.refreshCount++
              })
            }
            this.FormVisible = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fix-btn-bar{
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    width:100%;
    background: #fff;
    text-align: center;
    padding:12px 0;
    border-top:1px solid #d9d9d9;
    transition:margin-left .3s;
}
.approve-page{
    min-height: calc(100vh - 70px);
    padding-bottom:57px;
}
</style>
