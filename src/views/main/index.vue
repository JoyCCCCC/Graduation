    <style>
 .background{
   background: url("../../../public/static/bg3.jpg") no-repeat;
  background-position: center;
width:auto;
height:auto;
background-size: cover;
  position: unset;
}
      @import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
      .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      }

      .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
      }
    </style>
    <style type="text/css">

*{

  padding: 0;

  margin: 0;

}*

.gcs-footer{

  margin-top: 20px;

  background:#222c3a;

  width: 100%;

  height: 165px;

  text-align: center;

  color: white;

  position: absolute;

}

.gcs-footer .footer-top{

  margin-top: 50px;

}

.gcs-footer a{

  color: #f0f1f1;

  text-decoration: none;

  padding: 0 10px;

  vertical-align:middle;

}

.gcs-footer a:hover{

  color: red;

  text-decoration: underline;

}

.gcs-footer p{

  height: 15px;

  color: #888888;

  margin-top: 30px;

}

</style>
<template>
  <div class="background">
    <!-- 暂时显示 方便调试 -->
    <!-- <div>name: {{ userInfo.userName }}</div>
    <div>id: {{ userInfo.id.userId }}</div>
    <div>token: {{ userInfo.accessToken }}</div> -->
    <div>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in imgList" :key="item.name">
          <h3 class="medium"> <img :src="item.src" style="width:100%;" alt="图片" :title="item.title"></h3>
        </el-carousel-item>
      </el-carousel></div>
      <br><br>
    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <el-card shadow="always">
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="10" :xl="8"><br></el-col>
        <span class="course" style="font-size:30px;color:#409EFF">最 / 新 / 课 / 程</span>
        <el-button style="float:right;padding: 3px 0 ;font-size:24px" type="text" icon="el-icon-view" @click="MoreCourse">更多</el-button>
      </el-row>
      <el-divider><i class="el-icon-school"></i></el-divider>
      <el-row :gutter="50">
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="course"><el-link href="list[0].course_url" target="_blank" style="font-size:16px">{{list[0].course_name}}</el-link></span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="course"><el-link href="list[1].course_url" target="_blank" style="font-size:16px">{{list[1].course_name}}</el-link></span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="course"><el-link href="list[2].course_url" target="_blank" style="font-size:16px">{{list[2].course_name}}</el-link></span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="course"><el-link href="list[3].course_url" target="_blank" style="font-size:16px">{{list[3].course_name}}</el-link></span></el-col>
            </div></div>
      </el-row>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[0].course_img"></el-image></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[1].course_img"></el-image></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[2].course_img"></el-image></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[3].course_img"></el-image></el-col>
      </el-row>
      <br><br>
      <el-row :gutter="50">
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration"><el-link href="list[4].course_url" target="_blank" style="font-size:16px">{{list[4].course_name}}</el-link></span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration"><el-link href="list[5].course_url" target="_blank" style="font-size:16px">{{list[5].course_name}}</el-link></span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration"><el-link href="list[6].course_url" target="_blank" style="font-size:16px">{{list[6].course_name}}</el-link></span></el-col>
            </div></div>
            <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col>
            <div class="demo-image__placeholder"><div class="block">
              <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
              <span class="demonstration"><el-link href="list[7].course_url" target="_blank" style="font-size:16px">{{list[7].course_name}}</el-link></span></el-col>
            </div></div>
      </el-row>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[4].course_img"></el-image></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[5].course_img"></el-image></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[6].course_img"></el-image></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
            <el-image style="width: 250px; height: 150px" :src="list[7].course_img"></el-image></el-col>
      </el-row>
     </el-card>
     <br><br><br><br>
      <!-- 评价 开始 -->
      <el-card shadow="always">
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="10" :xl="8"><br></el-col>
           <span class="demonstration" style="font-size:30px;color:#F56C6C">最 / 新 / 评 / 价</span>
           <el-button style="float:right;padding: 3px 0 ;font-size:24px;color:#F56C6C" type="text" icon="el-icon-view" @click="seeClass">更多</el-button>
      </el-row>
      <el-divider><i class="el-icon-edit"></i></el-divider>
      <el-col :span="0.8"><br></el-col>
      <div>
        <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
          <span style="font-size:20px">{{list2[0].course_name}}</span>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:16px;color:#909399">{{list2[0].t_Content}}</span>
        </el-col></el-row>
        <el-divider />
        <el-row :gutter="50">
            <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
          <span style="font-size:20px">{{list2[1].course_name}}</span>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:16px;color:#909399">{{list2[1].t_Content}}</span>
        </el-col></el-row>
        <el-divider />
        <el-row :gutter="50">
            <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
          <span style="font-size:20px">{{list2[2].course_name}}</span>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:16px;color:#909399">{{list2[2].t_Content}}</span>
        </el-col></el-row>
        <el-divider />
        <el-row :gutter="50">
            <el-col :xs="8" :sm="8" :md="8" :lg="5" :xl="8">
          <span style="font-size:20px">{{list2[3].course_name}}</span>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
          <span style="font-size:16px;color:#909399">{{list2[3].t_Content}}</span>
        </el-col></el-row>
      </div>
      </el-card>
    <el-row :gutter="10" />
  <div class="gcs-footer">
       <div class="footer-top">

        <a @click="goPage('http://portal.ecnu.edu.cn')">华东师范大学公共数据库</a> |

        <a @click="goPage('http://www.baidu.com')">百度</a> |

        <a @click="goPage('http://elearning.ecnu.edu.cn')">大夏学堂</a> |


      </div>

      <p>

        智能教育系统 | by 陈怡伽

      </p>

    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import index from '@/api/index'
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios
export default {
  name: 'Dashboard',
  data() {
    return {
      circleUrl: 'https://gd-hbimg.huaban.com/b1b7c26d1ccdf21c9b7868b1f99faba26e1f9b4e11c2d-TZeRnN_fw658',
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
      // list2: [{
      //   name: '数据结构之算法时间复杂度',
      //   tea_eva: '课程学习专注度较差，如果遇到什么困难与压力可以随时与老师沟通。加油！'
      // },
      // {
      //   name: '计算机组成原理之指令格式',
      //   tea_eva: '学习态度端正，态度积极，继续保持，不要松懈！'
      // },
      // {
      //   name: '计算机网络的拓扑结构',
      //   tea_eva: '专注度还需提高，记得多复习上课讲的内容哦！'
      // },
      // {
      //   name: '操作系统之文件管理',
      //   tea_eva: '专注度较高，课堂表现良好，继续保持！'
      // }],
      list2: [],
      imgList: [{
        name: 'bg',
        src: require('../../../public/static/gate.jpg'),
        title: '风景'
      },
      {
        name: 'bg2',
        src: require('../../../public/static/b2.jpg'),
        title: '通知1'
      },
      {
        name: 'bg3',
        src: require('../../../public/static/b1.jpg'),
        title: '通知2'
      }
      // {
      //   name: 'bg2',
      //   src: require('../../../public/static/b3.jpg'),
      //   title: '通知3'
      // }
      ],
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.getUser()
    this.getEva()
  },
  methods: {
    getUser(){
                    //使用axios请求后台数据
                    axios.get("http://localhost:8080/queryTeacherEvaluationList").then(res => {
                        this.list2 = res.data
                        // alert(res.data)
                    }).catch(err => {
                        console.log("获取异常~")
                    })
                },
    getEva(){
                    //使用axios请求后台数据
                    axios.get("http://localhost:8080/queryCourseInformationList").then(res => {
                        this.list = res.data
                        console.log(res.data)
                    }).catch(err => {
                        console.log("获取异常~")
                    })
                },
    goPage(url) {
      window.location.href = url
    },
    MoreCourse() {
      this.$router.replace('/mathmanagement/math')
    },
    seeClass() {
      this.$router.replace('/classmanagement/class')
    },
    seeDB() {
      this.$router.replace('/mathmanagement/textbook')
    },
    seeMark() {
      this.$router.replace('/markmanagement/markForm')
    }
  }
}
</script>

<style scoped>
    /* .el-col {
      border-radius: 20px;
    } */
  .el-row {
    margin-bottom: 10px;
  }
  .bg-light {
    background: rgb(255, 255, 255);
  }
  .tx-blue {
    color: #38a5ff;
  }
  .tx-red {
    color:#F56C6C;
  }
  .tx-grey {
    color:#606266;
  }
  .grid-content {
    border-radius: 20px;
    min-height: 36px;
  }
  .text {
    font-size: 24px;
  }
  .item {
    margin-bottom: 18px;
  }
  .shadow{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
</style>
