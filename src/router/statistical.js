import Main from '@/components/main'

const Statistical = {
  path: '/statistical',
  name: 'statistical',
  meta: {
    title: '统计报表',
    notCache: true,
    icon: 'icontongjifenxi1',
    resCode: ['123']
  },
  component: Main,
  children: [
    // 统计报表-计分汇总
    {
      path: 'scoring_collect',
      name: 'scoring_collect',
      meta: {
        icon: 'iconshujuhuizong',
        title: '计分汇总',
        resCode: ['123101']
      },
      component: () => import('@/view/statistical/scoring-collect/scoring-collect.vue')
    },
    // 统计报表-计分汇总(审核)
    {
      path: 'scoring_audit',
      name: 'scoring_audit_page',
      meta: {
        icon: 'icontianxieziliao',
        title: '计分汇总(审核)',
        resCode: ['123102']
      },
      component: () => import('@/view/statistical/scoring-audit/scoring-audit.vue')
    },
    // 统计报表-计分详情汇总
    {
      path: 'scoring_particulars',
      name: 'scoring_particulars',
      meta: {
        icon: 'iconxiangqing',
        title: '计分详情汇总',
        resCode: ['123105']
      },
      component: () => import('@/view/statistical/scoring-particulars/scoring-particulars.vue')
    },
    // 统计报表-加分汇总
    {
      path: 'awarded_collect',
      name: 'awarded_collect',
      meta: {
        icon: 'iconjiafenhuizong1',
        title: '加分汇总',
        resCode: ['123103']
      },
      component: () => import('@/view/statistical/awarded-collect/awarded-collect.vue')
    },
    // 统计报表-加分详情汇总
    {
      path: 'awarded_particulars',
      name: 'awarded_particulars',
      meta: {
        icon: 'iconjiafenxiangqinghuizong',
        title: '加分详情汇总',
        resCode: ['123106']
      },
      component: () => import('@/view/statistical/awarded-particulars/awarded-particulars.vue')
    },
    // 统计报表-图表
    {
      path: 'statistics_chart',
      name: 'statistics_chart',
      meta: {
        icon: 'iconcloud-chart',
        title: '图表',
        resCode: ['123104']
      },
      component: () => import('@/view/statistical/statistics-chart/statistics-chart.vue')
    },
    // 统计报表-计分汇总编辑
    {
      path: 'edit_scoring',
      name: 'edit_scoring_page',
      meta: {
        icon: '',
        title: '计分汇总编辑',
        resCode: ['123101'],
        hideInMenu: true
      },
      component: () => import('@/view/statistical/scoring-collect/edit-scoring.vue')
    },
    // 统计报表-计分汇总详情
    {
      path: 'examine_scoring',
      name: 'examine_scoring_page',
      meta: {
        icon: '',
        title: '计分汇总详情',
        resCode: ['123101'],
        hideInMenu: true
      },
      component: () => import('@/view/statistical/scoring-collect/examine-scoring.vue')
    },
    // 统计报表-计分汇总(审核)详情
    {
      path: 'view_details',
      name: 'view_details_page',
      meta: {
        icon: '',
        title: '计分汇总(审核)详情',
        resCode: ['123102'],
        hideInMenu: true
      },
      component: () => import('@/view/statistical/scoring-audit/view-details.vue')
    },
    // 统计报表-计分详情
    {
      path: 'examine_scoring_particulars',
      name: 'examine_scoring_particulars_page',
      meta: {
        icon: '',
        title: '计分详情',
        resCode: ['123105'],
        hideInMenu: true
      },
      component: () => import('@/view/statistical/scoring-particulars/examine-scoring-particulars.vue')
    },
    // 统计报表-加分汇总详情
    {
      path: 'examine_awarded_collect',
      name: 'examine_awarded_collect_page',
      meta: {
        icon: '',
        title: '加分汇总详情',
        resCode: ['123103'],
        hideInMenu: true
      },
      component: () => import('@/view/statistical/awarded-collect/examine-awarded-collect.vue')
    },
    // 统计报表-加分详情
    {
      path: 'examine_awarded_particulars',
      name: 'examine_awarded_particulars_page',
      meta: {
        icon: '',
        title: '加分详情',
        resCode: ['123106'],
        hideInMenu: true
      },
      component: () => import('@/view/statistical/awarded-particulars/examine-awarded-particulars.vue')
    }
  ]
}

export default Statistical
