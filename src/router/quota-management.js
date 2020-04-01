import Main from '@/components/main'

const QuotaManagement = {
  path: '/quota',
  name: 'quota_management',
  meta: {
    title: '指标管理',
    icon: 'iconzhibiao',
    notCache: true,
    resCode: ['111']
  },
  component: Main,
  children: [
    // 标签库-列表
    {
      path: 'tags',
      name: 'quota_tags_list',
      meta: {
        icon: 'iconbiaoqian',
        title: '指标标签库',
        notCache: true,
        resCode: ['111101']
      },
      component: () => import('@/view/quota/tags/tags.vue')
    },
    // 标签库-详情
    {
      path: 'tag/detail/:id',
      name: 'quota_tag_detail',
      meta: {
        icon: '',
        title: '标签库-标签详情',
        notCache: true,
        hideInMenu: true,
        resCode: ['111101']
      },
      component: () => import('@/view/quota/tags/tag-detail.vue')
    },
    // 指标汇总
    {
      path: 'summary',
      name: 'quota_summary',
      meta: {
        icon: 'iconshujuhuizong',
        title: '指标汇总',
        notCache: true,
        resCode: ['111102']
      },
      component: () => import('@/view/quota/summary/summary.vue')
    },
    // 今年指标-指标池（上级指标）
    {
      path: 'this_year/pool',
      name: 'this_year_quota_pool_list',
      meta: {
        icon: '',
        title: '指标池',
        notCache: true,
        resCode: ['111102107'],
        hideInMenu: true
      },
      component: () => import('@/view/quota/summary/this-year/pool/pool.vue')
    },
    // 今年指标-内部指标
    {
      path: 'this_year/organization',
      name: 'this_year_organization',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '查看机构指标',
        notCache: true,
        resCode: ['111102101']
      },
      component: () => import('@/view/quota/summary/this-year/organization/organization.vue')
    },
    // 今年指标-内部指标-查看详情（机构）
    {
      path: 'this_year/organization/quota_detail',
      name: 'this_year_quota_detail',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '机构指标-查看详情',
        notCache: true,
        resCode: ['111102101101']
      },
      component: () => import('@/view/quota/summary/this-year/organization/quota-detail.vue')
    },
    // 今年指标-内部指标-查看详情（科室）
    {
      path: 'this_year/office',
      name: 'this_year_office',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '科室指标-详情',
        notCache: true,
        resCode: ['111102101101']
      },
      component: () => import('@/view/quota/summary/this-year/office/office.vue')
    },
    // 今年指标-内部指标-查看详情（个人）
    {
      path: 'this_year/office/private_quota',
      name: 'this_year_private_quota',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '个人指标-详情',
        notCache: true,
        resCode: ['111102101101']
      },
      component: () => import('@/view/quota/summary/this-year/office/private-quota.vue')
    },
    // 历年指标-指标池（上级指标）无权限
    {
      path: 'history/pool',
      name: 'history_quota_pool_list',
      meta: {
        icon: '',
        title: '历史指标-指标池',
        notCache: true
      },
      component: () => import('@/view/quota/summary/this-year/pool/pool.vue')
    },
    // 历年指标-指标池（内部指标-机构）所有账号有权限时只能查看历年内部指标
    {
      path: 'history/organization',
      name: 'history_organization',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '历史指标-机构指标',
        notCache: true,
        resCode: ['111102106']
      },
      component: () => import('@/view/quota/summary/history/organization/organization.vue')
    },
    // 历年指标-指标池（内部指标-详情）所有账号有权限时只能查看历年内部指标
    {
      path: 'history/organization/quota_detail',
      name: 'history_quota_detail',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '历史指标-机构指标-查看详情',
        notCache: true,
        resCode: ['111102106101']
      },
      component: () => import('@/view/quota/summary/this-year/organization/quota-detail.vue')
    },
    // 历年指标-指标池（内部指标-科室）
    {
      path: 'history/office',
      name: 'history_office',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '历史指标-科室指标-详情',
        notCache: true,
        resCode: ['111102106']
      },
      component: () => import('@/view/quota/summary/this-year/office/office.vue')
    },
    // 历年指标-指标池（内部指标-个人）
    {
      path: 'summary/history/office/private_quota',
      name: 'history_private_quota',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '历史指标-个人指标-详情',
        notCache: true,
        resCode: ['111102106']
      },
      component: () => import('@/view/quota/summary/this-year/office/private-quota.vue')
    },
    // 指标流程入口页
    {
      path: 'new-quota/organization/new_quota_organization',
      name: 'new_quota_guide_organization',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '新建指标模板',
        notCache: true,
        resCode: ['111102104', '111102105']
      },
      component: () => import('@/view/quota/summary/new-quota/organization/organization.vue')
    },
    // 新建指标
    {
      path: 'new_quota/organization/new_quota',
      name: 'new_quota',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '新建机构指标',
        notCache: true,
        resCode: ['111102104', '111102105']
      },
      component: () => import('@/view/quota/summary/new-quota/organization/new-quota.vue')
    },
    // 指标发布
    {
      path: 'new_quota/quota_public/quota_public',
      name: 'quota_public',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '指标发布',
        notCache: true,
        resCode: ['111102105105']
      },
      component: () => import('@/view/quota/summary/new-quota/quota-public/public.vue')
    },
    // 指标确认
    {
      path: 'new_quota/confirm_quota/confirm_quota',
      name: 'confirm_quota',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '指标确认',
        notCache: true,
        resCode: ['111102105104']
      },
      component: () => import('@/view/quota/summary/new-quota/confirm-quota/confirm-quota.vue')
    },
    // 分值维护
    {
      path: 'new_quota/score_input/score_input',
      name: 'score_input',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '分值录入',
        notCache: true,
        resCode: ['111102105103']
      },
      component: () => import('@/view/quota/summary/new-quota/score-input/score-input.vue')
    },
    // 初稿
    {
      path: 'new_quota/create_quota_content/create_quota_content',
      name: 'create_quota_content',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '初稿提交审核',
        notCache: true,
        resCode: ['111102105101']
      },
      component: () => import('@/view/quota/summary/new-quota/create-quota-content/create-quota-content.vue')
    },
    // 维护指标内容
    {
      path: 'new_quota/create_quota_content/update_quota_content',
      name: 'update_quota_content',
      meta: {
        hideInMenu: true,
        icon: '',
        title: '维护指标内容',
        notCache: true,
        resCode: ['111102105102']
      },
      component: () => import('@/view/quota/summary/new-quota/create-quota-content/update-quota-content.vue')
    }
    // 返回与批示：111102105106
  ]
}

export default QuotaManagement
