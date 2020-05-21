import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './vant/index'
import './css/index.css'
import './css/iconfont.css'//导入阿里图标库
import api from './api' // 导入api接口
import 'vant/lib/index.less'//一定要引入这个否则修改主题颜色无效

Vue.config.productionTip = false
Vue.prototype.$api = api; // 将api挂载到vue的原型上

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
