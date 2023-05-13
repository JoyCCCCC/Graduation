<template>
  <div>
    <el-card>
      <div class="mb-18">
        <el-select
          v-model="projectSelect"
          style="margin-right:10px"
          multiple
          remote
          filterable
          :remote-method="searchProject"
          :loading="loading"
        >
          <el-option v-for="item in projectOptions" :key="item.key" :value="item.value" :label="item.label" />
        </el-select>
        <el-button type="primary" @click="toAddForm">
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
        <el-table-column label="项目" show-overflow-tooltip align="center" prop="project.value" />
        <el-table-column label="客户对象" prop="customer.customerName" show-overflow-tooltip align="center" />
        <el-table-column label="项目状态" prop="projectSubStatus.value" show-overflow-tooltip align="center">
          <!-- <template slot-scope="scope">
            {{ scope.row.projectSubStatus|projectSubStatusFilter }}
          </template> -->
        </el-table-column>
        <el-table-column label="沟通时间" prop="time" show-overflow-tooltip align="center" />
        <el-table-column label="沟通地点" prop="place" show-overflow-tooltip align="center" />
        <el-table-column label="创建人" prop="creator.userName" show-overflow-tooltip align="center" />
        <el-table-column label="创建时间" prop="createTime" show-overflow-tooltip align="center" />
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toDetail(scope.row)">查看详情</el-button>
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
      </div>
    </el-card>
    <!-- <el-dialog
      v-if="dialogVisi"
      :visible.sync="dialogVisi"
      :title="titleName"
      destroy-on-close
      @close="onCloseProjectForm"
    >
      <CommunicateRecord :communicate-record-data="communicateRecordData" @oSuccessCallback="oSuccessCallback" @onCancel="onCloseProjectForm" />
    </el-dialog> -->
  </div>
</template>

<script>
// import CommunicateRecord from './components/CommunicateRecord.vue'
import { getconmmunicateList } from '@/api/intergratedoffice'
import Pagination from '@/components/Pagination'
import { fetchProject, fetchEmployeeData } from '@/api/dict'

export default {
  components: { Pagination },
  data() {
    return {
      selectList: [],
      loading: false,
      projectSelect: [],
      body: {
        projectId: null,
        customerId: null
      },
      type: this.$route.query.query,
      titleName: '新增沟通记录',
      projectId: 1,
      customer: 1,
      formStatus: 'communicate',
      btnMap: {
        communicate: '新增沟通记录',
        follow: '新增跟进记录'
      },
      dialogVisi: false,
      projectOptions: [],
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
    this.selectProject()
  },
  methods: {
    searchProject(query) {
      this.loading = true
      if (query !== '') {
        this.loading = false
        setTimeout(() => {
          this.projectOptions = this.selectList.filter((item) => {
            return item.value.indexOf(query)
            // console.log(item.value.indexOf(query), 1111)
          })
          console.log(this.projectOptions, 23214)
        }, 200)
      }
    },
    selectProject() {
      fetchEmployeeData().then(res => {
        console.log(res)
        this.projectOptions = res
        this.selectList = res
      })
    },
    toDetail(rowData) {
      this.$router.push({
        path: '/intergratedoffice/communicateRecord',
        query: {
          communicationRecordId: rowData.communicationRecordId,
          isAdd: false,
          formStatus: this.formStatus,
          customer: rowData.customer.customerId
        }
      })
      console.log(rowData.communicationRecordId, rowData.customer.customerId, rowData)
    },
    getQuery() {
      const routerformStaus = this.$route.query.formStatus
      const routerprojectId = this.$route.query.project
      const routercustomer = this.$route.query.customer
      this.formStatus = routerformStaus
      if (this.formStatus === 'follow') {
        this.type = 2
        this.listquery.typeId = 2
        this.$route.meta.title = '跟进记录'
        this.projectId = routerprojectId
        this.body.projectId = this.projectId
        this.customer = routercustomer
        console.log('qwerty', this.projectId, 'wert', this.customer)
      } else if (this.formStatus === 'communicate' || this.formStatus === undefined) {
        this.formStatus = 'communicate'
        this.type = 1
        this.listquery.typeId = 1
        this.$route.meta.title = '沟通记录'
        this.body.customerId = routercustomer
      }
      console.log(11, this.formStatus, this.type)
    },
    // edit(rowData) {
    //   this.titleName = '修改'
    //   this.dialogVisi = true
    //   this.communicateRecordData =
    //   //  rowData
    //   {
    //     communicationRecordId: rowData.communicationRecordId,
    //     'typeId': rowData.typeId,
    //     'projectId': rowData.projectId,
    //     'projectMainStatus': 1,
    //     'projectSubStatus': rowData.projectSubStatus,
    //     'customer': rowData.customer.customerId,
    //     'position': rowData.position,
    //     'linkWay': rowData.linkWay,
    //     'place': rowData.place,
    //     'time': rowData.time,
    //     'purpose': rowData.purpose,
    //     'content': rowData.content,
    //     'existingProblems': rowData.existingProblems,
    //     'proposal': rowData.proposal,
    //     'remark': rowData.remark,
    //     'accessory': rowData.accessory
    //   }
    //   console.log(11, this.communicateRecordData, this.type, this.communicateRecordData.typeId)
    // },
    oSuccessCallback() {
      this.dialogVisi = false
      this.getTableList()
    },
    getTableList() {
      getconmmunicateList(this.listquery, this.body).then(res => {
        console.log(res.records, res)
        this.list = res.records
        this.resData = res
      })
      this.getTableList
    },
    // toAddTable() {
    //   this.$router.push({
    //     path: '/intergratedoffice/communicateList'
    //     query:{formStatus:this.formStatus,projectId:this.projectId}
    //   })
    // },
    toAddForm() {
      if (this.formStatus === 'follow') {
        this.$router.push({
          path: '/intergratedoffice/communicateRecord',
          query: {
            formStatus: this.formStatus,
            projectId: this.projectId,
            isAdd: true,
            customer: this.customer
          }
        })
        console.log(this.formStatus, this.projectId, this.customer, '跟进')
      } else if (this.formStatus === 'communicate') {
        this.$router.push({
          path: '/intergratedoffice/communicateRecord',
          query: { formStatus: this.formStatus, isAdd: true }
        })
        console.log(this.formStatus, '沟通')
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
