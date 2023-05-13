import ReimbursementApproveInfo from './detail/reimbursement-approve/ReimbursementApproveInfo'
import { editReimbursement } from '@/api/approve'

// 业务类型：
// 1-出差申请，2-报销申请，3-用章申请，10-招待申请，11-招待提额申请，12-活动申请，20-月度预算申请，
// 21-年度预算申请，，** 项目，100-商机确认申请，101-立项申请，102-报价申请，103-中标申请，
// 104-收入合同申请，105-支出合同申请，106-开票申请，107-采购申请（系统集成/售前），108-采购合同申请，
// 109-采购付款申请，110-项目预算申请

/**
 * 已发起tab下，若是被驳回，则发起人查看详情时是可编辑状态并且可以重新发起审批申请
 * 在详情页中  根据详情数据判断当前是否是 发起人查看以及当前审批状态
 * 进入详情页方式  1.点击工作台某条审批  2.从审批列表点击进入
 */

/**
 * component 对应显示的审批信息组件
 * approveService  驳回后重新发起审批调用的接口
 */

/**
 * flowInstanceStatus
 * // NO_START(1, '未开始') 驳回

// APPROVAL(2, '审批中'),

// END(91, '审批通过结束'),

// FAIL(92, '审批不通过结束')
 */
export const approveConfig = {
  1: { // 出差申请

  },
  2: { // 报销申请
    component: ReimbursementApproveInfo,
    reApproveService: editReimbursement
  },
  109: { // 报销申请
    component: null,
    reApproveService: ''
  }
}

export const btnType = {
  AGREE: 'agree', // 同意
  REFUSE: 'refuse', // 拒绝
  REJECT: 'reject', // 驳回
  COMMENT: 'comment', // 评论
  RE_APPLY: 'reApply' // 驳回后重新发送
}
