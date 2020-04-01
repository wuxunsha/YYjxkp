import Main from '@/components/main'

const PerformanceImprovement = {
  path: '/performance_improvement',
  name: 'performance_improvement',
  meta: {
    title: '绩效改进',
    notCache: true,
    icon: 'iconjixiaogaijin',
    resCode: ['113']
  },
  component: Main,
  children: [
    // 绩效改进-上级指定
    {
      path: 'superior/process',
      name: 'superior_process_page',
      meta: {
        icon: 'iconshangji',
        title: '上级指定',
        resCode: ['113101']
      },
      component: () => import('@/view/performance-improvement/superior/process.vue')
    },
    // 绩效改进-内部改进
    {
      path: 'superior/internal',
      name: 'superior_internal_page',
      meta: {
        icon: 'iconjixiao1',
        title: '内部改进',
        resCode: ['113102']
      },
      component: () => import('@/view/performance-improvement/superior/process.vue')
    },
    // 绩效改进-改进监管
    {
      path: 'leader',
      name: 'leader_page',
      meta: {
        icon: 'icondudaokaohe',
        title: '改进监管',
        resCode: ['113103']
      },
      component: () => import('@/view/performance-improvement/leader/improvement-template.vue')
    },
    // 绩效改进-改进监管-改进方案
    {
      path: 'leader/template_detail',
      name: 'leader_template_detail_page',
      meta: {
        icon: '',
        title: '改进监管-改进方案',
        resCode: ['113103'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/leader/improvement-template-detail.vue')
    },
    // 改进监管-待改进明细
    {
      path: 'leader/detail',
      name: 'leader_detail_page',
      meta: {
        icon: '',
        title: '改进监管-待改进明细',
        resCode: ['113103'],
        hideInMenu: true
      },
      // component: Example,
      component: () => import('@/view/performance-improvement/leader/improvement-detail.vue')
    },
    // 待改进机构列表
    {
      path: 'superior/improvement_org/disqualified',
      name: 'superior_improvement_org_disqualified_page',
      meta: {
        icon: '',
        title: '待改进机构列表',
        resCode: ['113102102'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-org/disqualified.vue')
    },
    // 机构待改进详情
    {
      path: 'superior/improvement_org/disqualified_detail',
      name: 'superior_improvement_org_disqualified_detail',
      meta: {
        icon: '',
        title: '机构待改进详情',
        resCode: ['113102101'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-org/disqualified-detail.vue')
    },
    // 待改进通知模板-列表（初稿）
    {
      path: 'superior/improvement_template/list',
      name: 'superior_improvement_template_list_page',
      meta: {
        icon: '',
        title: '待改进通知模板-列表',
        resCode: ['113102103'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-template/improvement-template.vue')
    },
    // 待改进通知模板-详情（初稿）
    {
      path: 'superior/improvement_template/detail',
      name: 'superior_improvement_template_detail_page',
      meta: {
        icon: '',
        title: '待改进通知模板-详情',
        resCode: ['113102103'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-template/improvement-template-detail.vue')
    },
    // 待改进明细
    {
      path: 'superior/improvement/detail',
      name: 'superior_improvement_detail_page',
      meta: {
        icon: '',
        title: '待改进明细',
        resCode: ['113102101'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-template/improvement-detail.vue')
    },
    // 改进通知-列表（正式）
    {
      path: 'superior/improvement_doc/notice_list',
      name: 'superior_improvement_doc_notice_list_page',
      meta: {
        icon: '',
        title: '改进通知-列表',
        resCode: ['113102104'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-doc/improvement-notice.vue')
    },
    // 改进通知-详情（正式）
    {
      path: 'superior/improvement_doc/notice_detail',
      name: 'superior_improvement_doc_notice_detail_page',
      meta: {
        icon: '',
        title: '改进通知-文件',
        resCode: ['113102104'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-doc/improvement-notice-detail.vue')
    },
    // 反馈批示
    {
      path: 'superior/improvement_details/notice_list',
      name: 'superior_improvement_details_notice_list_page',
      meta: {
        icon: '',
        title: '改进通知归档-列表',
        resCode: ['113102104108'],
        hideInMenu: true
      },
      component: () => import('@/view/performance-improvement/superior/improvement-details/improvement-notice.vue')
    }
  ]
}

export default PerformanceImprovement
