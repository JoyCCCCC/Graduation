import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import moment from 'moment'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import Ellipsis from 'vue-directive-ellipsis' // label超出省略组件
Vue.directive('ellipsis', Ellipsis)

import '@/styles/index.scss' // global css

import * as filters from './filters' // global filters

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import { deepcopy, checkCurrentPageData } from './utils'
import { defaultCfg } from './constants'

moment.locale('zh-cn')

Vue.prototype.$deepcopy = deepcopy // 其中$xx为新命的名。
Vue.prototype.$checkCurrentPageData = checkCurrentPageData // 其中$xx为新命的名。
Vue.prototype.$moment = moment
Vue.prototype.$defaultCfg = defaultCfg
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
const { mockXHR } = require('../mock')
mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale, size: 'small' })

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
