<template>
  <div>
    <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">我的评价</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
        <div class="demo-input-suffix" style="width:200px; height:100%">
          <el-input
            class="input"
            v-model="keyword"
            placeholder="查询课程名字"
            prefix-icon="el-icon-search"
          />
        </div></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
        <el-button type="primary" icon="el-icon-search" @click="search1">搜索</el-button>
        </el-col>
      </el-row>
      <el-divider />
      <li v-for="p in filcourse" :key="p.id">
      <el-row :gutter="50">
        <el-col :span="4">
          <el-image style="width: 300px; height: 180px" :src="p.src"></el-image></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span class="name" style="font-size:24px">{{p.name}}</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <br><el-rate v-model="p.score" disabled show-score text-color="#ff9900"></el-rate></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span class="system" style="font-size:16px;border-radius: 4px;color:#303133">系统评价：{{p.sys_eva}}</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span class="demonstration" style="font-size:16px;border-radius: 4px;color:#409EFF">教师评价：{{p.tea_eva}}</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
      </el-row>
      <el-divider />
      </li>
      <el-col :xs="8" :sm="8" :md="8" :lg="10" :xl="8"><br></el-col>
      <el-pagination :page-size="8" :pager-count="1" layout="prev, pager, next" :total="8"></el-pagination>
    </el-card>
  </div>
</template>
<script>
import { fetchProject } from '@/api/dict'
import { getList, dataForm } from '@/api/ActivityForm'
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios
export default {
  data() {
    return {
      src: 'https://pic2.zhimg.com/v2-482349b49df9b9b21d2657f89497f965_r.jpg',
      src1: 'https://img0.baidu.com/it/u=4191304663,835376280&fm=253&fmt=auto&app=138&f=PNG?w=885&h=500',
      src2: require('../../../public/static/os2.png'),
      src3: 'https://file2.renrendoc.com/fileroot_temp3/2021-3/7/6ff391d4-3131-44cc-a1aa-5a22015dd848/6ff391d4-3131-44cc-a1aa-5a22015dd8481.gif',
      total: 0,
      value1: 5.0,
      value2: 3.0,
      value3: 4.0,
      value4: 2.0,
      keyword: '',
      course: [
      {
        id: 1,
        src: 'https://img0.baidu.com/it/u=4191304663,835376280&fm=253&fmt=auto&app=138&f=PNG?w=885&h=500',
        name: '',
        score: 2.0,
        sys_eva: '较差，未认真学习课程，未掌握知识点或难点较多。',
        tea_eva: ''
      },
      // {
      //   id: 2,
      //   src: 'https://pic2.zhimg.com/v2-482349b49df9b9b21d2657f89497f965_r.jpg',
      //   name: '数据结构之算法时间复杂度',
      //   score: 2.0,
      //   sys_eva: '较差，未认真学习课程，未掌握知识点或难点较多。',
      //   tea_eva: '课程学习专注度较差，如果遇到什么困难与压力可以随时与老师沟通。加油！'
      // },
      {
        id: 2,
        src: 'https://file2.renrendoc.com/fileroot_temp3/2021-3/7/6ff391d4-3131-44cc-a1aa-5a22015dd848/6ff391d4-3131-44cc-a1aa-5a22015dd8481.gif',
        name: '计算机网络的拓扑结构',
        score: 2.0,
        sys_eva: '较差，未认真学习课程，未掌握知识点或难点较多。',
        tea_eva: '专注度还需提高，记得多复习上课讲的内容哦！'
      },
      {
        id: 3,
        src: 'https://s1.ax1x.com/2023/05/06/p9avuKP.jpg',
        name: '计算机网络之传输层',
        score: 2.0,
        sys_eva: '较差，未认真学习课程，未掌握知识点或难点较多。',
        tea_eva: '传输层较为重要，下节课要小测，记得多复习哦，不懂的欢迎提问！'
      },
      {
        id: 4,
        src: 'https://s1.ax1x.com/2023/05/06/p9avlVS.png',
        name: '操作系统之内存管理',
        score: 3.0,
        sys_eva: '一般，有注意力不集中现象，注意课下复习巩固知识。',
        tea_eva: '继续保持！'
      },
      {
        id: 5,
        src: 'https://s1.ax1x.com/2023/05/06/p9avkUe.jpg',
        name: '操作系统之文件管理',
        score: 3.0,
        sys_eva: '一般，有注意力不集中现象，注意课下复习巩固知识。',
        tea_eva: '专注度较高，课堂表现良好，继续保持！'
      },
      {
        id: 6,
        src: 'https://s1.ax1x.com/2023/05/06/p9av1Ug.jpg',
        name: '计算机组成原理之浮点数运算',
        score: 3.0,
        sys_eva: '一般，有注意力不集中现象，注意课下复习巩固知识。',
        tea_eva: '有些小瑕疵，课下注意复习！'
      },
      {
        id: 7,
        src: 'https://s1.ax1x.com/2023/05/06/p9ajvC9.png',
        name: '计算机组成原理之指令格式',
        score: 4.0,
        sys_eva: '良好，听课较认真，知识能大部分接收。',
        tea_eva: '学习态度端正，态度积极，继续保持，不要松懈！'
      },
      {
        id: 8,
        src: 'https://pic2.zhimg.com/v2-482349b49df9b9b21d2657f89497f965_r.jpg',
        name: '',
        score: 4.0,
        sys_eva: '',
        tea_eva: ''
      }],
      query: {
        page: 1,
        limit: 10 },
      list: [{
        name: '',
        score: '',
        sys_eva: '',
        tea_eva: '',
        src: ''
      }],
      list1: [],
      list2: [],
      listLoading: true,
      dataForm: {

      },
      rules: [],
      projectOptions: [],
      flag1: false,
      searchData1: [],
      formInline1: {

      }
    }
  },
  // mounted() {
  //   const link = document.createElement('link')
  //   link.rel = 'stylesheet'
  //   link.href = `https://cdn.jsdelivr.net/npm/font-awesome/css/font-awesome.min.css`
  //   document.body.appendChild(link)
  //   const script = document.createElement('script')
  //   script.type = 'text/javascript'
  //   script.src = `https://cdn.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/autoload.js`
  //   document.body.appendChild(script)
  // },
  computed:{
                filcourse(){
                    return this.course.filter((p)=>{
                        return p.name.indexOf(this.keyword)!=-1
                    })
                }
            },
  created() {
    this.fetchData()
    this.dataForm.currenttime = this.getNowTime()
    this.selectProject()
    this.getSys()
    this.getTea()
  },
  methods: {
    getSys(){
                    //使用axios请求后台数据
                    axios.get("http://localhost:8080/querySystemEvaluationList").then(res => {
                        this.list1 = res.data
                        this.course[7].name = res.data[0].course_name
                        this.course[7].sys_eva = res.data[0].s_Content
                        this.course[0].name = res.data[4].course_name
                        console.log(res.data)
                    }).catch(err => {
                        console.log("获取异常~")
                    })
                },
    getTea() {
      axios.get("http://localhost:8080/queryTeacherEvaluationList").then(res => {
                        this.list2 = res.data
                        console.log(res.data)
                    }).catch(err => {
                        console.log("获取异常~")
                    })
    },
    getScore(string)
    {
      if (string.substring(0.2) == '极差')
        return 1.0
      else if(string.substring(0.2) == '较差')
        return 2.0
      else if(string.substring(0.2) == '一般')
        return 3.0
      else if(string.substring(0.2) == '良好')
        return 4.0
      else if(string.substring(0.2) == '优秀')
        return 5.0
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
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(1, response)
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
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
