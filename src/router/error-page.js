import Main from '@/components/main'

const ErrorPage = {
  path: '',
  name: 'error',
  meta: {
    title: '错误',
    hideInMenu: true
  },
  component: Main,
  children: [
    {
      path: '/401',
      name: 'error_401',
      meta: {
        title: '错误：401',
        hideInMenu: true
      },
      component: () => import('@/view/example/error-page/401.vue')
    },
    {
      path: '/500',
      name: 'error_500',
      meta: {
        title: '错误：500',
        hideInMenu: true
      },
      component: () => import('@/view/example/error-page/500.vue')
    },
    {
      path: '*',
      name: 'error_404',
      meta: {
        title: '错误：404',
        hideInMenu: true
      },
      component: () => import('@/view/example/error-page/404.vue')
    }
  ]
}

export default ErrorPage
