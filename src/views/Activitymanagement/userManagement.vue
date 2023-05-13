<template>
  <div>
    <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">用户信息表格</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
        <el-button type="primary" style="font-size:14px" icon="el-icon-plus" @click="dialogFormVisible = true">新建</el-button></el-col>
        <el-form :inline="true" :model="formInline1">
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
          <el-form-item>
        <div class="demo-input-suffix" style="width:200px; height:100%">
          <el-input
            class="input"
            v-model="formInline1.name"
            placeholder="查询用户名字"
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
          <el-table-column prop="user_id" label="用户id" style="font-size:20px" sortable />
          <el-table-column prop="user_name" label="用户名字" style="font-size:20px" sortable />
          <el-table-column prop="user_pwd" label="用户密码" style="font-size:20px" />
          <el-table-column prop="user_char" label="用户角色" style="font-size:20px" />
          <el-table-column prop="user_img" label="头像" style="font-size:20px">
            <template slot-scope="scope">
              <el-avatar :size="50" :src="scope.row.user_img" :preview-src-list="[scope.row.user_img]" :key="scope.row.user_id"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="Manufacture" label="操作" style="font-size:20px">
            <template slot-scope="scope">
              <el-button size="medium" @click="getid(scope.$index);dialogVisible = true" style="color:#409EFF">编辑</el-button>
              <el-button class="delete" size="medium" type="danger" @click="getid(scope.$index);delDetailCol(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-col :xs="8" :sm="8" :md="8" :lg="10" :xl="8"><br></el-col>
        <el-pagination :page-size="6" :pager-count="1" layout="prev, pager, next" :total="6"></el-pagination>
        <el-dialog
          title="新建用户"
          :visible.sync="dialogFormVisible"
          width="40%"
        >
          <el-form ref="dataForm" :model="dataForm" label-width="70px" :rules="rules">
            <el-form-item label="用户id" prop="id">
              <el-input v-model="user_id" />
            </el-form-item>
            <el-form-item label="用户名字" prop="name">
              <el-input v-model="user_name" />
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="user_pwd" />
            </el-form-item>
            <el-form-item label="用户角色" prop="character">
              <el-select v-model="user_char" placeholder="请选择角色">
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="教师" value="教师"></el-option>
                <el-option label="学生" value="学生"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="头像" prop="img">
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
            <el-button size="small" @click="dialogFormVisible = false">
              关 闭
            </el-button>
            <el-button type="primary" size="small" @click="dialogFormVisible = false;insertUserList();">
              保 存
            </el-button>
          </div>
        </el-dialog>
        <el-dialog
          title="编辑用户"
          :visible.sync="dialogVisible"
          width="40%"
        >
          <el-form ref="dataForm" :model="dataForm" label-width="70px" :rules="rules">
            <el-form-item label="用户名字" prop="name">
              <el-input v-model="user_name" />
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="user_pwd" />
            </el-form-item>
            <el-form-item label="用户角色" prop="character">
              <el-select v-model="user_char" placeholder="请选择角色">
                <el-option label="管理员" value="管理员"></el-option>
                <el-option label="教师" value="教师"></el-option>
                <el-option label="学生" value="学生"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="头像" prop="img">
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
            <el-button size="small" @click="dialogVisible = false">
              关 闭
            </el-button>
            <el-button type="primary" size="small" @click="dialogVisible = false;editUserList();">
              保 存
            </el-button>
          </div>
        </el-dialog>
      </div>
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
      total: 0,
      query: {
        page: 1,
        limit: 10 },
      // list: [{
      //   Id: '10000000',
      //   Name: 'admin',
      //   Password: '123456',
      //   Character: '管理员',
      //   Img: 'https://gd-hbimg.huaban.com/b1b7c26d1ccdf21c9b7868b1f99faba26e1f9b4e11c2d-TZeRnN_fw658'
      // },
      // {
      //   Id: '19760821',
      //   Name: '王老师',
      //   Password: '123456',
      //   Character: '教师',
      //   Img: require('../../../public/static/tea.jpg')
      // },
      // {
      //   Id: '20010709',
      //   Name: '陈怡伽',
      //   Password: '123456',
      //   Character: '学生',
      //   Img: require('../../../public/static/img1.jpg')
      // },
      // {
      //   Id: '20000218',
      //   Name: '郑北辰',
      //   Password: '123456',
      //   Character: '学生',
      //   Img: require('../../../public/static/img2.jpg')
      // },
      // {
      //   Id: '20010124',
      //   Name: '陈晨',
      //   Password: '123456',
      //   Character: '学生',
      //   Img: require('../../../public/static/img4.jpg')
      // },
      // {
      //   Id: '20011004',
      //   Name: '王斯予',
      //   Password: '123456',
      //   Character: '学生',
      //   Img: require('../../../public/static/img3.jpg')
      // }
      // ],
      list: [],
      user_id: '',
      user_name: '',
      user_pwd: '',
      user_char: '',
      user_img: '',
      listLoading: true,
      // dataForm: {

      // },
      rules: [],
      projectOptions: [],
      dialogFormVisible: false,
      dialogVisible: false,
      flag1: false,
      searchData1: [],
      formInline1: {

      }
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
    handleSuccess(res) {
      alert('图片上传成功')
      return (this.user_img = res.data)
    },
    editUserList() {
      console.log(111)
      axios.get(`http://localhost:8080/updateUser?User_id=${this.user_id}&User_name=${this.user_name}&User_pwd=${this.user_pwd}&User_img=${'https://i.328888.xyz/2023/05/08/i1GQ3y.jpeg'}&User_char=${this.user_char}`)
      this.$router.go(0)
    },
    insertUserList() {
      console.log(111)
      axios.get(`http://localhost:8080/insertUser?User_id=${this.user_id}&User_name=${this.user_name}&User_pwd=${this.user_pwd}&User_img=${'https://i.328888.xyz/2023/05/09/iQNmMo.jpeg'}&User_char=${this.user_char}`)
      this.$router.go(0)
    },
    getid(index) {
      this.user_id = this.list[index].user_id
    },
    queryUserList() {
       axios.get('http://localhost:8080/queryUserInformationList').then(res =>{
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
        if (item.user_name.indexOf(key) > -1) {
          vm.searchData1.push(item)
        }
      })
      // this.resetData1 = this.tableData1;
      this.list = this.searchData1
      console.log("查询后", this.list)
    },
    delDetailCol(index) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            this.list.splice(index, 1)
            axios.get(`http://localhost:8080/deleteUser?User_id=${this.user_id}`)
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
