<template>
    <div>
      <el-card shadow="always">
        <el-row :gutter="50">
        <el-col :xs="8" :sm="8" :md="8" :lg="16" :xl="8">
        <span style="font-size:20px">学生课程完成情况</span></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8"><br></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="4" :xl="8">
        <div class="demo-input-suffix" style="width:200px; height:100%">
          <el-input
            v-model="keyword"
            placeholder="查询学生名字"
            prefix-icon="el-icon-search"
          />
        </div></el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="2" :xl="8">
        <el-button type="primary" icon="el-icon-search">搜索</el-button></el-col>
      </el-row>
      <el-divider />
        <div v-for="(item,i) in filcomments" :key="i" class="author-title reply-father">
            <el-avatar class="header-img" :size="40" :src="item.headImg"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{item.name}}</span>
                <span class="author-time">{{item.time}}</span>
            </div>
            <div class="icon-btn">
                <el-tag :type="getRank(item.state)">{{item.state}}</el-tag>
                <span @click="showReplyInput(i,item.name,item.id)"><i class="iconfont el-icon-s-comment" size="medium"></i></span>
                <!-- <i class="iconfont el-icon-caret-top"></i>{{item.like}} -->
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{item.comment}}</span>
                </p>
            </div>
            <div class="reply-box">
              <div v-if="item.state=='未评价'">
                <!-- <div v-for="(reply,j) in item" :key="j" class="author-title"> -->
                    <el-avatar class="header-img" :size="40" :src="item.reply[0].fromHeadImg"></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{item.reply[0].from}}</span>
                        <span class="author-time">{{item.reply[0].time}}</span>
                    </div>
                    <!-- <div class="icon-btn">
                        <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span> -->
                        <!-- <i class="iconfont el-icon-caret-top"></i>{{reply.like}} -->
                    <!-- </div> -->
                    <div class="talk-box">
                        <p>
                            <span>评价 {{item.reply[0].to}}:</span>
                            <span class="reply">{{item.reply[0].comment}}</span>
                        </p>
                    </div>
                <!-- </div> -->
              </div>
              <div v-else-if="item.state=='已评价'">
                <div v-for="(reply,j) in item.reply" :key="j" class="author-title">
                    <el-avatar class="header-img" :size="40" :src="reply.fromHeadImg"></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{reply.from}}</span>
                        <span class="author-time">{{reply.time}}</span>
                    </div>
                    <!-- <div class="icon-btn">
                        <span @click="showReplyInput(i,reply.from,reply.id)"><i class="iconfont el-icon-s-comment"></i>{{reply.commentNum}}</span> -->
                        <!-- <i class="iconfont el-icon-caret-top"></i>{{reply.like}} -->
                    <!-- </div> -->
                    <div class="talk-box">
                        <p>
                            <span>评价 {{reply.to}}:</span>
                            <span class="reply">{{reply.comment}}</span>
                        </p>
                    </div>
                </div>
              </div>
              <div class="reply-box">
            </div>
        </div>
            <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <el-avatar class="header-img" :size="40" :src="myHeader"></el-avatar>
                <div class="reply-info" >
                    <div tabindex="0" contenteditable="true" spellcheck="false" placeholder="输入评论..."   @input="onDivInput($event)"  class="reply-input reply-comment-input"></div>
                </div>
                <div class=" reply-btn-box">
                    <el-button class="reply-btn" size="small" @click="sendCommentReply(i,j)" type="primary">发表评论</el-button>
            </div>
        </div>
        </div>
         <el-col :xs="8" :sm="8" :md="8" :lg="10" :xl="8"><br></el-col>
      <el-pagination :page-size="4" :pager-count="3" layout="prev, pager, next" :total="32"></el-pagination>
      </el-card>
    </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$axios = axios
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
    function documentHandler(e) {
    // 这里判断点击的元素是否是本身，是本身，则返回
        if (el.contains(e.target)) {
            return false;
        }
    // 判断指令中是否绑定了函数
        if (binding.expression) {
            // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
            binding.value(e);
        }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.vueClickOutside);
    delete el.vueClickOutside;
  },
};
export default {
    name:'ArticleComment',
    data(){
        return{
          keyword: '',
            btnShow: false,
            index:'0',
            replyComment:'',
            myName:'王老师',
            myHeader:'https://i.328888.xyz/2023/05/08/i1GM0p.jpeg',
            myId:19760821,
            to:'',
            toId:-1,
            comments:[
                {
                    name:'',
                    id:20010709,
                    T_evaluate_id:5,
                    headImg: 'https://i.328888.xyz/2023/05/08/i1GQ3y.jpeg',
                    comment:'已完成：数据结构之栈的应用',
                    time:'2022年9月16日 18:43',
                    inputShow:false,
                    state: '',
                    reply:[
                        {
                            from:'系统评价',
                            fromId:10000000,
                            fromHeadImg:'https://gd-hbimg.huaban.com/b1b7c26d1ccdf21c9b7868b1f99faba26e1f9b4e11c2d-TZeRnN_fw658',
                            to:'陈怡伽',
                            toId:20010709,
                            comment:' 较差，未认真学习课程，未掌握知识点或难点较多。',
                            time:'2022年9月16日 18:44',
                            commentNum:1,
                            like:15,
                            inputShow:false
                        },
                        {
                          from:'王老师',
                            fromId:19760821,
                            fromHeadImg:'https://i.328888.xyz/2023/05/08/i1GM0p.jpeg',
                            to:'',
                            toId:20010709,
                            time: '',
                            comment:'',
                            inputShow:false
                        }
                    ]
                },
                {
                    name:'郑北辰',
                    id:20000218,
                    T_evaluate_id:25,
                    headImg:'https://i.328888.xyz/2023/05/08/i1GY55.jpeg',
                    comment:'已完成：数据结构之算法时间复杂度',
                    time:'2022年9月16日 18:43',
                    inputShow:false,
                    state: '',
                    reply:[
                        {
                            from:'系统评价',
                            fromId:10000000,
                            fromHeadImg:'https://gd-hbimg.huaban.com/b1b7c26d1ccdf21c9b7868b1f99faba26e1f9b4e11c2d-TZeRnN_fw658',
                            to:'郑北辰',
                            toId:20000218,
                            comment:' 一般，有注意力不集中现象，注意课下复习巩固知识。',
                            time:'2022年9月16日 18:44',
                            commentNum:1,
                            like:15,
                            inputShow:false
                        },
                        {
                          from:'王老师',
                            fromId:19760821,
                            fromHeadImg:'https://i.328888.xyz/2023/05/08/i1GM0p.jpeg',
                            to:'',
                            toId:20000218,
                            time: '',
                            comment:'',
                            inputShow:false
                        }
                    ]
                },
                {
                    name:'陈晨',
                    id:20010124,
                    headImg: 'https://i.328888.xyz/2023/05/08/i1Gui8.jpeg',
                    comment:'已完成：计算机组成原理之指令格式',
                    time:'2022年9月18日 18:43',
                    commentNum:0,
                    like:5,
                    inputShow:false,
                    state: '已评价',
                    reply:[
                      {
                            from:'系统评价',
                            fromId:10000000,
                            fromHeadImg:'https://gd-hbimg.huaban.com/b1b7c26d1ccdf21c9b7868b1f99faba26e1f9b4e11c2d-TZeRnN_fw658',
                            to:'陈晨',
                            toId:20010124,
                            comment:' 良好，听课较认真，知识能大部分接收。',
                            time:'2022年9月18日 18:44',
                            commentNum:1,
                            like:15,
                            inputShow:false
                      },
                      {
                            from:'王老师',
                            fromId:19760821,
                            fromHeadImg:'https://i.328888.xyz/2023/05/08/i1GM0p.jpeg',
                            to:'陈晨',
                            toId:20010124,
                            comment:' 专注度较高，课堂表现良好，继续保持！',
                            time:'2022年9月20日 10:32',
                            commentNum:0,
                            like:5,
                            inputShow:false
                        }
                    ]
                },
                {
                    name:'王斯禹',
                    id:20001004,
                    headImg:'https://i.328888.xyz/2023/05/08/i1dizF.jpeg',
                    comment:'已完成：操作系统之内存管理',
                    time:'2022年9月18日 18:43',
                    commentNum:0,
                    like:5,
                    inputShow:false,
                    state: '已评价',
                    reply:[
                      {
                            from:'系统评价',
                            fromId:10000000,
                            fromHeadImg:'https://gd-hbimg.huaban.com/b1b7c26d1ccdf21c9b7868b1f99faba26e1f9b4e11c2d-TZeRnN_fw658',
                            to:'王斯禹',
                            toId:20001004,
                            comment:' 一般，有注意力不集中现象，注意课下复习巩固知识。',
                            time:'2022年9月18日 18:44',
                            commentNum:1,
                            like:15,
                            inputShow:false
                      },
                      {
                            from:'王老师',
                            fromId:19760821,
                            fromHeadImg:'https://i.328888.xyz/2023/05/08/i1GM0p.jpeg',
                            to:'王斯禹',
                            toId:20001004,
                            comment:' 学习内存管理时专注度一般，如果遇到什么困难可以随时和老师沟通，可以多研究一下课上的例题。',
                            time:'2022年9月20日 10:32',
                            commentNum:0,
                            like:5,
                            inputShow:false
                        }
                    ]
                }
            ]
        }
    },
    computed:{
                filcomments(){
                    return this.comments.filter((p)=>{
                        return p.name.indexOf(this.keyword)!=-1
                    })
                }
            },
    created() {
      this.getSys()
      this.getTea()
    },
    directives: {clickoutside},
    methods: {
    //   insertList() {
    //   console.log(this.replyComment)
    //   axios.get(`http://localhost:8080/updateTeacher?T_evaluate_id=${this.comments[0].T_evaluate_id}&State=${'已评价'}&T_Content=${this.replyComment}`)
    //   this.replyComment = ''
    // },
      getSys(){
                    //使用axios请求后台数据
                    axios.get("http://localhost:8080/querySystemEvaluationList").then(res => {
                        this.comments[0].name = res.data[0].stu_name
                    }).catch(err => {
                        console.log("获取异常~")
                    })
                },
      getTea(){
                    //使用axios请求后台数据
                    axios.get("http://localhost:8080/queryTeacherEvaluationList").then(res => {
                        this.comments[0].state = res.data[4].state
                        this.comments[1].state = res.data[24].state
                        this.comments[0].reply[1].comment = res.data[4].t_Content
                        this.comments[1].reply[1].comment = res.data[24].t_Content
                         this.comments[0].reply[1].to = res.data[4].stu_name
                        this.comments[1].reply[1].to = res.data[24].stu_name
                    }).catch(err => {
                        console.log("获取异常~")
                    })
                },
      getRank (rank) {
        if (rank === '未评价') {
          return 'warning'
        } else if (rank === '已评价') {
          return 'success'
        }
      },
      getRank1 (rank) {
        if (rank === 1) {
          return '未评价'
        } else if (rank === 2) {
          return '已评价'
        }
      },
        inputFocus(){
            var replyInput = document.getElementById('replyInput');
            replyInput.style.padding= "8px 8px"
            replyInput.style.border ="2px solid blue"
            replyInput.focus()
        },  
        showReplyBtn(){
            this.btnShow = true
        },
        hideReplyBtn(){
            this.btnShow = false
            replyInput.style.padding= "10px"
            replyInput.style.border ="none"
        },
        showReplyInput(i,name,id){
            this.comments[this.index].inputShow = false
            this.index =i
            this.comments[i].inputShow = true
            this.to = name
            this.toId = id
        },
        _inputShow(i){
            return this.comments[i].inputShow 
        },
        sendComment(){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let input =  document.getElementById('replyInput')
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.name= this.myName
                a.comment =this.replyComment
                a.headImg = this.myHeader
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments.push(a)
                this.replyComment = ''
                input.innerHTML = '';

            }
        },
        sendCommentReply(i,j){
            if(!this.replyComment){
                 this.$message({
                    showClose: true,
                    type:'warning',
                    message:'评论不能为空'
                })
            }else{
                let a ={}
                let timeNow = new Date().getTime();
                let time= this.dateStr(timeNow);
                a.from= this.myName
                a.to = this.to
                a.fromHeadImg = this.myHeader
                a.comment =this.replyComment
                a.time = time
                a.commentNum = 0
                a.like = 0
                this.comments[i].reply.push(a)
                axios.get(`http://localhost:8080/updateTeacher?T_evaluate_id=${this.comments[i].T_evaluate_id}&State=${'已评价'}&T_Content=${this.replyComment}`)
                this.replyComment = ''
                document.getElementsByClassName("reply-comment-input")[i].innerHTML = ""
                this.$router.go(0)
            }
        },
        onDivInput: function(e) {
            this.replyComment = e.target.innerHTML;
        },
        dateStr(date){
            //获取js 时间戳
            var time=new Date().getTime();
            //去掉 js 时间戳后三位，与php 时间戳保持一致
            time=parseInt((time-date)/1000);
            //存储转换值 
            var s;
            if(time<60*10){//十分钟内
                return '刚刚';
            }else if((time<60*60)&&(time>=60*10)){
                //超过十分钟少于1小时
                s = Math.floor(time/60);
                return  s+"分钟前";
            }else if((time<60*60*24)&&(time>=60*60)){ 
                //超过1小时少于24小时
                s = Math.floor(time/60/60);
                return  s+"小时前";
            }else if((time<60*60*24*30)&&(time>=60*60*24)){ 
                //超过1天少于30天内
                s = Math.floor(time/60/60/24);
                return s+"天前";
            }else{ 
                //超过30天ddd
                var date= new Date(parseInt(date));
                return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
            }
        }
    },    
}
</script>

<style>
.my-reply {
  padding: 10px;
  background-color: #fafbfc;
}
.my-reply .header-img {
  display: inline-block;
  vertical-align: top;
}
.my-reply .reply-info {
  display: inline-block;
  margin-left: 5px;
  width: 90%;
}
@media screen and (max-width: 1200px) {
  .my-reply .reply-info {
    width: 80%;
  }
}
.my-reply .reply-info .reply-input {
  min-height: 20px;
  line-height: 22px;
  padding: 10px 10px;
  color: #ccc;
  background-color: #fff;
  border-radius: 5px;
}
.my-reply .reply-info .reply-input:empty:before {
  content: attr(placeholder);
}
.my-reply .reply-info .reply-input:focus:before {
  content: none;
}
.my-reply .reply-info .reply-input:focus {
  padding: 8px 8px;
  border: 2px solid #00f;
  box-shadow: none;
  outline: none;
}
.my-reply .reply-btn-box {
  height: 25px;
  margin: 10px 0;
}
.my-reply .reply-btn-box .reply-btn {
  position: relative;
  float: right;
  margin-right: 15px;
}
.my-comment-reply {
  margin-left: 50px;
}
.my-comment-reply .reply-input {
  width: flex;
}
.author-title:not(:last-child) {
  border-bottom: 1px solid rgba(178,186,194,0.3);
}
.author-title {
  padding: 10px;
}
.author-title .header-img {
  display: inline-block;
  vertical-align: top;
}
.author-title .author-info {
  display: inline-block;
  margin-left: 5px;
  width: 60%;
  height: 40px;
  line-height: 20px;
}
.author-title .author-info >span {
  display: block;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author-title .author-info .author-name {
  color: #000;
  font-size: 18px;
  font-weight: bold;
}
.author-title .author-info .author-time {
  font-size: 14px;
}
.author-title .icon-btn {
  width: 30%;
  padding: 0 !important;
  float: right;
}
@media screen and (max-width: 1200px) {
  .author-title .icon-btn {
    width: 20%;
    padding: 7px;
  }
}
.author-title .icon-btn >span {
  cursor: pointer;
}
.author-title .icon-btn .iconfont {
  margin: 0 5px;
}
.author-title .talk-box {
  margin: 0 50px;
}
.author-title .talk-box >p {
  margin: 0;
}
.author-title .talk-box .reply {
  font-size: 16px;
  color: #000;
}
.author-title .reply-box {
  margin: 10px 0 0 50px;
  background-color: #efefef;
}
</style>
