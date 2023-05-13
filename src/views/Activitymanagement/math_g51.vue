<template>

  <div>

    <!-- <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="时分秒" name="1">
        <div />
        <div>
          <iframe src="/static/forcechart2.html" scrolling="auto" frameborder="0" style="width: 100%;height: 900px;" />
        </div>
      </el-collapse-item>
      <el-collapse-item title="万以内的加减法" name="2">
        <div>知识点</div>
        <div>习题</div>
      </el-collapse-item>
      <el-collapse-item title="测量" name="3">
        <div>知识点</div>
        <div>习题</div>
      </el-collapse-item>
      <el-collapse-item title="倍的认识" name="4">
        <div>知识点</div>
        <div>习题</div>
      </el-collapse-item>
    </el-collapse> -->
    <el-card>
      <div class="mb-18">
        <el-button round="true" style="font-size:32px"><a href="./static/人教版三年级数学上册电子课本.pdf" download="三年级上册人教版数学.pdf">课本下载</a></el-button> <el-button round="true" style="font-size:32px" size="small" type="primary" @click="dialogFormVisible=true">修改题库</el-button>
      </div>
      <br><br>
      <div style="width: 100%">

        <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" /> -->
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location" />
                <span style="font-size:28px">知识点</span>
              </template>
              <!-- <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->
              <el-menu-item index="2" @click="changechart(2)">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">小数乘整数的估算</span>

              </el-menu-item>
              <el-menu-item index="3" @click="changechart(3)">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">将小数乘整数转化为整数乘整数</span>
              </el-menu-item>
              <el-menu-item index="4" @click="changechart(4)">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">将小数除整数转化为整数除整数</span>
              </el-menu-item>
              <el-menu-item index="5" @click="changechart(5)">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">被除数与商的大小关系</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">小数除小数竖式计算</span>
              </el-menu-item>
              <el-menu-item index="7">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">小数乘法结合律；小数乘法交换律；小数乘法分配律；小数乘小数；整数乘小数；小数加减法；积不变性质</span>
              </el-menu-item>
              <el-menu-item index="8">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">小数连乘、连加、连减</span>
              </el-menu-item>
              <el-menu-item index="9">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">循环小数</span>
              </el-menu-item>
              <el-menu-item index="10">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">计算器计算</span>
              </el-menu-item>
              <el-menu-item index="10">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">小数除法的取余数</span>
              </el-menu-item>
              <el-menu-item index="10">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">四舍五入；积、商的近似值</span>
              </el-menu-item>
              <!-- <el-menu-item index="3" disabled>
            <i class="el-icon-document" />
            <span slot="title">万以内的加减法</span>
          </el-menu-item> -->
              <!-- <el-menu-item index="4">
            <i class="el-icon-setting" />
            <span slot="title">倍的认识</span>
          </el-menu-item> -->
            </el-submenu><br><br>
            <el-submenu index="101"><template slot="title">
                                      <i class="el-icon-edit-outline" />
                                      <span style="font-size:28px">习题</span>
                                    </template>
              <el-menu-item index="102" @click="changechart(6)">
                <i class="el-icon-menu" />
                <span slot="title" style="font-size:26px">出题</span>

                <!-- </el-menu-item>
              <el-menu-item index="103" @click="changechart(7)">
                <i class="el-icon-menu" />
                <span slot="title">万以内的加减法</span>
              </el-menu-item>
              <el-menu-item index="104" @click="changechart(8)">
                <i class="el-icon-menu" />
                <span slot="title">倍的认识</span>
              </el-menu-item>
              <el-menu-item index="105" @click="changechart(9)">
                <i class="el-icon-menu" />
                <span slot="title">多位数乘一位数</span>
              </el-menu-item> -->
              </el-menu-item></el-submenu>
          </el-menu>
        </el-col>
        <div v-show="chart==1 ">
          <iframe src="/static/forcechart50.html" scrolling="auto" frameborder="0" style="width: 50%;height: 450px;" />
        </div>
        <div v-show="chart==2 ">
          <iframe src="/static/forcechart21.html" scrolling="auto" frameborder="0" style="width: 50%;height: 600px;" />
        </div>
        <div v-show="chart==3 ">
          <iframe src="/static/forcechart22.html" scrolling="auto" frameborder="0" style="width: 50%;height: 600px;" />
        </div>
        <div v-show="chart==4 ">
          <iframe src="/static/forcechart23.html" scrolling="auto" frameborder="0" style="width: 50%;height: 600px;" />
        </div>
        <div v-show="chart==5 ">
          <iframe src="/static/forcechart24.html" scrolling="auto" frameborder="0" style="width: 50%;height: 600px;" />
        </div>
        <div v-show="chart==6 ">
          <iframe src="http://localhost:8080/user/show" scrolling="auto" frameborder="0" style="width: 50%;height: 660px;" />
        </div>
        <div v-show="chart==7 ">
          <iframe src="http://localhost:8080/user/show" scrolling="auto" frameborder="0" style="width: 50%;height: 600px;" />
        </div>
        <div v-show="chart==8 ">
          <iframe src="http://localhost:8080/user/show" scrolling="auto" frameborder="0" style="width: 50%;height:600px;" />
        </div>
        <div v-show="chart==9 ">
          <iframe src="http://localhost:8080/user/show" scrolling="auto" frameborder="0" style="width: 50%;height: 520px;" />
        </div>
        <div style="margin-top:10px&quot;">
          <!-- <el-table :data="list" border stripe size="small" class="mb-18">
            <el-table-column prop="activityId" label="年级" />
            <el-table-column prop="projectName" label="章节" />
            <el-table-column prop="typeId" label="主要内容" />
            <el-table-column prop="departmentId" label="掌握情况" />
            <el-table-column prop="applicant" label="公式定理" />
            <el-table-column prop="place" label="习题" />
            <el-table-column prop="peopleNum" label="教师点评" />
            <el-table-column prop="time" label="延伸阅读" /> -->
          <!--<el-table-column prop="applytime" label="申请时间" /> -->
          <!-- </el-table> -->
          <el-dialog
            title="修改意见"
            :visible.sync="dialogFormVisible"
            width="40%"
          >
            <el-form ref="dataForm" :model="dataForm" label-width="70px" :rules="rules">
              <el-form-item label="选择章节" prop="project">
                <el-select v-model="dataForm.project" placeholder="选择章节">
                  <el-option v-for="item in projectOptions" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <el-form-item label="修改类型" prop="typeId">
                <el-select v-model="dataForm.typeID" placeholder="修改类型">
                  <el-option v-for="item in alterType" :key="item.value" :value="item.value" :label="item.label" />
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="时间" prop="time">
              <el-date-picker v-model="dataForm.time" />
            </el-form-item>
            <el-form-item label="申请时间">
              <el-date-picker v-model="dataForm.currenttime" type="date" value-format="yyyy-MM-dd" :disabled="true" />
            </el-form-item>
            <el-form-item label="金额" prop="amount">
              <el-input v-model="dataForm.amount" />
            </el-form-item>
            <el-form-item label="参与人数" prop="peopleNum">
              <el-input v-model="dataForm.peopleNum" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="dataForm.remark" type="textarea" />
            </el-form-item>
            <el-form-item label="沟通记录" prop="goutong">
              <el-input v-model="dataForm.goutong" type="textarea" />
            </el-form-item> -->
              <el-form-item label="书面材料" prop="invoice">
                <ImageUpload
                  :is-single="false"
                  :file-list="dataForm.invoice"
                  @handleRemove="handleRemove('invoice',...arguments)"
                  @handleSuccess="handleUploadSuccess('invoice',...arguments)"
                  @handleError="handleUploadError('invoice',...arguments)"
                />
              </el-form-item>
            <!--
            <el-form-item label="支付凭证">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer mt-18">
              <el-button size="small" @click="dialogFormVisible = false">
                关 闭
              </el-button>
              <!-- <el-button type="primary" size="small" @click="handleOk('dataForm')">
                保 存
              </el-button> -->
              <el-button type="primary" size="small" @click="dialogFormVisible = false">
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
      </div></el-card>
  </div>
</template>
<script>
import ImageUpload from '@/components/ImageUpload'
import { fetchProject } from '@/api/dict'
import { getList, dataForm } from '@/api/ActivityForm'
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination,
    ImageUpload
  },

  data() {
    return {
      alterType: [
        { value: '1', label: '新题投稿' },
        { value: '2', label: '错题指正' },
        { value: '3', label: '旧题、超纲题剔除' }
      ],
      chart: 1,
      activeNames: ['1'],
      data: [{
        value1: '1',
        label: '三年级上册'

      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      total: 0,
      query: {
        page: 1,
        limit: 10 },
      list: [],
      listLoading: true,
      dataForm: {

      },
      rules: [],
      projectOptions: [
        { value: '1', label: '时分秒' },
        { value: '2', label: '万以内的加减法' },
        { value: '3', label: '倍的认识' },
        { value: '4', label: '长方形和正方形' },
        { value: '5', label: '多位数乘一位数' },
        { value: '6', label: '分数的初步认识' }
      ],
      typeID: [
        { value: '1', label: '团建' },
        { value: '2', label: '培训' }
      ],
      dialogFormVisible: false
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
  created() {
    this.fetchData()
    this.dataForm.currenttime = this.getNowTime()
    this.selectProject()
  },
  methods: {
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
