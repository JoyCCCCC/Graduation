<template>
  <div>
    <el-card>
      <div>
        <el-form :inline="true" :model="formInline" size="small" class="form-inline-nolabel mt-18 b-line">
          <el-form-item>
            <el-input v-model="formInline.search" placeholder="请输入内容" />
          </el-form-item>
          <el-form-item class="ml-12">
            <el-button type="primary" size="small">查询</el-button>
            <el-button size="small" @click="dialogFormVisible=true">招待报销</el-button>
            <el-button size="small" @click="dialogFormVisible1=true">查询余额</el-button>
            <span style="margin-left:25px;color:red">请在招待内48小时申报，否则无效</span>
          </el-form-item>
        </el-form>
      </div>

      <el-table v-loading="listLoading" class="mb-18" :data="list" border style="width: 100%" margin-top="50px">
        <el-table-column prop="title" label="项目主题" align="center" />

        <el-table-column prop="type" label="项目类型" align="center" />

        <el-table-column prop="name" label="项目名称" align="center" />

        <el-table-column prop="amount" label="项目金额" align="center" />

        <el-table-column prop="address" label="项目地址" align="center" />

        <el-table-column prop="invitedNum" label="宴请人数" align="center" />
        <el-table-column prop="accompanyNum" label="我司陪同人数" align="center" />
        <el-table-column prop="time" label="时间" align="center" />
        <el-table-column prop="createTime" label="申请时间" align="center" />
        <el-table-column prop="createusename" label="申请人" align="center" />
      </el-table>

      <div class="clearfix">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.limit"
          class="pull-right"
          @pagination="fetchData"
        />
      </div>
      <el-dialog
        title="招待报销"
        custom-class="customWidth"
        :visible.sync="dialogFormVisible"
        customclass="customWidth"
        width="55%"
      >
        <el-form
          ref="form"
          :model="form"
          label-width="100px"
          style="width: 700px; margin-top:10px;"
          label-position="right"
        >
          <el-row :gutter="32">
            <el-col :span="11">
              <el-form-item label="申请主题">
                <el-input v-model="form.projectName" style="width:240px;" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="项目类型">
                <el-select v-model="form.region" placeholder="请选择项目类型" style="width:240px" size="small">
                  <el-option label="类型1" :value="XXX" />
                  <el-option label="类型2" :value="XXX" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="11">
              <el-form-item label="招待类型">
                <el-select v-model="form.region" placeholder="请选择招待类型" style="width:240px" size="small">
                  <el-option label="类型1" :value="yanqing" />
                  <el-option label="类型2" :value="juhui" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="时间" size="small">
                <el-date-picker v-model="form.date" style="width:240px" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="11">
              <el-form-item size="small" class="demo-ruleForm" label="金额" prop="amount">
                <!-- :rules="[ {type:'number', message:'金额必须为数字'}]" -->
                <el-input v-model="form.money" style="width:240px" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="地点">
                <el-input v-model="form.address" size="small" style="width: 240px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="32">
            <el-col :span="11">
              <el-form-item label="宴请人数">
                <el-input v-model="form.nvitedNum" style="width: 240px" size="small" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="我司陪同人数">
                <el-input v-model="form.accompanyNum" style="width: 240px" size="small" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="32">
              <el-form-item label="备注" size="small">
                <el-input v-model="form.remark" type="textarea" style="width:580px" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="上传发票">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="支付凭证">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
          <el-button style="margin-left:300px" @click="dialogFormVisible=false">取 消</el-button>
          <el-button type="primary" style="align:center" @click="dialogFormVisible = false">提交</el-button>
        </el-form>

      </el-dialog>
      <el-dialog
        custom-class="customWidth"
        title="额度查询"
        :visible.sync="dialogFormVisible1"
        customclass="customWidth"
        width="20%"
      >
        <el-form
          ref="dataForm"
          :model="temp"
          label-position="left"
          label-width="100px"
          style="width: 100px   margin-top:10px;"
        >
          <el-form-item label="总余额:" prop="type" />
          <el-form-item label="可用额度:" prop="type" />

          <el-form />
        </el-form>
      </el-dialog>
    </el-card>
  </div>
</template>

<!-- </div class="filter-container"></div class="app-container"> -->

<script>
import {
  getList
} from '@/api/entertainment'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },

  data() {
    return {
      total: 0,
      query: {
        page: 1,
        limit: 10 },
      input1: '',
      list: null,
      listLoading: true,

      form: {
        projectName: '',
        date: new Date(),
        amount: '',
        address: '',
        nvitedNum: '',
        accompanyNum: '',
        remark: '',
        projectName2: '',
        reason: ''
      },
      formInline: {
        user: '',
        region: ''

      },
      temp: {

      },
      yanqing: {

      },
      XXX: {

      },
      juhui: {

      },

      dialogFormVisible: false,
      dialogFormVisible1: false
    }
  },

  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(1, response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
