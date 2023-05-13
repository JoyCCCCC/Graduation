<template>
  <div>
    <el-card>
      <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">系统评价表格</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
        <br></el-col>
        <el-form :inline="true" :model="formInline1">
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
          <el-form-item>
        <div class="demo-input-suffix" style="width:200px; height:100%">
          <el-input
            class="input1"
            v-model="formInline1.name"
            placeholder="查询课程名字"
            prefix-icon="el-icon-search"
          />
        </div></el-form-item></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search1">搜索</el-button></el-form-item>
        </el-col>
        </el-form>
      </el-row>
      <el-divider />
      <div style="margin-top:20px&quot;">
        <el-table :data="list" border stripe size="large" class="mb-18">
          <el-table-column prop="id" label="索引" style="font-size:20px" sortable />
          <el-table-column prop="CourseId" label="课程id" style="font-size:20px" sortable />
          <el-table-column prop="CourseName" label="课程名字" style="font-size:20px" sortable />
          <el-table-column prop="StuId" label="学生id" style="font-size:20px" sortable />
          <el-table-column prop="StuName" label="学生名字" style="font-size:20px" sortable />
          <el-table-column prop="Count" label="学生消极情绪次数" style="font-size:20px" />
          <el-table-column prop="Evaluate" label="学生状态评价" style="font-size:20px" />
          <el-table-column prop="Manufacture" label="操作" style="font-size:20px">
            <template slot-scope="scope">
              <el-button size="medium" type="danger" @click="getid1(scope.$index);delDetailCol(scope.$index);">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :xs="8" :sm="8" :md="8" :lg="10" :xl="8"><br></el-col>
        <el-pagination
        @size-change="changeSizeHandle"
      @current-change="currentChangeHandle"
      :current-page="currentPage"
      background
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
      </div>
      </el-card>
      <br>
      <el-card>
        <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">教师评价表格</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
        <br></el-col>
        <el-form :inline="true" :model="formInline2">
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
          <el-form-item>
        <div class="demo-input-suffix" style="width:200px; height:100%">
          <el-input
            class="input2"
            v-model="formInline2.name"
            placeholder="查询学生名字"
            prefix-icon="el-icon-search"
          />
        </div></el-form-item></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
          <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="search2">搜索</el-button></el-form-item>
        </el-col>
        </el-form>
      </el-row>
      <el-divider />
      <div style="margin-top:20px&quot;">
        <el-table :data="list2" border stripe size="large" class="mb-18">
          <el-table-column prop="id" label="索引" style="font-size:20px" sortable />
          <el-table-column prop="TeacherId" label="教师id" style="font-size:20px" sortable />
          <el-table-column prop="CourseName" label="课程名字" style="font-size:20px" sortable />
          <el-table-column prop="StuId" label="学生id" style="font-size:20px" sortable />
          <el-table-column prop="StuName" label="学生名字" style="font-size:20px" sortable />
          <el-table-column prop="State" label="状态" style="font-size:20px" />
          <el-table-column prop="Evaluate" label="教师评价" style="font-size:20px" />
          <el-table-column prop="Manufacture" label="操作" style="font-size:20px">
            <template slot-scope="scope">
              <el-button class="edit" size="medium" @click="dialogVisible = true;getid2(scope.$index)" style="color:#409EFF">编辑</el-button>
              <el-button size="medium" type="danger" @click="getid1(scope.$index);delDetailCol2(scope.$index);">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :xs="8" :sm="8" :md="8" :lg="10" :xl="8"><br></el-col>
        <el-pagination
        @size-change="changeSizeHandle"
      @current-change="currentChangeHandle"
      :current-page="currentPage"
      background
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
        <el-dialog
          title="编辑课程"
          :visible.sync="dialogVisible"
          width="40%"
        >
          <el-form ref="dataForm" :model="dataForm" label-width="70px" :rules="rules">
            <el-form-item label="状态" prop="State">
              <el-select name="state" v-model="region" placeholder="请选择状态">
                <el-option name="yes" label="已评价" value="yes"></el-option>
                <el-option name="no" label="未评价" value="no"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="教师评价" prop="Evaluate">
              <el-input name="eva" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="title" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer mt-18">
            <el-button size="small" @click="dialogVisible = false">
              关 闭
            </el-button>
            <el-button class="save" type="primary" size="small" @click="dialogVisible = false;editList();">
              保 存
            </el-button>
          </div>
        </el-dialog>
      </div>
      </el-card>
      <div class="clearfix">
        <!-- <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.limit"
          class="pull-right"
          @pagination="fetchData"
        /> -->
      </div>
    </el-card>
  </div>
</template>
<script>
import { fetchProject } from '@/api/dict'
import { getList, dataForm } from '@/api/ActivityForm'
import Pagination from '@/components/Pagination'
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios
export default {
  components: {
    Pagination
  },

  data() {
    return {
      input2: '',
      input3: '',
      src: 'https://pic2.zhimg.com/v2-482349b49df9b9b21d2657f89497f965_r.jpg',
      src1: 'https://img0.baidu.com/it/u=4191304663,835376280&fm=253&fmt=auto&app=138&f=PNG?w=885&h=500',
      src2: 'https://s3.51ctocdn.cn/images/202201/11/7fc665be4aa55d90662f4b0ff6f80231.jpg?x-oss-process=image/resize,m_fixed,w_500,h_305',
      src3: 'https://file2.renrendoc.com/fileroot_temp3/2021-3/7/6ff391d4-3131-44cc-a1aa-5a22015dd848/6ff391d4-3131-44cc-a1aa-5a22015dd8481.gif',
      stuGrade: 2,
      total: 8,             // 总条数，根据接口获取数据长度(注意：这里不能为空)
      size: 10,             //默认每页数据量        
      currentPage: 1,
      formInline1: {

      },
      formInline2: {

      },
      title: '',
      region: '',
      query: {
        page: 1,
        limit: 10 },
      list: [{
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      },
      {
        id: '',
        CourseId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        Count: '',
        Evaluate: ''
      }
      ],
      list2: [{
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      },
      {
        id: '',
        TeacherId: '',
        CourseName: '',
        StuId: '',
        StuName: '',
        State: '',
        Evaluate: ''
      }
      ],
      // list: [],
      list3: [],
      listLoading: true,
      // dataForm: {

      // },
      sid: 1,
      tid: '',
      rules: [],
      projectOptions: [],
      dialogVisible: false,
      flag1: false,
      searchData1: [],
      flag2: false,
      searchData2: []
    }
  },
  mounted() {
    // const link = document.createElement('link')
    // link.rel = 'stylesheet'
    //   	  link.href = `https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css`
    // document.body.appendChild(link)
    // const script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.src = `https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js`
    // document.body.appendChild(script)
    this.querySysList()
    this.queryTeaList()
  },
  created() {
    this.fetchData()
    this.dataForm.currenttime = this.getNowTime()
    this.selectProject()
  },
  methods: {
     changeSizeHandle(val) {
         this.size = val                   // 改变每页显示的条数 
         this.currentPage = 1              // 注意：在改变每页显示的条数时，要将页码显示到第一页
         this.getInfo()                    // 点击每页显示的条数时，显示第一页
         console.log(`每页 ${val} 条`)
     },
      // 当前页
      currentChangeHandle(val) {
         this.currentPage = val                // 改变默认的页数
         this.getInfo()                        // 切换页码时，要获取每页显示的条数
        console.log(`当前页: ${val}`)
     },
     async getInfo() {
         axios.get('http://localhost:8080/queryTeacherEvaluationList', { params: {
             pageSize: this.size,
             pageIndex: this.currentPage
         }})
         .then( response => {
             this.list3 = response.data
         })
         .catch( error => {
             console.log(error)
         })
     },
    editList() {
      console.log(this.title)
      axios.get(`http://localhost:8080/updateTeacher?T_evaluate_id=${this.tid}&State=${'已评价'}&T_Content=${this.title}`)
      this.$router.go(0)
    },
    querySysList() {
       axios.get('http://localhost:8080/querySystemEvaluationList').then(res =>{
            // 请求成功后的数据返回给用户列表用于展示
            for(let i=0;i<26;i++){
              this.list[i].id = res.data[i].s_evaluate_id
              this.list[i].CourseId = res.data[i].course_id
             this.list[i].CourseName = res.data[i].course_name
             this.list[i].StuId = res.data[i].stu_id
             this.list[i].StuName = res.data[i].stu_name
             this.list[i].Count = res.data[i].count
             this.list[i].Evaluate = res.data[i].s_Content
            }
            // this.list = res.data
          }).catch(error => {
             console.log(error)
          })
    },
    queryTeaList() {
       axios.get('http://localhost:8080/queryTeacherEvaluationList').then(res =>{
            // 请求成功后的数据返回给用户列表用于展示
            for(let i=0;i<26;i++){
              this.list2[i].id = res.data[i].t_evaluate_id
             this.list2[i].TeacherId = res.data[i].teacher_id
             this.list2[i].CourseName = res.data[i].course_name
             this.list2[i].StuId = res.data[i].stu_id
             this.list2[i].StuName = res.data[i].stu_name
             this.list2[i].State = res.data[i].state
             this.list2[i].Evaluate = res.data[i].t_Content
            }
            // this.list2 = res.data
          }).catch(error => {
             console.log(error)
          })
    },
    getid1(index) {
      this.sid = this.list[index].id
    },
    getid2(index) {
      this.tid = this.list2[index].id
    },
    search1() {
      this.flag1 = true
      const key = this.formInline1.name // 查询表单中的输入
      const vm = this
      this.searchData1 = [] //清空查询数组-防止多次查询记录一直被push在最后
      console.log("查询前", this.list)
      this.list.forEach(function (item) {
        if (item.CourseName.indexOf(key) > -1) {
          vm.searchData1.push(item)
        }
      })
      // this.resetData1 = this.tableData1;
      this.list = this.searchData1
      console.log("查询后", this.list)
    },
    search2() {
      this.flag2 = true
      const key = this.formInline2.name // 查询表单中的输入
      const vm = this
      this.searchData2 = [] //清空查询数组-防止多次查询记录一直被push在最后
      console.log("查询前", this.list2)
      this.list2.forEach(function (item) {
        if (item.StuName.indexOf(key) > -1) {
          vm.searchData2.push(item)
        }
      })
      // this.resetData1 = this.tableData1;
      this.list2 = this.searchData2
      console.log("查询后", this.list2)
    },
    delDetailCol(index) {
      this.$confirm("此操作将删除该评价, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            this.list.splice(index, 1)
            axios.get(`http://localhost:8080/deleteSystem?Course_id=${this.sid}`)
            this.$message({
              type: "success",
              message: "删除成功!"
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            })
          })
    },
    delDetailCol2(index) {
      this.$confirm("此操作将删除该评价, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            this.list2.splice(index, 1)
            axios.get(`http://localhost:8080/deleteTeacher?Course_id=${this.tid}`)
            this.$message({
              type: "success",
              message: "删除成功!"
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            })
          })
    },
    selectProject() {
      fetchProject().then(res => {
        this.projectOptions = res
        console.log(1)
      })
    },
    getNowTime() {
      var now = new Date()
      var year = now.getFullYear() // 得到年份
      var month = now.getMonth() // 得到月份
      var date = now.getDate() // 得到日期
      month = month + 1
      month = month.toString().padStart(2, '0')
      date = date.toString().padStart(2, '0')
      var defaultDate = `${year}-${month}-${date}`
      return defaultDate
    },
    // fetchData() {
    //   this.listLoading = true
    //   getList().then(response => {
    //     console.log(1, response)
    //     this.list = response.data.items
    //     this.total = response.data.total
    //     this.listLoading = false
    //   })
    // },
    handleRemove(type, file, fileList) {
      this.dataForm[type] = this.dataForm[type].filter(v => v && v.uid !== file.uid)
    },
    handleUploadError(type, err, file, fileList) {
      console.log(err)
    },
    handleUploadSuccess(type, response, file, fileList) {
      file.raw.path = response.data[0]
      if (this.sysConfig && this.sysConfig.filepath) {
        file.raw.url = this.sysConfig.filepath + file.raw.path
      }
      if (this.dataForm && this.dataForm[type] && Array.isArray(this.dataForm[type])) {
        this.dataForm[type].push(file.raw)
      } else {
        this.$set(this.dataForm, type, [file.raw])
      }
      console.log(type, this.dataForm[type])
    },
    handleOk(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          dataForm(this.dataForm).then(response => {
            this.list = response.data.items
          })
          this.fetchData()
        } else {
          return false
        }
      })
    }

  }

}
</script>
