import Main from '@/components/main'

const WorkLog = {
  path: '',
  name: 'work_list',
  meta: {
    title: '工作日志',
    notCache: true,
    icon: 'iconrizhi3-copy',
    resCode: ['114']
  },
  component: Main,
  children: [
    {
      path: 'work_list_page',
      name: 'work_list_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '我的日志',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/work-log/log-list.vue')
    },
    {
      path: 'member_log_page',
      name: 'member_log_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '成员日志',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/work-log/member-log.vue')
    }
  ]
}

export default WorkLog
