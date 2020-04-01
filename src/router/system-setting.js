import Main from '@/components/main'

const SystemSetting = {
  path: '/system_setting',
  name: 'system',
  meta: {
    title: '系统设置',
    icon: 'iconshezhi2',
    resCode: ['110']
  },
  component: Main,
  children: [
    {
      path: 'settings',
      name: 'settings',
      meta: {
        title: '流程设置',
        icon: 'iconliucheng1-copy',
        resCode: ['110101']
      },
      component: () => import('@/view/system-management/system-setting/system-setting.vue')
    },
    {
      path: 'roles',
      name: 'roles',
      meta: {
        icon: 'iconjiaoseguanli',
        title: '角色管理',
        resCode: ['110102']
      },
      component: () => import('@/view/system-management/roles-setting/roles-setting.vue')
    },
    {
      path: 'account',
      name: 'account',
      meta: {
        icon: 'iconzhanghuguanli',
        title: '账户管理',
        resCode: ['110103']
      },
      component: () => import('@/view/system-management/account-setting/account-setting.vue')
    },
    {
      path: 'menu',
      name: 'menu',
      meta: {
        icon: 'iconguanli',
        title: '资源管理',
        resCode: ['110104']
      },
      component: () => import('@/view/system-management/menu-setting/menu-setting.vue')
    },
    {
      path: 'data_maintenance',
      name: 'data_maintenance',
      meta: {
        icon: 'iconmingxiweihuyichang',
        title: '数据维护',
        resCode: ['110105']
      },
      component: () => import('@/view/system-management/data-maintenance/data-maintenance.vue')
    },
    {
      path: 'dictionary',
      name: 'dictionary_list',
      meta: {
        icon: 'iconzidianguanli-copy',
        title: '数据字典',
        resCode: ['110106']
      },
      component: () => import('@/view/system-management/dictionary/dictionary.vue')
    }
  ]
}

export default SystemSetting
