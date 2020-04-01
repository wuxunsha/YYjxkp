import Main from '@/components/main'

const Notice = {
  path: '',
  name: 'notice',
  meta: {
    title: '通知公告',
    notCache: true,
    icon: 'icontongzhi5',
    resCode: ['114']
  },
  component: Main,
  children: [
    {
      path: 'notice_list_page',
      name: 'notice_list_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '通知公告列表',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/notice/notice-list.vue')
    },
    {
      path: 'underling_notice_page',
      name: 'underling_notice_page',
      meta: {
        icon: 'iconrizhi3-copy',
        title: '下属通告',
        notCache: true,
        resCode: ['114101']
      },
      component: () => import('@/view/notice/underling-notice.vue')
    }
  ]
}

export default Notice
