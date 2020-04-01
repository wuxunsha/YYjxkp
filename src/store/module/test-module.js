export default {
  state: {
    list: [],
    data: []
  },
  getters: {
    // 返回一个包含偶数的数组
    getOddNums: state => { return state.list.filter(val => val % 2 === 0) }
  },
  mutations: {
    pushNum: () => { state.list(++state.list.length) },
    setData: res => { state.data = res }
  },
  actions: {
    queryData: ({ state, commit }) => {
      setTimeout(() => {
        commit('setData', [{ name: 'Fick', address: 'china' }])
      }, 800)
    }
  }
}
