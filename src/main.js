import Vue from 'vue'
import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import router from "@/router";
import axios from 'axios'
import echarts from 'echarts'
import IconSvg from '@/components/icon-svg'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/iconFont/iconfont"
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(dataV)
Vue.use(elementUI)
Vue.prototype.$axios = axios //全局注册 命令this.$axios
Vue.prototype.$bus = new Vue()
Vue.component('icon-svg',IconSvg)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
