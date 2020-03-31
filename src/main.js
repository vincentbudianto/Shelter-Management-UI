// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
<<<<<<< HEAD
import router from './router'
||||||| merged common ancestors
=======
import router from './router'
import ChartjsPlugin from './plugins/chartjs_plugin.js';
import vuetify from '@/plugins/vuetify' // path to vuetify export
>>>>>>> 7e60827c2a37ef189f7db619eded123488353b43

Vue.config.productionTip = false
Vue.use(ChartjsPlugin)

/* eslint-disable no-new */
new Vue({
  vuetify,
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
