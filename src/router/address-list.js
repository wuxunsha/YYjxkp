import Main from '@/components/main'

const AddressList = {
  path: '/address_list',
  name: 'address_list',
  meta: {
    title: '通讯录',
    notCache: true,
    icon: 'icontongxunlu',
    resCode: ['125']
  },
  component: Main,
  children: [
    // 通讯录-当前机构
    {
      path: 'department',
      name: 'department',
      meta: {
        icon: 'iconjigou',
        title: '当前机构',
        resCode: ['125101']
      },
      component: () => import('@/view/address-list/department/department.vue')
    },
    // 通讯录-益阳市
    {
      path: 'district',
      name: 'district',
      meta: {
        icon: 'iconchengshi-copy',
        title: '益阳市',
        resCode: ['125102']
      },
      component: () => import('@/view/address-list/district/district.vue')
    }
  ]
}

export default AddressList
