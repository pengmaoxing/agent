// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import '../theme/index.css'

import './icons'
import './permission'

//引入全局代理商名称

import globalVar from './components/global/hierarchyName/hierarchyName.js'


Vue.use(ElementUI);


import echarts from 'echarts'

Vue.prototype.$echarts = echarts;

Vue.prototype.globalAlias = globalVar; //全局代理商名称

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
