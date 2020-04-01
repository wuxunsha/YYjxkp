
import { getImgCode } from '@/api/util'
export default {
  state: {
    randomStr: ''
  },
  mutations: {
    setLoginRandomStr (state) {
      state.randomStr = new Date().getTime()
    }
  },
  getters: {
  },
  actions: {
    getImgCode ({ state, commit }) {
      commit('setLoginRandomStr')
      return new Promise((resolve, reject) => {
        getImgCode({ randomStr: state.randomStr }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
