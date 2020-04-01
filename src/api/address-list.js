import axios from '@/libs/api.request'

// 获取所在机构数据
export const myOrgUserList = (data) => {
  return axios.request({
    url: '/addrbook/userinfo/myOrgUserList',
    data,
    method: 'post'
  })
}

// 根据机构ID查询管理员
export const maninfo = (data) => {
  return axios.request({
    url: '/addrbook/userinfo/maninfo',
    data,
    method: 'post'
  })
}

// 根据机构id查询机构列表
export const orgList = (data) => {
  return axios.request({
    url: '/addrbook/oran/orgList',
    data,
    method: 'post'
  })
}
