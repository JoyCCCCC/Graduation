<template>
  <div>
    <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:20px">各课程学生消极状态平均次数统计图</span></el-col>
      </el-row>
      <el-divider />
      <!-- <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col>
      <span style="font-size:16px;color:#409EFF">选择课程：</span>
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-row>
      <div style="margin: 15px 0;"></div>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="24" :xl="8">
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group></el-col></el-row>
      <br> -->
      <ve-pie ref="chart_one" :data="chartData1" :settings="charSettings1" />
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:20px">各学生对不同课程的学习状况统计图</span></el-col>
      </el-row>
      <el-divider />
      <ve-pie ref="chart_two" :data="pieData" :settings="pieSettings" />
      <!-- <div class="echart" id="mychart" :style="myChartStyle"></div> -->
      <!-- <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="8"><br></el-col> -->
      <!-- <ve-histogram ref="chart_two" style="width: 100%" :data="histogramChartData" :settings="HistogramSettings" /> -->
    </el-card>
  </div>
</template>
<script>
import { fetchProject } from '@/api/dict'
import { getList, dataForm } from '@/api/ActivityForm'
import VePie from 'v-charts/lib/pie.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeLine from 'v-charts/lib/line.common'
import VeBar from 'v-charts/lib/bar.common'
import Vue from 'vue'
import * as echarts from 'echarts'
// require('echarts/theme/shine')
Vue.component(VePie.name, VePie)
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeBar.name, VeBar)
const cityOptions = ['数据结构之栈的应用', '数据结构之外部排序', '计算机网络的拓扑结构', '计算机网络之传输层', '操作系统之内存管理', '操作系统之文件管理', '计算机组成原理之浮点数运算', '计算机组成原理之指令格式']
export default {
  data() {
    this.charSettings1 = {
      dimension: '课程名',
      metrics: '平均消极状态次数'
    }
    this.pieSettings = {
      dimension: '学生名',
      metrics: '平均消极状态次数'
    }
    this.HistogramSettings = {
      // labelMap: {
      //   DataStructure: '数据结构',
      //   ComputerNetwork: '计算机网络',
      //   OperatingSystem: '操作系统',
      //   ComputerComposition: '计算机组成原理'
      // },
      yAxisName: ['平均次数']
      // axisSite: ['数据结构', '计算机网络', '操作系统', '计算机组成原理']
    }
    return {
      chartLine: null,
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      chartData1: {
        column: ['课程名', '平均消极状态次数'],
        rows: [
          { '课程名': '数据结构之栈的应用', '平均消极状态次数': 13 },
          { '课程名': '数据结构之外部排序', '平均消极状态次数': 8 },
          { '课程名': '计算机网络的拓扑结构', '平均消极状态次数': 3 },
          { '课程名': '计算机网络之传输层', '平均消极状态次数': 5 },
          { '课程名': '操作系统之内存管理', '平均消极状态次数': 10 },
          { '课程名': '操作系统之文件管理', '平均消极状态次数': 15 },
          { '课程名': '计算机组成原理之浮点数运算', '平均消极状态次数': 25 },
          { '课程名': '计算机组成原理之指令格式', '平均消极状态次数': 5 }
        ]
      },
      pieData: {
        column: ['学生名', '平均消极状态次数'],
        rows: [
          { '学生名': '陈怡伽', '平均消极状态次数': 9 },
          { '学生名': '郑北辰', '平均消极状态次数': 8 },
          { '学生名': '陈晨', '平均消极状态次数': 4 },
          { '学生名': '王斯予', '平均消极状态次数': 5 }
        ]
      },
      histogramChartData: {
        columns: ['学生姓名', '数据结构', '计算机网络', '操作系统', '计算机组成原理'],
        rows: [
          { '学生姓名': '陈怡伽', '数据结构': 9, '计算机网络': 3, '操作系统': 8, '计算机组成原理': 14 },
          { '学生姓名': '郑北辰', '数据结构': 2, '计算机网络': 9, '操作系统': 15, '计算机组成原理': 7 },
          { '学生姓名': '王斯予', '数据结构': 3, '计算机网络': 6, '操作系统': 9, '计算机组成原理': 12 },
          { '学生姓名': '陈晨', '数据结构': 13, '计算机网络': 2, '操作系统': 11, '计算机组成原理': 11 }
        ]
        // columns: ['学生姓名', '数据结构'],
        // rows: [
        //   { '学生姓名': '陈怡伽', '数据结构': 9 },
        //   { '学生姓名': '郑北辰', '数据结构': 2 },
        //   { '学生姓名': '王斯予', '数据结构': 3 },
        //   { '学生姓名': '陈晨', '数据结构': 13 }
        // ]
      },
      total: 0,
      value1: 5.0,
      value2: 3.0,
      value3: 4.0,
      value4: 2.0,
      query: {
        page: 1,
        limit: 10 },
      list: [],
      listLoading: true,
      dataForm: {

      },
      rules: [],
      projectOptions: []
    }
  },
  // mounted() {
  //     this.$nextTick(() => {
  //       this.drawLineChart()
  //     })
  //   },
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
    this.$nextTick(() => {
      // 解决v-charts不显示问题
      // 调用以下的方法实现环图重新渲染
      // this.drawLineChart()
      this.$refs.chart_one.echarts.resize()
      this.$refs.chart_two.echarts.resize()
    })
  },
  methods: {
    drawLineChart() {
        this.chartLine = echarts.init(this.$el,'shine');// 基于准备好的dom，初始化echarts实例
        let option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['数据结构之栈的应用', '数据结构之外部排序', '计算机网络的拓扑结构', '计算机网络之传输层', '操作系统之内存管理', '操作系统之文件管理', '计算机组成原理之浮点数运算', '计算机组成原理之指令格式']
            },
            calculable : true,
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisTick: {
                        show: false
                    },
                    data : ['数据结构之栈的应用', '数据结构之外部排序', '计算机网络的拓扑结构', '计算机网络之传输层', '操作系统之内存管理', '操作系统之文件管理', '计算机组成原理之浮点数运算', '计算机组成原理之指令格式']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisTick: {
                        show: false
                    },
                    name: '（次）'
                }
            ],
            series : [
                {
                    name:'陈怡伽',
                    type:'line',
                    stack: '消极情绪次数',
                    data:[10,7,3,5,13,2,7,3]
                },
                {
                    name:'郑北辰',
                    type:'line',
                    stack: '消极情绪次数',
                    data:[4,7,2,9,11,1,8,3]
                },
                {
                    name:'王斯予',
                    type:'line',
                    stack: '消极情绪次数',
                    data:[2,9,4,3,8,7,1,2]
                },
                {
                    name:'陈晨',
                    type:'line',
                    stack: '消极情绪次数',
                    data:[11,13,7,5,4,8,9,10]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表
        this.chartLine.setOption(option);
      },
     handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
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
<style>

</style>