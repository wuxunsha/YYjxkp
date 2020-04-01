import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import util from './module/util'
import test from './module/test-module'
import quota from './module/quota'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    test,
    util,
    quota
  }
})
