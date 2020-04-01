<style lang="less">
  .date {
    font-size: 20px;
  }
</style>
<template>
  <Layout style="height: 100%">
    <Header class="main-header">
      <h1 class="title">
        {{ projectName }}
        <span class="date">{{ date }}</span>
      </h1>
      <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/>
    </Header>
    <Layout class="main">
      <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden', backgroundColor: '#fff'}">
        <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <!-- <div class="logo-con">
            <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
            <img v-show="collapsed" :src="minLogo" key="min-logo" />
          </div> -->
        </side-menu>
      </Sider>
      <Layout class="main-content">
        <Header class="header-con">
          <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
            <!-- <user :message-unread-count="unreadCount" :user-avatar="userAvatar"/> -->
            <!-- <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/> -->
            <!-- <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store> -->
            <!-- <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/> -->
          </header-bar>
        </Header>
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
            </div>
            <Content class="content-wrapper">
              <keep-alive :include="cacheList">
                <router-view/>
                <!-- 示例 -->
                <Example/>
              </keep-alive>
              <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
// import Language from './components/language'
import ErrorStore from './components/error-store'
import Example from '@/components/example'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import { getStandardDate } from '@/libs/tools'
import { constantsRouter as routers } from '@/router/routers'
// import minLogo from '@/assets/images/logo-min.jpg'
// import maxLogo from '@/assets/images/logo.jpg'
import './main.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    // Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop,
    Example
  },
  data () {
    return {
      projectName: '益阳市绩效评估大数据平台',
      collapsed: false,
      // minLogo,
      // maxLogo,
      isFullscreen: false,
      date: ''
    }
  },
  computed: {
    ...mapGetters([
      'errorCount'
    ]),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvatar () {
      // return this.$store.state.user.avatarImgPath
      let avatarUrl = localStorage.getItem('USER_INFO') && JSON.parse(localStorage.getItem('USER_INFO')).avatarUrl ? JSON.parse(localStorage.getItem('USER_INFO')).avatarUrl : ''
      return avatarUrl
    },
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      // 从vuex读取菜单列表
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.user.unreadCount
    }
  },
  methods: {
    getTime () {
      setInterval(() => {
        this.date = getStandardDate(new Date().getTime(), 'year')
      }, 1000)
    },
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin',
      'getUnreadMessageCount'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    // 初始化时间
    this.getTime()
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route
    this.addTag({
      route: { name, params, query, meta }
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    // this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    // this.getUnreadMessageCount()
  }
}
</script>
