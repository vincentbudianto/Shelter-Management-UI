// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
import Notifications from 'vue-notification'
import App from './App'
import router from './router'
import ChartjsPlugin from './plugins/chartjs_plugin.js';
import vuetify from '@/plugins/vuetify' // path to vuetify export
import Vuelayers from '@/plugins/vuelayers' //path to vuelayers export

Vue.config.productionTip = false
Vue.use(ChartjsPlugin)
Vue.use(VueCookies)
Vue.use(Notifications)

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
