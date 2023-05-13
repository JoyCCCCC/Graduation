<template>
  <div>
    <el-card>
      <div class="mb-18">
        <el-button type="primary" @click="addForm">
          {{ btnMap[formStatus] }}
        </el-button>
      </div>
      <el-table
        border
        stripe
        size="small"
        class="mb-18"
        :data="list"
      >
        <el-table-column label="项目" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button type="text" @click.native.prevent="goDetail(scope.row)">
              {{ scope.row.projectId }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="客户对象" prop="customer.customerName" show-overflow-tooltip align="center">
          <!-- <template slot-scope="scope">
            {{ scope.row.customerId|customerNameFilter }}
          </template> -->
        </el-table-column>
        <el-table-column label="项目状态" prop="projectSubStatus" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            {{ scope.row.projectSubStatus|projectSubStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="沟通时间" prop="time" show-overflow-tooltip align="center" />
        <el-table-column label="沟通地点" prop="place" show-overflow-tooltip align="center" />
        <el-table-column label="创建人" prop="creator.userName" show-overflow-tooltip align="center" />
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="clearfix">
        <Pagination
          v-show="resData.total > 0"
          :total="resData.total"
          :page.sync="listquery.pageIndex"
          :limit.sync="listquery.pageSize"
          class="text-right"
          @pagination="getTableList"
        />
      </div></el-card>
    <el-dialog
      v-if="dialogVisi"
      :visible.sync="dialogVisi"
      :title="titleName"
      destroy-on-close
      @close="onCloseProjectForm"
    >
      <CommunicateRecord :communicate-record-data="communicateRecordData" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseProjectForm" />
    </el-dialog>
  </div>
</template>

<script>
import CommunicateRecord from './components/CommunicateRecord.vue'
import { getconmmunicateList } from '@/api/intergratedoffice'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination, CommunicateRecord },
  filters: {
    projectSubStatusFilter(status) {
      const statusMap = {
        1: '准备-机会点',
        2: '立项-立项',
        3: '招投标-协助投标',
        4: '招投标-询价'
      }
      return statusMap[status]
    },
    customerNameFilter(status) {
      const statusMap = {
        1: '张三',
        2: '李四',
        3: '王五'
      }
      return statusMap[status]
    }
  },

  data() {
    return {
      type: this.$route.query.query,
      titleName: '新增沟通记录',

      communicateRecordData: {

      },
      formStatus: 'communicate',
      btnMap: {
        communicate: '新增沟通记录',
        follow: '新增跟进记录'
      },
      dialogVisi: false,
      list: [],
      resData: {
        total: 0
      },
      listquery: {
        pageIndex: 1,
        pageSize: this.$defaultCfg.pageSize,
        typeId: 1
      }
      // CLOSE_ON_CLICK_MODAL: this.$defaultCfg.closeOnClickModal
    }
  },
  created() {
    this.getTableList()
    this.getQuery()
  },
  methods: {
    getQuery() {
      const routerformStaus = this.$route.query.formStatus
      this.formStatus = routerformStaus
      if (this.formStatus === 'follow') {
        this.type = 2
        this.$route.meta.title = '跟进记录'
      } else if (this.formStatus === 'communicate' || this.formStatus === undefined) {
        this.formStatus = 'communicate'
        this.type = 1
        this.$route.meta.title = '沟通记录'
      }
      console.log(11, this.formStatus, this.type)
    },
    edit(rowData) {
      this.titleName = '修改'
      this.dialogVisi = true
      this.communicateRecordData =
      //  rowData
      {
        communicationRecordId: rowData.communicationRecordId,
        'typeId': rowData.typeId || this.type,
        'projectId': 1,
        'projectMainStatus': 1,
        'projectSubStatus': rowData.projectSubStatus,
        'customer': rowData.customer.customerId,
        'position': rowData.position,
        'linkWay': rowData.linkWay,
        'place': rowData.place,
        'time': rowData.time,
        'purpose': rowData.purpose,
        'content': rowData.content,
        'existingProblems': rowData.existingProblems,
        'proposal': rowData.proposal,
        'remark': rowData.remark,
        'accessory': rowData.accessory
      }
      console.log(11, this.communicateRecordData, this.type, this.communicateRecordData.typeId)
    },
    oSuccessCallback() {
      this.dialogVisi = false
      this.getTableList()
    },
    getTableList() {
      getconmmunicateList(this.listquery).then(res => {
        console.log(res.records, res)
        this.list = res.records
        this.resData = res
      })
      this.getTableList
    },
    goDetail() {
      const path = `/intergratedoffice/CommunicateDetail`
      this.$router.push(path)
    },
    addForm() {
      if (this.formStatus === 'follow') {
        this.titleName = '新增跟进记录'
      } else {
        this.titleName = '新增沟通记录'
      }
      this.dialogVisi = true
    },
    // closeForm() {
    //   this.$refs.communicateRecordData.clearValidate()
    // }
    onCloseProjectForm() {
      this.dialogVisi = false
      this.communicateRecordData = {}
    }
  }
}
</script>
