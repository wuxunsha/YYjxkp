import Main from '@/components/main'

const SecurityAudit = {
  path: '',
  name: 'security_audit',
  meta: {
    title: '安全审计',
    notCache: true,
    icon: 'iconshenji1-copy',
    resCode: ['114']
  },
  component: Main,
  children: [
    {
      path: 'account_login_log_page',
      name: 'account_login_log_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '账号登录日志',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/security-audit/account-login-log.vue')
    },
    {
      path: 'business_operations_page',
      name: 'business_operations_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '业务操作日志',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/security-audit/business-operations-log.vue')
    },
    {
      path: 'login_plate_data_page',
      name: 'login_plate_data_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '登录板块数据',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/security-audit/login-plate-data.vue')
    },
    {
      path: 'system_error_log_page',
      name: 'system_error_log_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '系统错误日志',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/security-audit/system-error-log.vue')
    }
  ]
}

export default SecurityAudit
