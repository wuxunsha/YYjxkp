import Main from '@/components/main'

const PerformanceAppraisal = {
  path: '',
  name: 'performance_appraisal',
  meta: {
    title: '绩效考核',
    notCache: true,
    icon: 'iconjixiao',
    resCode: ['112']
  },
  component: Main,
  children: [
    {
      path: 'superior_backlog_main_page',
      name: 'superior_backlog_main_page',
      meta: {
        icon: 'iconshangji',
        title: '上级待办',
        resCode: ['112101']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/superior-backlog-main/superior-backlog-main.vue')
    },
    {
      path: 'superior_everyday_index_page',
      name: 'superior_everyday_index_page',
      meta: {
        icon: '',
        title: '日常指标详情',
        hideInMenu: true,
        resCode: ['112101102']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/index-particulars/everyday-index.vue')
    },
    {
      path: 'superior_year_index_page',
      name: 'superior_year_index_page',
      meta: {
        icon: '',
        title: '年度指标详情',
        hideInMenu: true,
        resCode: ['112101102']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/index-particulars/year-index.vue')
    },
    {
      path: 'superior_examine_index_page',
      name: 'superior_examine_index_page',
      meta: {
        icon: '',
        title: '查看指标详情',
        hideInMenu: true,
        resCode: ['112101102']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/index-particulars/examine-index.vue')
    },
    {
      path: 'superior_initiate_everyday_assessment_page',
      name: 'superior_initiate_everyday_assessment_page',
      meta: {
        icon: '',
        title: '发起日常考核',
        hideInMenu: true,
        resCode: ['112101102']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/initiate-assessment/initiate-everyday-assessment.vue')
    },
    {
      path: 'superior_initiate_year_assessment_page',
      name: 'superior_initiate_year_assessment_page',
      meta: {
        icon: '',
        title: '发起年度考核',
        hideInMenu: true,
        resCode: ['112101102']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/initiate-assessment/initiate-year-assessment.vue')
    },
    {
      path: 'superior_data_collection_page',
      name: 'superior_data_collection_page',
      meta: {
        icon: '',
        title: '数据采集',
        hideInMenu: true,
        resCode: ['112101103']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/data-collection/data-collection.vue')
    },
    {
      path: 'superior_data_entering_page',
      name: 'superior_data_entering_page',
      meta: {
        icon: '',
        title: '数据录入',
        hideInMenu: true,
        resCode: ['112101103']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/data-collection/data-entering.vue')
    },
    {
      path: 'city_evelopment',
      name: 'city_evelopment_page',
      meta: {
        icon: '',
        title: '数据核对与反馈',
        hideInMenu: true,
        resCode: ['112101104']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/city-evelopment/city-evelopment.vue')
    },
    {
      path: 'summary_comments',
      name: 'summary_comments_page',
      meta: {
        icon: '',
        title: '意见汇总',
        hideInMenu: true,
        resCode: ['112101105']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/summary-comments/summary_comments-feedback.vue')
    },
    {
      path: 'results_release',
      name: 'results_release_page',
      meta: {
        icon: '',
        title: '结果发布',
        hideInMenu: true,
        notCache: true,
        resCode: ['112101106']
      },
      component: () => import('@/view/performance-appraisal/superior-backlog/results-release/results-release-index-score.vue')
    },
    {
      path: 'interior_assess_main_page',
      name: 'interior_assess_main_page',
      meta: {
        icon: 'iconjixiao1',
        title: '内部考核',
        resCode: ['112102']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/interior-assess-main/interior-assess-main.vue')
    },
    {
      path: 'interior_year_index_page',
      name: 'interior_year_index_page',
      meta: {
        icon: '',
        title: '年度指标详情',
        hideInMenu: true,
        resCode: ['112102102']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/index-particulars/year-index.vue')
    },
    {
      path: 'interior_everyday_index_page',
      name: 'interior_everyday_index_page',
      meta: {
        icon: '',
        title: '日常指标详情',
        hideInMenu: true,
        resCode: ['112102102']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/index-particulars/everyday-index.vue')
    },
    {
      path: 'interior_examine_index_page',
      name: 'interior_examine_index_page',
      meta: {
        icon: '',
        title: '查看指标详情',
        hideInMenu: true,
        resCode: ['112102102']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/index-particulars/examine-index.vue')
    },
    {
      path: 'interior_initiate_everyday_assessment_page',
      name: 'interior_initiate_everyday_assessment_page',
      meta: {
        icon: '',
        title: '发起日常考核',
        hideInMenu: true,
        resCode: ['112102102']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/initiate-assessment/initiate-everyday-assessment.vue')
    },
    {
      path: 'interior_initiate_year_assessment_page',
      name: 'interior_initiate_year_assessment_page',
      meta: {
        icon: '',
        title: '发起年度考核',
        hideInMenu: true,
        resCode: ['112102102']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/initiate-assessment/initiate-year-assessment.vue')
    },
    {
      path: 'interior_data_collection_page',
      name: 'interior_data_collection_page',
      meta: {
        icon: '',
        title: '数据采集',
        hideInMenu: true,
        resCode: ['112102103']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/data-collection/data-collection.vue')
    },
    {
      path: 'interior_data_entering_page',
      name: 'interior_data_entering_page',
      meta: {
        icon: '',
        title: '数据录入',
        hideInMenu: true,
        resCode: ['112102103']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/data-collection/data-entering.vue')
    },
    {
      path: 'city_evelopment_interior',
      name: 'city_evelopment_interior',
      meta: {
        icon: '',
        title: '数据核对与反馈',
        hideInMenu: true,
        resCode: ['112102104']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/city-evelopment/city-evelopment.vue')
    },
    {
      path: 'summary_comments_interior',
      name: 'summary_comments_interior',
      meta: {
        icon: '',
        title: '意见汇总',
        hideInMenu: true,
        resCode: ['112102105']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/summary-comments/summary_comments-feedback.vue')
    },
    {
      path: 'results_release_interior',
      name: 'results_release_interior',
      meta: {
        icon: '',
        title: '结果发布',
        hideInMenu: true,
        resCode: ['112102106']
      },
      component: () => import('@/view/performance-appraisal/interior-assess/results-release/results-release-index-score.vue')
    },
    {
      path: 'assess_progress_page',
      name: 'assess_progress_page',
      meta: {
        icon: 'iconjindu',
        title: '考核进度',
        resCode: ['112103']
      },
      component: () => import('@/view/performance-appraisal/assess-progress/assess-progress.vue')
    }
  ]
}

export default PerformanceAppraisal
