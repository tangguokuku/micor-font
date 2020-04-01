// with polyfills
import './public-path'

import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstraps from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
// import { Dialog } from '@/components'

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
// Vue.use(Dialog)

// new Vue({
//   router,
//   store,
//   created: bootstrap,
//   render: h => h(App)
// }).$mount('#app')
let instance = null
function render () {
  // router = new VueRouter({
  //   base: window.__POWERED_BY_QIANKUN__ ? '/project' : '/',
  //   mode: 'history',
  //   routes
  // })

  instance = new Vue({
    router,
    store,
    created: bootstraps,
    render: h => h(App)
  }).$mount('#app')
}
// new Vue({
//   router,
//   store,
//   created () {
//     bootstrap()
//   },
//   render: h => h(App)
// }).$mount('#app')
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped')
}

export async function mount (props) {
  console.log('[vue] props from main framework', props)
  render()
}

export async function unmount () {
  instance.$destroy()
  instance = null
  // router = null
}
