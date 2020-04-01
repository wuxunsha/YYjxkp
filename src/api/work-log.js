import axios from '@/libs/api.request'

// 新增我的工作日志
export const workLogAdd = (data) => {
  return axios.request({
    url: '/workLog/add',
    method: 'post',
    data
  })
}

// 领导查询下属工作日志详情
export const findLeaderByKey = (id) => {
  return axios.request({
    url: `/workLog/findLeaderByKey/${id}`,
    method: 'post'
  })
}

// 领导分页查询员工的全部日志
export const findLeaderWorkLogByPage = (data) => {
  return axios.request({
    url: '/workLog/findLeaderWorkLogByPage',
    method: 'post',
    data
  })
}

// 按id查询我的工作日志
export const findOne = (id) => {
  return axios.request({
    url: `/workLog/findOne/${id}`,
    method: 'post'
  })
}

// 分页查询我个人发表的全部日志
export const findWorkLogByPage = (data) => {
  return axios.request({
    url: '/workLog/findWorkLogByPage',
    method: 'post',
    data
  })
}

// 批示/反馈--回复
export const reply = (data) => {
  return axios.request({
    url: '/workLog/reply',
    method: 'post',
    data
  })
}

// 修改我的工作日志
export const update = (data) => {
  return axios.request({
    url: '/workLog/update',
    method: 'post',
    data
  })
}
