import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import modules from './modules'

Vue.use(Vuex)
Vue.use(Vuetify, {
  iconfont: 'mdi'
})

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
