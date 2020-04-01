import Vue from 'vue'
import Router from 'vue-router'
import { constantsRouter, asyncRouter } from './routers'
import store from '@/store'
import iView from 'view-design'
import {
  setToken,
  getToken,
  canTurnTo,
  setTitle
  // getSliderBarFromLocalstorage,
  // getMenuByRouter
} from '@/libs/util'
import config from '@/config'
const { homeName } = config

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

// let defaultMenu = getMenuByRouter(constantsRouter, getToken())
// let asynMenu = getSliderBarFromLocalstorage()
// let menu_list = asynMenu ? [...defaultMenu, ...asynMenu] : defaultMenu
// store.commit('setMenuList', menu_list)

// 左侧菜单栏
const LOGIN_PAGE_NAME = 'login'
const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, router.options.routes)) {
    next()
  } else {
    console.warn('无权限401：', access)
    // 无权限，重定向到401页面
    next({ replace: true, name: 'error_401' })
  }
}

// 通过比较接口返回的菜单来过滤路由
/* const filterRouter = () => {
  // 本地缓存的菜单
  let userMenuFromLocal = asynMenu
  // 待过滤的路由
  let asyncRouterList = asyncRouter
  let newRoutes = []

  const filterRoute = menus => {
    menus.forEach((item, key) => {
      asyncRouterList.forEach(r => {
        // 如果组件名称相同，则说明该组件是有权限的
        if (r.name === item.name) {
          // 过滤得到新的路由(根节点)
          newRoutes = [...newRoutes, ...[
            {
              path: r.path,
              name: r.name,
              meta: r.meta,
              component: r.component
            }
          ]]
          // 遍历子节点
          if (item.children && r.children) {
            // console.log('childrenchildrenc:', item.children)
            // 如果有子节点，就新增子节点
            newRoutes[key].children = []
            // 遍历children
            const eachChild = children => {
              children.forEach(ec => {
                r.children.forEach(c => {
                  if (ec.name === c.name) {
                    newRoutes[key].children = [...newRoutes[key].children, ...[
                      {
                        path: c.path,
                        name: c.name,
                        meta: c.meta,
                        children: c.children,
                        component: c.component
                      }
                    ]]
                  }
                })
              })
            }
            eachChild(item.children)
          }
        }
      })
    })
  }
  filterRoute(userMenuFromLocal)
  return [...newRoutes, asyncRouterList[(asyncRouterList.length - 1)]]
} */
// 通过resCode来过滤路由
const filterRouterByAccess = () => {
  let access = getToken('RES_CODE')
  access = typeof access === 'string' ? JSON.parse(access) : access
  let newRoutes = []
  let menuList = []
  // 待过滤的路由
  let asyncRouterList = asyncRouter
  const filterRouter = (routers) => {
    routers.forEach((item, index) => {
      if (item.meta && item.meta.resCode && access && item.meta.resCode.find(item => access.includes(item))) {
        // console.log('res code>>>>>>>>>>>>>>>>>>>>>>', item.meta.resCode.find(item => access.includes(item)))
        newRoutes = [
          ...newRoutes,
          ...[
            {
              path: item.path,
              name: item.name,
              meta: item.meta,
              component: item.component
            }
          ]
        ]
        menuList = [
          ...menuList,
          ...[
            {
              path: item.path,
              name: item.name,
              meta: item.meta
            }
          ]
        ]
        if (item.children && item.children.length > 0) {
          // 遍历children
          let index = newRoutes.length - 1
          newRoutes[index].children = []
          menuList[index].children = []
          const eachChild = children => {
            children.forEach(ec => {
              // console.log(ec.meta.title, ': ', ec.meta.resCode)
              if (ec.meta && ec.meta.resCode && access && ec.meta.resCode.find(item => access.includes(item))) {
                newRoutes[index].children = [
                  ...newRoutes[index].children,
                  ...[ec]
                ]
                menuList[index].children = [
                  ...menuList[index].children,
                  ...[
                    {
                      path: ec.path,
                      name: ec.name,
                      meta: ec.meta
                    }
                  ]
                ]
              }
            })
          }
          eachChild(item.children)
        }
      }
    })
  }

  filterRouter(asyncRouterList)

  let _newRoute = [...newRoutes, asyncRouterList[(asyncRouterList.length - 1)]]
  // console.log('locaStorage:', JSON.parse(access))
  console.log('=============menu list:', menuList)
  store.commit('setMenuList', menuList)

  return _newRoute
}
// console.log('filterRouterByAccess:', filterRouterByAccess())
// 通过菜单树过滤
// let ROUTER = asynMenu ? [...constantsRouter, ...filterRouter()] : constantsRouter
// 通过资源编码过滤
let ROUTER = [...constantsRouter, ...filterRouterByAccess()]

console.log('ROUTER=====', ROUTER)

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: ROUTER,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    console.log('access:', store.state.user)
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  // window.scrollTo(0, 0)
})

export default router
