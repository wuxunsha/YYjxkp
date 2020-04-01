import Vue from 'vue'

Vue.mixin({
  data () {
    return {
      authorizeList: []
    }
  },
  created () {
    this.authorizeList = localStorage.getItem('RES_CODE') && JSON.parse(localStorage.getItem('RES_CODE'))
  },
  methods: {
    btnShow (code) {
      console.log('========', code)
      return this.authorizeList.some(item => item === code.toString())
    }
  }
})
