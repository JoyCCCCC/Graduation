<template>
  <div>
    <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">课程信息表格</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
        <el-button class="new" type="primary" style="font-size:14px" icon="el-icon-plus" @click="dialogFormVisible1 = true">新建</el-button></el-col>
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
              <el-button class="search" type="primary" icon="el-icon-search" @click="search1">搜索</el-button></el-form-item>
              </el-col>
          </el-form>
      </el-row>
      <el-divider />
      <div style="margin-top:20px&quot;">
        <el-table ref="list" :data="list" border class="mb-18">
          <el-table-column prop="course_id" label="课程id" style="font-size:24px" sortable />
          <el-table-column prop="teacher_id" label="教师id" style="font-size:24px" sortable />
          <el-table-column prop="course_name" label="课程名字" style="font-size:24px" sortable />
          <el-table-column prop="course_decs" label="课程介绍" style="font-size:24px" />
          <el-table-column prop="course_url" label="课程url" style="font-size:24px" />
          <el-table-column prop="course_img" label="课程封面" style="font-size:24px">
            <template slot-scope="scope">
              <el-image style="width: 100%; height: 100px" :src="scope.row.course_img" :preview-src-list="[scope.row.course_img]" :key="scope.row.course_id"></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="Manufacture" label="操作" style="font-size:20px">
            <template slot-scope="scope">
              <el-button size="small" @click="dialogVisible = true; getid(scope.$index);" style="color:#409EFF">编辑</el-button>
              <el-button size="small" type="danger" @click="getid(scope.$index);delDetailCol(scope.$index);">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8"><br></el-col>
        <!-- <el-pagination :page-size="3" :pager-count="4" layout="prev, pager, next" :total="18"></el-pagination> -->
        <el-pagination
        @size-change="changeSizeHandle"
      @current-change="currentChangeHandle"
      :current-page="currentPage"
      background
      :total="total"
      layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
        <el-dialog
          title="新建课程"
          :visible.sync="dialogFormVisible1"
          width="40%"
        >
          <el-form ref="dataForm" :model="dataForm" label-width="70px" :rules="rules">
            <el-form-item label="课程id" prop="id">
              <el-input name="cid" v-model="course_id" />
            </el-form-item>
            <el-form-item label="教师id" prop="id2">
              <el-input name="tid" v-model="teacher_id" />
            </el-form-item>
            <el-form-item label="课程名字" prop="name">
              <el-input name="name" v-model="course_name" />
            </el-form-item>
            <el-form-item label="课程url" prop="url">
              <el-input name="url" v-model="course_url" />
            </el-form-item>
            <el-form-item label="课程描述" prop="describtion">
              <el-input name="desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="course_decs" />
            </el-form-item>
            <el-form-item label="课程封面" prop="img">
               <el-upload
  action="http://localhost:8080/file/upload"
  list-type="picture-card"
  :auto-upload="false"
  :on-success="handleSuccess">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url"
        alt="">
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer mt-18">
            <el-button size="small" @click="dialogFormVisible1 = false">
              关 闭
            </el-button>
            <el-button class="save" type="primary" size="small" @click="dialogFormVisible1 = false;insertUserList();">
              保 存
            </el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="编辑课程"
          :visible.sync="dialogVisible"
          width="40%"
        >
          <el-form ref="dataForm" :model="dataForm" label-width="70px" :rules="rules">
            <el-form-item label="教师id" prop="teacher_id">
              <el-input v-model="teacher_id" />
            </el-form-item>
            <el-form-item label="课程url" prop="course_url">
              <el-input v-model="course_url" />
            </el-form-item>
            <el-form-item label="课程描述" prop="course_decs">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="course_decs" />
            </el-form-item>
            <el-form-item label="课程封面" prop="course_img">
              <!-- <ImageUpload
                :is-single="false"
                :file-list="course_img"
                @handleRemove="handleRemove('course_img',...arguments)"
                @handleSuccess="handleUploadSuccess('course_img',...arguments)"
                @handleError="handleUploadError('course_img',...arguments)"
              /> -->
              <el-upload
  action="http://localhost:8080/file/upload"
  list-type="picture-card"
  :auto-upload="false"
  :on-success="handleSuccess">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url"
        alt="">
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible1">
  <img width="100%" :src="course_img" alt="">
</el-dialog>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer mt-18">
            <el-button size="small" @click="dialogVisible = false">
              关 闭
            </el-button>
            <el-button type="primary" size="small" @click="editUserList();dialogVisible = false;">
              保 存
            </el-button>
          </div>
        </el-dialog>
      </div>
      <!-- <div class="clearfix">
        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="query.page"
          :limit.sync="query.limit"
          class="pull-right"
          @pagination="fetchData"
        />
      </div> -->
    </el-card>
  </div>
</template>
<script>
import ImageUpload from '@/components/ImageUpload'
import { fetchProject } from '@/api/dict'
import { getList, dataForm } from '@/api/ActivityForm'
import Pagination from '@/components/Pagination'
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios
export default {
  components: {
    Pagination,
    ImageUpload
  },

  data() {
    return {
      input2: '',
      total: 8,             // 总条数，根据接口获取数据长度(注意：这里不能为空)
      size: 4,             //默认每页数据量        
      currentPage: 1,
      src: 'https://pic2.zhimg.com/v2-482349b49df9b9b21d2657f89497f965_r.jpg',
      src1: 'https://img0.baidu.com/it/u=4191304663,835376280&fm=253&fmt=auto&app=138&f=PNG?w=885&h=500',
      src2: 'https://s3.51ctocdn.cn/images/202201/11/7fc665be4aa55d90662f4b0ff6f80231.jpg?x-oss-process=image/resize,m_fixed,w_500,h_305',
      src3: 'https://file2.renrendoc.com/fileroot_temp3/2021-3/7/6ff391d4-3131-44cc-a1aa-5a22015dd848/6ff391d4-3131-44cc-a1aa-5a22015dd8481.gif',
      stuGrade: 2,
      query: {
        page: 2,
        limit: 8 },
      // list: [{
      //   CourseId: '1',
      //   TeacherId: '19760821',
      //   CourseName: '数据结构之算法时间复杂度',
      //   CourseDescribtion: '算法（Algorithm）是指用来操作数据、解决程序问题的一组方法。对于同一个问题，使用不同的算法，也许最终得到的结果是一样的，但在过程中消耗的资源和时间却会有很大的区别。那么我们应该如何去衡量不同算法之间的优劣呢？主要还是从算法所占用的「时间」和「空间」两个维度去考量。接下来，就让我们一起学习从时间的维度描述算法复杂度吧。',
      //   CourseUrl: 'https://www.bilibili.com/92cb1aa1-7f5f-422c-aba7-c9393c3d9ac8',
      //   CourseImg: 'https://pic2.zhimg.com/v2-482349b49df9b9b21d2657f89497f965_r.jpg'
      // },
      // {
      //   CourseId: '2',
      //   TeacherId: '19760821',
      //   CourseName: '计算机组成原理之指令格式',
      //   CourseDescribtion: '计算机的指令格式与计算机的字长、存储器容量以及指令功能密切相关。为提高指令功能，增加基本操作并行性，指令中所包含的信息以多为宜；另一方面，指令太长又会增加存储空间的开销并影响机器指令的执行速度。因此，如何合理、科学地设计指令格式对整个计算机的设计是至关重要的。',
      //   CourseUrl: 'https://www.bilibili.com/7639efb7-ce96-4614-b52c-7f0eb4795abf',
      //   CourseImg: require('../../../public/static/cs1.png')
      // },
      // {
      //   CourseId: '3',
      //   TeacherId: '19760821',
      //   CourseName: '计算机网络的拓扑结构',
      //   CourseDescribtion: '计算机网络拓扑(Computer Network Topology)是指由计算机组成的网络之间设备的分布情况以及连接状态，把它两画在图上就成了拓扑图。一般在图上要标明设备所处的位置，设备的名称类型，以及设备间的连接介质类型。',
      //   CourseUrl: 'https://www.bilibili.com/420ffca4-c50f-49a3-a130-2cc13c32e250',
      //   CourseImg: 'https://file2.renrendoc.com/fileroot_temp3/2021-3/7/6ff391d4-3131-44cc-a1aa-5a22015dd848/6ff391d4-3131-44cc-a1aa-5a22015dd8481.gif'
      // },
      // {
      //   CourseId: '4',
      //   TeacherId: '19760821',
      //   CourseName: '操作系统之文件管理',
      //   CourseDescribtion: '文件管理是操作系统的五大职能之一，主要涉及文件的逻辑组织和物理组织，目录的结构和管理。所谓文件管理，就是操作系统中实现文件统一管理的一组软件、被管理的文件以及为实施文件管理所需要的一些数据结构的总称。',
      //   CourseUrl: 'https://www.bilibili.com/5ce25a07-21de-4843-8ea5-0ce2b848174a',
      //   CourseImg: require('../../../public/static/os1.jpg')
      // }
      // ],
      list: [],
      listLoading: true,
        course_id: '',
        teacher_id: '',
        course_name: '',
        course_url: '',
        course_decs: '',
        course_img: '',
      formInline1: {

      },
      rules: [],
      projectOptions: [],
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogImageUrl: '',
      flag1: false,
      searchData1: []
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
    this.queryUserList()
  },
  created() {
    this.fetchData()
    this.dataForm.currenttime = this.getNowTime()
    this.selectProject()
  },
  methods: {
    handleRemove(file) {
        console.log(file)
      },
     handlePictureCardPreview(file) {
        this.course_img = file.url
        this.dialogVisible1 = true
      },
      handleDownload(file) {
        console.log(file)
      },
    handleSuccess(res) {
      alert('图片上传成功')
      return (this.course_img = res.data)
    },
    getid(index) {
      this.course_id = this.list[index].course_id
    },
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
         axios.get('http://localhost:8080/queryCourseInformationList', { params: {
             pageSize: this.size,
             pageIndex: this.currentPage
         }})
         .then( response => {
             this.list = response.data
         })
         .catch( error => {
             console.log(error)
         })
     },
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
    delDetailCol(index) {
      this.$confirm("此操作将删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            this.list.splice(index, 1);
            axios.get(`http://localhost:8080/deleteCourse?Course_id=${this.course_id}`)
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
    editUserList() {
      console.log(111)
      axios.get(`http://localhost:8080/updateCourse?Course_id=${this.course_id}&Teacher_id=${this.teacher_id}&Course_url=${this.course_url}&Course_decs=${this.course_decs}&Course_img=${'https://s2.loli.net/2023/05/10/Pl1opQzsZqW8RfO.jpg'}`)
      this.$router.go(0)
    },
    insertUserList() {
      console.log(111)
      axios.get(`http://localhost:8080/insertCourse?Course_id=${this.course_id}&Course_name=${this.course_name}&Teacher_id=${this.teacher_id}&Course_url=${this.course_url}&Course_decs=${this.course_decs}&Course_img=${'https://s2.loli.net/2023/05/10/V94mHK5JleiPtzh.webp'}`)
      this.$router.go(0)
    },
    // editUserList() {
    //   this.$refs[dataForm].validate((valid) => {
    //     if (valid) {
    //       axios.get('http://localhost:8080/updateCourse').then(res =>{
    //         // 请求成功后的数据返回给用户列表用于展示
    //          this.list = res.data
    //       }).catch(error => {
    //          console.log(error)
    //       })
    //     } else {
    //       return false
    //     }
    //   })
    // },
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
    // handleRemove(type, file, fileList) {
    //   this.dataForm[type] = this.dataForm[type].filter(v => v && v.uid !== file.uid)
    // },
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
