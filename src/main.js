// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import config from '@/config'
import importDirective from '@/directive'
import { directive as clickOutside } from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import 'view-design/dist/styles/iview.css'
import steps from './common/steps/Steps.vue'
import '@babel/polyfill'
import '@/common/mixin/access-control'

// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')
require('@/mock')

Vue.use(ViewUI)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

// 创建过滤器将秒数过滤为年月日，时分秒
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

// 创建过滤器将秒数过滤为年月日
Vue.filter('dateYMD', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})


Vue.component('article-steps', steps)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// let initTimeStr = ''
document.addEventListener('click', function(e) {
  let target = e.target.tagName // BUTTON
  let children = e.target.parentNode.tagName // BUTTON
  // 劫持按钮点击事件
  if (target === 'BUTTON' || children === 'BUTTON') {
    let div = document.createElement('div')
    div.id = 'global-mask'
    div.style.position = 'absolute'
    div.style.top = 0
    div.style.right = 0
    div.style.bottom = 0
    div.style.left = 0
    div.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    div.style.zIndex = 9999
    document.body.appendChild(div)
    setTimeout(() => {
      let _div = document.getElementById('global-mask')
      document.body.removeChild(_div)
    }, 500);
    // // 初始化第一次点击的时间
    // if (!initTimeStr) {
    //   initTimeStr = new Date().getTime()
    // } else {
    //   let currentTimeStr = new Date().getTime()
    //   if (currentTimeStr - initTimeStr > 500) {
    //     console.log(target, children, '你点的太快了，兄弟')
    //     return false
    //   }
    // }
  }
})