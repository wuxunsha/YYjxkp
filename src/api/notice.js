import axios from '@/libs/api.request'

// 新增通知通告
export const noticeAdd = (data) => {
  return axios.request({
    url: '/notice/add',
    method: 'post',
    data
  })
}

// 修改通知通告
export const noticeUpdate = (data) => {
  return axios.request({
    url: '/notice/update',
    method: 'post',
    data
  })
}

// 多条件查询全部
export const findNoticeByPage = (data) => {
  return axios.request({
    url: '/notice/findNoticeByPage',
    method: 'post',
    data
  })
}

// 查询当前用户所管辖的结构集合
export const getOrgByList = (data) => {
  return axios.request({
    url: '/notice/getOrgByList',
    method: 'post',
    data
  })
}

// 下级机构-通知通告-多条件查询全部
export const findNoticeByLowerPage = (data) => {
  return axios.request({
    url: '/notice/findNoticeByLowerPage',
    method: 'post',
    data
  })
}

// 按id查询通知公告详情
export const findOne = (id) => {
  return axios.request({
    url: `/notice/findOne/${id}`,
    method: 'post'
  })
}

// 发布通知通告
export const publish = (id) => {
  return axios.request({
    url: `/notice/publish/${id}`,
    method: 'post'
  })
}
