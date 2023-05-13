<template>

  <div>
    <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">全部课程</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-form :inline="true" :model="formInline1">
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
          <el-form-item>
        <div class="demo-input-suffix" style="width:200px; height:100%">
          <el-input
            class="input"
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
      <el-card>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:18px;color:#909399">数据结构</span></el-col>
        <el-divider />
        <el-row :gutter="50">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[0].course_img"></el-image></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[4].course_img"></el-image></el-col>
        </el-row>
        <br>
        <el-row :gutter="50">
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[0].course_name}}</span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[4].course_name}}</span></el-col>
            </div></div>
        </el-row>
        <el-row :gutter="50">
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="http://localhost:8081/" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="7" :xl="8"><br></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="list[4].course_url" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
        </el-row>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><br></el-col>
      <el-pagination :page-size="2" :pager-count="1" layout="prev, pager, next" :total="2"></el-pagination>
      </el-card>
      <br>
      <el-card>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:18px;color:#909399">操作系统</span></el-col>
        <el-divider />
        <el-row :gutter="50">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[3].course_img"></el-image></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[6].course_img"></el-image></el-col>
        </el-row>
        <br>
        <el-row :gutter="50">
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[3].course_name}}</span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[6].course_name}}</span></el-col>
            </div></div>
        </el-row>
        <el-row :gutter="50">
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="list[3].course_url" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="7" :xl="8"><br></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="list[6].course_url" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
        </el-row>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><br></el-col>
      <el-pagination :page-size="2" :pager-count="1" layout="prev, pager, next" :total="2"></el-pagination>
      </el-card>
      <br>
      <el-card>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:18px;color:#909399">计算机网络</span></el-col>
        <el-divider />
        <el-row :gutter="50">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[5].course_img"></el-image></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[2].course_img"></el-image></el-col>
        </el-row>
        <br>
        <el-row :gutter="50">
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[5].course_name}}</span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[2].course_name}}</span></el-col>
            </div></div>
        </el-row>
        <el-row :gutter="50">
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="list[5].course_url" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="7" :xl="8"><br></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="list[2].course_url" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
        </el-row>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><br></el-col>
      <el-pagination :page-size="2" :pager-count="1" layout="prev, pager, next" :total="2"></el-pagination>
      </el-card>
      <br>
      <el-card>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:18px;color:#909399">计算机组成原理</span></el-col>
        <el-divider />
        <el-row :gutter="50">
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[1].course_img"></el-image></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[7].course_img"></el-image></el-col>
        </el-row>
        <br>
        <el-row :gutter="50">
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[1].course_name}}</span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration" style="font-size:16px">{{list[7].course_name}}</span></el-col>
            </div></div>
        </el-row>
        <el-row :gutter="50">
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="list[1].course_url" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="7" :xl="8"><br></el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="3" :xl="8">
            <span class="demonstration"><el-link href="list[7].course_url" target="_blank" style="font-size:14px" type="primary">开始学习</el-link></span></el-col>
        </el-row>
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><br></el-col>
      <el-pagination :page-size="2" :pager-count="1" layout="prev, pager, next" :total="2"></el-pagination>
      </el-card>
      <br>
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
      // list: [{
      //   name: '数据结构之算法时间复杂度',
      //   src: 'https://pic2.zhimg.com/v2-482349b49df9b9b21d2657f89497f965_r.jpg',
      //   url: 'http://localhost:8080/'
      // },
      // {
      //   name: '数据结构之栈的应用',
      //   src: 'https://img0.baidu.com/it/u=4191304663,835376280&fm=253&fmt=auto&app=138&f=PNG?w=885&h=500',
      //   url: 'http://localhost:8080/'
      // },
      // {
      //   name: '计算机网络的拓扑结构',
      //   src: 'https://file2.renrendoc.com/fileroot_temp3/2021-3/7/6ff391d4-3131-44cc-a1aa-5a22015dd848/6ff391d4-3131-44cc-a1aa-5a22015dd8481.gif',
      //   url: 'http://localhost:8080/'
      // },
      // {
      //   name: '计算机网络之传输层',
      //   src: require('../../../public/static/nw.jpg'),
      //   url: 'http://localhost:8080/'
      // },
      // {
      //   name: '操作系统之文件管理',
      //   src: require('../../../public/static/os1.jpg'),
      //   url: 'http://localhost:8080/'
      // },
      // {
      //   name: '操作系统之内存管理',
      //   src: require('../../../public/static/os2.png'),
      //   url: 'http://localhost:8080/'
      // },
      // {
      //   name: '计算机组成原理之指令格式',
      //   src: require('../../../public/static/cs1.png'),
      //   url: 'http://localhost:8080/'
      // },
      // {
      //   name: '计算机组成原理之浮点数运算',
      //   src: require('../../../public/static/cs2.jpg'),
      //   url: 'http://localhost:8080/'
      // }],
      list: [],
      flag1: false,
      searchData1: [],
      formInline1: {

      }
    }
  },
  // computed:{
			// 	list(){
			// 		return this.list1.filter((p)=>{
			// 			return p.name.indexOf(this.shuru) !== -1
			// 		})
			// 	}
			// },
  // created() {
  //   this.fetchData()
  //   this.dataForm.currenttime = this.getNowTime()
  //   this.selectProject()
  // },
  mounted() {
    this.queryUserList()
  },
  methods: {
    queryUserList() {
       axios.get('http://localhost:8080/queryCourseInformationList').then(res =>{
            // 请求成功后的数据返回给用户列表用于展示
             this.list = res.data
          }).catch(error => {
             console.log(error)
          })
    },
    search1() {
      this.flag1 = true
      const key = this.formInline1.name // 查询表单中的输入
      const vm = this
      this.searchData1 = [] //清空查询数组-防止多次查询记录一直被push在最后
      console.log("查询前", this.list)
      this.list.forEach(function (item) {
        if (item.course_name.indexOf(key) > -1) {
          vm.searchData1.push(item)
        }
      })
      // this.resetData1 = this.tableData1;
      this.list = this.searchData1
      console.log("查询后", this.list)
    },
    skip(url) {
      window.location.href = url
    },
    changechart(index) {
      this.chart = index
      console.log(this.chart)
    },
    handleChange(val) {
      console.log(val)
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