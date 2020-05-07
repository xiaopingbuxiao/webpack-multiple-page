import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import '../../assets/style/common.scss'

Vue.use(VueRouter)


new Vue({
  render: h=>h(App),
}).$mount('#app')

