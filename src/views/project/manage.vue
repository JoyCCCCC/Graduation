<template>
  <div class="projectmanagepage">
    <el-card>
      <div class="mb-18">
        <el-button type="primary" size="small" @click="add">添加项目</el-button>
      </div>
      <el-table
        border
        stripe
        :data="resList"
        element-loading-text="Loading"
        size="small"
        class="mb-18"
      >
        <el-table-column
          prop="projectNo"
          label="项目编号"
          width="130px"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click.native.prevent="onDetail(scope.row,{ type: projectBtnType.DETAIL })"
            >
              {{ scope.row.projectNo }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" show-overflow-tooltip />
        <el-table-column
          prop="projectTypeId.value"
          label="渠道类型"
          show-overflow-tooltip
          width="75px"
        />
        <el-table-column
          prop="estimateSigningAmount"
          label="预计签单金额"
          width="100px"
          header-align="center"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.estimateSigningAmount | toThousandFilter }}
          </template>
        </el-table-column>
        <el-table-column
          prop="estimateSigningTime"
          label="预计签单时间"
          width="100px"
        />
        <el-table-column
          prop="projectSubStatus.value"
          label="项目状态"
          show-overflow-tooltip
          width="110px"
        />
        <!-- <template slot-scope="scope">
            <span>{{ scope.row.projectSubStatus }}--{{ scope.row.projectSubStatus | statusFilter }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="auditStatus.value"
          label="审批状态"
          show-overflow-tooltip
          width="75px"
        />
        <el-table-column
          prop="winningRate"
          label="赢率(%)"
          width="70px"
          show-overflow-tooltip
        />
        <el-table-column
          prop="area.areaName"
          label="所在省"
          show-overflow-tooltip
          width="75px"
        />
        <el-table-column
          prop="customer.customerName"
          label="客户信息"
          show-overflow-tooltip
          width="75px"
        />
        <el-table-column
          prop="creator.userName"
          label="报备人"
          show-overflow-tooltip
          width="75px"
        />
        <el-table-column
          prop="createTime"
          label="报备时间"
          show-overflow-tooltip
          width="140px"
        />
        <el-table-column prop="opration" label="操作" width="200px">
          <template slot-scope="scope">
            <div class="btn-text-group">
              <el-button
                v-for="item in getBtn(
                  scope.row.projectTypeId.key,
                  scope.row.projectSubStatus.key
                )"
                :key="item.type"
                type="text"
                @click="onDetail(scope.row,item)"
              >{{ item.name }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="resData.total > 0"
        :total="resData.total"
        :page.sync="params.pageIndex"
        :limit.sync="params.pageSize"
        class="text-right"
        @pagination="fetchData"
      />
    </el-card>
    <el-dialog
      v-if="projectFormVisible"
      :close-on-click-modal="CLOSE_ON_CLICK_MODAL"
      :title="titleName"
      :visible="projectFormVisible"
      destroy-on-close
      width="800px"
      @close="onCloseProjectForm"
    >
      <ProjectForm :project-form-data="projectFormData" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseProjectForm" />
    </el-dialog>

    <el-dialog
      title="项目废止"
      :visible.sync="DialogVisibleAbolish"
      width="800px"
    >
      <el-form :model="abolishtype" label-width="120px">
        <el-form-item label="废止类型：">
          <el-select v-model="abolishtype.TypeId" placeholder="请选择废止类型">
            <el-option label="对手太强" :value="1" />
            <el-option label="报价错误" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="abolishtype.mark" type="textarea" />
        </el-form-item>
        <el-form-item label="附件：">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/">
            <el-button size="mini" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="DialogVisibleAbolish = false"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="DialogVisibleAbolish = false"
        >保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :close-on-click-modal="CLOSE_ON_CLICK_MODAL"
      title="提示"
      :visible="flowDialog.visible"
      destroy-on-close
      width="500px"
      @close="onFlowClose"
    >
      <el-form ref="flowForm" :model="flowForm" label-width="120px">
        <el-form-item label="是否需要交付：" prop="needDeliver" :rules="{ required: true, message: '请选择是否需要交付', trigger: 'blur' }">
          <el-select v-model="flowForm.needDeliver" placeholder="请选择是否需要交付">
            <el-option label="是" :value="true" />
            <el-option label="否" :value="false" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          size="small"
          @click="onFlowClose"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="onFlowStatus"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchProjectList, flowProject, addAndModifyProject, offerApply
} from '@/api/project'
import Pagination from '@/components/Pagination'
import ProjectForm from './components/ProjectForm'
import { btnImplode, btnChannel, projectBtnType } from '@/views/project/constant'

export default {
  components: {
    Pagination, ProjectForm
  },

  data() {
    return {
      DialogVisibleAbolish: false,
      btnDialogVisible: false,
      flowDialog: {
        visible: false,
        data: {}
      },
      flowForm: {},
      cur: '',
      itemName: '',
      abolishtype: {},

      projectFormVisible: false,
      projectFormData: {},
      titleName: '添加项目',
      params: {
        incomeExpensesType: this.$attrs.incomeExpensesType || 1,
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize
      },
      body: {

      },
      resData: {
        total: 0
      },
      resList: [],
      btnImplode: btnImplode, // 集成按钮文字
      btnChannel: btnChannel, // 渠道按钮文字
      projectBtnType: projectBtnType,
      CLOSE_ON_CLICK_MODAL: this.$defaultCfg.closeOnClickModal
    }
  },
  computed: {
    // newestimateSigningAmount() {
    //   return this.addProjectForm.product.reduce((total, v) => total + Number(v.amount), 0)
    // }
  },
  watch: {
    // newestimateSigningAmount(newval, oldval) {
    //   if (newval !== oldval) {
    //     this.addProjectForm.estimateSigningAmount = newval
    //   }
    // }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchProjectList(this.params, this.body).then(res => {
        if (res) {
          this.resData = res
          this.resList = res.records
        }
      })
    },

    // 添加/修改项目回调
    oSuccessCallback(body) {
      addAndModifyProject(body).then(() => {
        this.projectFormVisible = false
        if (!body.projectId) {
          this.params.pageIndex = 1
        }
        this.fetchData()
      }, () => {})
    },

    getBtn(projectType, status) {
      // projectType 项目类型 0未知（未选择类型） 1渠道  2集成

      const common = [{ type: projectBtnType.ABOLISH, name: '废止' }, { type: projectBtnType.FOLLOW, name: '跟进记录' }]
      let result = []
      // if(){ //
      //   result=common
      // }
      if (projectType === 0 && status && this.btnImplode[status]) {
        result = this.btnImplode[status].concat(common)
      }
      if (projectType === 1 && status && this.btnChannel[status]) {
        result = this.btnChannel[status].concat(common)
      }
      if (projectType === 2 && status && this.btnImplode[status]) {
        result = this.btnImplode[status].concat(common)
      }
      return result
    },
    add() {
      this.titleName = '添加项目'
      this.projectFormVisible = true
      this.projectFormData = {}
    },

    onCloseProjectForm() {
      this.projectFormVisible = false
      this.projectFormData = {}
    },

    onDetail(rowData, { name, type }) {
      // console.log(rowData, 'sdsdsd')
      // TENDER_OVER 投标完成
      // 以下类型事件，触发弹窗提示，调用接口进入下一个项目状态，不进入详情页
      // if ([projectBtnType.TENDER_OVER, 'over', 'signed', 'inquirystart', 'inquiryover', 'contractstart', 'supplystart'].includes(type)) {
      if ([projectBtnType.TENDER_OVER, projectBtnType.INQUIRY_OVER, projectBtnType.SIGN_CONTRACT].includes(type)) {
        const msgMap = {
          'over': '确认结束该项目？',
          'signed': '确认合同已签署完毕？',
          [projectBtnType.TENDER_OVER]: '投标完成，确认进入询价阶段？',
          [projectBtnType.INQUIRY_OVER]: '询价完成，确认发起报价申请？',
          [projectBtnType.SIGN_CONTRACT]: '确认进入签合同阶段？'
          // [projectBtnType.SUPPLY_GOODS]: '确认进入供货阶段？'
          // [projectBtnType.SUPPLY_GOODS]: '是否需要交付'
        }

        this.$confirm(msgMap[type], '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (type === projectBtnType.INQUIRY_OVER) { // 询价完成  发起报价申请
            offerApply(rowData.projectId).then(() => {
              this.fetchData()
            })
          } else {
            const body = {
              mainStatus: rowData.projectMainStatus.key,
              subStatus: rowData.projectSubStatus.key
            // needDeliver: true 		// 是否需要交付
            }
            flowProject(body, rowData.projectId).then(() => {
              this.fetchData()
            })
          }
        }).catch(() => {})
      } else if ([projectBtnType.SUPPLY_GOODS].includes(type)) { // 需要选择是否需要交付
        this.flowDialog = {
          visible: true,
          data: rowData
        }
      } else if (type === projectBtnType.ABOLISH) { // 废止
        this.DialogVisibleAbolish = true
      } else if (type === projectBtnType.FOLLOW) { // 沟通跟进
        this.$router.push('/intergratedoffice/communicateList')
        this.$router.push({
          path: '/intergratedoffice/communicateList',
          query: {
            formStatus: projectBtnType.FOLLOW,
            recordShow: false,
            project: rowData.projectId,
            customer: rowData.customer.customerId
          }
        })
        console.log(this.customer)
      } else if (type === projectBtnType.EDIT) {
        this.titleName = '修改项目'
        this.projectFormData = rowData || {}
        this.projectFormVisible = true
      } else {
        let path = `/project/detail/${rowData.projectId}`
        if (type) {
          path = path + `/${type}`
        }
        this.$router.push(path)
      }
    },

    onFlowClose() {
      this.flowDialog = {
        visible: false,
        data: {}
      }
      this.flowForm = {}
    },

    onFlowStatus() {
      this.$refs.flowForm.validate(valid => {
        if (valid && this.flowDialog.data) {
          const body = {
            mainStatus: this.flowDialog.data.projectMainStatus.key,
            subStatus: this.flowDialog.data.projectSubStatus.key,
            needDeliver: this.flowForm.needDeliver 		// 是否需要交付
          }
          flowProject(body, this.flowDialog.data.projectId).then(() => {
            this.onFlowClose()
            this.fetchData()
          })
        } else {
          console.log('error')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped="">
</style>
