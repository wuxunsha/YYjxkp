import {
  getBreadCrumbList,
  setSliderBarInLocalstorage,
  getSliderBarFromLocalstorage,
  setTagNavListInLocalstorage,
  getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  localSave,
  localRead
} from '@/libs/util'
import { saveErrorLogger, getSliderMenuList } from '@/api/data'
import router from '@/router'
import { constantsRouter } from '@/router/routers'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: {},
    local: localRead('local'),
    errorList: [],
    hasReadErrorPage: false,
    routers: []
  },
  getters: {
    menuList: (state) => {
      // 登录成功后菜单信息会保存在state.routers中
      // 用户强制刷新后从localstorage中获取菜单
      // const menus = state.routers.length > 0 ? state.routers : (getSliderBarFromLocalstorage() || [])
      const menus = state.routers
      return [...menus]
    },
    errorCount: state => state.errorList.length
  },
  mutations: {
    setMenuList (state, list) {
      state.routers = [...list]
    },
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setLocal (state, lang) {
      localSave('local', lang)
      state.local = lang
    },
    addError (state, error) {
      state.errorList.push(error)
    },
    setHasReadErrorLoggerStatus (state, status = true) {
      state.hasReadErrorPage = status
    },
    getCurrentRouter () {
      // const router = JSON.parse(getToken('SLIDERBAR_MENUS'))
      const router = JSON.parse(getSliderBarFromLocalstorage())
      return router
    },
    // 更新路由信息
    setRouterToState (state, { defaultRouter, newRoutes }) {
      // 显示在左侧菜单栏的菜单
      state.routers = [...defaultRouter, ...newRoutes]
      // 本地持久化
      setSliderBarInLocalstorage(newRoutes)
      router.options.routes.push(...newRoutes)
    }
  },
  actions: {
    addErrorLog ({ commit, rootState }, info) {
      if (!window.location.href.includes('error_logger_page')) commit('setHasReadErrorLoggerStatus', false)
      const { user: { token, userId, userName } } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    },
    // 根据权限配置路由
    loadRoute ({ state, commit, rootState, getters }, user) {
      return new Promise((resolve, reject) => {
        // 用户权限
        const token = user.data.data.token
        // 配置默认菜单，用于显示在左侧菜单栏。
        const defaultRouter = getMenuByRouter(constantsRouter, token)
        // 当前用户的菜单，用于显示在左侧菜单栏。可以从接口获取数据
        getSliderMenuList().then(res => {
          console.log('request menu:', user.data.data.menuTreeList)
          // 接口数据
          const newRoutes = res.data.data
          commit('setRouterToState', { defaultRouter, newRoutes })
          resolve()
        })
      })
    }
  }
}
