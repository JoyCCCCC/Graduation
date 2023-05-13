<template>
      <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:20px">各课程学生消极状态平均次数统计图</span></el-col>
      </el-row>
      <el-divider />
      <ve-pie ref="chart_one" :data="chartData1" :settings="charSettings1" />
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:20px">各学生对不同课程的学习状况统计图</span></el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="50">
        <el-form :model="form">
          <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
        <el-form-item label="学生一" :label-width="formLabelWidth">
      <el-select v-model="form.stu1" placeholder="请选择学生一">
        <el-option label="陈怡伽" value="cyj"></el-option>
        <el-option label="郑北辰" value="zbc"></el-option>
        <el-option label="王斯禹" value="wsy"></el-option>
        <el-option label="陈晨" value="cc"></el-option>
      </el-select>
    </el-form-item></el-col>
    <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
        <el-form-item label="学生二" :label-width="formLabelWidth">
      <el-select v-model="form.stu2" placeholder="请选择学生二">
        <el-option label="陈怡伽" value="cyj"></el-option>
        <el-option label="郑北辰" value="zbc"></el-option>
        <el-option label="王斯禹" value="wsy"></el-option>
        <el-option label="陈晨" value="cc"></el-option>
      </el-select>
    </el-form-item></el-col>
    <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
        <el-form-item label="学生三" :label-width="formLabelWidth">
      <el-select v-model="form.stu3" placeholder="请选择学生三">
        <el-option label="陈怡伽" value="cyj"></el-option>
        <el-option label="郑北辰" value="zbc"></el-option>
        <el-option label="王斯禹" value="wsy"></el-option>
        <el-option label="陈晨" value="cc"></el-option>
      </el-select>
    </el-form-item></el-col>
    <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
        <el-form-item label="学生四" :label-width="formLabelWidth">
      <el-select v-model="form.stu4" placeholder="请选择学生四">
        <el-option label="陈怡伽" value="cyj"></el-option>
        <el-option label="郑北辰" value="zbc"></el-option>
        <el-option label="王斯禹" value="wsy"></el-option>
        <el-option label="陈晨" value="cc"></el-option>
      </el-select>
    </el-form-item></el-col></el-form>
    <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
    <el-button type="primary" @click="initEcharts();initPie();">生成图像</el-button></el-col>
      </el-row>
      <br>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="24" :xl="8">
  <div class="echart" id="mychart" :style="myChartStyle"></div></el-col></el-row>
  <br>
  <el-row :gutter="50">
  <!-- <ve-pie ref="chart_two" :data="pieData" :settings="pieSettings" /> -->
  <div class="echart" id="mychart2" :style="myChartStyle"></div>
  </el-row>
   </el-card>
</template>

<script>
import * as echarts from "echarts"
import VePie from 'v-charts/lib/pie.common'
import Vue from 'vue'

Vue.component(VePie.name, VePie)
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
    return {
      form: {
          name: '',
          stu1: '',
          stu2: '',
          stu3: '',
          stu4: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '60px',
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
          { '学生名': '陈怡伽', '平均消极状态次数': 10 },
          { '学生名': '郑北辰', '平均消极状态次数': 9 },
          { '学生名': '陈晨', '平均消极状态次数': 7 },
          { '学生名': '王斯予', '平均消极状态次数': 4 }
        ]
      },
      myChart: {},
      myChart2: {},
      xData: ['栈的应用', '算法时间复杂度', '拓扑结构', '传输层', '内存管理', '文件管理', '浮点数运算', '指令格式'], //横坐标
      cyjData: [13,12,15,15,9,8,7,2],
      zbcData: [11,10,14,10,7,6,5,5],
      wsyData: [7,6,11,7,5,4,4,5],
      ccData: [5,5,8,6,4,3,2,1],
      myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
    };
  },
  // mounted() {
  //   this.initEcharts();
  // },
  methods: {
    initPie() {
      const option = {
    legend: {
        // 图例
        data: ["陈怡伽", "陈晨", "郑北辰", "王斯禹"],
        left: "center",
        top: "0%",
        orient: "horizontal"
    },
    series: [
        {
            type: "pie",
            label: {
                show: true,
                formatter: "{b} : {c} ({d}%)" // b代表名称，c代表对应值，d代表百分比
            },
            data: [
                {
                    value: 10,
                    name: "陈怡伽"
                },
                {
                    value: 7,
                    name: "陈晨"
                },
                {
                    value: 9,
                    name: "郑北辰"
                },
                {
                    value: 4,
                    name: "王斯禹"
                }
            ]
        }
    ]
};
    this.myChart2 = echarts.init(document.getElementById("mychart2"));
      this.myChart2.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart2.resize();
      })
    },
    initEcharts() {
      const option = {
        title: {
          text: '消极情绪次数'
        },
        xAxis: {
          type: 'category',
          data: this.xData
        },
        legend: { // 图例
          data: ['陈怡伽', '郑北辰', '王斯禹', '陈晨'],
          bottom: "0%"
        },
        tooltip: {
          trigger: 'axis'
        },
        calculable: true,
        yAxis: [
           {
                    type : 'value',
                    axisTick: {
                        show: false
                    },
                    name: '（次）'
          }
        ],
        series: [
          {
            name: "陈怡伽",
            data: this.cyjData,
            type: "line", // 类型设置为折线图
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 16
              }
            }
          },
          {
            name: "郑北辰",
            data: this.zbcData,
            type: "line", // 类型设置为折线图
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 16
              }
            }
          },
          {
            name: "王斯禹",
            data: this.wsyData,
            type: "line", // 类型设置为折线图
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 16
              }
            }
          },
          {
            name: "陈晨",
            data: this.ccData,
            type: "line", // 类型设置为折线图
            label: {
              show: true,
              position: "top",
              textStyle: {
                fontSize: 16
              }
            }
          }
        ]
      };
      this.myChart = echarts.init(document.getElementById("mychart"));
      this.myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    }
  }
};
</script>