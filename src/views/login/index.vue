<template>
  <div>
    <div ref="lgbody" class="lg-body">
      <section class="login-container">
        <div class="lg-form-wrap">
          <div class="lg-form-cover" />
          <div class="lg-form-loader">
            <div class="spinner active">
              <svg class="spinner-circular" viewBox="25 25 50 50">
                <circle
                  class="spinner-path"
                  cx="100"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke-width="4"
                  stroke-miterlimit="10"
                />
              </svg>
            </div>
          </div>
          <div class="lg-form-content">
            <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
              size="medium"
            >
              <div class="login-title">
                <div class="title">
                  <i class="logo" /><span class="title-text">智能教育网页端</span>
                </div>
              </div>
              <el-form-item prop="userName">
                <span class="svg-container">
                  <span class="el-icon-user icon" />
                </span>
                <el-input
                  ref="userName"
                  v-model="loginForm.userName"
                  placeholder="Username"
                  name="userName"
                  type="text"
                  tabindex="1"
                  auto-complete="on"
                />
              </el-form-item>
              <el-form-item prop="password">
                <span class="svg-container">
                  <span class="el-icon-lock icon" />
                </span>
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"

                  @keyup.enter.native="handleLogin"
                />
                <span class="svg-container show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" class="icon" />
                </span>
              </el-form-item>
              <el-button :loading="loading" type="primary" round="true" style="width:340px;height:80px;margin-bottom:15px;text-align:center;font-size:30px" @click.native.prevent="handleLogin">登 录
              </el-button>
            </el-form>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('The password can not be less than 6 digits'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [{
          required: true,
          trigger: 'blur'
        }],
        password: [{
          required: true,
          trigger: 'blur'
        }]
        // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    const that = this
    that.$store.commit('loading/INIT')
    setTimeout(function() {
      that.$refs.lgbody.classList.add('on-start')
    }, 100)
    setTimeout(function() {
      that.$refs.lgbody.classList.add('document-loaded')
    }, 1800)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$store.dispatch('system/getSysParams')
          //   this.$store.dispatch('system/getAreaData')
          //   this.$router.push({
          //     path: this.redirect || '/'
          //   })
          // }).catch(error => console.log(error))
          // this.$router.replace('/desktop/desktop')
         if(this.loginForm.userName=='20010709'){
            this.$store.commit('app/CHANGE_STU')
            console.log(this.$store.state.app.userType)
            this.$router.replace('/desktop/desktop')
         }
         else if(this.loginForm.userName=='19760821'){
            this.$store.commit('app/CHANGE_TEA')
            console.log(this.$store.state.app.userType)
            this.$router.replace('/desktop2/desktop2')
          
         }
         else if(this.loginForm.userName=='10000000'){
            this.$store.commit('app/CHANGE_ADM'),
            this.$router.replace('/markmanagement/markForm')
         }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  $loginbg:#155f9a;
  .login-form {
    position: fixed;
    z-index: 5;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 58px 30px 60px;
    width: 400px;
    height: 360px;
    background-color: #ffffff;
    box-shadow: 0px 10px 29px 2px rgba(5, 39, 32, 0.5);
    border-radius: 5px;
    .el-button {
      display: block;
      width: 100%;
      margin-top: 25px;
      background: $loginbg;
    }
    .el-form-item{
      margin-bottom:18px;
    }
    .el-form-item__content {
      position: relative;
    }
    .svg-container {
      position: absolute;
      left: 12px;
      top: 0;
      z-index: 5;
      .icon {
        color: #666;
        font-size: 14px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 12px;
      top: 0px;
      left: auto;
      cursor: pointer;
      user-select: none;
    }
    .el-input__inner {
      padding: 0 35px;
    }
    .login-title {
      text-align: center;
      margin-bottom: 30px;
      .title {
        display: inline-block;
        padding-left: 55px;
        position: relative;
      }
      .logo {
        position: absolute;
        left: 0;
        top: 2px;
        width: 48px;
        height: 48px;
        background: url("../../assets/img/cat.png");
      }
      .title-text {
        font-weight: bold;
        font-size: 30px;
      }
    }
  }

  .lg-body {
    .login-container {
      background: $loginbg;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      &:before {
        z-index: -4;
        content: "";
        display: block;
        position: absolute;
        background: url("../../assets/img/bg3.png");
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      &:after {
        z-index: -5;
        content: "";
        display: block;
        position: absolute;
        background: radial-gradient(#3c6ba5 0, #406fb2 1px, transparent 1px, transparent) left top/5px 5px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .lg-form-wrap {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      position: relative;
      width: 350px;
      height: 335px;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      padding: 20px;
      border-radius: 5px;
    }
    .lg-form-loader {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      z-index: -4;
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }
    .lg-form-content {
      text-align: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      position: relative;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.5s ease 0.7s;
    }
    .lg-form-cover {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: -4;
      border-radius: 7px;
      overflow: hidden;
      transition: all 0.3s ease 0.8s;
    }
    .lg-form-cover:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: $loginbg;
      z-index: -4;
      border-radius: 50%;
      transition: all 1.5s ease 0.3s;
      transform: scale(0);
    }
    .lg-form-cover:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: white;
      z-index: -5;
      border-radius: 50%;
      transition: all 0.5s ease;
      transform: scale(0);
    }
    .spinner {
      position: relative;
      margin: auto;
      width: 50px;
      height: 50px;
      transition: all 0.2s ease 0s;
    }
    .spinner-circular {
      animation: rotate 1.5s linear infinite;
      animation-play-state: paused;
      transform-origin: center center;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      margin: auto;
    }
    .spinner-path {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: dash 1.3s ease forwards 0.5s;
      opacity: 0;
      stroke-linecap: round;
      stroke: $loginbg;
      animation-play-state: running;
    }
    &.on-start .lg-form-cover:before {
      transform: scale(0.15);
    }
    &.document-loaded {
      .lg-form-loader {
        transform: scale(0);
        opacity: 0;
        visibility: hidden;
      }
      .lg-form-content {
        opacity: 1;
        transform: none;
      }
      .lg-form-cover:after {
        transform: scale(2);
      }
      .lg-form-cover:before {
        -webkit-transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
        transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
        transition: transform 2s ease, opacity 0.3s ease 0.8s;
        transition: transform 2s ease, opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
        -webkit-transform: scale(2);
        transform: scale(2);
        opacity: 0;
      }
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      opacity: 0;
    }

    50% {
      stroke-dasharray: 40, 200;
      opacity: 1;
    }

    100% {
      stroke-dasharray: 125, 200;
      opacity: 1;
    }
  }
</style>
