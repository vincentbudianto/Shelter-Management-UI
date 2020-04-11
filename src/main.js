// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App'
import router from './router'
import ChartjsPlugin from './chartjs_plugin.js'

Vue.config.productionTip = false
Vue.use(ChartjsPlugin)
Vue.use(VueCookies)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
