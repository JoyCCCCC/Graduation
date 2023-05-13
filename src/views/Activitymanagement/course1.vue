<template>
    <div>
      <el-card>
      <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">数据结构之算法时间复杂度</span></el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="50">
      <el-col :xs="8" :sm="8" :md="8" :lg="19" :xl="8"><br></el-col>
      <div>
      <span class="video block">
        <el-button ref="video" type="primary" @click="getVido">打开摄像头</el-button>
        <!-- <video ref="video" width="620" height="500" autoPlay muted @play="getVido" /> -->
      </span>
      <span class="block canvas">
        <canvas ref="can" />
      </span>
    </div>
    <!-- <div id="text" class="text">
      当前的表情为{{emotion}}
    </div> -->
        <!-- <el-col :xs="8" :sm="8" :md="8" :lg="1" :xl="8"><br></el-col> -->
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
            <ali-player :encryptType="1"
                :source="source"
                ref="player"
                :useFlashPrism="false"
                :autoplay="false"
                :isLive="false"
                :showBuffer="true"
                :cover="cover"
                :showBarTime="true"
                :disableSeek="true"
                showBarTime="500"
                width="800px"
                controlBarVisibility="always">
            </ali-player>
        </el-col>
      <span class="video block">
        <video ref="video" width="300px" height="200px" autoplay v-on:play="whenPlay" />
      </span>
        <el-row :gutter="50">
          <el-card>
        <el-col :xs="8" :sm="8" :md="8" :lg="24" :xl="8">
        <span style="font-size:20px;color:#409EFF">课程简介</span></el-col><br>
        <el-col :xs="8" :sm="8" :md="8" :lg="24" :xl="8">
        <span style="font-size:16px">算法（Algorithm）是指用来操作数据、解决程序问题的一组方法。对于同一个问题，使用不同的算法，也许最终得到的结果是一样的，但在过程中消耗的资源和时间却会有很大的区别。那么我们应该如何去衡量不同算法之间的优劣呢？主要还是从算法所占用的「时间」和「空间」两个维度去考量。接下来，就让我们一起学习从时间的维度描述算法复杂度吧。</span></el-col><br>
          </el-card>
      </el-row>
      </el-row>
    </el-card></div>
</template>

<script>
import * as faceapi from 'face-api.js'
import VueAliplayerV2 from 'vue-aliplayer-v2'
import Vue from 'vue'
import VueAliplayer from '@/components/AliPlayer'

Vue.use(VueAliplayerV2)
export default {
  name: 'Emotion',
  components: {'ali-player': VueAliplayer},
  data() {
    return {
      cover: 'https://img0.baidu.com/it/u=4191304663,835376280&fm=253&fmt=auto&app=138&f=PNG?w=885&h=500',
      source: require('@/assets/video/test.mp4'),
      // options: {
      //     width: "100%",
      //     height: "40vw",
      //     controlBarVisibility: 'always',
      //     format: 'm3u8',
      //     qualitySort:'desc',
      //     definition:'FD,LD,SD',
      //     defaultDefinition:'FD',
      //     //设置阿里云播放器的样式
      //     skinLayout: [{
      //       name: "bigPlayButton",
      //       align: "blabs",
      //       x: 30,
      //       y: 80
      //     },
      //       {
      //         name: "H5Loading",
      //         align: "cc"
      //       },
      //       {
      //         name: "errorDisplay",
      //         align: "tlabs",
      //         x: 0,
      //         y: 0
      //       },
      //       {
      //         name: "controlBar", align: "blabs", x: 0, y: 0,
      //         children: [
      //           {name: "progress", align: "blabs", x: 0, y: 44},
      //           {name: "playButton", align: "tl", x: 10, y: 12},
      //           {name: "timeDisplay", align: "tl", x: 10, y: 5},
      //           {name: "fullScreenButton", align: "tr", x: 10, y: 12},
      //           {name:"setting", align:"tr",x:10, y:12},
      //           {name: "volume", align: "tr", x: 10, y: 10}
      //         ]
      //       }
      //     ],
      //   },
      emotion: '',
      tableKey: 1,
      tableData: [{
        emotion: '中立',
        percention: 0
      }, {
        emotion: '快乐',
        percention: 0
      }, {
        emotion: '伤心',
        percention: 0
      }, {
        emotion: '愤怒',
        percention: 0
      }, {
        emotion: '害怕',
        percention: 0
      }, {
        emotion: '疑惑',
        percention: 0
      }, {
        emotion: '惊讶',
        percention: 0
      }]
    }
  },
  watch: {
    tableData: {
      handler() {
        // 当监听到数据变化时更新表格
        this.tableKey += 1
      },
      deep: true
    }
  },
  mounted() {
    this.run()
  },
  methods: {
    // timeUpDate() {
    //     this.currentTime = parseInt(this.$refs.VueAliplayerV2.getCurrentTime())
    //     // 设定了一个当前的取整时间，判断当前的整数时间等于上传的整数时间，说明这还是在同一秒不执行代码
    //     if (this.currentTime !== this.lastCurrentTime) {
    //       if (this.prevtime < this.totalDuration) {
    //         // 禁止快进
    //         if(this.currentTime > this.prevtime && this.currentTime - this.lastCurrentTime > 2){
    //           this.$refs.VueAliplayerV2.seek(this.lastCurrentTime)
    //         }

    //         // 监听断点，学员进行测试
    //         this.breakPointList.forEach(item => {
    //           console.log(this.currentTime)
    //           if (this.currentTime === item) {
    //             this.questionDialogVisible = true;
    //             this.$refs.VueAliplayerV2.pause()
    //             this.currentBreakPoint = item
    //             this.showPaper = false
    //             this.disabledStatus = false
    //             this.getPaperQuestions(this.currentChapterId, this.currentBreakPoint)
    //           }
    //         })

    //         // 时长统计
    //         if (this.currentTime - this.lastCurrentTime < 2 && this.currentTime - this.prevtime >= 60 && this.currentTime > this.prevtime) {
    //           this.prevtime = this.currentTime;
    //           let data = {
    //             video_id: this.videoDetail.id,
    //             chapter_id: this.currentChapterId,
    //             learn_duration: this.currentTime,
    //             push_event: 'update'
    //           }
    //           this.addLearnRecord(data, 'update')
    //         }
    //         this.lastCurrentTime = this.currentTime
    //       }

    //     }
    //     this.lastCurrentTime = this.currentTime
    //   },
    //   ready(){
    //     console.log('ready')
    //     this.$nextTick(() => {
    //       if (this.prevtime === this.totalDuration) {
    //         this.$refs.VueAliplayerV2.play()
    //       } else {
    //         this.$refs.VueAliplayerV2.seek(this.prevtime)
    //       }
    //     })
    //   },
    //   ended() {
    //     //监听end事件
    //     let data = {
    //       video_id: this.videoDetail.id,
    //       chapter_id: this.currentChapterId,
    //       learn_duration: this.totalDuration,
    //       push_event: 'ended'
    //     }
    //     this.addLearnRecord(data, 'end')
    //   },
    getVido() {
      this.yincang = true
      const video = this.$refs.video
      const constraints = {
        video: { width: 500, height: 500 }
      }
      const _this = this
      const promise = navigator.mediaDevices.getUserMedia(constraints)
      promise.then(function(MediaStream) {
        video.srcObject = MediaStream
        _this.MediaStreamTrack = typeof MediaStream.stop === 'function' ? MediaStream : MediaStream.getTracks()[0]
        video.play()
      }).catch(function(PermissionDeniedError) {
        console.log(PermissionDeniedError)
      })
    },
    async startVideo() {
      const video = this.$refs.video
      navigator.mediaDevices.getUserMedia(
        { video: true }
      ).then(
        stream => (video.srcObject = stream),
        err => console.log(err)
      )
    },
    async run() {
      const MODEL_URL = '/models'
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL)
      await faceapi.loadFaceLandmarkModel(MODEL_URL)
      await faceapi.loadFaceRecognitionModel(MODEL_URL)
      await faceapi.loadFaceExpressionModel(MODEL_URL)
      // this.startVideo()
    },
    async whenPlay() {
      // 当视频可以播放时候的事件
      const video = this.$refs.video
      const can = this.$refs.can
      const ctx = can.getContext('2d')
      can.width = video.width
      can.height = video.height
      const canvas = faceapi.createCanvasFromMedia(video)
      document.body.append(canvas)
      const displaySize = { width: video.width, height: video.height }
      faceapi.matchDimensions(canvas, displaySize)
      let count = 0
      // 对比好后利用canvas来画图
      // 当count%10==0 此时更新录像并进行判断
      // 当count%10!=0 此时更新录像但是判断保留
      let detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      let resizedDetections = faceapi.resizeResults(detections, displaySize)
      setInterval(async() => {
        if (count % 10 == 0) {
          detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
          resizedDetections = faceapi.resizeResults(detections, displaySize)
          const newtable = [{
            emotion: '中立',
            percention: resizedDetections[0]['expressions']['neutral']
          }, {
            emotion: '快乐',
            percention: resizedDetections[0]['expressions']['happy']
          }, {
            emotion: '伤心',
            percention: resizedDetections[0]['expressions']['sad']
          }, {
            emotion: '愤怒',
            percention: resizedDetections[0]['expressions']['angry']
          }, {
            emotion: '害怕',
            percention: resizedDetections[0]['expressions']['fearful']
          }, {
            emotion: '厌恶',
            percention: resizedDetections[0]['expressions']['disgusted']
          }, {
            emotion: '惊讶',
            percention: resizedDetections[0]['expressions']['surprised']
          }]
          this.tableData = newtable
          let max = 0
          let emotion = ''
          for (var i = 0; i < newtable.length; i++){
            if (newtable[i].percention > max) {
              emotion = newtable[i].emotion
              max = newtable[i].percention
            }
          }
          let text = document.getElementById('text')
          text.innerText = '当前的表情为' + emotion
          count = 0
        }
        ctx.drawImage(video, 0, 0, video.width, video.height)
        // ctx.clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(ctx, resizedDetections)
        faceapi.draw.drawFaceExpressions(can, resizedDetections)
        count = count + 1
        // console.log(count)
        // video = canvas
      }, 100)
    }
  }
}
</script>

<style scoped>
/* .prism-player{
    ::v-deep .prism-setting-speed{
      display: none !important;
    }
    ::v-deep .prism-progress{
      pointer-events: none;
    }
  }
  .has-learned.prism-player{
    ::v-deep .prism-setting-speed{
      display: block !important;
    }
  }
  .has-learned.prism-player{
    ::v-deep .prism-progress{
      pointer-events: auto;
    }
  } */
.video{
  margin-left: 4%;
}

.canvas{
  margin-left: 5%;
}

.block{
  display: inline-block;
}

.stitle{
  text-align: center;
}

.title{
  text-align: center;
  font-size: xx-large;
}

.text{
  text-align: center;
  font-size: x-large;
  vertical-align: top;
}
</style>
