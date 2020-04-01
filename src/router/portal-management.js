import Main from '@/components/main'

const PortalManagement = {
  path: '/portal_management',
  name: 'portal_management',
  meta: {
    title: '门户管理',
    notCache: true,
    icon: 'iconpc',
    resCode: ['115']
  },
  component: Main,
  children: [
    // 门户管理-绩效资讯
    {
      path: 'performance_information',
      name: 'performance_information_page',
      meta: {
        icon: 'iconzixun',
        title: '绩效资讯',
        resCode: ['115101']
      },
      component: () => import('@/view/portal-management/performance-information/performance-information.vue')
    },
    // 门户管理-民生绩效
    {
      path: 'peoples_livelihood',
      name: 'peoples_livelihood_page',
      meta: {
        icon: 'iconjixiao1',
        title: '民生绩效',
        resCode: ['115102']
      },
      component: () => import('@/view/portal-management/peoples-livelihood/peoples-livelihood.vue')
    },
    // 门户管理-亮点特色
    {
      path: 'lightspot',
      name: 'lightspot_page',
      meta: {
        icon: 'iconliangdian',
        title: '亮点特色',
        resCode: ['115108']
      },
      component: () => import('@/view/portal-management/lightspot/lightspot.vue')
    },
    // 门户管理-绩效理论
    {
      path: 'performance_theory',
      name: 'performance_theory_page',
      meta: {
        icon: 'iconlilunzhishi',
        title: '绩效理论',
        resCode: ['115109']
      },
      component: () => import('@/view/portal-management/performance-theory/performance-theory.vue')
    },
    // 门户管理-了解我们
    {
      path: 'know_about',
      name: 'know_about_page',
      meta: {
        icon: 'iconguanyu',
        title: '了解我们',
        resCode: ['115110']
      },
      component: () => import('@/view/portal-management/know-about/know-about.vue')
    },
    // 门户管理-文件管理
    {
      path: 'file_management',
      name: 'file_management_page',
      meta: {
        icon: 'iconwenjian1',
        title: '文件管理',
        resCode: ['115112']
      },
      component: () => import('@/view/portal-management/file-management/file-management.vue')
    },
    // 门户管理-待审核
    {
      path: 'to_audit',
      name: 'to_audit_page',
      meta: {
        icon: 'icontianxieziliao ',
        title: '待审核',
        resCode: ['115111']
      },
      component: () => import('@/view/portal-management/to-audit/to-audit.vue')
    },
    // 门户管理-活动管理
    {
      path: 'activity_manage',
      name: 'activity_manage_page',
      meta: {
        icon: 'iconhuodong',
        title: '活动管理',
        resCode: ['115105']
      },
      component: () => import('@/view/portal-management/activity-manage/activity-manage.vue')
    },
    // 门户管理-banner管理
    {
      path: 'portal_management/banner_manage',
      name: 'portal_management/banner_manage_page',
      meta: {
        icon: 'icontupian3',
        title: 'banner管理',
        resCode: ['115107']
      },
      component: () => import('@/view/portal-management/banner-manage/banner-manage.vue')
    },
    // 门户管理-绩效资讯-查看绩效资讯详情
    {
      path: 'examine_information_particulars',
      name: 'examine_information_particulars_page',
      meta: {
        icon: '',
        title: '查看绩效资讯详情',
        resCode: ['115101'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/performance-information/examine-information-particulars.vue')
    },
    // 门户管理-民生绩效-查看民生绩效详情
    {
      path: 'examine_peoples_particulars',
      name: 'examine_peoples_particulars_page',
      meta: {
        icon: '',
        title: '查看民生绩效详情',
        resCode: ['115102'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/peoples-livelihood/examine-peoples-particulars.vue')
    },
    // 门户管理-亮点特色-查看亮点特色详情
    {
      path: 'examine_lightspot_particulars',
      name: 'examine_lightspot_particulars_page',
      meta: {
        icon: '',
        title: '查看亮点特色详情',
        resCode: ['115108'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/lightspot/examine-lightspot-particulars.vue')
    },
    // 门户管理-绩效理论-查看绩效理论详情
    {
      path: 'examine_theory_particulars',
      name: 'examine_theory_particulars_page',
      meta: {
        icon: '',
        title: '查看绩效理论详情',
        resCode: ['115109'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/performance-theory/examine-theory-particulars.vue')
    },
    // 门户管理-活动管理-查看活动详情
    {
      path: 'pexamine_activity_particulars',
      name: 'examine_activity_particulars_page',
      meta: {
        icon: '',
        title: '查看活动详情',
        resCode: ['115105'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/activity-manage/examine-activity-particulars.vue')
    },
    // 门户管理-活动管理-新建问卷
    {
      path: 'new_questionnaire',
      name: 'new_questionnaire_page',
      meta: {
        icon: '',
        title: '新建问卷',
        resCode: ['115105'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/activity-manage/new-questionnaire.vue')
    },
    // 门户管理-活动管理-编辑问卷
    {
      path: 'edit_questionnaire',
      name: 'edit_questionnaire_page',
      meta: {
        icon: '',
        title: '编辑问卷',
        resCode: ['115105'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/activity-manage/edit-questionnaire.vue')
    },
    // 门户管理-活动管理-查看问卷详情
    {
      path: 'examine_questionnaire',
      name: 'examine_questionnaire_page',
      meta: {
        icon: '',
        title: '查看问卷详情',
        resCode: ['115105'],
        hideInMenu: true
      },
      component: () => import('@/view/portal-management/activity-manage/examine-questionnaire.vue')
    }
  ]
}

export default PortalManagement
