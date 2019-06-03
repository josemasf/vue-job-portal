// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import store from './store'
import {sync} from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(VeeValidate)
Vue.config.productionTip = false

sync(store, router) // done. Returns an unsync callback fn

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
