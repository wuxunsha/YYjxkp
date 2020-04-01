import Main from '@/components/main'

const InnovationExcellence = {
  path: '',
  name: 'innovation_excellence',
  meta: {
    title: '创新创优',
    notCache: true,
    icon: 'iconzan',
    resCode: ['114']
  },
  component: Main,
  children: [
    {
      path: 'innovation_excellence_list_page',
      name: 'innovation_excellence_list_page',
      meta: {
        icon: 'iconren',
        title: '个人创新创优列表',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/innovation-excellence/innovation-excellence-list/innovation-excellence-list.vue')
    },
    {
      path: 'department_innovation_excellence_list_page',
      name: 'department_innovation_excellence_list_page',
      meta: {
        icon: 'iconbumen',
        title: '部门创新创优列表',
        notCache: true,
        resCode: ['114102']
      },
      component: () => import('@/view/innovation-excellence/department-innovation-excellence-list/department-innovation-excellence-list.vue')
    },
    {
      path: 'review_page',
      name: 'review_page',
      meta: {
        icon: 'iconshenhe2-copy',
        title: '审核',
        notCache: true,
        resCode: ['114103']
      },
      component: () => import('@/view/innovation-excellence/review/review.vue')
    }
  ]
}

export default InnovationExcellence
