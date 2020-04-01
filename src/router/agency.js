import Main from '@/components/main'

const Agency = {
  path: '',
  name: 'agency',
  meta: {
    title: '职能机构',
    icon: 'iconjigou',
    resCode: ['126']
  },
  component: Main,
  children: [
    {
      path: '/agency',
      name: 'agency_list',
      meta: {
        icon: 'iconliebiao',
        title: '机构列表',
        resCode: ['126101']
      },
      component: () => import('@/view/agency/agency.vue')
    }
  ]
}

export default Agency
