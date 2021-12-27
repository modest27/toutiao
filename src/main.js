import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/style/index.less'
//引入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

//加载处理时间dayjs包
import '@/utils/dayjs.js'

//加载动态设置rem基准值的文件
import 'amfe-flexible'

Vue.use(Vant)


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')