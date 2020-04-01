import Main from '@/components/main'

export const Login = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  /* 项目中的登录页 */
  component: () => import('@/view/login/login.vue')
}

export const Home = {
  path: '/',
  name: '_home',
  redirect: 'home',
  component: Main,
  meta: {
    notCache: true,
    title: '首页',
    icon: 'md-home',
    hideInMenu: true,
    resCode: ['example']
  },
  children: [
    {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页',
        notCache: true,
        icon: 'md-home',
        hideInMenu: true,
        resCode: ['example']
      },
      component: () => import('@/view/example/single-page/home')
    }
  ]
}
