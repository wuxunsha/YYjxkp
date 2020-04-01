import Main from '@/components/main'

const Estimate = {
  path: '/estimate',
  name: 'estimate',
  meta: {
    title: '社会评价',
    notCache: true,
    icon: 'iconpingjia',
    resCode: ['116']
  },
  component: Main,
  children: [
    // 社会评价-上级评价
    {
      path: 'superior_estimate_main',
      name: 'superior_estimate_main_page',
      meta: {
        icon: 'iconshangji',
        title: '上级评价',
        resCode: ['116102']
      },
      component: () => import('@/view/estimate/superior-estimate/superior-estimate-main/superior-estimate-main.vue')
    },
    // 社会评价-内部评价
    {
      path: 'interior_estimate_main',
      name: 'interior_estimate_main_page',
      meta: {
        icon: 'iconjixiao1',
        title: '内部评价',
        resCode: ['116102']
      },
      component: () => import('@/view/estimate/interior-estimate/interior-estimate-main/interior-estimate-main.vue')
    },
    // 社会评价-评价管理
    {
      path: 'estimate_manage',
      name: 'estimate_manage_page',
      meta: {
        icon: 'icondudaokaohe',
        title: '评价管理',
        resCode: ['116109']
      },
      component: () => import('@/view/estimate/estimate-manage/estimate-manage.vue')
    },
    // 社会评价-上级评价-创建社会评价模板
    {
      path: 'superior_society_estimate_main',
      name: 'superior_society_estimate_main_page',
      meta: {
        icon: '',
        title: '创建社会评价模板',
        resCode: ['116102101'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/superior-estimate/society-estimate-main/society-estimate-main.vue')
    },
    // 社会评价-上级评价-查看社会评价模板
    {
      path: 'superior_questionnaire',
      name: 'superior_questionnaire_page',
      meta: {
        icon: '',
        title: '查看社会评价模板',
        resCode: ['116102101'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/superior-estimate/society-estimate-main/questionnaire.vue')
    },
    // 社会评价-上级评价-问卷内容填写
    {
      path: 'superior_questionnaire_survey',
      name: 'superior_questionnaire_survey_page',
      meta: {
        icon: '',
        title: '问卷内容填写',
        resCode: ['116102102'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/superior-estimate/questionnaire-survey/questionnaire-survey.vue')
    },
    // 社会评价-上级评价-编辑问卷内容
    {
      path: 'superior_entering_content',
      name: 'superior_entering_content_page',
      meta: {
        icon: '',
        title: '编辑问卷内容',
        resCode: ['116102102'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/superior-estimate/questionnaire-survey/entering-content.vue')
    },
    // 社会评价-上级评价-查看问卷内容
    {
      path: 'superior_examine_particulars',
      name: 'superior_examine_particulars_page',
      meta: {
        icon: '',
        title: '查看问卷内容',
        resCode: ['116102102'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/superior-estimate/questionnaire-survey/examine-particulars.vue')
    },
    // 社会评价-上级评价-评价收集与计分
    {
      path: 'superior_evaluation_questionnaire',
      name: 'superior_evaluation_questionnaire_page',
      meta: {
        icon: '',
        title: '评价收集与计分',
        resCode: ['116102103'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/superior-estimate/estimate-scoring/evaluation-questionnaire.vue')
    },
    // 社会评价-上级评价-查看评价计分
    {
      path: 'superior_estimate_scoring',
      name: 'superior_estimate_scoring_page',
      meta: {
        icon: '',
        title: '查看评价计分',
        resCode: ['116102103'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/superior-estimate/estimate-scoring/estimate-scoring.vue')
    },
    // 社会评价-内部评价-创建社会评价模板
    {
      path: 'interior_society_estimate_main',
      name: 'interior_society_estimate_main_page',
      meta: {
        icon: '',
        title: '创建社会评价模板',
        resCode: ['116102101'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/interior-estimate/society-estimate-main/society-estimate-main.vue')
    },
    // 社会评价-内部评价-查看社会评价模板
    {
      path: 'interior_questionnaire',
      name: 'interior_questionnaire_page',
      meta: {
        icon: '',
        title: '查看社会评价模板',
        resCode: ['116102101'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/interior-estimate/society-estimate-main/questionnaire.vue')
    },
    // 社会评价-内部评价-问卷内容填写
    {
      path: 'interior_questionnaire_survey',
      name: 'interior_questionnaire_survey_page',
      meta: {
        icon: '',
        title: '问卷内容填写',
        resCode: ['116102102'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/interior-estimate/questionnaire-survey/questionnaire-survey.vue')
    },
    // 社会评价-内部评价-编辑问卷内容
    {
      path: 'interior_entering_content',
      name: 'interior_entering_content_page',
      meta: {
        icon: '',
        title: '编辑问卷内容',
        resCode: ['116102102'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/interior-estimate/questionnaire-survey/entering-content.vue')
    },
    // 社会评价-内部评价-查看问卷内容
    {
      path: 'interior_examine_particulars',
      name: 'interior_examine_particulars_page',
      meta: {
        icon: '',
        title: '查看问卷内容',
        resCode: ['116102102'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/interior-estimate/questionnaire-survey/examine-particulars.vue')
    },
    // 社会评价-内部评价-评价收集与计分
    {
      path: 'interior_evaluation_questionnaire',
      name: 'interior_evaluation_questionnaire_page',
      meta: {
        icon: '',
        title: '评价收集与计分',
        resCode: ['116102103'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/interior-estimate/estimate-scoring/evaluation-questionnaire.vue')
    },
    // 社会评价-内部评价-查看评价计分
    {
      path: 'interior_estimate_scoring',
      name: 'interior_estimate_scoring_page',
      meta: {
        icon: '',
        title: '查看评价计分',
        resCode: ['116102103'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/interior-estimate/estimate-scoring/estimate-scoring.vue')
    },
    // 社会评价-评价管理详情
    {
      path: 'examine_particulars',
      name: 'examine_particulars_page',
      meta: {
        icon: '',
        title: '评价管理详情',
        resCode: ['116109'],
        hideInMenu: true
      },
      component: () => import('@/view/estimate/estimate-manage/examine-particulars.vue')
    }
  ]
}

export default Estimate
