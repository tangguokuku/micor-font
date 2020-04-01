// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
// import fetch from 'isomorphic-fetch'

import Vue from 'vue'
import App from './App.vue'
// import router from './router'
// import store from './store/'
import { VueAxios } from './utils/request'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
// import { Dialog } from '@/components'
// 引入qiankun方法
import {
  registerMicroApps,
  // setDefaultMountApp,
  runAfterFirstMounted,
  start
} from 'qiankun'

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
let app = null
function render ({ appContent, loading } = {}) {
  if (!app) {
    app = new Vue({
      el: '#container',
      data () {
        return {
          content: appContent,
          loading
        }
      },
      created: bootstrap,
      render (h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading
          }
        })
      }
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
  // console.log(process.env)
  // const container = document.getElementById('container');
  // ReactDOM.render(<Framework loading={loading} content={appContent} />, container);
}
const props = { msg: 12 }
function genActiveRule (routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix)
}
render()
registerMicroApps(
  [
    {
      name: 'one', // app name registered
      entry: '//localhost:8010',
      render,
      activeRule: genActiveRule('/one'),
      props
    },
    {
      name: 'two',
      entry: '//localhost:8011',
      render,
      activeRule: genActiveRule('/two'),
      props
    }
  ],

  {
    beforeLoad: [
      app => {
        console.log('before load', app)
      }
    ],
    beforeMount: [
      app => {
        console.log('before mount', app)
        console.log('我是数据', this)
      }
    ],
    afterUnmount: [
      app => {
        console.log('after unload', app)
      }
    ]
  }
)
// 设置默认启动子项目
// setDefaultMountApp('/one')
// 第一个子应用加载完毕回调
runAfterFirstMounted(() => {
  console.log('第一个子项目加载完毕', app)
})
// start()
start({
  prefetch: true,
  jsSandbox: true,
  singular: true
  // fetch: window.fetch
})
