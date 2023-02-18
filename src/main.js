// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store'
import VueClipboard from 'vue-clipboard2'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import * as echarts from 'echarts'

import * as VueCookies from 'vue-cookies'

import './assets/scss/common.scss'

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
Vue.prototype.CONFIG = process.env.CUSTOM_CONFIG
// Vue.prototype.$echarts = echarts

Vue.use(VueClipboard)
Vue.use(ElementUI)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
  store
})
